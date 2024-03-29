import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tables',
        loadChildren: () =>
          import('../pages/tables/tables.module').then(
            (m) => m.TablesPageModule
          ),
      },
      {
        path: 'kitchen',
        loadChildren: () =>
          import('../pages/kitchen/kitchen.module').then(
            (m) => m.KitchenPageModule
          ),
      },
      {
        path: 'crud-products',
        loadChildren: () =>
          import('../pages/crud-products/crud-products.module').then(
            (m) => m.CrudProductsPageModule
          ),
      },
      {
        path: 'crud-tables',
        loadChildren: () =>
          import('../pages/crud-tables/crud-tables.module').then(
            (m) => m.CrudTablesPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tables',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tables',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
