import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatewiseReportComponent } from './datewise-report.component';

describe('DatewiseReportComponent', () => {
  let component: DatewiseReportComponent;
  let fixture: ComponentFixture<DatewiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatewiseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatewiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
