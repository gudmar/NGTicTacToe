import { TestBed } from '@angular/core/testing';

import { GetDataFromInintialStateService } from './get-data-from-inintial-state.service';

describe('GetDataFromInintialStateService', () => {
  let service: GetDataFromInintialStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataFromInintialStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
