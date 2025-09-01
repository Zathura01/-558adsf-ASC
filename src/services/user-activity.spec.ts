import { TestBed } from '@angular/core/testing';

import { UserActivity } from './user-activity';

describe('UserActivity', () => {
  let service: UserActivity;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserActivity);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
