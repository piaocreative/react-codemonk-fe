import { makeSelectCertificateDetails } from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectCertificateDetails', () => {
    const mockState = {
      AgencyCertificationForm: {
        certificate: [],
      },
    };
    const result = {
      certificate: [],
    };
    const sel = makeSelectCertificateDetails(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});
