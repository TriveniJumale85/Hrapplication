import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDocumentCenterComponent } from './manager-document-center.component';

describe('ManagerDocumentCenterComponent', () => {
  let component: ManagerDocumentCenterComponent;
  let fixture: ComponentFixture<ManagerDocumentCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDocumentCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerDocumentCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
