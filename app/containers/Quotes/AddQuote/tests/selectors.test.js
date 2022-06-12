import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      addQuoteForm: {
        values: {
          project: '',
          quoteTitle: '',
          quoteDescription: '',
          privacyPolicy: '',
        },
      },
    },
  };

  it('should return project value', () => {
    const expectedResult = state.form.addQuoteForm.values.project;
    expect(selectors.project(state)).toEqual(expectedResult);
  });
  it('should return quoteTitle value', () => {
    const expectedResult = state.form.addQuoteForm.values.quoteTitle;
    expect(selectors.quoteTitle(state)).toEqual(expectedResult);
  });
  it('should return quoteDescription value', () => {
    const expectedResult = state.form.addQuoteForm.values.quoteDescription;
    expect(selectors.quoteDescription(state)).toEqual(expectedResult);
  });
});
