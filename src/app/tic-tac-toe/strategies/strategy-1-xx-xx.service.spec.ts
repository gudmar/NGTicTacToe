import { TestBed } from '@angular/core/testing';

import { Strategy1XXXXService } from './strategy-1-xx-xx.service';

describe('Strategy1XXXXService', () => {
  let service: Strategy1XXXXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Strategy1XXXXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
