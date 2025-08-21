import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDocumentCenterComponent } from './user-document-center.component';

describe('UserDocumentCenterComponent', () => {
  let component: UserDocumentCenterComponent;
  let fixture: ComponentFixture<UserDocumentCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDocumentCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDocumentCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
