import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IGenre } from 'src/app/shared/models/genre.interface';

@Component({
  selector: 'app-genre-select',
  templateUrl: './genre-select.component.html',
  styleUrls: ['./genre-select.component.css']
})
export class GenreSelectComponent {


  @Input() genreList: Observable<IGenre[]>;
  @Input() selectedGenres: string[];
  @Output() onAddGenre: EventEmitter<string> = new EventEmitter<string>();
  @Output() onRemoveGenre: EventEmitter<IGenre> = new EventEmitter<IGenre>();
  current: Partial<IGenre> = {};
}
