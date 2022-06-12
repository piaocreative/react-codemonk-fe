import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { VERIFY_PHONE_OTP } from 'containers/App/constants';
import { RESEND_PHONE_CODE } from '../constants';
import verification, { getVerification, resendOtp } from '../saga';

jest.mock('utils/request');

const data = {
  method: 'PUT',
  body: {
    otp: '123456',
  },
};
const selectRouter = { location: 'test' };
const initialState = {
  get: key => initialState[key],
  router: {
    get: key => selectRouter[key],
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

describe('Testing getVerification', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(getVerification);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'continue';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(getVerification);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(getVerification);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(getVerification);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing resendOtp', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(resendOtp);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'continue';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(resendOtp);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(resendOtp);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(resendOtp);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing verification', () => {
  test('verification', () => {
    const gen = verification();
    expect(gen.next().value).toEqual(takeLatest(VERIFY_PHONE_OTP, getVerification));
    expect(gen.next().value).toEqual(takeLatest(RESEND_PHONE_CODE, resendOtp));
  });
});
