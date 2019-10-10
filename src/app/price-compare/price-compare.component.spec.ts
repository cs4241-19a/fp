import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCompareComponent } from './price-compare.component';

describe('PriceCompareComponent', () => {
  let component: PriceCompareComponent;
  let fixture: ComponentFixture<PriceCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
