import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import request from 'utils/request';
import { takeLatest } from 'redux-saga/effects';
import hireTalent, { submitHire } from '../saga';
import { SUBMIT_HIRE } from '../constants';

jest.mock('utils/request');

const data = { data: {} };
const selectRouter = { location: 'test' };
const initialState = {
  get: key => initialState[key],
  router: {
    get: key => selectRouter[key],
  },
  email: '',
  password: '',
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

describe('Testing submitHire form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(submitHire);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(submitHire);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(submitHire);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(submitHire);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = hireTalent();
    expect(gen.next().value).toEqual(takeLatest(SUBMIT_HIRE, submitHire));
  });
});
