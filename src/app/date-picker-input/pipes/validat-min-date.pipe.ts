import { Pipe, PipeTransform } from '@angular/core';
import { Day, Month, Year } from '../models/date-picker.model';

@Pipe({
  name: 'validatMinDate'
})
export class ValidatMinDatePipe implements PipeTransform {

  transform(value: any, min: Date, year: number = 0): boolean {

    if(!min) return false;

    if(value instanceof Day) {
      return value.year <= min.getFullYear() && value.month <= min.getMonth() && value.day < min.getDate() ||
              value.year <= min.getFullYear() && value.month < min.getMonth();
    }

    if(value instanceof Month) {
      return year >= min.getFullYear() && value.num - 1 > min.getMonth();
    }

    if(value instanceof Year) {
      return value.year > min.getFullYear();
    }

    return false;
  }

}
