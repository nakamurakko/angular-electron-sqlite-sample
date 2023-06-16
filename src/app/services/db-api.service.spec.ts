import { TestBed } from '@angular/core/testing';

import { DbApiService } from './db-api.service';

describe('DbApiService', () => {
  let service: DbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
