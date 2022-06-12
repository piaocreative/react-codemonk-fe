import * as functions from '../utils';

describe('check for selectStyle', () => {
  test('Testing if CalendarNavbar ', () => {
    const CalendarNavbar = jest.spyOn(functions, 'CalendarNavbar');
    CalendarNavbar({ onPreviousClick: jest.fn(), onNextClick: jest.fn(), month: 1 });
    expect(CalendarNavbar).toHaveBeenCalledTimes(1);
  });

  test('Testing if CalendarWeekday ', () => {
    const params = {
      weekday: 'monday',
      className: 'cssClass',
      localeUtils: {
        formatWeekdayLong: () => 'Monday',
      },
      locale: 'EN',
    };
    const CalendarWeekday = jest.spyOn(functions, 'CalendarWeekday');
    CalendarWeekday(params);
    expect(CalendarWeekday).toHaveBeenCalledTimes(1);
  });
});
