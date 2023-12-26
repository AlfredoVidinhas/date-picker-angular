import { ValidatMinDatePipe } from './validat-min-date.pipe';

describe('ValidatMinDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ValidatMinDatePipe();
    expect(pipe).toBeTruthy();
  });
});
