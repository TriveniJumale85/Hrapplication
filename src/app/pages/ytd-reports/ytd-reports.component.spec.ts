import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YtdReportsComponent } from './ytd-reports.component';

describe('YtdReportsComponent', () => {
  let component: YtdReportsComponent;
  let fixture: ComponentFixture<YtdReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YtdReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YtdReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
