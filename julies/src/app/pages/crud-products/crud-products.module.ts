import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudProductsPageRoutingModule } from './crud-products-routing.module';

import { CrudProductsPage } from './crud-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudProductsPageRoutingModule
  ],
  declarations: [CrudProductsPage]
})
export class CrudProductsPageModule {}
