import { Pipe, PipeTransform } from '@angular/core';
import { Day, Month, Year } from '../models/date-picker.model';

@Pipe({
  name: 'validatMaxDate'
})
export class ValidatMaxDatePipe implements PipeTransform {

  transform(value: any, max: Date, year: number = 0): boolean {

    //let day = max.getDate();
    //let month = max.getMonth();
    //let yeart = max.getFullYear();

    if(!max) return false;

    if(value instanceof Day) {
      if(value.year > max.getFullYear())
        return true;

      return value.year >= max.getFullYear() && value.month >= max.getMonth() && value.day > max.getDate() ||
              value.year >= max.getFullYear() && value.month > max.getMonth();
    }

    if(value instanceof Month) {
      return year >= max.getFullYear() && value.num - 1 > max.getMonth();
    }

    if(value instanceof Year) {
      return value.year > max.getFullYear();
    }

    return false;
  }

}
