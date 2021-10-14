import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-books-list-actions',
  templateUrl: './books-list-actions.component.html',
  styleUrls: ['./books-list-actions.component.css']
})
export class BooksListActionsComponent {
  @Output() onAddNewBook: EventEmitter<void> = new EventEmitter<void>();
  _addNewBookMode = false;

  addNewBook(onAddNewBookMode: boolean, event: EventEmitter<void>): boolean {
    event.emit();
    return !onAddNewBookMode;
  }

}
