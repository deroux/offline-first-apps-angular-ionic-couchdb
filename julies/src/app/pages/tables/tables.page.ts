import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
})
export class TablesPage implements OnInit {
  tables = [
    {
      type: 'table',
      table: {
        id: '1',
        guests: 6,
        state: 'free',
      },
    },
    {
      type: 'table',
      table: {
        id: '2',
        guests: 4,
        state: 'dirty',
      },
    },
  ];
  constructor() {}

  ngOnInit() {}
}
