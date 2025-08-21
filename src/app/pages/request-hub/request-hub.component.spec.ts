import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHubComponent } from './request-hub.component';

describe('RequestHubComponent', () => {
  let component: RequestHubComponent;
  let fixture: ComponentFixture<RequestHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestHubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
