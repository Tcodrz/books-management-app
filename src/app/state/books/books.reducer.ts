import { IGenre } from 'src/app/shared/models/genre.interface';
import { booksLoaded, genresLoaded } from './books.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { IBook } from 'src/app/shared/models/book.model';


export interface BooksState {
    books: IBook[];
    genres: IGenre[];
}

const initialState: BooksState = {
    books: [],
    genres: []
};

const _booksReducer = createReducer(
    initialState,
    on(booksLoaded, (state, action) => {
        return {
            books: action.payload,
            genres: state.genres
        }
    }),
    on(genresLoaded, (state, action) => {
        return {
            books: state.books,
            genres: action.payload
        }
    })
);

export function booksReducer(state = initialState, action: Action): BooksState {
    return _booksReducer(state, action);
}