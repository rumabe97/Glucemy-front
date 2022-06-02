import { TestBed } from '@angular/core/testing';

import { RecordByIdResolver } from './record-by-id.resolver';

describe('RecordByIdResolver', () => {
  let resolver: RecordByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RecordByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
