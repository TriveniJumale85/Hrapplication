import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItStatementComponent } from './it-statement.component';

describe('ItStatementComponent', () => {
  let component: ItStatementComponent;
  let fixture: ComponentFixture<ItStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
