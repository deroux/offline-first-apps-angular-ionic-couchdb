import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DBRepository } from 'src/app/db/DB.repository';
import { Product, ProductsDoc } from 'src/app/model/products';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-crud-products',
  templateUrl: './crud-products.page.html',
  styleUrls: ['./crud-products.page.scss'],
})
export class CrudProductsPage implements OnInit {
  products: Array<Product> = [];
  productsDoc: ProductsDoc = new ProductsDoc();
  subscriptions: Array<Subscription> = [];

  constructor(
    private productService: ProductsService,
    private dbService: DBRepository<any>,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.initSubscriptions();
  }

  ionViewWillEnter() {}

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

        this.productsDoc = productsDoc[0];
        this.products = this.productsDoc.products;
      });
    this.subscriptions.push(p);
  }

  async onDelete(product: Product) {
    const alert = await this.alertCtrl.create({
      header: `Confirm delete of ${product.product}`,
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
            // fetch document by product here
            this.productsDoc.products = this.products.filter((p) => {
              return p.product === product.product ? false : true;
            });
            this.dbService.createOrUpdate(this.productsDoc).then(() => {
              this.products = this.productsDoc.products;
            });
          },
        },
      ],
    });
    await alert.present();
  }

  addProduct(name: any, category: any, price: any) {
    if (
      name === undefined ||
      category === undefined ||
      price === undefined ||
      name === '' ||
      category === '' ||
      price === ''
    )
      return;

    let newProduct: Product = {
      product: name,
      category: category,
      ppp: parseFloat(price),
    };

    this.productsDoc.products.push(newProduct);
    this.dbService.createOrUpdate(this.productsDoc).then(() => {
      this.popoverCtrl.dismiss();
    });
  }

  editProduct(oldName: string, newName: any, category: any, price: any) {
    if (
      newName === undefined ||
      category === undefined ||
      price === undefined ||
      newName === '' ||
      category === '' ||
      price === ''
    ) {
      return;
    }

    let idx = this.products.findIndex((p) => {
      return p.product === oldName;
    });
    console.log(idx);

    if (idx <= -1) return;

    this.products[idx].product = newName;
    this.products[idx].category = category;
    this.products[idx].ppp = price;

    this.productsDoc.products = this.products;
    this.dbService.createOrUpdate(this.productsDoc);
    this.popoverCtrl.dismiss();
  }
}
