import { TestBed } from '@angular/core/testing';

import { CrossCircleInserterService } from './cross-circle-inserter.service';

describe('CrossCircleInserterService', () => {
  let service: CrossCircleInserterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossCircleInserterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
