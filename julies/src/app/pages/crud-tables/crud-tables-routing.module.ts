import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudTablesPage } from './crud-tables.page';

const routes: Routes = [
  {
    path: '',
    component: CrudTablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudTablesPageRoutingModule {}
