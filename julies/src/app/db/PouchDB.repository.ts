import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

import { BehaviorSubject, Observable, Subject, from, map } from 'rxjs';
import { DBRepository } from './DB.repository';

export default class PouchDBRepository<T> extends DBRepository<T> {
  db: any;
  remote: any;

  _changesSubject = new Subject<T>();

  constructor() {
    super();
  }

  init(): void {
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
        console.warn(change.doc);
        this._changesSubject.next(change.doc);
      });
  }

  getDocumentChanges$(): Observable<any> {
    return this._changesSubject.asObservable();
  }

  fetchByType(type: string, fields: string[]): Observable<any> {
    let query = {
      selector: {
        type: type,
      },
      fields: fields,
      execution_stats: true,
    };
    return this._queryDB(query);
  }

  fetchByTypeAndTableID(
    type: string,
    tableId: string,
    fields: string[]
  ): Observable<any> {
    let query = {
      selector: {
        type: type,
        table: tableId,
      },
      fields: fields,
      execution_stats: true,
    };
    return this._queryDB(query);
  }

  _queryDB(query: any) {
    return from(this.db.find(query)).pipe(map((obj: any) => obj['docs']));
  }

  /**
   * This function is used for handling change events on all documents passed,
   * if passed document was found, the document is updated and the value is updated
   * inside the passed subject.
   *
   * @param {BehaviorSubject<T[]>} subject  The subject to update on document exist.
   * @param {T} changedDoc The document which has changed and needs to be propagated.
   * @param {Function} updateManually If document not found, this passed function is called.
   *
   * @returns Nothing (void) but updates the passed subject.
   */
  handleDocumentChange<T extends { _id: string; _rev: string }>(
    subject: BehaviorSubject<T[]>,
    changedDoc: T,
    updateManually: Function
  ): void {
    let docs = subject.getValue();
    var idx = docs.findIndex((x: T) => x._id === changedDoc._id);
    if (idx === -1) {
      updateManually();
      return;
    }
    docs[idx] = changedDoc;
    subject.next(docs);
  }

  createOrUpdate(doc: any): Promise<any> {
    return this.db.put(doc);
  }

  delete<T extends { _id: string; _rev: string }>(doc: T): Promise<any> {
    return this.db.remove(doc);
  }
}
