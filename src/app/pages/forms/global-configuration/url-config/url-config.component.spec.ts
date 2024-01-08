import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlConfigComponent } from './url-config.component';

describe('UrlConfigComponent', () => {
  let component: UrlConfigComponent;
  let fixture: ComponentFixture<UrlConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
