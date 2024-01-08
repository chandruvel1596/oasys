import { TestBed } from '@angular/core/testing';

import { RegisterdeviceService } from './registerdevice.service';

describe('RegisterdeviceService', () => {
  let service: RegisterdeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterdeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
