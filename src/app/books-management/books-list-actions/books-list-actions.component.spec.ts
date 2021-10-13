import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListActionsComponent } from './books-list-actions.component';

describe('BooksListActionsComponent', () => {
  let component: BooksListActionsComponent;
  let fixture: ComponentFixture<BooksListActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksListActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
