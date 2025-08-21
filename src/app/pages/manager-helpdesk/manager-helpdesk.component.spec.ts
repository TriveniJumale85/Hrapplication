import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerHelpdeskComponent } from './manager-helpdesk.component';

describe('ManagerHelpdeskComponent', () => {
  let component: ManagerHelpdeskComponent;
  let fixture: ComponentFixture<ManagerHelpdeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerHelpdeskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerHelpdeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
