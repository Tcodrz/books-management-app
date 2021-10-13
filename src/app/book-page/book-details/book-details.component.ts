import { Observable, of } from 'rxjs';
import { IGenre } from './../../shared/models/book.model';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IBook } from 'src/app/shared/models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  @Input() set book(val: IBook) {
    if (val) {
      this.bookCopy = Object.assign(this.bookCopy, val);
      this.bookOriginal = Object.assign(this.bookOriginal, val);
    }
  }
  @Input() genresList: Observable<IGenre[]> = of([]);
  @Input() set updateSuccessful(val: Observable<boolean>) {
    if (!val) {
      window.alert('The book was edited while you were editing, what would you like to do?');
    }
  } 
  @Output() onEditBook: EventEmitter<Partial<IBook>> = new EventEmitter<Partial<IBook>>();
  @Output() onDeleteBook: EventEmitter<number> = new EventEmitter<number>();
  @Output() onEnterEditMode: EventEmitter<void> = new EventEmitter<void>();

  editMode = false;
  bookCopy: Partial<IBook> = {};
  bookOriginal: Partial<IBook> = {};
  timeEnteredEditMode = 0;

  toggleEditMode(mode: boolean): boolean {
    return !mode;
  }

  edit(book: Partial<IBook>, event: EventEmitter<Partial<IBook>>): void {
    event.emit(book);
  }

  booksAreEqual(book1: Partial<IBook>, book2: Partial<IBook>): boolean {
    let equal = true;
    for (const key in book1) {
      if (book1[key] !== book2[key]) {
        equal = false;
        // TODO - give the user option to cancel action
        window.alert('Changes Will Be Lost!');
        book2 = Object.assign(book2, book1);
      }
    }
    return equal;
  }
}
