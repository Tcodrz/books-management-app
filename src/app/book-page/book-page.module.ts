import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookPageComponent } from './book-page/book-page.component';
import { BookDetailsComponent } from './book-details/book-details.component';



@NgModule({
  declarations: [BookPageComponent, BookDetailsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
})
export class BookPageModule { }
