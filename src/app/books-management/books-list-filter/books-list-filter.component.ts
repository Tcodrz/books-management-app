import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IGenre } from './../../shared/models/genre.interface';


export interface FilterEvent {
  title: string;
  genres: string[];
}

@Component({
  selector: 'app-books-list-filter',
  templateUrl: './books-list-filter.component.html',
  styleUrls: ['./books-list-filter.component.css']
})
export class BooksListFilterComponent {
  @Input() genresList: Observable<IGenre[]> = of([]);
  @Input() filteredGenres: Observable<string[]>;
  @Output() onFilterByTitle: EventEmitter<FilterEvent> = new EventEmitter<FilterEvent>();
  @Output() onAddGenre: EventEmitter<string> = new EventEmitter<string>();
  @Output() onRemoveGenre: EventEmitter<string> = new EventEmitter<string>();

  filterByTitle = false;
  titleInput;
}
