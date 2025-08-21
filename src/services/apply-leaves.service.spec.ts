import { TestBed } from '@angular/core/testing';

import { ApplyLeavesService } from './apply-leaves.service';

describe('ApplyLeavesService', () => {
  let service: ApplyLeavesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyLeavesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
