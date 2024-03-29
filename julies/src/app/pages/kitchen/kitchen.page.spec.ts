import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DBRepository } from 'src/app/db/DB.repository';
import MockDBRepository from 'src/app/db/MockDB.repository';
import { KitchenPage } from './kitchen.page';

describe('KitchenPage', () => {
  let component: KitchenPage;
  let fixture: ComponentFixture<KitchenPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [KitchenPage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: DBRepository, useClass: MockDBRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(KitchenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
