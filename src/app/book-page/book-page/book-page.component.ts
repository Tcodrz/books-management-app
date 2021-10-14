import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { IBook } from 'src/app/shared/models/book.model';
import { IGenre } from './../../shared/models/genre.interface';
import { StateService } from './../../shared/services/state.service';

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

  cancelUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  book: Subject<IBook> = new Subject<IBook>();
  genres: Observable<IGenre[]> = of([]);
  routerSubscription: Subscription;
  timeStamp: number = null;
  stayOnEditMode = false;
  bookID: number = null;
  loading = true;

  constructor(
    private state: StateService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.timeStamp = new Date().getTime();            /* save the user enter this page time stamp */
    if (!this.state.isInitialized()) {
      this.state.init();
    }
    this.genres = this.state.getGenres();
    this.routerSubscription = this.route.params.subscribe(params => {
      this.bookID = params.id;
      this.state.getOneBook(params.id).subscribe(book => {
        if (!book) {                                  /* if no book found send the user back to the books list */
          this.modalService.open(this.errModal).result.then(() => {
            this.router.navigate(['/']);
          });
        }
        this.updateBook(book);
        this.loading = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  private updateBook(book: IBook): void {
    this.book.next(book);
  }

  async handleDeleteBook(bookid: number): Promise<void> {
    const bookFromDb = await this.state.getOneBook(bookid).toPromise();
    if (!bookFromDb) {
      await this.modalService.open(this.errModal).result;
      this.router.navigate(['/']);
      return;
    }
    const result = await this.modalService.open(this.onDeleteModal).result
    if (result === 'no') {
      return;
    } else if (result === 'yes') {
      this.state.deleteOneBook(bookid).then(() => {
        this.router.navigate(['/']);
      });
    }
  }

  async handleEditBook(book: IBook): Promise<void> {
    const bookFromDb = await this.state.getOneBook(book.id).toPromise();
    if (!bookFromDb) {
      await this.modalService.open(this.errModal).result;
      this.router.navigate(['/']);
      return;
    }

    const lastBookUpdate = Date.parse(bookFromDb.updatedAt);

    if (lastBookUpdate > this.timeStamp) {
      await this.modalService.open(this.timeConflictModal).result
      window.location.reload();
    } else {
      const updatedBook = await this.state.editBook(book);
      this.updateBook(book);
      this.timeStamp = new Date().getTime();
    }
  }

  async handleCancelEdit(books: IBook[]): Promise<void> {
    let [originalBook, newBook] = books;
    let equal = true;
    this.stayOnEditMode = false;
    const book = await this.state.getOneBook(this.bookID).toPromise();
    const lastBookUpdate = Date.parse(book.updatedAt);

    if (lastBookUpdate > this.timeStamp) {
      await this.modalService.open(this.timeConflictModal).result;
      window.location.reload();
      return;
    }

    for (const key in originalBook) {
      if (key === 'genres') {
        if (originalBook.genres.join('|') !== newBook.genres.join('|')) {
          equal = false;
        }
      }
      if (originalBook[key] !== newBook[key]) {
        equal = false;
      }
    }
    if (!equal) {
      const result = await this.modalService.open(this.editConflictModal).result;
      if (result === 'no') {
        this.stayOnEditMode = true;
      } else if (result === 'yes') {
        this.updateBook(book);
      }
    }
  }

}
