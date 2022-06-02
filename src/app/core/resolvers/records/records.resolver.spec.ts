import { TestBed } from '@angular/core/testing';

import { RecordsResolver } from './records.resolver';

describe('RecordsResolver', () => {
  let resolver: RecordsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RecordsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
