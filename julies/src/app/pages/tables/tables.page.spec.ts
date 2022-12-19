import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DBRepository } from 'src/app/db/DB.repository';
import MockDBRepository from 'src/app/db/MockDB.repository';
import { OrderbyPipe } from 'src/app/pipes/orderby.pipe';
import { TablesPage } from './tables.page';

describe('TablesPage', () => {
  let component: TablesPage;
  let fixture: ComponentFixture<TablesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TablesPage, OrderbyPipe],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: DBRepository, useClass: MockDBRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
