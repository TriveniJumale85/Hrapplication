import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerApplyleaveComponent } from './manager-applyleave.component';

describe('ManagerApplyleaveComponent', () => {
  let component: ManagerApplyleaveComponent;
  let fixture: ComponentFixture<ManagerApplyleaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerApplyleaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerApplyleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
