import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import companyLocationForm, { getCompanyLocations } from '../saga';
import { SUBMIT_COMPANY_LOCATION_FORM } from '../constants';

jest.mock('utils/request');

const data = { payload: 'getCompanyLocations' };
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

describe('Testing getCompanyLocations form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(getCompanyLocations);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(getCompanyLocations);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(getCompanyLocations);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(getCompanyLocations);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setState', () => {
  test('companyLocationForm', () => {
    const gen = companyLocationForm();
    expect(gen.next().value).toEqual(takeLatest(SUBMIT_COMPANY_LOCATION_FORM, getCompanyLocations));
  });
});
