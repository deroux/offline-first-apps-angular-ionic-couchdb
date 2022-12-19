import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DBRepository } from 'src/app/db/DB.repository';
import MockDBRepository from 'src/app/db/MockDB.repository';
import { CrudTablesPage } from './crud-tables.page';

describe('CrudTablesPage', () => {
  let component: CrudTablesPage;
  let fixture: ComponentFixture<CrudTablesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrudTablesPage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: DBRepository, useValue: MockDBRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(CrudTablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
