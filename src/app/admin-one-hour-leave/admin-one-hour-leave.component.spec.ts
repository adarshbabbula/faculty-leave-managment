import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOneHourLeaveComponent } from './admin-one-hour-leave.component';

describe('AdminOneHourLeaveComponent', () => {
  let component: AdminOneHourLeaveComponent;
  let fixture: ComponentFixture<AdminOneHourLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOneHourLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOneHourLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
