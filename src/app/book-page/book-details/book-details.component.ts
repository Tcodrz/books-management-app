import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBook } from 'src/app/shared/models/book.model';
import { IGenre } from './../../shared/models/genre.interface';

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
  @Input() set stayOnEditMode(val: boolean) {
    if (val) {
      this.editMode = true;
    }
  };
  @Input() genresList: Observable<IGenre[]> = of([]);
  @Output() onEditBook: EventEmitter<Partial<IBook>> = new EventEmitter<Partial<IBook>>();
  @Output() onDeleteBook: EventEmitter<number> = new EventEmitter<number>();
  @Output() onCancelEdit: EventEmitter<Partial<IBook>[]> = new EventEmitter<Partial<IBook[]>>();

  editMode = false;
  bookCopy: Partial<IBook> = {};
  bookOriginal: Partial<IBook> = {};

  toggleEditMode(mode: boolean): boolean {
    return !mode;
  }

  edit(book: Partial<IBook>, event: EventEmitter<Partial<IBook>>): void {
    event.emit(book);
  }

  handleAddGenre(genre: string, book: Partial<IBook>): Partial<IBook> {
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

}
