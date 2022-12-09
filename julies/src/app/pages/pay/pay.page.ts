import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  tableId = '';
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.tableId = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
