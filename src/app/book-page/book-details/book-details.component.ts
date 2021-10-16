import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBook } from 'src/app/shared/models/book.model';
import { IGenre } from './../../shared/models/genre.interface';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {

  @Input() set book(val: IBook) {
    this.bookCopy = { ...val };
  };
  @Input() set stayOnEditMode(val: boolean) {
    if (val) {
      this.editMode = true;
    }
  };
  @Input() set genresList(val: IGenre[]) {
    this._genreList = val.map(g => g.name);
  };
  @Output() onEditBook: EventEmitter<Partial<IBook>> = new EventEmitter<Partial<IBook>>();
  @Output() onDeleteBook: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancelEdit: EventEmitter<Partial<IBook>> = new EventEmitter<Partial<IBook>>();

  editMode = false;
  bookCopy: Partial<IBook> = {};
  _genreList: string[] = [];

  toggleEditMode(mode: boolean): boolean {
    return !mode;
  }

  edit(book: Partial<IBook>, event: EventEmitter<Partial<IBook>>): void {
    event.emit(book);
  }

  handleAddGenre(genre: string, book: Partial<IBook>): Partial<IBook> {
    if (!genre) {
      return book;
    }

    if (!book.genres.includes(genre)) {
      book.genres = [...book.genres, genre];
    }
    return { ...book };
  }

  handleRemoveGenre(genre: string, book: Partial<IBook>): Partial<IBook> {
    if (book.genres.includes(genre)) {
      book.genres = book.genres.filter(g => g !== genre);
    }
    return { ...book };
  }

  isLast(index: number, length: number): string | null {
    return index === (length - 1) ? null : '|';
  }

}
