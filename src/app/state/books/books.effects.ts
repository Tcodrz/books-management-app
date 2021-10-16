import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ApiService } from './../../shared/services/api.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadBooks, booksLoaded, loadGenres, genresLoaded, loadOneBook, oneBookLoaded, deleteBook, bookDeleted, createBook, bookCreated, editBook, bookEdited } from './books.actions';
import { EMPTY } from 'rxjs';


@Injectable()
export class BooksEffects {


    loadBooks$ = createEffect(() => this.actions$.pipe(
        ofType(loadBooks),
        mergeMap(() => this.api.getAllBooks()
            .pipe(
                map(books => (booksLoaded({ payload: books }))),
                catchError(() => EMPTY)
            )
        )
    ));

    loadGenres$ = createEffect(() => this.actions$.pipe(
        ofType(loadGenres),
        mergeMap(() => this.api.getGenres()
            .pipe(
                map(genres => (genresLoaded({ payload: genres }))),
                catchError(() => EMPTY)
            )
        )
    ));

    loadOneBook$ = createEffect(() => this.actions$.pipe(
        ofType(loadOneBook),
        mergeMap((action) => this.api.getOneBook(action.payload)
            .pipe(
                map(book => (oneBookLoaded({ payload: book }))),
                catchError(() => EMPTY)
            )
        )
    ));

    deleteBook$ = createEffect(() => this.actions$.pipe(
        ofType(deleteBook),
        mergeMap((action) => this.api.deleteOneBook(action.payload)
            .pipe(
                map(() => (loadBooks())),
                catchError(() => EMPTY)
            )
        )
    ));

    createBook$ = createEffect(() => this.actions$.pipe(
        ofType(createBook),
        mergeMap((action) => this.api.createNewBook(action.payload)
            .pipe(
                tap(book => console.log(book)),
                map((book) => (bookCreated({ payload: book }))),
                catchError(() => EMPTY)
            ))
    ));

    editBook$ = createEffect(() => this.actions$.pipe(
        ofType(editBook),
        mergeMap((action) => this.api.editBook(action.payload)
            .pipe(
                map((book) => (bookEdited({ payload: book }))),
                catchError(() => EMPTY)
            ))
    ));

    constructor(private actions$: Actions, private api: ApiService) { }

}