import { TestBed } from '@angular/core/testing';

import { Strategy2XXXService } from './strategy-2-xxx-.service';

describe('Strategy2XXXService', () => {
  let service: Strategy2XXXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Strategy2XXXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
