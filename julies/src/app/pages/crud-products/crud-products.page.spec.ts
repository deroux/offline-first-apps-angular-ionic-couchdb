import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DBRepository } from 'src/app/db/DB.repository';
import MockDBRepository from 'src/app/db/MockDB.repository';
import { CrudProductsPage } from './crud-products.page';

describe('CrudProductsPage', () => {
  let component: CrudProductsPage;
  let fixture: ComponentFixture<CrudProductsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrudProductsPage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: DBRepository, useClass: MockDBRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(CrudProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
