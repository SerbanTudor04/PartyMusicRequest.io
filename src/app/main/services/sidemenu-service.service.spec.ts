import { TestBed } from '@angular/core/testing';

import { SidemenuService } from './sidemenu-service.service';

describe('SidemenuServiceService', () => {
  let service: SidemenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidemenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
