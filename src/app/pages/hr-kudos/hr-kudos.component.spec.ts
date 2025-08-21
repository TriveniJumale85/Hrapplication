import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrKudosComponent } from './hr-kudos.component';

describe('HrKudosComponent', () => {
  let component: HrKudosComponent;
  let fixture: ComponentFixture<HrKudosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrKudosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrKudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
