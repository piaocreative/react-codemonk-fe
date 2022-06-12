import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import request from 'utils/request';
import { takeLatest } from 'redux-saga/effects';
import personalDetailsForm, { addTalent, updateStatus, editAdminProject } from '../saga';
import { ADD_TALENT, CHANGE_TALENT_STATUS, EDIT_PROJECT_DETAILS } from '../constants';

jest.mock('utils/request');

const data = { payload: 'addTalent' };
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

describe('Testing addTalent form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(addTalent);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(addTalent);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(addTalent);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(addTalent);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = personalDetailsForm();
    expect(gen.next().value).toEqual(takeLatest(ADD_TALENT, addTalent));
  });
});

describe('Testing updateStatus form', () => {
  data.body = {};
  data.onSuccess = jest.fn();
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(updateStatus);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(updateStatus);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(updateStatus);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(updateStatus);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = personalDetailsForm();
    gen.next();
    expect(gen.next().value).toEqual(takeLatest(CHANGE_TALENT_STATUS, updateStatus));
  });
});

// editAdminProject tests
describe('Testing editAdminProject form', () => {
  data.body = {};
  data.onSuccess = jest.fn();
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(editAdminProject);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(editAdminProject);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(editAdminProject);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(editAdminProject);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing editAdminProject', () => {
  test('editAdminProject', () => {
    const gen = personalDetailsForm();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(takeLatest(EDIT_PROJECT_DETAILS, editAdminProject));
  });
});
