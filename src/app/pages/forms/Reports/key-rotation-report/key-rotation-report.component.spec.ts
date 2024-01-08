import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyRotationReportComponent } from './key-rotation-report.component';

describe('KeyRotationReportComponent', () => {
  let component: KeyRotationReportComponent;
  let fixture: ComponentFixture<KeyRotationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyRotationReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyRotationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
