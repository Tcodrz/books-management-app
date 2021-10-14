import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-form-validation-error',
  templateUrl: './form-validation-error.component.html',
  styleUrls: ['./form-validation-error.component.css']
})
export class FormValidationErrorComponent {
  @Input() inputName: string;
  @Input() message: string;
  @Input() inline: boolean;
}
