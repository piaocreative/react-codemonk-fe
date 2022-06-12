import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { SUBMIT_ENTER_PHONE_PAGE_FORM } from '../constants';
import enterPhonePage, { submitPhonePageForm } from '../saga';

jest.mock('utils/request');

const data = {
  method: 'PUT',
  body: {
    countryCode: '91',
    phoneNumber: '1234567890',
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

describe('Testing submitPhonePageForm', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(submitPhonePageForm);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'continue';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(submitPhonePageForm);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(submitPhonePageForm);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(submitPhonePageForm);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing enterPhonePage', () => {
  test('enterPhonePage', () => {
    const gen = enterPhonePage();
    expect(gen.next().value).toEqual(takeLatest(SUBMIT_ENTER_PHONE_PAGE_FORM, submitPhonePageForm));
  });
});
