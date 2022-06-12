import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import verificationEmail, { otpVerify } from '../saga';
import { VERIFY_OTP } from '../constants';

jest.mock('utils/request');

const data = { payload: 'saveForLater' };
const selectRouter = { location: 'test' };
const initialState = {
  get: key => initialState[key],
  router: {
    get: key => selectRouter[key],
  },
  getPersonalDetail: {
    email: 'test',
    otp: 'test',
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

describe('Testing otpVerify', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(otpVerify);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'continue';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(otpVerify);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(otpVerify);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(otpVerify);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = verificationEmail();
    expect(gen.next().value).toEqual(takeLatest(VERIFY_OTP, otpVerify));
  });
});
