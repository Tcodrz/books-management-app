import { IGenre } from './../../shared/models/book.model';
import { IBook } from 'src/app/shared/models/book.model';
import { StateService } from './../../shared/services/state.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit, OnDestroy {

  book: Observable<IBook>;
  genres: Observable<IGenre[]> = of([]);
  routerSubscription: Subscription;

  constructor(private state: StateService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (!this.state.isInitialized()) {
      this.state.init();
    }
    this.genres = this.state.getGenres();

    this.routerSubscription = this.route.params.subscribe(params => {
      this.book = this.state.getOneBook(params.id);
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  handleDeleteBook(bookid: number): void {
    this.state.deleteOneBook(bookid).then(() => {
      this.router.navigate(['/']);
    })
  }

  handleEditBook(book: IBook): void {
    this.state.editBook(book);
  }


}
