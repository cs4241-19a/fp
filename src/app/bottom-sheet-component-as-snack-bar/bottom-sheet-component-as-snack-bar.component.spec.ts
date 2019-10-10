import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetComponentAsSnackBarComponent } from './bottom-sheet-component-as-snack-bar.component';

describe('BottomSheetComponentAsSnackBarComponent', () => {
  let component: BottomSheetComponentAsSnackBarComponent;
  let fixture: ComponentFixture<BottomSheetComponentAsSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetComponentAsSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetComponentAsSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
