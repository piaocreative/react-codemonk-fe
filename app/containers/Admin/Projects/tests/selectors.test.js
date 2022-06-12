import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      AdminProjects: {
        values: {
          clientName: '',
          projectName: '',
          projectSummary: '',
          startDate: '',
          endDate: '',
          status: '',
        },
      },
    },
  };

  it('should return clientName value', () => {
    const expectedResult = state.form.AdminProjects.values.clientName;
    expect(selectors.clientName(state)).toEqual(expectedResult);
  });
  it('should return projectName value', () => {
    const expectedResult = state.form.AdminProjects.values.projectName;
    expect(selectors.projectName(state)).toEqual(expectedResult);
  });
  it('should return projectSummary value', () => {
    const expectedResult = state.form.AdminProjects.values.projectSummary;
    expect(selectors.projectSummary(state)).toEqual(expectedResult);
  });
  it('should return startDate value', () => {
    const expectedResult = state.form.AdminProjects.values.startDate;
    expect(selectors.startDate(state)).toEqual(expectedResult);
  });
  it('should return endDate value', () => {
    const expectedResult = state.form.AdminProjects.values.endDate;
    expect(selectors.endDate(state)).toEqual(expectedResult);
  });
  it('should return status value', () => {
    const expectedResult = state.form.AdminProjects.values.status;
    expect(selectors.status(state)).toEqual(expectedResult);
  });
});

describe('Selectors Testing', () => {
  it('Testing makeSelectProjectStatus', () => {
    const mockState = {
      personalDetails: {
        status: '',
      },
    };
    const result = {
      status: '',
    };
    const sel = selectors.makeSelectProjectStatus(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
