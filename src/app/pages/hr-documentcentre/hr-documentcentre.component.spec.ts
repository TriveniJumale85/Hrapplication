import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDocumentcentreComponent } from './hr-documentcentre.component';

describe('HrDocumentcentreComponent', () => {
  let component: HrDocumentcentreComponent;
  let fixture: ComponentFixture<HrDocumentcentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrDocumentcentreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrDocumentcentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
