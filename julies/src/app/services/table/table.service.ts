import { Injectable } from '@angular/core';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  Subject,
  Subscription,
  take,
} from 'rxjs';
import { DbService } from '../db/db.service';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  tablesSubject = new Subject();
  subscriptions: Array<Subscription> = [];

  constructor(private dbService: DbService) {
    this.initChangeHandler();
  }

  initChangeHandler() {
    let sub: Subscription = this.dbService
      .getCurrentTableChanges()
      .subscribe((changed) => {
        if (changed) {
          console.warn('handleChange called');
          this.handleChange();
        }
      });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  handleChange() {
    this.fetchTables();
  }

  fetchTables() {
    let query = {
      selector: {
        type: 'table',
      },
      fields: ['_id', '_rev', 'table', 'type'],
      execution_stats: true,
    };
    let q: Observable<any> = from(this.dbService.db.find(query)).pipe(
      map((obj: any) => obj['docs'])
    );
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
