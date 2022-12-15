import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product, ProductsDoc } from 'src/app/model/products';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-crud-products',
  templateUrl: './crud-products.page.html',
  styleUrls: ['./crud-products.page.scss'],
})
export class CrudProductsPage implements OnInit {
  products: Array<Product> = [];
  subscriptions: Array<Subscription> = [];

  constructor(private productService: ProductsService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.initSubscriptions();
  }

  ionViewWillLeave() {
    this.unsubscribe();
  }

  unsubscribe() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  initSubscriptions() {
    let p = this.productService
      .getAllProducts()
      .subscribe((productsDoc: Array<ProductsDoc>) => {
        if (
          productsDoc === undefined ||
          productsDoc.length <= 0 ||
          productsDoc[0]?.products == undefined
        )
          return;
        let products = productsDoc[0];
        this.products = products?.products;
      });
    this.subscriptions.push(p);
  }

  onSelect(product: Product) {}

  onDelete(product: Product) {}
}
