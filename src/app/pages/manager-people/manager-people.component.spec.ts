import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPeopleComponent } from './manager-people.component';

describe('ManagerPeopleComponent', () => {
  let component: ManagerPeopleComponent;
  let fixture: ComponentFixture<ManagerPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerPeopleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
