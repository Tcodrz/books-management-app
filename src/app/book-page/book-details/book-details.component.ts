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
  @Output() onEditBook: EventEmitter<Partial<IBook>> = new EventEmitter<Partial<IBook>>();
  @Output() onDeleteBook: EventEmitter<number> = new EventEmitter<number>();

  editMode = false;
  bookCopy: Partial<IBook> = {};
  bookOriginal: Partial<IBook> = {};

  toggleEditMode(mode: boolean): boolean {
    if (mode && !this.booksAreEqual(this.bookOriginal, this.bookCopy)) {
      window.alert('Changes Will Be Lost!');
      this.bookCopy = Object.assign(this.bookCopy, this.bookOriginal);
    }
    return !mode;
  }

  edit(book: Partial<IBook>, event: EventEmitter<Partial<IBook>>): void {
    event.emit(book);
  }

  private booksAreEqual(book1: Partial<IBook>, book2: Partial<IBook>): boolean {
    let equal = true;
    for (const key in book1) {
      if (book1[key] !== book2[key]) {
        equal = false;
      }
    }
    return equal;
  }
}
