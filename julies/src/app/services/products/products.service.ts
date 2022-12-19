import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, Subscription, take } from 'rxjs';
import { DBRepository } from 'src/app/db/DB.repository';
import { ProductsDoc } from 'src/app/model/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  prodSubject: BehaviorSubject<Array<ProductsDoc>> = new BehaviorSubject(
    new Array<ProductsDoc>()
  );
  subscriptions: Array<Subscription> = [];

  constructor(private dbService: DBRepository<any>) {}

  ngOnInit() {
    this.fetchProducts();
    this.initChangeHandler();
  }

  initChangeHandler() {
    let sub: Subscription = this.dbService
      .getDocumentChanges$()
      .subscribe((doc: any) => {
        if (doc.type !== 'products') return;
        if (doc) {
          console.warn('handleChange called');
          this.dbService.handleDocumentChange(this.prodSubject, doc, () => {
            this.fetchProducts();
          });
        }
      });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  fetchProducts() {
    console.error('fetchProducts called');
    let q = this.dbService.fetchByType('products', [
      '_id',
      '_rev',
      'type',
      'products',
    ]);
    q.pipe(
      take(1),
      catchError((_) => of([]))
    ).subscribe((productsDoc) => {
      this.prodSubject.next(productsDoc);
    });
  }

  getAllProducts() {
    return this.prodSubject.asObservable();
  }
}
