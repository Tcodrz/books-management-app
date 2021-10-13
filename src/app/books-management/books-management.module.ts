import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksManagementComponent } from './books-management/books-management.component';
import { BooksListActionsComponent } from './books-list-actions/books-list-actions.component';
import { NewBookFormComponent } from './new-book-form/new-book-form.component';
import { BooksListFilterComponent } from './books-list-filter/books-list-filter.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [BooksListComponent, BooksManagementComponent, BooksListActionsComponent, NewBookFormComponent, BooksListFilterComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
})
export class BooksManagementModule { }
