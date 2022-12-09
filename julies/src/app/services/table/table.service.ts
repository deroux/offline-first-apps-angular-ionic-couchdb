import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, Subscription, take } from 'rxjs';
import { DBRepository } from 'src/app/db/DB.repository';
import { TableDoc } from 'src/app/model/table';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  tablesSubject: BehaviorSubject<Array<TableDoc>> = new BehaviorSubject(
    new Array<TableDoc>()
  );
  subscriptions: Array<Subscription> = [];

  constructor(private dbService: DBRepository<any>) {
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
    });
  }

  getCurrentTables() {
    return this.tablesSubject.asObservable();
  }
}
