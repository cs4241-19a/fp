import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureSelectionComponent } from './procedure-selection.component';

describe('ProcedureSelectionComponent', () => {
  let component: ProcedureSelectionComponent;
  let fixture: ComponentFixture<ProcedureSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
