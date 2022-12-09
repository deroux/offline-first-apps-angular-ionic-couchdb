import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, Subscription, take } from 'rxjs';
import { DBRepository } from 'src/app/db/DB.repository';
import { BillDoc } from 'src/app/model/bill';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  subscriptions: Array<Subscription> = [];
  tableIdSubject = new BehaviorSubject<string>('');
  billsSubject = new BehaviorSubject<Array<any>>([]);

  constructor(private dbService: DBRepository<any>) {
    this.tableIdSubject.subscribe((tableId) => {
      if (tableId === undefined || tableId === null || tableId === '') return;
      console.log(`tableId found ${tableId}`);
      this.fetchBills(tableId);
      this.initChangeHandler(tableId);
    });
  }

  setTableId(tableId: string) {
    if (tableId === undefined || tableId === '') return;
    this.tableIdSubject.next(tableId);
  }

  initChangeHandler(tableId: string) {
    let sub = this.dbService.getDocumentChanges$().subscribe((doc: any) => {
      if (doc.type !== 'bill') return;
      if (doc) {
        console.warn('handleChange called for bill');
        this.dbService.handleDocumentChange(this.billsSubject, doc, () => {
          this.fetchBills(tableId);
        });
      }
    });
    this.subscriptions.push(sub);
  }

  fetchBills(tableId: string) {
    let q = this.dbService.fetchByTypeAndTableID('bill', tableId.toString(), [
      '_id',
      '_rev',
      'table',
      'type',
      'paid',
      'datetime',
    ]);
    q.pipe(
      take(1),
      catchError((_) => of([]))
    ).subscribe((billsDoc: Array<BillDoc>) => {
      console.log(billsDoc);
      console.log(this.tableIdSubject.getValue());
      if (
        this.tableIdSubject === undefined ||
        this.tableIdSubject.getValue() === ''
      )
        return;

      if (billsDoc === undefined || billsDoc.length === 0) {
        console.log(
          `Creating bill document for ${this.tableIdSubject.getValue()}`
        );
        let doc: BillDoc = {
          _id: uuidv4(),
          type: 'bill',
          table: tableId,
          datetime: new Date().toISOString(), // 2022-12-05T14:15:57.517Z
          paid: [],
        };
        console.warn(doc);
        this.updateBill(doc);
        this.billsSubject.next([doc]);
      } else {
        this.billsSubject.next(billsDoc);
      }
    });
  }

  updateBill(doc: BillDoc) {
    return new Promise((resolve, reject) => {
      this.dbService
        .createOrUpdate(doc)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getCurrentBill() {
    return this.billsSubject.asObservable();
  }
}
