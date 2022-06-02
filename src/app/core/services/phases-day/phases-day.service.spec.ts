import { TestBed } from '@angular/core/testing';

import { PhasesDayService } from './phases-day.service';

describe('PhasesDayService', () => {
  let service: PhasesDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhasesDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
