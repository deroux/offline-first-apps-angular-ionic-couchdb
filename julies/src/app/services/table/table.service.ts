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

  constructor(private dbService: DBRepository<any>) {
    this.fetchTables();
    this.initChangeHandler();
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

  nextState(tableId: string, event: string) {
    // get state machine
    let machine = this.tableStateMachines.get(tableId.toString());

    if (machine === undefined) {
      console.error('machine not found to update state');
      return;
    }

    let possibleNextEvents = machine.state.nextEvents;
    console.table(possibleNextEvents);
    // check if transition is possible
    if (possibleNextEvents.indexOf(event) <= -1) {
      console.error(
        `Table ${tableId} transition from ${machine._state.value} to ${event} NOT POSSIBLE`
      );
      return;
    }

    // find doc for tableId
    let idx = this.tablesSubject
      .getValue()
      .findIndex((tdoc) => tdoc.table.id === tableId);
    let doc = this.tablesSubject.getValue()[idx];
    console.warn(doc);
    console.warn(event);
    // update state in pouchdb, if successful as well set state machine
    this.updateTableStateInDB(doc, event)
      ?.then((r) => {
        console.log(`Successfully updated doc in db for table ${doc.table.id}`);
        // send transition event
        console.log(
          `State machine for table ${tableId} transition from ${machine._state.value} to ${event} send`
        );
        machine.send({ type: event });
      })
      .catch((err) => {
        console.error(
          `Failed updating table ${doc.table.id} from [${doc.table.state}]to [${event}] \n Resetting state machine to [${doc.table.state}]`
        );
      });
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
          doc.table.id,
          this.createStateMachine(doc.table.id, doc.table.state)
        );
      });
      console.warn(this.tableStateMachines);
    });
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

  updateTableStateInDB(doc: TableDoc, newState: string) {
    if (doc.table.state === newState) return;
    let tables = this.tablesSubject.getValue();
    let idx = tables.findIndex((p) => {
      return p.table.id.toString() == doc.table.id.toString();
    });

    if (idx > -1) {
      let tableDoc = tables[idx];
      tableDoc.table.state = newState;
      return this.updateTable(tableDoc);
    }
    return Promise.reject();
  }

  updateTable(tableDoc: any) {
    console.warn(`Updating table ${tableDoc.table.id}`);
    return this.dbService.createOrUpdate(tableDoc);
  }

  getCurrentTables() {
    return this.tablesSubject.asObservable();
  }
}
