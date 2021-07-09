import { TestBed } from '@angular/core/testing';

import { Strategy3000SomeInRowService } from './strategy-3-0-0-0-some-in-row.service';

describe('Strategy3000SomeInRowService', () => {
  let service: Strategy3000SomeInRowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Strategy3000SomeInRowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
