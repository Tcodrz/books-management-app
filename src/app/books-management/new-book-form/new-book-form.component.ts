import { IBook } from './../../shared/models/book.model';
import { IGenre } from 'src/app/shared/models/genre.interface';
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
  genres: string[] = [];

  submit(form: NgForm, genres: string[], event: EventEmitter<object>): void {
    const newBook: Partial<IBook> = {
      title: form.value.bookTitle,
      author: form.value.bookAuthor,
      genre: genres.join('|'),
      description: form.value.bookDescription,
      genres
    };

    event.emit(newBook);
  }

  handleAddGenre(genre: string, list: string[]): string[] {
    return [...list, genre];
  }

  handleRemoveGenre(genre: string, list: string[]): string[] {
    return list.filter(g => g !== genre);
  }


}
