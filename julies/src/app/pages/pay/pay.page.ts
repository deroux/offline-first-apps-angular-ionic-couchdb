import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BillDoc } from 'src/app/model/bill';
import {
  ConsumedProduct,
  ProductsConsumedDoc,
} from 'src/app/model/productsConsumed';
import { BillService } from 'src/app/services/bill/bill.service';
import { ProductsConsumedService } from 'src/app/services/products-consumed/products-consumed.service';
import { TableService } from 'src/app/services/table/table.service';
import { States } from 'src/app/shared/tablestate-machine';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  tableId = '';
  prodConsumed: ProductsConsumedDoc = new ProductsConsumedDoc();
  selected: any = [];
  splitPersons = 0;
  billDoc: BillDoc = new BillDoc();
  paid: Array<ConsumedProduct> = [];

  subscriptions: Array<Subscription> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private prodConsumedService: ProductsConsumedService,
    private alertCtrl: AlertController,
    private billService: BillService,
    private tableService: TableService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.tableId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.prodConsumedService.setTableId(this.tableId);
    this.billService.setTableId(this.tableId);
    this.initSubscriptions();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  unsubscribe() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  initSubscriptions() {
    let p = this.prodConsumedService
      .getProductsConsumed()
      .subscribe((prodConsumed: Array<ProductsConsumedDoc>) => {
        this.prodConsumed = prodConsumed[0];
      });
    this.subscriptions.push(p);
  }

  consumedToSelected(product: any) {
    this.prodConsumed.products = this.reduceAmount(
      product,
      1,
      this.prodConsumed.products
    );
    this.selected = this.increaseAmount({ ...product }, 1, this.selected);
  }

  selectedToConsumed(product: any) {
    this.selected = this.reduceAmount(product, 1, this.selected);
    this.prodConsumed.products = this.increaseAmount(
      { ...product },
      1,
      this.prodConsumed.products
    );
  }

  increaseAmount(product: any, amount = 1, arr: Array<any>) {
    let found = arr.some((p: any) => p.product === product.product);
    if (found) {
      arr.forEach((p: any) => {
        if (p.product === product.product) {
          p.amount += amount;
        }
      });
    } else {
      product.amount = amount;
      arr.push(product);
    }
    return arr;
  }

  reduceAmount(product: any, amount = 1, arr: Array<any>) {
    if (product.amount > amount) {
      product.amount = product.amount - amount;
    } else if (product.amount == amount) {
      arr = arr.filter((p: any) => {
        return p.product === product.product ? false : true;
      });
    }
    return arr;
  }

  getTotalSelected() {
    return this.getTotal(this.selected);
  }

  getTotal(arr: any[]) {
    let sum = 0.0;
    arr.forEach((p: any) => {
      return (sum += p.amount * p.ppp);
    });
    return sum;
  }

  getTotalOutstanding() {
    if (
      this.prodConsumed?.products === undefined ||
      this.prodConsumed?.products.length === 0
    )
      return 0;
    return this.getTotal(this.prodConsumed.products);
  }

  async checkPaidSelected(total: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm payment received',
      subHeader: `${parseFloat(total).toFixed(2)}.-`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.checkStatePaid();
            this.paidSelected();
          },
        },
      ],
    });
    await alert.present();
  }

  checkStatePaid() {
    if (this.getTotalOutstanding() === 0) {
      this.tableService.nextState(this.tableId, States.dirty);
    }
  }

  paidSelected() {
    if (
      this.selected === undefined ||
      this.selected === null ||
      this.selected.length === 0
    ) {
      console.warn('No selected products, returning from payment');
      return;
    }

    // update bill document
    this.billService
      .createBill(this.selected)
      .then(() => {
        this.prodConsumedService.updateProductsConsumed(this.prodConsumed);
        // cleanup
        this.selected = [];
        this.splitPersons = 0;
      })
      .catch((err) => console.error(err));
  }

  getSplitAmount() {
    if (this.splitPersons > 0) {
      return this.getTotalSelected() / this.splitPersons;
    }
    return 0;
  }

  async selectNumberOfPersons() {
    const alert = await this.alertCtrl.create({
      header: 'Select number of persons',
      cssClass: 'ion-text-center',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (value) => {
            if (typeof value != null) {
              this.splitPersons = value;
            }
          },
        },
      ],
      inputs: [
        {
          label: '2',
          type: 'radio',
          cssClass: 'ion-text-center',
          value: 2,
        },
        {
          label: '3',
          type: 'radio',
          cssClass: 'ion-text-center',
          value: 3,
        },
        {
          label: '4',
          type: 'radio',
          cssClass: 'ion-text-center',
          value: 4,
        },
      ],
    });
    await alert.present();
  }

  unselectAll() {
    if (this.prodConsumed.products.length === 0) {
      this.prodConsumed.products = this.selected;
    } else {
      this.prodConsumed.products = this.mergeArrayAmounts(
        this.selected,
        this.prodConsumed.products
      );
    }
    this.selected = [];
  }

  selectAll() {
    if (this.selected.length === 0) {
      this.selected = this.prodConsumed.products;
    } else {
      this.selected = this.mergeArrayAmounts(
        this.prodConsumed.products,
        this.selected
      );
    }
    this.prodConsumed.products = [];
  }

  mergeArrayAmounts(from: Array<any>, to: Array<any>): Array<any> {
    // workflow for elements contained in to array
    to.map((product) => {
      let found = from.some((p) => p.product === product.product);
      if (found) {
        let index = from.findIndex((p) => p.product === product.product);
        if (index > -1) {
          product.amount += from[index].amount;
          // remove element
          from.splice(index, 1);
        }
      }
    });
    to = [...to, ...from];
    return to;
  }
}
