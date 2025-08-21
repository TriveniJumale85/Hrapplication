import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTaskComponent } from './hr-task.component';

describe('HrTaskComponent', () => {
  let component: HrTaskComponent;
  let fixture: ComponentFixture<HrTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
