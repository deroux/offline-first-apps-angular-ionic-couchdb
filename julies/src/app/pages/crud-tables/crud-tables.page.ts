import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DBRepository } from 'src/app/db/DB.repository';
import { Table, TableDoc } from 'src/app/model/table';
import { TableService } from 'src/app/services/table/table.service';

@Component({
  selector: 'app-crud-tables',
  templateUrl: './crud-tables.page.html',
  styleUrls: ['./crud-tables.page.scss'],
})
export class CrudTablesPage implements OnInit {
  tablesDocs: Array<TableDoc> = [];
  subscriptions: Array<Subscription> = [];

  constructor(
    private tableService: TableService,
    private dbService: DBRepository<any>,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController
  ) {}
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
    let p = this.tableService
      .getCurrentTables()
      .subscribe((docs: Array<TableDoc>) => {
        if (docs === undefined || docs.length <= 0) return;
        this.tablesDocs = docs;
      });
    this.subscriptions.push(p);
  }

  addTable(id: any, guests: any) {
    if (id === undefined || guests === undefined || id === '' || guests === '')
      return;

    let tableDoc = new TableDoc();
    let table: Table = {
      id: id.toString(),
      guests: Number(guests),
      state: 'free',
    };
    tableDoc.table = table;

    this.tablesDocs.push(tableDoc);
    this.dbService.createOrUpdate(tableDoc).then(() => {
      this.popoverCtrl.dismiss();
    });
  }

  editTable(t: TableDoc, id: any, guests: any) {
    if (id === undefined || guests === undefined || id === '' || guests === '')
      return;

    t.table.id = id.toString();
    t.table.guests = Number(guests);

    this.dbService.createOrUpdate(t).then(() => {
      this.popoverCtrl.dismiss();
    });
  }

  async onDelete(t: TableDoc) {
    const alert = await this.alertCtrl.create({
      header: `Confirm delete of ${t.table.id}`,
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
            this.dbService.delete(t).finally(() => {
              this.tableService.fetchTables();
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
