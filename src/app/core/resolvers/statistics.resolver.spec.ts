import { TestBed } from '@angular/core/testing';

import { StatisticsResolver } from './statistics.resolver';

describe('StatisticsResolver', () => {
  let resolver: StatisticsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StatisticsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
