import { TestBed } from '@angular/core/testing';

import { TestCaseValidatorService } from './test-case-validator.service';

describe('TestCaseValidatorService', () => {
  let service: TestCaseValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestCaseValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
