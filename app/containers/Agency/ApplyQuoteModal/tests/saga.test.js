import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import request from 'utils/request';
import { takeLatest } from 'redux-saga/effects';
import agencyApplyQuoteForm, { submitQuote } from '../saga';
import { SUBMIT_QUOTE } from '../constants';

jest.mock('utils/request');

const data = { payload: 'submitQuote' };
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

// submitQuote
describe('Testing submitQuote form', () => {
  data.body = {
    assumptions: '<p>data</p>↵',
    effortsBreakdown: { name: 'file.pdf', size: 348928, type: 'application/pdf', webkitRelativePath: '' },
    otherInfo: '<p>data</p>↵',
    outOfScope: '<p>data</p>↵',
    projectId: '5fa401b51730dd0b5aed9c82',
    quoteId: '5fabd8a8bb881c4e9b22da6d',
    projectPlan: { name: 'file.pdf', size: 348928, type: 'application/pdf', webkitRelativePath: '' },
    teamStructure: '<p>data</p>↵',
    totalCost: '<p>data</p>↵',
  };
  data.onSuccess = jest.fn();

  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(submitQuote);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(submitQuote);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'add';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(submitQuote);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(submitQuote);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing submitQuote', () => {
  test('submitQuote', () => {
    const gen = agencyApplyQuoteForm();
    expect(gen.next().value).toEqual(takeLatest(SUBMIT_QUOTE, submitQuote));
  });
});
