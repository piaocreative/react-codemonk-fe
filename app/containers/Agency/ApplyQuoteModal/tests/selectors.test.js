import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      Agency_Apply_Quote: {
        values: {
          assumptions: '',
          outOfScope: '',
          teamStructure: '',
          totalCost: '',
          additionalInfo: '',
          projectPlan: '',
          effortsBreakdown: '',
        },
      },
    },
  };

  it('should return assumptions value', () => {
    const expectedResult = state.form.Agency_Apply_Quote.values.assumptions;
    expect(selectors.assumptions(state)).toEqual(expectedResult);
  });
  it('should return outOfScope value', () => {
    const expectedResult = state.form.Agency_Apply_Quote.values.outOfScope;
    expect(selectors.outOfScope(state)).toEqual(expectedResult);
  });
  it('should return teamStructure value', () => {
    const expectedResult = state.form.Agency_Apply_Quote.values.teamStructure;
    expect(selectors.teamStructure(state)).toEqual(expectedResult);
  });
  it('should return totalCost value', () => {
    const expectedResult = state.form.Agency_Apply_Quote.values.totalCost;
    expect(selectors.totalCost(state)).toEqual(expectedResult);
  });
  it('should return additionalInfo value', () => {
    const expectedResult = state.form.Agency_Apply_Quote.values.additionalInfo;
    expect(selectors.additionalInfo(state)).toEqual(expectedResult);
  });
  it('should return projectPlan value', () => {
    const expectedResult = state.form.Agency_Apply_Quote.values.projectPlan;
    expect(selectors.projectPlan(state)).toEqual(expectedResult);
  });
  it('should return effortsBreakdown value', () => {
    const expectedResult = state.form.Agency_Apply_Quote.values.effortsBreakdown;
    expect(selectors.effortsBreakdown(state)).toEqual(expectedResult);
  });
});
