import { TestBed } from '@angular/core/testing';

import { DBRepository } from 'src/app/db/DB.repository';
import MockDBRepository from 'src/app/db/MockDB.repository';
import { TableService } from './table.service';

describe('TableService', () => {
  let service: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DBRepository, useClass: MockDBRepository }],
    });
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
