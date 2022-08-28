import { TestBed } from '@angular/core/testing';

import { WikiservicesService } from './wikiservices.service';

describe('WikiservicesService', () => {
  let service: WikiservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikiservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
