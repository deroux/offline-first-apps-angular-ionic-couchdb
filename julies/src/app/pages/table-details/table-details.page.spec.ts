import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouterTestingModule } from '@angular/router/testing';
import { DBRepository } from 'src/app/db/DB.repository';
import MockDBRepository from 'src/app/db/MockDB.repository';
import { OrderbyPipe } from 'src/app/pipes/orderby.pipe';
import { TableDetailsPage } from './table-details.page';

describe('TableDetailsPage', () => {
  let component: TableDetailsPage;
  let fixture: ComponentFixture<TableDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TableDetailsPage, OrderbyPipe],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [{ provide: DBRepository, useClass: MockDBRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(TableDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
