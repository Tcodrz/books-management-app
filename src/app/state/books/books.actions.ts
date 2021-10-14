import { IGenre } from 'src/app/shared/models/genre.interface';
import { IBook } from 'src/app/shared/models/book.model';
import { createAction, props } from "@ngrx/store";


export const loadBooks = createAction('[Books] Load');
export const booksLoaded = createAction('[Books] Loaded', props<{ payload: IBook[] }>());
export const loadGenres = createAction('[Genres] Load');
export const genresLoaded = createAction('[Genres] Loaded', props<{ payload: IGenre[] }>());