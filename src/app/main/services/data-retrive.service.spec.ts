import { TestBed } from '@angular/core/testing';

import { DataRetriveService } from './data-retrive.service';

describe('DataRetriveService', () => {
  let service: DataRetriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRetriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
