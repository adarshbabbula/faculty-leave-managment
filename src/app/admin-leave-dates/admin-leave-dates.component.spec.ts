import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeaveDatesComponent } from './admin-leave-dates.component';

describe('AdminLeaveDatesComponent', () => {
  let component: AdminLeaveDatesComponent;
  let fixture: ComponentFixture<AdminLeaveDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLeaveDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeaveDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
