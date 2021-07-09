import { TestBed } from '@angular/core/testing';

import { PatternSearcherService } from './pattern-searcher.service';

describe('PatternSearcherService', () => {
  let service: PatternSearcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatternSearcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
