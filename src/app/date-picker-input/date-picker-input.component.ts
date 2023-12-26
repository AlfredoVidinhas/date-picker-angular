import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CultureInfo } from './enums/culture-info.enum';
import { DAYS, getToday, isToday, isTodayYear, MONTH_NAMES, getMonthName, convertToDate } from './helpers/date-picker.helper';
import { Day, Month, Year } from './models/date-picker.model';
import { DateModel } from './models/date.model';

@Component({
  selector: 'app-date-picker-input',
  templateUrl: './date-picker-input.component.html',
  styleUrls: ['./date-picker-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerInputComponent),
      multi: true
    }
  ],
  animations: [
    trigger('toggleHeight', [
      state('hide', style({
          height: '0px',
          opacity: '0',
          overflow: 'hidden',
          padding: '0'
      })),
      state('show', style({
          height: '*',
          opacity: '1'
      })),
      transition('hide => show', animate('200ms ease-in')),
      transition('show => hide', animate('200ms ease-out'))
    ])
  ],
})
export class DatePickerInputComponent implements ControlValueAccessor, OnInit {

  @Input() max!: Date;
  @Input() min!: Date;
  dateFormat: string = 'dd/mm/aaaa';

  placeHolder: string = '';
  isDropped: boolean = false;
  isMaxDisabled: boolean = false;
  isMinDisabled: boolean = false;

  currentApresentation: number = 1;
  currentDate: DateModel = new DateModel();
  selectedDate: DateModel = new DateModel();

  startYear: number = 0;
  endYear: number = 0;

  monthList: Month[] = MONTH_NAMES;
  weekList: string[] = DAYS;
  daysOfMonth: Day[] = [];
  yearList: Year[] = [];

  getMonthName = getMonthName;

  propagateChange: any = () => {};

  ngOnInit(): void {
    this.initDate();
  }

  writeValue(value: string) {
    if(value) {
      const date = convertToDate(value);
      this.initDate(date);
    }
    else {
      this.initDate();
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  initDate(date?: Day) {
    const today = date || getToday();
    this.currentDate.setDate(today);
    this.selectedDate.setDate(today);
    this.placeHolder = date ? this.selectedDate.toString() : this.dateFormat;
    this.checkMaxDate();
    this.checkMinDate();
    this.generateCalendar();
  }

  generateCalendar() {
    this.checkMaxDate();
    this.checkMinDate();
    //42
    const daysInMonth = this.currentDate.getMonthLength();

    // find where to start calendar day of week
    const dayOfWeek = this.currentDate.getDayOfWeek();
    const daysArray: Day[] = [];

    if(dayOfWeek != 0){
      const previusDate = this.currentDate.getPreviusDate();
      const daysInPreviusMonth = previusDate.getDate();
      const startDay = daysInPreviusMonth - dayOfWeek + 1;
      for (let i = startDay; i <= daysInPreviusMonth; i++) {
        const day = new Day({
          day: i,
          month: previusDate.getMonth(),
          year: previusDate.getFullYear(),
          isOfCurrentMonth: true
        });
        daysArray.push(day);
      }
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Day({
        day: i,
        month: this.currentDate.month,
        year: this.currentDate.year,
        isCurrent: this.selectedDate.compareDate(this.currentDate, i),
        isToday: isToday(i, this.currentDate.month, this.currentDate.year)
      });

      daysArray.push(day);
    }

    if(daysInMonth < 42){
      const nextDate = this.currentDate.getNextDate();
      for (let i = 1; i <= (42-daysInMonth-dayOfWeek); i++) {
        const day = new Day ({
          day: i,
          month: nextDate.getMonth(),
          year: nextDate.getFullYear(),
          isOfCurrentMonth: true
        });

        daysArray.push(day);
      }
    }

    this.daysOfMonth = daysArray;
  }

  generateYearRange(year: number){
    const lastDigit = year % 10;
    const startYear = lastDigit == 0 ? (year - 1) : (year - lastDigit - 1);
    const years = [];

    for (let i = startYear; i <= (startYear + 11); i++) {
      const year = new Year({
        year: i,
        isCurrent: this.currentDate.year == i,
        isToday: isTodayYear(i)
      });

      years.push(year);
    }

    this.startYear = years[1].year;
    this.endYear = years[years.length - 2].year;
    this.yearList = years;

    this.checkMaxDate(true);
    this.checkMinDate(true);
  }

  generateMonths() {
    this.checkMaxDate();
    this.checkMinDate();

    const today = getToday();

    this.monthList.filter(month => month.isCurrent == true || month.isToday == true).forEach(month => {
      month.isCurrent = false;
      month.isToday = false;
    });

    this.monthList[this.selectedDate.month].isCurrent = this.selectedDate.year == this.currentDate.year;
    this.monthList[today.month].isToday = today.year == this.currentDate.year;
  }

  changeMonth(isNext: boolean) {
    const nextIncrement = isNext ? +2 : 0;
    const nextDate = new Date(this.currentDate.year, this.currentDate.month + nextIncrement, 0);
    this.currentDate.setMonthAndYear(nextDate.getMonth(), nextDate.getFullYear());
    this.generateCalendar();
  }

  changeYear(isNext: boolean) {
    isNext ? this.currentDate.incrementYear() : this.currentDate.decrementYear();
    this.generateMonths();
  }

  changeYearRange(isNext: boolean) {
    const yearIndex = isNext ? this.yearList.length - 1 : 0;
    this.generateYearRange(this.yearList[yearIndex].year);
  }

  changeHeaderAndGrid(num: number) {
    switch(num) {
      case 1:
        this.generateCalendar();
        break;
      case 2:
        this.generateMonths();
        break;
      case 3:
        this.generateYearRange(this.currentDate.year);
        break;
    }

    this.currentApresentation = num;
  }

  selectDay(day: Day) {
    this.currentDate.setDate(day);
    this.selectedDate.copyDate(this.currentDate);
    this.placeHolder = this.selectedDate.toString();
    this.propagateChange(this.selectedDate.toString(CultureInfo.EN_US));
    this.generateCalendar();
    this.hideCalendar();
  }

  selectMonth(month: Month) {
    this.currentDate.month = month.num - 1;
    this.changeHeaderAndGrid(1);
  }

  selectYear(year: Year) {
    this.currentDate.year = year.year;
    this.changeHeaderAndGrid(2);
  }

  checkMaxDate(isYearRange: boolean = false) {
    if(!this.max)
      return;

    if(!isYearRange)
      this.isMaxDisabled = this.currentDate.year >= this.max.getFullYear() &&
                           this.currentDate.month >= this.max.getMonth();
    else
      this.isMaxDisabled = this.max.getFullYear() >= this.startYear &&
                           this.max.getFullYear() <= this.endYear;
  }

  checkMinDate(isYearRange: boolean = false) {
    if(!this.min)
      return;

    if(!isYearRange)
      this.isMinDisabled = this.currentDate.year <= this.min.getFullYear() &&
                           this.currentDate.month <= this.min.getMonth();
    else
      this.isMinDisabled = this.min.getFullYear() >= this.startYear &&
                           this.min.getFullYear() <= this.endYear;
  }

  showCalendar(){
    this.changeHeaderAndGrid(1);
    this.isDropped = true;
  }

  hideCalendar(event?: Event){
    const element = event?.target as HTMLElement;

    if(element && element.classList.contains('date-click'))
      return;

    this.isDropped = false;
  }

}
