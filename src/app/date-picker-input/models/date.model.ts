import { CultureInfo } from '../enums/culture-info.enum';
import { Day, Year } from './date-picker.model';

export class DateModel {
  private _year: number = 0;
  private _month: number = 0;
  private _day: number = 0;

  constructor() {

  }

  init(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  public get year() {
    return this._year
  }

  public set year(year: number) {
    this._year = year;
  }

  public get month() {
    return this._month
  }

  public set month(month: number) {
    this._month = month;
  }

  public get day() {
    return this._day
  }

  public set day(day: number) {
    this._day = day;
  }

  setDate(date: Day){
    this.day = date.day;
    this.month = date.month;
    this.year = date.year;
  }

  setMonthAndYear(month: number, year: number) {
    this.month = month;
    this.year = year;
  }

  copyDate(date: DateModel) {
    this.day = date.day;
    this.month = date.month;
    this.year = date.year;
  }

  compareDate(date: DateModel, day?: number): boolean {
    return this.day == (day || date.day) && this.month == date.month && this.year == date.year;
  }

  incrementYear() {
    this.year++;
  }

  decrementYear() {
    this.year--;
  }

  getMonthLength(): number {
    return new Date(this.year, this.month + 1, 0).getDate();
  }

  getDayOfWeek(): number {
    return new Date(this.year, this.month).getDay();
  }

  getPreviusMonthLength(): number {
    return new Date(this.year, this.month, 0).getDate();
  }

  getNextDate(): Date {
    return new Date(this.year, this.month + 2, 0);
  }

  getPreviusDate(): Date {
    return new Date(this.year, this.month, 0);
  }

  toString(type: CultureInfo = CultureInfo.PT_PT): string {
    const day = ('0' + this.day).slice(-2);
    const month = ('0' + (this.month + 1)).slice(-2);

    switch(type) {
      case CultureInfo.EN_US:
        return  this.year + '-' + month + '-' + day;

      case CultureInfo.PT_PT:
      default:
        return  day + '/' + month + '/' + this.year;
    }

  }

}
