import { makeSelectOTP } from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectOTP', () => {
    const mockState = { otp: '', resend: '' };
    const result = { otp: '123456', resend: '' };
    const sel = makeSelectOTP(mockState);
    const actual = sel.resultFunc(result);
    const expected = '123456';
    expect(actual).toEqual(expected);
  });
});
