import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreSelectComponent } from './genre-select.component';

describe('GenreSelectComponent', () => {
  let component: GenreSelectComponent;
  let fixture: ComponentFixture<GenreSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
