import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayPage } from '../pay/pay.page';

import { TableDetailsPage } from './table-details.page';

const routes: Routes = [
  {
    path: '',
    component: TableDetailsPage,
  },
  {
    path: 'pay',
    component: PayPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableDetailsPageRoutingModule {}
