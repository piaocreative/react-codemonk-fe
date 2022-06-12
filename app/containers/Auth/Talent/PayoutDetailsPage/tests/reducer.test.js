import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      bankName: '',
      bankAccountNumber: '',
      bankCode: '',
    },
    config,
  );
describe('Personal detail reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle CHANGE_BANKNAME', () => {
    const newData = initialState;
    newData.bankName = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_BANKNAME,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle CHANGE_ACCOUNT_NUMBER', () => {
    const newData = initialState;
    newData.bankAccountNumber = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_ACCOUNT_NUMBER,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle CHANGE_BANK_CODE', () => {
    const newData = initialState;
    newData.bankCode = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_BANK_CODE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
});
