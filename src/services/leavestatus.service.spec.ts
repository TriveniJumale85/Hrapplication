import { TestBed } from '@angular/core/testing';

import { LeavestatusService } from './leavestatus.service';

describe('LeavestatusService', () => {
  let service: LeavestatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeavestatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
