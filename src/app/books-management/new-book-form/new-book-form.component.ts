import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IGenre } from 'src/app/shared/models/genre.interface';
import { IBook } from '../../shared/models/book.interface';

@Component({
  selector: 'app-new-book-form',
  templateUrl: './new-book-form.component.html',
  styleUrls: ['./new-book-form.component.css']
})
export class NewBookFormComponent {
  @Output() onSubmit: EventEmitter<object> = new EventEmitter<object>();
  @Input() set genresList(val: IGenre[]) {
    this._genreList = val.map(g => g.name)
  };

  _genreList: string[] = [];

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
    if (!genre || list.includes(genre)) {
      return list;
    }
    return [...list, genre];
  }

  handleRemoveGenre(genre: string, list: string[]): string[] {
    return list.filter(g => g !== genre);
  }


}
