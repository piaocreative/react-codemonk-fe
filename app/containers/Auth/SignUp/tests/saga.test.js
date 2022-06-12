import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import request from 'utils/request';
import { getSignup } from '../saga';

jest.mock('utils/request');

const data = { payload: 'getSignup' };
const selectRouter = { location: 'test' };
const initialState = {
  get: key => initialState[key],
  router: {
    get: key => selectRouter[key],
  },
  signupForm: {
    email: 'developer@mailinator.com',
    password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
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

describe('Testing signup form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(getSignup);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(getSignup);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(getSignup);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(getSignup);
    expect(request).toHaveBeenCalled();
  });
});
