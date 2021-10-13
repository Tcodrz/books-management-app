import { BookPageModule } from './book-page/book-page.module';
import { BooksManagementModule } from './books-management/books-management.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BooksManagementModule,
    BookPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
