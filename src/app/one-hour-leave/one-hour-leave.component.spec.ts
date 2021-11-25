import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneHourLeaveComponent } from './one-hour-leave.component';

describe('OneHourLeaveComponent', () => {
  let component: OneHourLeaveComponent;
  let fixture: ComponentFixture<OneHourLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneHourLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneHourLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
