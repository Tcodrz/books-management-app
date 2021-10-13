import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListFilterComponent } from './books-list-filter.component';

describe('BooksListFilterComponent', () => {
  let component: BooksListFilterComponent;
  let fixture: ComponentFixture<BooksListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
