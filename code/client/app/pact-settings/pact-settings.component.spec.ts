import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PactSettingsComponent } from './pact-settings.component';

describe('PactSettingsComponent', () => {
  let component: PactSettingsComponent;
  let fixture: ComponentFixture<PactSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PactSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PactSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
