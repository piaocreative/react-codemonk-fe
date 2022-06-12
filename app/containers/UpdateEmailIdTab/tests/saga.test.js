import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import request from 'utils/request';
import { takeLatest } from 'redux-saga/effects';
import chaneEmailAddressForm, { sendCode, verifyCode } from '../saga';
import { SEND_CODE, VERIFY_CODE } from '../constants';

jest.mock('utils/request');

const data = { payload: 'sendCode', data: { emailAddress: '', otp: '' } };
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

// sendCode
describe('Testing sendCode form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(sendCode);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    data.data = { registrationType: 'individual' };
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(sendCode);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(sendCode);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(sendCode);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing chaneEmailAddressForm', () => {
  test('chaneEmailAddressForm', () => {
    const gen = chaneEmailAddressForm();
    expect(gen.next().value).toEqual(takeLatest(SEND_CODE, sendCode));
  });
});

// verifyCode
describe('Testing verifyCode form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(verifyCode);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    data.data = { registrationType: 'individual' };
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(verifyCode);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(verifyCode);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(verifyCode);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing chaneEmailAddressForm', () => {
  test('chaneEmailAddressForm', () => {
    const gen = chaneEmailAddressForm();
    gen.next();
    expect(gen.next().value).toEqual(takeLatest(VERIFY_CODE, verifyCode));
  });
});
