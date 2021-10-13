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

  timeEnteredToEditMode: number = null;
  updateSuccessful: boolean = true;

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

  async handleEditBook(book: IBook): Promise<void> {
    const bookFromDb = await this.state.getOneBook(book.id).toPromise();
    console.log('book updated at:', Date.parse(bookFromDb.updatedAt));
    console.log('user entered edit mode: ', this.timeEnteredToEditMode);
    console.log(Date.parse(bookFromDb.updatedAt) > this.timeEnteredToEditMode);
    if (Date.parse(bookFromDb.updatedAt) > this.timeEnteredToEditMode) {
      console.log('TIME CONFLICT');
    }
    const success = await this.state.editBook(book);
    this.updateSuccessful = success;
  }

  handleEnterEditMode(): void {
    this.timeEnteredToEditMode = new Date().getTime();
    console.log(this.timeEnteredToEditMode);
  }


}
