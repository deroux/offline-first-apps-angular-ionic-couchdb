import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudProductsPage } from './crud-products.page';

const routes: Routes = [
  {
    path: '',
    component: CrudProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudProductsPageRoutingModule {}
