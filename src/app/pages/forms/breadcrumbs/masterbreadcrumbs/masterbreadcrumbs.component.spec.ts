import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterbreadcrumbsComponent } from './masterbreadcrumbs.component';

describe('MasterbreadcrumbsComponent', () => {
  let component: MasterbreadcrumbsComponent;
  let fixture: ComponentFixture<MasterbreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterbreadcrumbsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterbreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
