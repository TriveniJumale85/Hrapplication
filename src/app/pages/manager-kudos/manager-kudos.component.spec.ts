import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerKudosComponent } from './manager-kudos.component';

describe('ManagerKudosComponent', () => {
  let component: ManagerKudosComponent;
  let fixture: ComponentFixture<ManagerKudosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerKudosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerKudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
