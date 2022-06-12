import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      AdminInterviewDetail: {
        values: {
          status: '',
        },
      },
    },
  };

  it('should return status value', () => {
    const expectedResult = state.form.AdminInterviewDetail.values.status;
    expect(selectors.status(state)).toEqual(expectedResult);
  });
});
