import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/shared/models/book.interface';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent {
  @Input() books: Observable<IBook[]>;
  @Output() onToggleShowDescription: EventEmitter<IBook> = new EventEmitter<IBook>();
}
