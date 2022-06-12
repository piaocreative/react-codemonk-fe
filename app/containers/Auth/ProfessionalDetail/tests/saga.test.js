import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import request from 'utils/request';
import { takeLatest } from 'redux-saga/effects';
import professionalForm, { saveForLater, editProfessionURL } from '../saga';
import { SAVE_FOR_LATER, EDIT_PROFESSIONAL_URL } from '../constants';

jest.mock('utils/request');

const data = { payload: 'saveForLater', data: {} };
const selectRouter = { location: 'test' };
const initialState = {
  get: key => initialState[key],
  router: {
    get: key => selectRouter[key],
  },
  inviteMails: [{ name: '', email: '' }],
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

// saveForLater
describe('Testing saveForLater form', () => {
  data.payload = 'saveForLater';
  data.data = {
    briefHTML: '',
    linkedInProfile: '',
    githubProfile: '',
    stackoverflowProfile: '',
    primaryRole: '',
    yearsOfExperience: '',
    skills: '',
  };
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(saveForLater);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(saveForLater);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
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

describe('Testing saveForLater', () => {
  test('saveForLater', () => {
    const gen = professionalForm();
    expect(gen.next().value).toEqual(takeLatest(SAVE_FOR_LATER, saveForLater));
  });
});

// editProfessionURL
describe('Testing editProfessionURL form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(editProfessionURL);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(editProfessionURL);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(editProfessionURL);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(editProfessionURL);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing editProfessionURL', () => {
  test('editProfessionURL', () => {
    const gen = professionalForm();
    gen.next();
    // gen.next();
    // gen.next();
    expect(gen.next().value).toEqual(takeLatest(EDIT_PROFESSIONAL_URL, editProfessionURL));
  });
});
