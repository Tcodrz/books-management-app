import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookPageComponent } from './book-page/book-page.component';



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
