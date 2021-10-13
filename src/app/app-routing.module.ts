import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from './book-page/book-page/book-page.component';
import { BooksManagementComponent } from './books-management/books-management/books-management.component';


const routes: Routes = [
  { path: '', component: BooksManagementComponent },
  { path: 'book/:id', component: BookPageComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
