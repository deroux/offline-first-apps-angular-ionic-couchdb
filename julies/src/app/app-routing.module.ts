import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./pages/tables/tables.module').then((m) => m.TablesPageModule),
  },
  {
    path: 'pay',
    loadChildren: () => import('./pages/pay/pay.module').then( m => m.PayPageModule)
  },
  {
    path: 'kitchen',
    loadChildren: () => import('./pages/kitchen/kitchen.module').then( m => m.KitchenPageModule)
  },  {
    path: 'crud-products',
    loadChildren: () => import('./pages/crud-products/crud-products.module').then( m => m.CrudProductsPageModule)
  },
  {
    path: 'crud-tables',
    loadChildren: () => import('./pages/crud-tables/crud-tables.module').then( m => m.CrudTablesPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
