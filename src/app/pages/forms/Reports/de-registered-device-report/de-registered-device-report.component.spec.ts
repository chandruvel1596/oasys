import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeRegisteredDeviceReportComponent } from './de-registered-device-report.component';

describe('DeRegisteredDeviceReportComponent', () => {
  let component: DeRegisteredDeviceReportComponent;
  let fixture: ComponentFixture<DeRegisteredDeviceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeRegisteredDeviceReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeRegisteredDeviceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
