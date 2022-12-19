import { TestBed } from '@angular/core/testing';

import { DBRepository } from 'src/app/db/DB.repository';
import MockDBRepository from 'src/app/db/MockDB.repository';
import { ProductsConsumedService } from './products-consumed.service';

describe('ProductsConsumedService', () => {
  let service: ProductsConsumedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DBRepository, useClass: MockDBRepository }],
    });
    service = TestBed.inject(ProductsConsumedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
