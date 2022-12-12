import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ConsumedProduct,
  ProductsConsumedDoc,
} from 'src/app/model/productsConsumed';
import { ProductsConsumedService } from 'src/app/services/products-consumed/products-consumed.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.page.html',
  styleUrls: ['./kitchen.page.scss'],
})
export class KitchenPage implements OnInit {
  prodConsumedDocs: Array<ProductsConsumedDoc> = [];
  changedDocs: Array<ProductsConsumedDoc> = [];
  subscriptions: Array<Subscription> = [];
  edit: Boolean = false;

  constructor(private prodConsumedService: ProductsConsumedService) {}

  ionViewWillEnter() {
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.subscriptions.push(
      this.prodConsumedService
        .getAllProductsConsumed()
        .subscribe((productsConsumedArr: any) => {
          console.log(productsConsumedArr);
          this.prodConsumedDocs = productsConsumedArr;
        })
    );
  }

  ngOnInit() {}

  orderedToPrepared(doc: ProductsConsumedDoc, product: ConsumedProduct) {
    if (
      product.prepared >= product.amount - product.delivered ||
      product.amount == 0
    )
      return;
    product.prepared += 1;
    this.changed(doc);
  }

  preparedToOrdered(doc: ProductsConsumedDoc, product: ConsumedProduct) {
    if (product.prepared <= 0) return;
    product.prepared -= 1;
    this.changed(doc);
  }

  deliveredToPrepared(doc: ProductsConsumedDoc, product: ConsumedProduct) {
    if (product.prepared >= product.amount || product.delivered <= 0) return;
    product.prepared += 1;
    product.delivered -= 1;
    this.changed(doc);
  }

  preparedToDelivered(doc: ProductsConsumedDoc, product: ConsumedProduct) {
    if (product.delivered >= product.amount || product.prepared <= 0) return;
    product.prepared -= 1;
    product.delivered += 1;
    this.changed(doc);
  }

  changed(doc: ProductsConsumedDoc) {
    if (this.changedDocs.filter((o) => o.table === doc.table).length > 0)
      return;
    this.changedDocs.push(doc);
    console.log(this.changedDocs);
  }

  saveEdit() {
    this.toggleEdit();
    if (this.changedDocs === undefined || this.changedDocs.length === 0) return;
    // write edit to pouchdb
    let allSuccessful = true;
    this.changedDocs.forEach((doc) => {
      console.log('Updating document....');
      console.log(doc);
      this.prodConsumedService
        .updateProductsConsumed(doc)
        .then(() => {
          // works
        })
        .catch((err) => {
          console.error(err);
          allSuccessful = false;
        });
    });
    if (allSuccessful) {
      this.changedDocs = [];
    } else {
      console.warn('Not all changed documents updated successfully');
    }
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  sortByDelivered(products: Array<ConsumedProduct>) {
    if (products === undefined) return [];
    return products.sort((a: ConsumedProduct, b: ConsumedProduct) => {
      if (a.amount - a.delivered === 0) {
        return 1;
      } else if (b.amount - b.delivered === 0) {
        return -1;
      }
      return 0;
    });
  }
}
