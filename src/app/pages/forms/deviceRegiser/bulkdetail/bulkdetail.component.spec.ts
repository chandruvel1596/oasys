import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkdetailComponent } from './bulkdetail.component';

describe('BulkdetailComponent', () => {
  let component: BulkdetailComponent;
  let fixture: ComponentFixture<BulkdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
