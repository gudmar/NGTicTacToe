import { TestBed } from '@angular/core/testing';

import { WindowSizeEvaluatorService } from './window-size-evaluator.service';

describe('WindowSizeEvaluatorService', () => {
  let service: WindowSizeEvaluatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowSizeEvaluatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
