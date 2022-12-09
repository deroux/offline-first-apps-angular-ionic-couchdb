import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablesPageRoutingModule } from './tables-routing.module';

import { ApplicationpipesModule } from 'src/app/modules/applicationpipes/applicationpipes.module';
import { TableDetailsPageModule } from '../table-details/table-details.module';
import { TablesPage } from './tables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablesPageRoutingModule,
    TableDetailsPageModule,
    ApplicationpipesModule,
  ],
  declarations: [TablesPage],
})
export class TablesPageModule {}
