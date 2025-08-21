import { TestBed } from '@angular/core/testing';

import { RegularizationService } from './regularization.service';

describe('RegularizationService', () => {
  let service: RegularizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegularizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
