import { Action, createReducer, on } from '@ngrx/store';
import { IBook } from 'src/app/shared/models/book.model';
import { IGenre } from 'src/app/shared/models/genre.interface';
import { bookCreated, bookDeleted, bookEdited, booksLoaded, deleteBook, filterBooks, genresLoaded, oneBookLoaded, toggleShowDescription } from './books.actions';
import { filterBooksByTitleAndGenre, toggleBookDescription } from './books.utils';



export interface BooksState {
    books: IBook[];
    genres: IGenre[];
    book: IBook;
    filteredBooks: IBook[];
}

const initialState: BooksState = {
    books: [],
    genres: [],
    book: {
        id: null,
        title: '',
        author: '',
        description: '',
        updatedAt: '',
        genre: '',
        genres: [],
        image: '',
        showDescription: false
    },
    filteredBooks: []
};

const _booksReducer = createReducer(
    initialState,
    on(booksLoaded, (state, action) => {
        return {
            ...state,
            books: action.payload,
            filteredBooks: action.payload
        }
    }),
    on(genresLoaded, (state, action) => {
        return {
            ...state,
            genres: action.payload
        }
    }),
    on(oneBookLoaded, (state, action) => {
        return {
            ...state,
            book: action.payload
        }
    }),
    on(deleteBook, (state, action) => {
        return {
            ...state,
            book: null,
            books: state.books.filter(book => book.id !== action.payload.id),
            filteredBooks: state.books.filter(book => book.id !== action.payload.id)
        }
    }),
    on(filterBooks, (state, action) => {
        return {
            ...state,
            filteredBooks: filterBooksByTitleAndGenre(state.books, action.payload)
        }
    }),
    on(bookCreated, (state, action) => {
        return {
            ...state,
            books: [...state.books, action.payload].sort((a, b) => a.id - b.id),
            filteredBooks: [...state.books, action.payload].sort((a, b) => a.id - b.id)
        }
    }),
    on(bookEdited, (state, action) => {
        return {
            ...state,
            books: state.books.map(book => book.id === action.payload.id ? action.payload : book),
            filteredBooks: state.books.map(book => book.id === action.payload.id ? action.payload : book),
            book: action.payload
        }
    }),
    on(toggleShowDescription, (state, action) => {
        return {
            ...state,
            books: toggleBookDescription(state.books, action.payload).sort((a, b) => a.id - b.id),
            filteredBooks: toggleBookDescription(state.books, action.payload).sort((a, b) => a.id - b.id)
        }
    })
);

export function booksReducer(state = initialState, action: Action): BooksState {
    return _booksReducer(state, action);
}