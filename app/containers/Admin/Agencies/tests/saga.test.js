import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import request from 'utils/request';
import { takeLatest } from 'redux-saga/effects';
import adminAgencyForm, { updateAgencyStatus } from '../saga';
import { CHANGE_AGENCY_STATUS } from '../constants';

jest.mock('utils/request');

const data = { data: { status: 1, agencyUserId: '1234' }, onSuccess: jest.fn() };
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

describe('Testing updateAgencyStatus form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(updateAgencyStatus);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(updateAgencyStatus);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(updateAgencyStatus);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(updateAgencyStatus);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing adminAgencyForm', () => {
  test('adminAgencyForm updateAgencyStatus', () => {
    const gen = adminAgencyForm();
    expect(gen.next().value).toEqual(takeLatest(CHANGE_AGENCY_STATUS, updateAgencyStatus));
  });
});
