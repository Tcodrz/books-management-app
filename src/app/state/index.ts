import { ActionReducerMap } from '@ngrx/store';
import { booksReducer, BooksState } from './books/books.reducer';


export interface AppState {
    books: BooksState;
}

export const reducers: ActionReducerMap<AppState> = {
    books: booksReducer
};
