/* eslint-disable prettier/prettier */
import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import salaryBillSubmitForm, { submitSalaryBillForm, submitSalaryBillLater } from '../saga';
import { SAVE_FOR_LATER, SUBMIT_SALARYBILL_FORM } from '../constants';

jest.mock('utils/request');

const selectBillDetails = {
  employmentType: ['test'],
  currencyAnnualRate: {
    label: 'test',
    value: 'test',
  },
  annualRate: 'test',
  currency: {
    label: 'test',
    value: 'test',
  },
  ratePerHour: 'test',
  billingType: 'test',
  companyName: 'test',
  companyregisteredNumber: 'test',
  companyPincode: 'test',
  companyCity: 'test',
  companyCountry: 'test',
  companyAddressLineOne: 'test',
  companyAddressLineTwo: 'test',
  website: 'test',
  vatNumber: 'test',
  companyLogo: 'test',
  companyState: 'test',
  currencyCompanyProfessionInsuranceValue: {
    label: 'test',
    value: 'test',
  },
  companyProfessionInsuranceValue: 'test',
  currencyCompanyPublicInsurancesValue: {
    label: 'test',
    value: 'test',
  },
  companyPublicInsurancesValue: 'test',
  currencyCompanyEmployerInsuranceValue: {
    label: 'test',
    value: 'test',
  },
  companyEmployerInsuranceValue: 'test',
};

const data = { payload: 'saveForLater', userData: {} };

const initialState = {
  get: key => initialState[key],
  getPersonalDetail: {
    get: key => selectBillDetails[key],
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);
export async function recordSaga(saga) {
  const dispatched = [];
  await runSaga(
    {
      dispatch: action => dispatched.push(action),
      getState() {
        return store.getState();
      },
    },
    saga,
    data,
  ).done;

  return dispatched;
}

describe('Testing salary and bill functions', () => {
  it('Request submitSalaryBillForm With Status One', async () => {
    data.payload = 'continue';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(submitSalaryBillForm);
    expect(request).toHaveBeenCalled();
  });
  it('Request submitSalaryBillForm With Status zero', async () => {
    data.payload = 'continue';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(submitSalaryBillForm);
    expect(request).toHaveBeenCalled();
  });
  it('Request submitSalaryBillLater With Status One', async () => {
    data.payload = 'saveForLater';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(submitSalaryBillLater);
    expect(request).toHaveBeenCalled();
  });
  it('Request submitSalaryBillLater With Status zero', async () => {
    data.payload = 'saveForLater';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(submitSalaryBillLater);
    expect(request).toHaveBeenCalled();
  });
  it('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(submitSalaryBillForm);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing salaryBillSubmitForm', () => {
  it('salaryBillSubmitForm', () => {
    const gen = salaryBillSubmitForm();
    expect(gen.next().value).toEqual(takeLatest(SUBMIT_SALARYBILL_FORM, submitSalaryBillForm));
    expect(gen.next().value).toEqual(takeLatest(SAVE_FOR_LATER, submitSalaryBillLater));
  });
});
