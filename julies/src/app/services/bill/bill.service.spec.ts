import { TestBed } from '@angular/core/testing';

import { DBRepository } from 'src/app/db/DB.repository';
import MockDBRepository from 'src/app/db/MockDB.repository';
import { BillService } from './bill.service';

describe('BillService', () => {
  let service: BillService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DBRepository, useValue: MockDBRepository }],
    });
    service = TestBed.inject(BillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
