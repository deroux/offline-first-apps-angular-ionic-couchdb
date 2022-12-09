import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ApplicationpipesModule } from 'src/app/modules/applicationpipes/applicationpipes.module';

import { TableDetailsPageRoutingModule } from './table-details-routing.module';

import { TableDetailsPage } from './table-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TableDetailsPageRoutingModule,
    ApplicationpipesModule,
  ],
  declarations: [TableDetailsPage],
})
export class TableDetailsPageModule {}
