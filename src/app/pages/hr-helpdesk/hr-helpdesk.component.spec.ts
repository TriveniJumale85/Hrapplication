import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrHelpdeskComponent } from './hr-helpdesk.component';

describe('HrHelpdeskComponent', () => {
  let component: HrHelpdeskComponent;
  let fixture: ComponentFixture<HrHelpdeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrHelpdeskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrHelpdeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
