import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidationErrorComponent } from './form-validation-error.component';

describe('FormValidationErrorComponent', () => {
  let component: FormValidationErrorComponent;
  let fixture: ComponentFixture<FormValidationErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormValidationErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormValidationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
