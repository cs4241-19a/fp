import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalPopupComponent } from './hospital-popup.component';

describe('HospitalPopupComponent', () => {
  let component: HospitalPopupComponent;
  let fixture: ComponentFixture<HospitalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
