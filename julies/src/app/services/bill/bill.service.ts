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

  constructor(private dbService: DBRepository<any>) {}

  setTableId(tableId: string) {
    if (tableId === undefined || tableId === '') return;
    this.tableIdSubject.next(tableId);
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
    ).subscribe((billsDoc: Array<BillDoc>) => {});
  }

  createBill(paidProducts: Array<any> = []) {
    console.log(`Creating bill document for ${this.tableIdSubject.getValue()}`);
    if (
      this.tableIdSubject.getValue() === undefined ||
      this.tableIdSubject.getValue() === ''
    ) {
      console.warn('NO TABLE ID found for create bill document');
      return Promise.reject();
    }

    let doc: BillDoc = {
      _id: uuidv4(),
      type: 'bill',
      table: this.tableIdSubject.getValue(),
      datetime: new Date().toISOString(), // 2022-12-05T14:15:57.517Z
      paid: paidProducts,
    };
    return this.updateBill(doc);
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
}
