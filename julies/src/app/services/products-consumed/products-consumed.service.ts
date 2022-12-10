import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, Subscription, take } from 'rxjs';
import { DBRepository } from 'src/app/db/DB.repository';
import { ProductsConsumedDoc } from 'src/app/model/productsConsumed';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ProductsConsumedService {
  prodConsumedSubject: BehaviorSubject<Array<ProductsConsumedDoc>> =
    new BehaviorSubject(new Array<ProductsConsumedDoc>());
  allProdConsumedSubject: BehaviorSubject<Array<ProductsConsumedDoc>> =
    new BehaviorSubject(new Array<ProductsConsumedDoc>());
  subscriptions: Array<Subscription> = [];
  tableIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private dbService: DBRepository<any>) {
    let s = this.tableIdSubject.subscribe((tableId) => {
      this.fetchProductsConsumed(tableId);
      this.initChangeHandler(tableId);
    });
    this.fetchAllProducts();
  }

  initChangeHandler(tableId: string) {
    let sub: Subscription = this.dbService
      .getDocumentChanges$()
      .subscribe((doc: any) => {
        if (doc.type !== 'products-consumed') return;
        if (doc) {
          console.warn('handleChange called');
          this.dbService.handleDocumentChange(
            this.prodConsumedSubject,
            doc,
            () => {
              this.fetchProductsConsumed(tableId);
            }
          );
          this.fetchAllProducts();
        }
      });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  setTableId(tableId: string) {
    if (tableId === undefined || tableId === null || tableId == '') return;
    this.tableIdSubject.next(tableId);
  }

  fetchAllProducts() {
    let q = this.dbService.fetchByType('products-consumed', [
      '_id',
      '_rev',
      'table',
      'type',
      'products',
    ]);
    q.pipe(
      take(1),
      catchError((_) => of([]))
    ).subscribe((prodConsumedDocs) => {
      this.allProdConsumedSubject.next(prodConsumedDocs);
    });
  }

  fetchProductsConsumed(tableId: string) {
    if (tableId === undefined || tableId == '') return;

    console.error('fetchProductsConsumed called');
    let q = this.dbService.fetchByTypeAndTableID(
      'products-consumed',
      tableId.toString(),
      ['_id', '_rev', 'table', 'type', 'products']
    );
    q.pipe(
      take(1),
      catchError((_) => of([]))
    ).subscribe((prodConsumedDocs) => {
      if (prodConsumedDocs.length === 0) {
        let doc: ProductsConsumedDoc = {
          _id: uuidv4(),
          type: 'products-consumed',
          table: tableId,
          products: [],
        };
        this.updateProductsConsumed(doc);
        console.warn('created doc');
        console.warn(doc);
        this.prodConsumedSubject.next([doc]);
      } else {
        this.prodConsumedSubject.next(prodConsumedDocs);
      }
    });
  }

  getProductsConsumed() {
    return this.prodConsumedSubject.asObservable();
  }

  getAllProductsConsumed() {
    return this.allProdConsumedSubject.asObservable();
  }

  updateProductsConsumed(doc: ProductsConsumedDoc) {
    this.dbService.createOrUpdate(doc).catch((err: any) => {
      console.error(err);
    });
  }
}
