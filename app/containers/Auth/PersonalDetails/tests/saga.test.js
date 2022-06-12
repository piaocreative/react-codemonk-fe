import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import personalDetailsForm, { getPersonalDetails, editPersonalDetails } from '../saga';
import { SUBMIT_PERSONAL_DETAILS_FORM, EDIT_PERSONAL_DETAILS_FORM } from '../constants';

jest.mock('utils/request');

const selectPersonalDetails = {
  firstName: 'test',
  lastName: 'test',
  countryCode: 'test',
  phoneNumber: 'test',
  dob: 'test',
  gender: 'test',
  postcode: 'test',
  addressLineOne: 'test',
  addressLineTwo: 'test',
  city: 'test',
  country: 'test',
  state: 'test',
  timeZone: 'test',
  language: [{ value: 'test', rating: 'test' }],
  linkedInProfile: 'test',
  githubProfile: 'test',
  stackoverflowProfile: 'test',
  primaryRole: 'test',
  yearsOfExperience: 'test',
  dribbbleProfile: 'test',
  behanceProfile: 'test',
  personalProfile: 'test',
};

const data = { payload: 'saveForLater', userData: {} };

const initialState = {
  get: key => initialState[key],
  getPersonalDetail: {
    get: key => selectPersonalDetails[key],
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

describe('Testing getPersonalDetails', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(getPersonalDetails);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'continue';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(getPersonalDetails);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(getPersonalDetails);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(getPersonalDetails);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = personalDetailsForm();
    expect(gen.next().value).toEqual(takeLatest(SUBMIT_PERSONAL_DETAILS_FORM, getPersonalDetails));
  });
});

// editPersonalDetails
describe('Testing editPersonalDetails form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(editPersonalDetails);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(editPersonalDetails);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(editPersonalDetails);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(editPersonalDetails);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing editPersonalDetails', () => {
  test('editPersonalDetails', () => {
    const gen = personalDetailsForm();
    gen.next();
    expect(gen.next().value).toEqual(takeLatest(EDIT_PERSONAL_DETAILS_FORM, editPersonalDetails));
  });
});
