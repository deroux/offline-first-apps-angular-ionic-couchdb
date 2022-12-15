import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudTablesPageRoutingModule } from './crud-tables-routing.module';

import { CrudTablesPage } from './crud-tables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudTablesPageRoutingModule
  ],
  declarations: [CrudTablesPage]
})
export class CrudTablesPageModule {}
