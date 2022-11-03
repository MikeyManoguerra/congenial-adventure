import { TestBed } from '@angular/core/testing';

import { FocusHoverService } from './focus-hover.service';

describe('FocusHoverService', () => {
  let service: FocusHoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FocusHoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
