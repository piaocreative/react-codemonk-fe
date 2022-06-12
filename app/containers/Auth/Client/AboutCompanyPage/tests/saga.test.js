import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import aboutCompanyForm, { getAboutCompanyDetails } from '../saga';
import { SUBMIT_ABOUT_COMPANY_FORM } from '../constants';

jest.mock('utils/request');

const data = { payload: 'getAboutCompanyDetails' };
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

describe('Testing setState', () => {
  test('aboutCompanyForm', () => {
    const gen = aboutCompanyForm();
    expect(gen.next().value).toEqual(takeLatest(SUBMIT_ABOUT_COMPANY_FORM, getAboutCompanyDetails));
  });
});
