import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { IBook, IGenre } from 'src/app/shared/models/book.model';
import { StateService } from './../../shared/services/state.service';
import { FilterEvent } from './../books-list-filter/books-list-filter.component';

@Component({
  selector: 'app-books-management',
  templateUrl: './books-management.component.html',
  styleUrls: ['./books-management.component.css']
})
export class BooksManagementComponent implements OnInit {

  books: Observable<IBook[]> = of([]);
  genres: Observable<IGenre[]> = of([]);
  showNewBookForm = false;

  filterObject: FilterEvent = {
    title: '',
    genres: []
  };

  constructor(private state: StateService) { }

  ngOnInit(): void {
    this.state.init();
    this.books = this.state.getBooksList();
    this.genres = this.state.getGenres();
  }

  handleDeleteBook(bookid: number): void {
    this.state.deleteOneBook(bookid);
  }

  toggleShowNewBookForm(): void {
    this.showNewBookForm = !this.showNewBookForm;
  }

  handleFilterEvent(event: FilterEvent): void {
    this.state.getFilteredBookList(event);
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
      genre: book.genre,
      author: book.author
    };
    this.state.createNewBook(newBook)
      .then(() => this.showNewBookForm = false)
      .catch(err => console.error(err));
  }


}
