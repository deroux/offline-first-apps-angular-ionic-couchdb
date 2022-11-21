import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, Subject, take } from 'rxjs';
import { DbService } from '../db/db.service';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  tablesSubject = new Subject();

  constructor(private dbService: DbService) {}

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
