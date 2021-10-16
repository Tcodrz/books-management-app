import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IBook } from 'src/app/shared/models/book.interface';
import { AppState } from 'src/app/state';
import { IGenre } from './../../shared/models/genre.interface';
import { ApiService } from './../../shared/services/api.service';
import { deleteBook, editBook, loadGenres, loadOneBook } from './../../state/books/books.actions';
import { BooksState } from './../../state/books/books.reducer';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit, OnDestroy {

  @ViewChild('timeConflictModal') timeConflictModal: ElementRef;
  @ViewChild('onDeleteModal') onDeleteModal: ElementRef;
  @ViewChild('errModal') errModal: ElementRef;
  @ViewChild('editConflictModal') editConflictModal: ElementRef;

  book: IBook;
  genres: IGenre[] = [];
  storeSubscription: Subscription;
  routeSubscription: Subscription;
  timeStamp: number = null;
  stayOnEditMode = false;
  bookID: number = null;
  loading = true;

  constructor(
    private api: ApiService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.store.dispatch(loadOneBook({ payload: params.id }));
      this.store.dispatch(loadGenres());
      this.storeSubscription = this.store.pipe(
        select('books')
      ).subscribe((state: BooksState) => {
        this.book = state.book;
        this.genres = state.genres;
        this.loading = false;
        this.bookID = state.book?.id || null;
        this.timeStamp = new Date().getTime();
      });
    });

  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  async handleDeleteBook(): Promise<void> {
    const result = await this.modalService.open(this.onDeleteModal).result;

    if (result === 'no') {
      return;
    } else if (result === 'yes') {
      this.router.navigate(['/']);
      this.store.dispatch(deleteBook({ payload: this.book }));
    }
  }

  async handleEditBook(newBook: IBook): Promise<void> {

    const bookFromDB = await this.api.getOneBook(this.bookID).toPromise();

    if (!bookFromDB) {
      this.showErrorAndReload();
      return;
    }

    const lastBookUpdate = Date.parse(bookFromDB.updatedAt);
    const timeConflict = await this.checkTimeConflict(lastBookUpdate);

    if (timeConflict) {
      window.location.reload();
      return;
    } else {
      this.store.dispatch(editBook({ payload: newBook }));
      this.timeStamp = new Date().getTime();
    }
  }

  async handleCancelEdit(newBook: IBook): Promise<void> {

    const bookFromDb = await this.api.getOneBook(this.bookID).toPromise();

    if (!bookFromDb) {
      this.showErrorAndReload();
      return;
    }

    const lastBookUpdate = Date.parse(bookFromDb.updatedAt);
    const timeConflict = await this.checkTimeConflict(lastBookUpdate);

    if (timeConflict) {
      this.store.dispatch(loadOneBook({ payload: this.bookID }));
      return;
    }

    let equal = true;
    this.stayOnEditMode = false;

    /* compare latest book version with new version */
    for (const key in bookFromDb) {
      if (key === 'updatedAt') {
        /* skip 'updatedAt' attribute because it's already covered */
        continue;
      }
      if (key === 'genres') {
        equal = bookFromDb.genres.join('|') === newBook.genres.join('|');
      } else {
        equal = bookFromDb[key] === newBook[key];
      }
    }

    if (!equal) {
      const result = await this.modalService.open(this.editConflictModal).result;
      if (result === 'no') {
        this.stayOnEditMode = true;
        this.book = newBook;
      } else if (result === 'yes') {
        this.book = bookFromDb;
      }
    }
  }

  private async checkTimeConflict(lastBookUpdate: number): Promise<boolean> {
    if (lastBookUpdate > this.timeStamp) {
      await this.modalService.open(this.timeConflictModal).result;
      return true;
    }
    return false;
  }

  private showErrorAndReload(): void {
    this.modalService.open(this.errModal).result.then(() => {
      this.router.navigate(['/']);
    });
  }

}
