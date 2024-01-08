import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharttooltipComponent } from './charttooltip.component';

describe('CharttooltipComponent', () => {
  let component: CharttooltipComponent;
  let fixture: ComponentFixture<CharttooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharttooltipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharttooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
