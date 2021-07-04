import { TestBed } from '@angular/core/testing';

import { ArrayToBoardTranslatorService } from './array-to-board-translator.service';

describe('ArrayToBoardTranslatorService', () => {
  let service: ArrayToBoardTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayToBoardTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
