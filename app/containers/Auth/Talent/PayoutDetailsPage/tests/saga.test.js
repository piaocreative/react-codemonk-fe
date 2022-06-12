import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import payoutDetailsForm, { getPayoutDetails } from '../saga';
import { SUBMIT_PAYOUT_DETAILS_FORM } from '../constants';

jest.mock('utils/request');

const selectPersonalDetails = {
  bankName: 'test',
  bankAccountNumber: 'test',
  bankCode: 'test',
};

const data = { payload: 'saveForLater' };

const initialState = {
  get: key => initialState[key],
  getPersonalDetail: {
    get: key => selectPersonalDetails[key],
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

describe('Testing getPayoutDetails', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(getPayoutDetails);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'continue';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(getPayoutDetails);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(getPayoutDetails);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(getPayoutDetails);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = payoutDetailsForm();
    expect(gen.next().value).toEqual(takeLatest(SUBMIT_PAYOUT_DETAILS_FORM, getPayoutDetails));
  });
});
