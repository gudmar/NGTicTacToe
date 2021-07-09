import { TestBed } from '@angular/core/testing';

import { Strategy40AtLeastOneService } from './strategy-4-0-at-least-one.service';

describe('Strategy40AtLeastOneService', () => {
  let service: Strategy40AtLeastOneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Strategy40AtLeastOneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
