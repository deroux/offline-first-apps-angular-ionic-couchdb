import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Tables', url: '/tabs/tables', icon: 'apps' },
    { title: 'Kitchen', url: '/tabs/kitchen', icon: 'fast-food' },
    {
      title: 'Manage Products',
      url: '/tabs/crud-products',
      icon: 'document-text',
    },
    { title: 'Manage Tables', url: '/tabs/crud-tables', icon: 'storefront' },
  ];
  constructor() {}
}
