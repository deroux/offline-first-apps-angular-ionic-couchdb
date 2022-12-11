import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ProductsConsumedDoc } from 'src/app/model/productsConsumed';
import { TableDoc } from 'src/app/model/table';
import { ProductsConsumedService } from 'src/app/services/products-consumed/products-consumed.service';
import { TableService } from 'src/app/services/table/table.service';
import { States } from 'src/app/shared/tablestate-machine';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
})
export class TablesPage implements OnInit {
  tables: Array<TableDoc> = new Array<TableDoc>();
  subscriptions: Array<Subscription> = [];
  prodConsumedDocs = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private tableService: TableService,
    private prodConsumedService: ProductsConsumedService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.initSubscriptions();
  }

  ionViewDidLeave() {
    this.unsubscribe();
  }

  initSubscriptions() {
    this.subscriptions.push(
      this.tableService.getCurrentTables().subscribe((tableDocs) => {
        this.tables = tableDocs;
      })
    );

    this.subscriptions.push(
      this.prodConsumedService
        .getAllProductsConsumed()
        .subscribe((prodConsumedArr: any) => {
          if (prodConsumedArr == undefined || prodConsumedArr.length <= 0)
            return;
          this.prodConsumedDocs = prodConsumedArr.sort(
            (a: ProductsConsumedDoc, b: ProductsConsumedDoc) =>
              Number(a.table) - Number(b.table)
          ); // b - a for reverse sort

          console.log(this.prodConsumedDocs);
          this.prodConsumedDocs.forEach((doc: ProductsConsumedDoc) => {
            // check if products ready for delivery
            let preparedPending = doc.products.some((product) => {
              return product.prepared > 0 == true;
            });
            let orderedPending = doc.products.some((product) => {
              return product.amount > product.delivered + product.prepared;
            });
            let delivered = doc.products.some((product) => {
              return product.amount == product.delivered;
            });

            console.log(`Table: ${doc.table}`);
            console.log(`Prepared: ${preparedPending}`);
            console.log(`Ordered: ${orderedPending}`);
            console.log(`Delivered: ${delivered}`);

            if (preparedPending) {
              this.tableService.nextState(doc.table, States.prepared);
            } else if (orderedPending) {
              this.tableService.nextState(doc.table, States.ordered);
            } else if (delivered) {
              this.tableService.nextState(doc.table, States.delivered);
            }
          });
        })
    );
  }

  unsubscribe() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  stateTrans() {
    this.tableService.nextState('3', 'paid');
  }

  getIcon(state: string) {
    // check if all items delivered or foot is pending
    if (state === States.free) return '';
    if (state === States.ordered) return 'receipt';
    if (state === States.prepared) return 'fast-food';
    if (state === States.delivered) return 'footsteps';
    if (state === States.paid) return 'wallet-sharp';
    if (state === States.dirty) return 'walk-sharp';
    return '';
  }

  getColor(state: string) {
    if (state === States.free) return '';
    if (state === States.ordered) return 'medium';
    if (state === States.prepared) return 'warning';
    if (state === States.delivered) return 'success';
    if (state === States.paid) return 'tertiary';
    if (state === States.dirty) return 'dark';
    return '';
  }
}
