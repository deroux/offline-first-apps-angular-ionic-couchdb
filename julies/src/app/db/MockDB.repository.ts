import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { DBRepository } from './DB.repository';

export default class MockDBRepository<T> extends DBRepository<T> {
  db: any;
  remote: any;

  _changesSubject = new Subject<T>();

  constructor() {
    super();
  }

  init(): void {}

  getDocumentChanges$(): Observable<any> {
    return this._changesSubject.asObservable();
  }

  fetchByType(type: string, fields: string[]): Observable<any> {
    let query = '';
    return this._queryDB(query);
  }

  fetchByTypeAndTableID(
    type: string,
    tableId: string,
    fields: string[]
  ): Observable<any> {
    let query = '';
    return this._queryDB(query);
  }

  _queryDB(query: any) {
    return of([]);
  }

  handleDocumentChange<T extends { _id: string; _rev: string }>(
    subject: BehaviorSubject<T[]>,
    changedDoc: T,
    updateManually: Function
  ): void {
    return undefined;
  }

  createOrUpdate(doc: any): Promise<any> {
    return Promise.resolve(true);
  }

  delete<T extends { _id: string; _rev: string }>(doc: T): Promise<any> {
    return Promise.resolve(true);
  }
}
