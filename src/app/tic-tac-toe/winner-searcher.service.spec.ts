import { TestBed } from '@angular/core/testing';

import { WinnerSearcherService } from './winner-searcher.service';

describe('WinnerSearcherService', () => {
  let service: WinnerSearcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinnerSearcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
