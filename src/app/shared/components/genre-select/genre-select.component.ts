import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGenre } from 'src/app/shared/models/genre.interface';

@Component({
  selector: 'app-genre-select',
  templateUrl: './genre-select.component.html',
  styleUrls: ['./genre-select.component.css']
})
export class GenreSelectComponent {


  @Input() genreList: string[];
  @Input() selectedGenres: string[];
  @Output() onAddGenre: EventEmitter<string> = new EventEmitter<string>();
  @Output() onRemoveGenre: EventEmitter<string> = new EventEmitter<string>();
}
