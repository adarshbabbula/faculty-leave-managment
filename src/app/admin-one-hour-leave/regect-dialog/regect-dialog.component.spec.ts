import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegectDialogComponent } from './regect-dialog.component';

describe('RegectDialogComponent', () => {
  let component: RegectDialogComponent;
  let fixture: ComponentFixture<RegectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
