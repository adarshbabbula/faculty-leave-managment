import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithDrawLeavesComponent } from './with-draw-leaves.component';

describe('WithDrawLeavesComponent', () => {
  let component: WithDrawLeavesComponent;
  let fixture: ComponentFixture<WithDrawLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithDrawLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithDrawLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
