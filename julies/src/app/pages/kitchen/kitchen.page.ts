import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsConsumedService } from 'src/app/services/products-consumed/products-consumed.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.page.html',
  styleUrls: ['./kitchen.page.scss'],
})
export class KitchenPage implements OnInit {
  prodConsumedDocs: Array<any> = [];
  subscriptions: Array<Subscription> = [];

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
}
