export class Day {
  day: number = 0;
  month: number = 0;
  year: number = 0;
  isCurrent: boolean = false;
  isToday: boolean = false;
  isOfCurrentMonth: boolean = false;

  constructor(init: Partial<Day>) {
    Object.assign(this, init)
  }
}

export class Month {
  num: number = 0;
  name: string = '';
  isCurrent: boolean = false;
  isToday: boolean = false;

  constructor(init: Partial<Month>) {
    Object.assign(this, init)
  }
}

export class Year {
  year: number = 0;
  isCurrent: boolean = false;
  isToday: boolean = false;

  constructor(init: Partial<Year>) {
    Object.assign(this, init)
  }
}
