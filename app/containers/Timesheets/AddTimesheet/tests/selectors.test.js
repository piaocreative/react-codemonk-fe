import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      addTimesheetForm: {
        values: {
          talent: '',
          weekStarting: '',
          project: '',
          privacyPolicy: '',
        },
      },
    },
  };

  it('should return talent value', () => {
    const expectedResult = state.form.addTimesheetForm.values.talent;
    expect(selectors.talent(state)).toEqual(expectedResult);
  });
  it('should return weekStarting value', () => {
    const expectedResult = state.form.addTimesheetForm.values.weekStarting;
    expect(selectors.weekStarting(state)).toEqual(expectedResult);
  });
  it('should return project value', () => {
    const expectedResult = state.form.addTimesheetForm.values.project;
    expect(selectors.project(state)).toEqual(expectedResult);
  });
  it('should return privacyPolicy value', () => {
    const expectedResult = state.form.addTimesheetForm.values.privacyPolicy;
    expect(selectors.privacyPolicy(state)).toEqual(expectedResult);
  });
});
