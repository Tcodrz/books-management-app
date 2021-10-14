import { StateModule } from './../state/state.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormValidationErrorComponent } from './components/form-validation-error/form-validation-error.component';
import { GenreSelectComponent } from './components/genre-select/genre-select.component';



@NgModule({
  declarations: [FormValidationErrorComponent, GenreSelectComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    FormsModule
  ],
  exports: [FormValidationErrorComponent, GenreSelectComponent]
})
export class SharedModule { }
