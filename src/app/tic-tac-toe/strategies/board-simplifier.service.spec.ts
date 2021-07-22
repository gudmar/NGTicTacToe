import { TestBed } from '@angular/core/testing';

import { BoardSimplifierService } from './board-simplifier.service';

describe('BoardSimplifierService', () => {
  let service: BoardSimplifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardSimplifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
