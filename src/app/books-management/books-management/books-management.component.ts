import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IBook } from 'src/app/shared/models/book.interface';
import { AppState } from 'src/app/state';
import { IGenre } from '../../shared/models/genre.interface';
import { createBook, filterBooks, loadBooks, loadGenres, toggleShowDescription } from './../../state/books/books.actions';
import { BooksState } from './../../state/books/books.reducer';
import { FilterEvent } from './../books-list-filter/books-list-filter.component';

@Component({
  selector: 'app-books-management',
  templateUrl: './books-management.component.html',
  styleUrls: ['./books-management.component.css']
})
export class BooksManagementComponent implements OnInit {

  books: IBook[] = [];
  genres: IGenre[] = [];
  showNewBookForm = false;
  loading = true;

  filterObject: FilterEvent = {
    title: '',
    genres: []
  };

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
    this.store.dispatch(loadGenres());
    this.store.pipe(
      select('books')
    ).subscribe((state: BooksState) => {
      this.books = state.filteredBooks;
      this.genres = state.genres;
    })
  }

  toggleShowNewBookForm(): void {
    this.showNewBookForm = !this.showNewBookForm;
  }

  handleFilterEvent(event: FilterEvent): void {
    this.store.dispatch(filterBooks({ payload: event }));
  }

  handleAddGenre(genre: string): void {
    if (!genre || this.filterObject.genres.includes(genre)) {
      return;
    }
    this.filterObject = { ...this.filterObject, genres: [...this.filterObject.genres, genre] };
    this.handleFilterEvent(this.filterObject);
  }

  handleRemoveGenre(genre: string): void {
    if (!genre) {
      return;
    }
    this.filterObject = {
      ...this.filterObject,
      genres: this.filterObject.genres.filter(g => g !== genre)
    };
    this.handleFilterEvent(this.filterObject);
  }

  handleFilterByTitle(title: string): void {
    this.filterObject = { ...this.filterObject, title };
    this.handleFilterEvent(this.filterObject);
  }

  handleNewBookSubmit(book: Partial<IBook>): void {
    const newBook: Partial<IBook> = {
      title: book.title,
      description: book.description,
      genres: book.genres,
      author: book.author,
      genre: book.genre
    };
    this.store.dispatch(createBook({ payload: newBook }));
    this.showNewBookForm = false;
  }

  handleToggleShowDescription(book: IBook): void {
    this.store.dispatch(toggleShowDescription({ payload: book }));
  }


}
