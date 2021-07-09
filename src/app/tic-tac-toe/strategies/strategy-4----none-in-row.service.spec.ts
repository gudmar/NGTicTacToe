import { TestBed } from '@angular/core/testing';

import { Strategy4NoneInRowService } from './strategy-4----none-in-row.service';

describe('Strategy4NoneInRowService', () => {
  let service: Strategy4NoneInRowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Strategy4NoneInRowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
