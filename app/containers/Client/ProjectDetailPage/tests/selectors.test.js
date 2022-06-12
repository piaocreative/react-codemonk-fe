import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      projectDetailsForm: {
        values: {
          talentName: '',
          startDate: '',
          endDate: '',
        },
      },
    },
  };

  it('should return talentName value', () => {
    const expectedResult = state.form.projectDetailsForm.values.talentName;
    expect(selectors.talentName(state)).toEqual(expectedResult);
  });
  it('should return startDate value', () => {
    const expectedResult = state.form.projectDetailsForm.values.startDate;
    expect(selectors.startDate(state)).toEqual(expectedResult);
  });
  it('should return endDate value', () => {
    const expectedResult = state.form.projectDetailsForm.values.endDate;
    expect(selectors.endDate(state)).toEqual(expectedResult);
  });
});

describe('Selectors Testing', () => {
  it('Testing makeSelectTalentStatus', () => {
    const mockState = {
      professionalForm: {
        status: '',
      },
    };
    const result = {
      status: '',
    };
    const sel = selectors.makeSelectTalentStatus(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
