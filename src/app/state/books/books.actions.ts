import { FilterEvent } from './../../books-management/books-list-filter/books-list-filter.component';
import { IGenre } from 'src/app/shared/models/genre.interface';
import { IBook } from 'src/app/shared/models/book.interface';
import { createAction, props } from "@ngrx/store";


export const loadBooks = createAction('[Books] Load');
export const booksLoaded = createAction('[Books] Loaded', props<{ payload: IBook[] }>());
export const loadGenres = createAction('[Genres] Load');
export const genresLoaded = createAction('[Genres] Loaded', props<{ payload: IGenre[] }>());
export const loadOneBook = createAction('[Books] Load One', props<{ payload: number }>());
export const oneBookLoaded = createAction('[Books] One Book Loaded', props<{ payload: IBook }>());
export const deleteBook = createAction('[Books] Delete One', props<{ payload: IBook }>());
export const bookDeleted = createAction('[Books] Book Deleted');
export const filterBooks = createAction('[Books] Filter', props<{ payload: FilterEvent }>());
export const createBook = createAction('[Books] Create', props<{ payload: Partial<IBook> }>());
export const bookCreated = createAction('[Books] Book Create', props<{ payload: IBook }>());
export const editBook = createAction('[Books] Edit Book', props<{ payload: IBook }>());
export const bookEdited = createAction('[Books] Book Edited', props<{ payload: IBook }>());
export const toggleShowDescription = createAction('[Books] Toggle Show Description', props<{ payload: IBook }>());