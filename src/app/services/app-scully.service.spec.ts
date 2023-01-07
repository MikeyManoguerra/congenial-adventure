import { TestBed } from '@angular/core/testing';

import { AppScullyService } from './app-scully.service';

describe('AppScullyService', () => {
  let service: AppScullyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppScullyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
