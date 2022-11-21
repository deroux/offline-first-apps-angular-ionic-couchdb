import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  db: any;
  remote: any;

  _tablesSubject = new Subject();

  constructor() {
    PouchDB.plugin(PouchDBFind);
    this.db = new PouchDB('julies2');
    this.remote = 'http://admin:admin@localhost:5984/julies2';
    const options = {
      live: true,
      retry: true,
    };
    this.db.sync(this.remote, options).catch((err: any) => {
      console.error(err);
    });
    this.db
      .changes({
        since: 'now',
        live: true,
        include_docs: true,
      })
      .on('change', (change: any) => {
        if (change.doc.type === 'table') {
          console.warn('Change detected on table document');
          console.warn(change.doc);
          this._tablesSubject.next(true);
        }
      });
  }

  getCurrentTableChanges() {
    return this._tablesSubject.asObservable();
  }
}
