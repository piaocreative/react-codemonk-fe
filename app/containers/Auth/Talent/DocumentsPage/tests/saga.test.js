import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import keyProjectForm, { saveForLater } from '../saga';
import { SAVE_FOR_LATER } from '../constants';

jest.mock('utils/request');

const data = { payload: 'saveForLater' };
const selectRouter = { location: 'test' };
const initialState = {
  get: key => initialState[key],
  router: {
    get: key => selectRouter[key],
  },
  keyProjectForm: {
    brief: 'test',
    briefHTML: 'test',
    linkedInProfile: 'test',
    githubProfile: 'test',
    stackoverflowProfile: 'test',
    primaryRole: 'test',
    experience: 'test',
    skills: [{ value: 'test', rating: 'test' }],
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

describe('Testing getProfessionalDetails', () => {
  test('Request With Status One', async () => {
    data.payload = 'saveForLater';
    data.validationData = { validatePaymentRate: 1 };
    request.mockImplementation(() => Promise.resolve({ payload: 'saveForLater', validationData: { validatePaymentRate: 1 } }));
    await recordSaga(saveForLater);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    data.validationData = { validatePaymentRate: 1 };
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(saveForLater);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(saveForLater);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(saveForLater);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setState', () => {
  test('setStateLicenseInformations', () => {
    const gen = keyProjectForm();
    expect(gen.next().value).toEqual(takeLatest(SAVE_FOR_LATER, saveForLater));
  });
});
