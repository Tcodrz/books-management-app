import { IBook, IGenre } from './../../shared/models/book.model';
import { Observable, of } from 'rxjs';
import { Component, EventEmitter, Output, Input, TemplateRef, ElementRef, ViewRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-book-form',
  templateUrl: './new-book-form.component.html',
  styleUrls: ['./new-book-form.component.css']
})
export class NewBookFormComponent {
  @Output() onSubmit: EventEmitter<object> = new EventEmitter<object>();
  @Input() genresList: Observable<IGenre[]> = of([]);

  title: string = '';
  author: string = '';
  description: string = '';
  genre: string = '';

  submit(form: NgForm, event: EventEmitter<object>): void {
    const newBook: Partial<IBook> = {
      title: form.value.bookTitle,
      author: form.value.bookAuthor,
      genre: form.value.bookGenre,
      description: form.value.bookDescription
    };
    event.emit(newBook);
  }


}
