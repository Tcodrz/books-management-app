import { Component, Input } from '@angular/core';

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
