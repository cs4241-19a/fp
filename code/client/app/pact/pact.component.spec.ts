import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PactComponent } from './pact.component';

describe('PactComponent', () => {
  let component: PactComponent;
  let fixture: ComponentFixture<PactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
