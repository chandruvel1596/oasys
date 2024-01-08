import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredDeviceReportComponent } from './registered-device-report.component';

describe('RegisteredDeviceReportComponent', () => {
  let component: RegisteredDeviceReportComponent;
  let fixture: ComponentFixture<RegisteredDeviceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredDeviceReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredDeviceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
