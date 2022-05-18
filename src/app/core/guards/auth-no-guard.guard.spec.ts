import { TestBed } from '@angular/core/testing';

import { AuthNoGuardGuard } from './auth-no-guard.guard';

describe('AuthNoGuardGuard', () => {
  let guard: AuthNoGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthNoGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
