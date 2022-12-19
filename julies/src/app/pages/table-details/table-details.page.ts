import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Product, ProductsDoc } from 'src/app/model/products';
import {
  ConsumedProduct,
  ProductsConsumedDoc,
} from 'src/app/model/productsConsumed';
import { ProductsConsumedService } from 'src/app/services/products-consumed/products-consumed.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { TableService } from 'src/app/services/table/table.service';
import { States } from 'src/app/shared/tablestate-machine';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.page.html',
  styleUrls: ['./table-details.page.scss'],
})
export class TableDetailsPage implements OnInit {
  tableId: string = '';
  prodConsumed: ProductsConsumedDoc = new ProductsConsumedDoc();
  visibleProducts: Array<Product> = [];
  products: Array<Product> = [];

  pendingChanges: Array<ConsumedProduct> = [];

  subscriptions: Array<Subscription> = [];
  productCategories: Array<String> = [];

  tableState: string = States.free;

  editted: boolean = false;

  constructor(
    private prodConsumedService: ProductsConsumedService,
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private tableService: TableService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  ionViewWillEnter() {
    this.tableId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.prodConsumedService.setTableId(this.tableId);

    // this.productService.fetchProducts();
    // this.prodConsumedService.fetchProductsConsumed(this.tableId);

    this.initSubscriptions();
  }

  initSubscriptions() {
    let p = this.prodConsumedService
      .getProductsConsumed()
      .subscribe((prodConsumed: Array<ProductsConsumedDoc>) => {
        this.prodConsumed = prodConsumed[0];
      });
    this.subscriptions.push(p);

    let p2 = this.productService
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
        this.visibleProducts = products.products;

        this.productCategories = [
          'All',
          ...new Set(this.products.map((o) => o.category)),
        ] as String[];
      });

    let p3 = this.tableService.tablesSubject.subscribe((tables) => {
      let idx = tables.findIndex((p) => {
        return p.table.id.toString() === this.tableId.toString();
      });
      if (idx > -1) {
        let tableDoc = tables[idx];
        this.tableState = tableDoc.table.state;
      }
    });
    this.subscriptions.push(p, p2);
  }

  filterVisibleProducts(category: String) {
    console.warn(`Category: ${category}`);
    console.warn(this.visibleProducts);
    console.warn(this.products);
    this.visibleProducts = this.products;
    this.visibleProducts = this.visibleProducts.filter((p) => {
      return category === 'All' ? true : p.category === category;
    });
  }

  addProductToConsumed(product: Product) {
    this.editted = true;
    // TODO: check stock > 0 and disable product button
    delete product['stock'];
    this.changed(product, 'add');

    let found = this.prodConsumed.products.some((p) => {
      return p.product === product.product;
    });
    console.warn(found);
    if (found) {
      // increase by 1
      this.prodConsumed.products.forEach((p) => {
        if (product.product === p.product) {
          p.amount += 1;
        }
      });
    } else {
      // add new product to products consumed
      let consumedProduct = new ConsumedProduct();
      consumedProduct.product = product.product;
      consumedProduct.category = product.category;
      consumedProduct.ppp = product.ppp;
      consumedProduct.amount = 1;
      this.prodConsumed.products.push(consumedProduct);
    }
  }

  wasProductChanged(productName: string) {
    return this.pendingChanges.some((p) => p.product === productName);
  }

  getChangedAmount(productName: string) {
    const length = this.pendingChanges.length;
    console.log(this.pendingChanges);
    for (var i = 0; i < length; i++) {
      if (this.pendingChanges[i].product === productName) {
        return this.pendingChanges[i].amount > 0
          ? '+' + this.pendingChanges[i].amount
          : this.pendingChanges[i].amount;
      }
    }
    return 0;
  }

  changed(prod: Product, type: string) {
    let product: ConsumedProduct = new ConsumedProduct();
    product.product = prod.product;
    product.category = prod.category;

    let found = this.pendingChanges.some((p) => p.product === product.product);
    if (found) {
      this.pendingChanges.forEach((p) => {
        if (p.product === product.product) {
          if (type === 'remove') p.amount -= 1;
          else if (type === 'add') p.amount += 1;

          if (p.amount === 0) {
            this.pendingChanges = this.pendingChanges.filter((p) => {
              return p.product === product.product ? false : true;
            });
          }
          console.log(this.pendingChanges);
        }
      });
    } else {
      product.amount = 0;
      if (type === 'remove') product.amount -= 1;
      else if (type === 'add') product.amount += 1;
      this.pendingChanges.push(product);
    }
  }

  preparedToDelivered(doc: ProductsConsumedDoc, product: ConsumedProduct) {
    if (
      !this.editted ||
      product.delivered >= product.amount ||
      product.prepared <= 0
    )
      return;
    product.prepared -= 1;
    product.delivered += 1;
  }

  toggleEdit() {
    this.editted = !this.editted;
  }

  saveEdit() {
    if (this.prodConsumed === undefined) return;
    // update in pouchdb
    this.prodConsumedService
      .updateProductsConsumed(this.prodConsumed)
      .then(() => {
        this.editted = false;
        this.pendingChanges = [];
      })
      .catch((err) => console.error(err));
  }

  onDecreaseAmount(product: ConsumedProduct) {
    this.prodConsumed = this.remove(product, this.prodConsumed);
  }

  onIncreaseAmount(product: ConsumedProduct) {
    this.prodConsumed = this.add(product, this.prodConsumed);
  }

  add(product: ConsumedProduct, consumedArray: ProductsConsumedDoc) {
    this.changed(product, 'add');
    // check if product is in array
    let found = consumedArray.products.some(
      (p: any) => p.product === product.product
    );

    if (found) {
      // iterate through array and increase amount for one product
      consumedArray.products.forEach((p) => {
        if (p.product === product.product) {
          p.amount += 1;
        }
      });
    } else {
      // add the product to the array
      product.amount = 1;
      consumedArray.products.push(product);
    }
    return consumedArray;
  }

  remove(product: ConsumedProduct, consumedArray: ProductsConsumedDoc) {
    this.changed(product, 'remove');
    if (product.amount > 1) {
      product.amount -= 1;
    } else if (product.amount == 1) {
      consumedArray.products = consumedArray.products.filter((p) => {
        return p.product === product.product ? false : true;
      });
    }
    return consumedArray;
  }

  tableCleaned() {
    this.tableService.nextState(this.tableId, States.free);
    this.navCtrl.navigateBack('/tabs/tables');
  }
}
