import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import WorkExperienceForm, { saveForLater, editExperience, addExperience } from '../saga';
import { EXPERIENCE_SAVE_FOR_LATER, EDIT_EXPERIENCE, ADD_EXPERIENCE } from '../constants';

jest.mock('utils/request');

const data = { payload: 'saveForLater' };
const selectRouter = { location: 'test' };
const initialState = {
  get: key => initialState[key],
  router: {
    get: key => selectRouter[key],
  },
  experienceData: [
    {
      id: '9533ace6-1f78-4564-b162-bee97877953a',
      jobTitle: 'Developer',
      employmentType: 'Contract',
      employer: 'Google',
      country: { label: 'Albania', value: 'Albania' },
      startDate: '10/10/2019',
      endDate: '10/10/2020',
      shortDescription: '<p>hello</p>',
    },
  ],
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

describe('Testing saveForLater form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(saveForLater);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
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
  test('WorkExperienceForm', () => {
    const gen = WorkExperienceForm();
    expect(gen.next().value).toEqual(takeLatest(EXPERIENCE_SAVE_FOR_LATER, saveForLater));
  });
});

// editExperience
describe('Testing editExperience form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(editExperience);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(editExperience);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(editExperience);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(editExperience);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setState', () => {
  test('WorkExperienceForm', () => {
    const gen = WorkExperienceForm();
    gen.next();
    expect(gen.next().value).toEqual(takeLatest(EDIT_EXPERIENCE, editExperience));
  });
});

describe('Testing addExperience form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(addExperience);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(addExperience);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(addExperience);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(addExperience);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setState', () => {
  test('WorkExperienceForm', () => {
    const gen = WorkExperienceForm();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(takeLatest(ADD_EXPERIENCE, addExperience));
  });
});
