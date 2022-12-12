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
        .subscribe((productsConsumedArr) => {
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
}
