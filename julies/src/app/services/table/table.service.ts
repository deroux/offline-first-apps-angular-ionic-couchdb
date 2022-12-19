import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, Subscription, take } from 'rxjs';
import { DBRepository } from 'src/app/db/DB.repository';
import { TableDoc } from 'src/app/model/table';
import { tableMachine } from 'src/app/shared/tablestate-machine';
import { interpret } from 'xstate';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  tablesSubject: BehaviorSubject<Array<TableDoc>> = new BehaviorSubject(
    new Array<TableDoc>()
  );
  subscriptions: Array<Subscription> = [];
  tableStateMachines: Map<string, any> = new Map<string, any>();

  constructor(private dbService: DBRepository<any>) {}

  ngOnInit() {
    this.initChangeHandler();
    this.fetchTables();
  }

  initChangeHandler() {
    let sub: Subscription = this.dbService
      .getDocumentChanges$()
      .subscribe((doc: any) => {
        if (doc.type !== 'table') return;
        console.warn('handleChange called');
        this.dbService.handleDocumentChange(this.tablesSubject, doc, () => {
          this.fetchTables();
        });
      });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  fetchTables() {
    console.error('fetchTables called');
    let q = this.dbService.fetchByType('table', [
      '_id',
      '_rev',
      'table',
      'type',
    ]);
    q.pipe(
      take(1),
      catchError((_) => of([]))
    ).subscribe((tableDocs) => {
      this.tablesSubject.next(tableDocs);
      tableDocs.forEach((doc: TableDoc) => {
        this.tableStateMachines.set(
          doc.table.id.toString(),
          this.createStateMachine(doc.table.id, doc.table.state)
        );
      });
      console.log(this.tableStateMachines);
    });
  }

  nextState(tableId: string, event: string) {
    // get state machine for tableId
    let machine = this.tableStateMachines.get(tableId.toString());

    if (machine === undefined) {
      console.error('Machine not found..');
      return;
    }

    if (machine._state.value === event) return;

    let possibleNextEvents = machine.state.nextEvents;
    console.table(possibleNextEvents);

    // check if transition is possible for event we received
    if (possibleNextEvents.indexOf(event) <= -1) {
      console.error(
        `Table ${tableId} transition from ${machine._state.value} to ${event} NOT POSSIBLE`
      );
      return;
    }

    // update in pouchdb
    let idx = this.tablesSubject
      .getValue()
      .findIndex((doc) => doc.table.id.toString() === tableId.toString());
    if (idx <= -1) {
      console.error(`Table ${tableId} index negative ${idx}`);
      return;
    }
    let doc = this.tablesSubject.getValue()[idx];
    this.updateTableStateInDB(doc, event)
      ?.then(() => {
        console.log(`Successfully updated doc in db for table ${tableId}`);
        // send transition event
        console.log(
          `State machine transition from ${machine._state.value} to ${event} sent`
        );
        machine.send({ type: event });
      })
      .catch((err) => {
        console.error(
          `Failed updating table ${doc.table.id} from [${doc.table.state}] to [${event}] \n state machine not affected`
        );
      });
  }

  updateTableStateInDB(doc: TableDoc, newState: string) {
    if (doc.table.state === newState) return;
    doc.table.state = newState;
    console.warn(`Updating table ${doc.table.id}`);
    return this.dbService.createOrUpdate(doc);
  }

  createStateMachine(tableId: string, initState: string) {
    let stateMachine = interpret(tableMachine, {
      devTools: true,
    }).onTransition((state) => {
      console.log(tableId, state.value);
    });
    stateMachine.start(initState);
    return stateMachine;
  }

  getCurrentTables() {
    return this.tablesSubject.asObservable();
  }
}
