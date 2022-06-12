import { makeSelectEmail } from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectEmail', () => {
    const mockState = {
      talentLogin: {
        email: 'abcd@example.com',
      },
    };
    const result = {
      email: 'abcd@example.com',
    };
    const sel = makeSelectEmail(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'abcd@example.com';
    expect(actual).toEqual(expected);
  });
});
