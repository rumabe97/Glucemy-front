import { TestBed } from '@angular/core/testing';

import { CalculatorResolver } from './calculator.resolver';

describe('CalculatorResolver', () => {
  let resolver: CalculatorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CalculatorResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
