import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ApiService } from './../../shared/services/api.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadBooks, booksLoaded, loadGenres, genresLoaded } from './books.actions';
import { EMPTY } from 'rxjs';


@Injectable()
export class BooksEffects {


    loadBooks$ = createEffect(() => this.actions$.pipe(
        ofType(loadBooks),
        mergeMap(() => this.api.getAllBooks()
            .pipe(
                tap((x) => console.log(x)),
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
    ))

    constructor(private actions$: Actions, private api: ApiService) { }

}