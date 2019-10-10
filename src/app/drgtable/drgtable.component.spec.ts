import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrgtableComponent } from './drgtable.component';

describe('DrgtableComponent', () => {
  let component: DrgtableComponent;
  let fixture: ComponentFixture<DrgtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrgtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrgtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
