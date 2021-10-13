import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IBook, IGenre } from './../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly api = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<IBook[]> {
    return this.http.get<{ data: IBook[] }>
      (`${this.api}/books`)
      .pipe(
        map(x => x.data),
        tap(books => books.map(book => book.showDescription = false))
      );
  }

  getOneBook(bookid: number): Observable<IBook> {
    return this.http.get<{ data: IBook }>(`${this.api}/books/${bookid}`)
      .pipe(
        map(res => res.data)
      );
  }

  createNewBook(book: Partial<IBook>): Observable<IBook> {
    return this.http.post<{ data: IBook }>(`${this.api}/books`, book).pipe(
      map(res => res.data)
    );
  }

  deleteOneBook(book: IBook): Observable<IBook> {
    return this.http.delete<{ data: IBook }>(`${this.api}/books/${book.id}`)
      .pipe(
        map(res => {
          return res.data;
        })
      );
  }

  getGenres(): Observable<IGenre[]> {
    return this.http.get<{ data: IGenre[] }>(`${this.api}/genres`).pipe(
      map(res => res.data),
    );
  }

  editBook(book: IBook): Observable<IBook> {
    return this.http.post<{ data: IBook }>(`${this.api}/books/${book.id}`, book).pipe(
      map(res => res.data)
    );
  }
}