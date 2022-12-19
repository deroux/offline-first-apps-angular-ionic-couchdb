import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { DBRepository } from 'src/app/db/DB.repository';
import MockDBRepository from 'src/app/db/MockDB.repository';
import { PayPage } from './pay.page';

describe('PayPage', () => {
  let component: PayPage;
  let fixture: ComponentFixture<PayPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PayPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [{ provide: DBRepository, useClass: MockDBRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(PayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
