import { BooksState } from './../../state/books/books.reducer';
import { tap, map } from 'rxjs/operators';
import { loadBooks, loadGenres } from './../../state/books/books.actions';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppState } from 'src/app/state';
import { IBook } from '../models/book.model';
import { FilterEvent } from './../../books-management/books-list-filter/books-list-filter.component';
import { IGenre } from './../models/genre.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _books: IBook[] = [];
  private readonly books$: BehaviorSubject<IBook[]> = new BehaviorSubject<IBook[]>([]);
  private readonly genres$: BehaviorSubject<IGenre[]> = new BehaviorSubject<IGenre[]>([]);
  private initialized = false; /* Flag to know if StateService has been initialized */
  booksFromStore$: Observable<IBook[]> = of([]);

  constructor(private api: ApiService, private store: Store<AppState>) { }

  private updateBookList(books: IBook[]): void {
    this.books$.next(books);
  }

  init(): void {
    this.store.dispatch(loadBooks());
    this.store.dispatch(loadGenres());

    this.store.subscribe((state: AppState) => {
      this._books = state.books.books;
      this.genres$.next(state.books.genres);
      this.updateBookList(this._books);
    });

    this.initialized = true;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  getBooksList(): Observable<IBook[]> {
    return this.books$.asObservable();
  }

  getGenres(): Observable<IGenre[]> {
    return this.genres$.asObservable();
  }

  getOneBook(bookid: number): Observable<IBook> {
    return this.api.getOneBook(bookid);
  }

  async deleteOneBook(bookid: number): Promise<void> {
    const book = this._books.find((book) => book.id === bookid);

    if (book) {
      this._books = this._books.filter((book) => book.id !== bookid);
      this.updateBookList(this._books);
    }

    try {
      await this.api.deleteOneBook(book).toPromise();
    } catch (err) {
      console.error(err);
    }
  }

  getFilteredBookList(filter: FilterEvent): void {
    if (!filter.title && filter.genres.length < 1) {
      this.updateBookList(this._books);
      return;
    }

    let filteredBookList = [];

    if (filter.genres.length > 0) {

      this._books.forEach(book => {
        for (let i = 0; i < filter.genres.length; i++) {
          if (book.genres.includes(filter.genres[i])) {
            filteredBookList.push(book);
          }
        }
      });

      filteredBookList = filteredBookList.filter((book) =>
        book.title.toLowerCase().includes(filter.title.toLowerCase())
      );
    } else {
      filteredBookList = this._books.filter(book =>
        book.title.toLowerCase().includes(filter.title.toLowerCase())
      );
    }
    this.updateBookList(filteredBookList);
  }

  async createNewBook(book: Partial<IBook>): Promise<void> {
    try {
      const newBook = await this.api.createNewBook(book).toPromise();
      if (newBook) {
        this._books.push(newBook);
        this.updateBookList(this._books);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async editBook(book: IBook): Promise<IBook> {
    try {
      const updatedBook = await this.api.editBook(book).toPromise();
      if (!updatedBook) {
        /* Display message saying update failed*/
      } else {
        this._books = this._books.map((book) => {
          return book.id === updatedBook.id ? updatedBook : book;
        });

        this.updateBookList(this._books);
        return updatedBook;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
