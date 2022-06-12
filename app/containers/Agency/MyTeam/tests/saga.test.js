import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import request from 'utils/request';
import { takeLatest } from 'redux-saga/effects';
import agencyTalentForm, { changeTalent } from '../saga';
import { CHANGE_TALENT } from '../constants';

jest.mock('utils/request');

const data = { payload: 'edit', data: { id: '123456789' } };
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

describe('Testing changeTalent form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(changeTalent);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    data.data = { registrationType: 'individual' };
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(changeTalent);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(changeTalent);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(changeTalent);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing changeTalent', () => {
  test('changeTalent', () => {
    const gen = agencyTalentForm();
    expect(gen.next().value).toEqual(takeLatest(CHANGE_TALENT, changeTalent));
  });
});
