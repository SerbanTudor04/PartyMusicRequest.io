import { TestBed } from '@angular/core/testing';

import { FireFunctionsService } from './fire-functions.service';

describe('FireFunctionsService', () => {
  let service: FireFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
