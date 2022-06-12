import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import verification, { getVerification, resendOtp } from '../saga';
import { VERIFY, RESEND_CODE } from '../../../App/constants';

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

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = verification();
    expect(gen.next().value).toEqual(takeLatest(VERIFY, getVerification));
    expect(gen.next().value).toEqual(takeLatest(RESEND_CODE, resendOtp));
  });
});
