import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatePickerInputComponent } from './date-picker-input.component';
import { ValidatMaxDatePipe } from './pipes/validat-max-date.pipe';
import { ValidatMinDatePipe } from './pipes/validat-min-date.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    DatePickerInputComponent,
    ValidatMaxDatePipe,
    ValidatMinDatePipe,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatePickerInputComponent
  ]
})
export class DatePickerModule { }
