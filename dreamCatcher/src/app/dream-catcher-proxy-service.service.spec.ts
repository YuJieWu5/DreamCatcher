import { TestBed } from '@angular/core/testing';

import { DreamCatcherProxyServiceService } from './dream-catcher-proxy-service.service';

describe('DreamCatcherProxyServiceService', () => {
  let service: DreamCatcherProxyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DreamCatcherProxyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
