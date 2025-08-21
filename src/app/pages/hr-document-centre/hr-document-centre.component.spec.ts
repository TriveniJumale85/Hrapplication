import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDocumentCentreComponent } from './hr-document-centre.component';

describe('HrDocumentCentreComponent', () => {
  let component: HrDocumentCentreComponent;
  let fixture: ComponentFixture<HrDocumentCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrDocumentCentreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrDocumentCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
