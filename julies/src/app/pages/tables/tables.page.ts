import { Component, OnInit } from '@angular/core';
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
  prodConsumedDocs: Array<ProductsConsumedDoc> = [];

  constructor(
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
    let s = this.tableService.getCurrentTables().subscribe((tableDocs) => {
      this.tables = tableDocs;
    });
    this.subscriptions.push(s);

    let ps = this.prodConsumedService
      .getAllProductsConsumed()
      .subscribe((productsConsumedArr) => {
        if (
          productsConsumedArr === undefined ||
          productsConsumedArr.length <= 0
        )
          return;
        this.prodConsumedDocs = productsConsumedArr.sort(
          (a: ProductsConsumedDoc, b: ProductsConsumedDoc) => {
            return Number(a.table) - Number(b.table);
          }
        );

        this.prodConsumedDocs.forEach((doc: ProductsConsumedDoc) => {
          let preparedPending = doc.products.some((product) => {
            return product.prepared > 0;
          });
          let orderedPending = doc.products.some((product) => {
            return product.amount > product.delivered + product.prepared;
          });
          let delivered = doc.products.some((product) => {
            return product.amount === product.delivered;
          });

          if (preparedPending) {
            this.tableService.nextState(doc.table, States.prepared);
          } else if (orderedPending) {
            this.tableService.nextState(doc.table, States.ordered);
          } else if (delivered) {
            this.tableService.nextState(doc.table, States.delivered);
          }
        });
      });
    this.subscriptions.push(ps);
  }

  unsubscribe() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  transition() {
    this.tableService.nextState('3', 'free');
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
