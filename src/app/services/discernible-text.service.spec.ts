import { TestBed } from '@angular/core/testing';

import { DiscernibleTextService } from './discernible-text.service';

describe('DiscernibleTextService', () => {
  let service: DiscernibleTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscernibleTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
