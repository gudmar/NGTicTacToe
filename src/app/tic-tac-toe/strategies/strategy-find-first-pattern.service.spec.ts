import { TestBed } from '@angular/core/testing';

import { StrategyFindFirstPatternService } from './strategy-find-first-pattern.service';

describe('StrategyFindFirstPatternService', () => {
  let service: StrategyFindFirstPatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrategyFindFirstPatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
