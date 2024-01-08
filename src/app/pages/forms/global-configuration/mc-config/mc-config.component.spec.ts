import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McConfigComponent } from './mc-config.component';

describe('McConfigComponent', () => {
  let component: McConfigComponent;
  let fixture: ComponentFixture<McConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
