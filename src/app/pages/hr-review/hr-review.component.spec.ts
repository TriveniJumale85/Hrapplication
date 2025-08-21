import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrReviewComponent } from './hr-review.component';

describe('HrReviewComponent', () => {
  let component: HrReviewComponent;
  let fixture: ComponentFixture<HrReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
