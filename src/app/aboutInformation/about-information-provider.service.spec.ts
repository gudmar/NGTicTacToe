import { TestBed } from '@angular/core/testing';

import { AboutInformationProviderService } from './about-information-provider.service';

describe('AboutInformationProviderService', () => {
  let service: AboutInformationProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutInformationProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
