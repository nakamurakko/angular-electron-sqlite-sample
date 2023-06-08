import { TestBed } from '@angular/core/testing';

import { GreetingApiService } from './greeting-api.service';

describe('GreetingApiService', () => {
  let service: GreetingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreetingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
