import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRegularizationComponent } from './hr-regularization.component';

describe('HrRegularizationComponent', () => {
  let component: HrRegularizationComponent;
  let fixture: ComponentFixture<HrRegularizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrRegularizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrRegularizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
