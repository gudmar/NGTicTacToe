import { TestBed } from '@angular/core/testing';

import { BoardHandlerServiceService } from './board-handler-service.service';

describe('BoardHandlerServiceService', () => {
  let service: BoardHandlerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardHandlerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
