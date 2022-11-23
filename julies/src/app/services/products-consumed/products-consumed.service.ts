import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  from,
  map,
  Observable,
  of,
  Subscription,
  take,
} from 'rxjs';
import { ProductsConsumedDoc } from 'src/app/model/productsConsumed';
import { DbService } from '../db/db.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsConsumedService {
  prodConsumedSubject: BehaviorSubject<Array<ProductsConsumedDoc>> =
    new BehaviorSubject(new Array<ProductsConsumedDoc>());
  subscriptions: Array<Subscription> = [];

  constructor(private dbService: DbService) {
    this.fetchProductsConsumed();
    this.initChangeHandler();
  }

  initChangeHandler() {
    let sub: Subscription = this.dbService
      .getCurrentConsumedProductChanges()
      .subscribe((changeDoc: ProductsConsumedDoc) => {
        if (changeDoc) {
          console.warn('handleChange called');
          this.dbService.handleChange(
            this.prodConsumedSubject,
            changeDoc,
            () => {
              this.fetchProductsConsumed();
            }
          );
        }
      });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  fetchProductsConsumed() {
    console.error('fetchProductsConsumed called');
    let query = {
      selector: {
        type: 'products-consumed',
      },
      fields: ['_id', '_rev', 'table', 'type', 'products'],
      execution_stats: true,
      limit: 1,
    };
    let q: Observable<any> = from(this.dbService.db.find(query)).pipe(
      map((obj: any) => obj['docs'])
    );
    q.pipe(
      take(1),
      catchError((_) => of([]))
    ).subscribe((tableDocs) => {
      this.prodConsumedSubject.next(tableDocs);
    });
  }

  getProductsConsumed() {
    return this.prodConsumedSubject.asObservable();
  }
}