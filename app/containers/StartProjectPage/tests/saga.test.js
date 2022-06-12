import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import personalDetailsForm, { getProjectDetails } from '../saga';
import { SUBMIT_PROJECT_DETAILS_FORM } from '../constants';

jest.mock('utils/request');

const selectPersonalDetails = {
  name: 'test',
  description: { getCurrentContent: jest.fn() },
  buildStatus: 'test',
  projectUrl: 'test',
  lookingForDesign: ['test'],
  lookingForSoftwareDevelopment: ['test'],
  lookingForDevelopmentTeam: ['test'],
  lookingForDataAiMl: ['test'],
  lookingForGrowthHacking: false,
  lookingForAgileCoach: false,
  lookingForOther: 'test',
  budget: 'test',
  messageToPreSales: { getCurrentContent: jest.fn() },
  speed: 'test',
  teamManageType: 'test',
};

const data = { payload: 'formSubmit' };

const initialState = {
  get: key => initialState[key],
  projectDetails: {
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

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = personalDetailsForm();
    expect(gen.next().value).toEqual(takeLatest(SUBMIT_PROJECT_DETAILS_FORM, getProjectDetails));
  });
});
