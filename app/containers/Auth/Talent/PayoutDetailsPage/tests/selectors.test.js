import { makeSelectBankName, makeSelectAccountNumber, makeSelectBankCode } from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectBankName', () => {
    const mockState = {
      professionalForm: {
        bankName: '',
        bankAccountNumber: '',
        bankCode: '',
      },
    };
    const result = {
      bankName: '',
      bankAccountNumber: '',
      bankCode: '',
    };
    const sel = makeSelectBankName(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectAccountNumber', () => {
    const mockState = {
      professionalForm: {
        bankName: '',
        bankAccountNumber: '',
        bankCode: '',
      },
    };
    const result = {
      bankName: '',
      bankAccountNumber: '',
      bankCode: '',
    };
    const sel = makeSelectAccountNumber(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectBankCode', () => {
    const mockState = {
      professionalForm: {
        bankName: '',
        bankAccountNumber: '',
        bankCode: '',
      },
    };
    const result = {
      bankName: '',
      bankAccountNumber: '',
      bankCode: '',
    };
    const sel = makeSelectBankCode(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
