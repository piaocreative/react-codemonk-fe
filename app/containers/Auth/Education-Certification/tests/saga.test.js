import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import educationDetailsForm, { saveForLater, editEducation, addEducation, addCertificate, editCertificate } from '../saga';
import { SAVE_FOR_LATER, EDIT_EDUCATION, EDIT_CERTIFICATE, ADD_EDUCATION, ADD_CERTIFICATE } from '../constants';

jest.mock('utils/request');

const data = { payload: 'saveForLater' };
const selectRouter = { location: 'test' };
const initialState = {
  get: key => initialState[key],
  router: {
    get: key => selectRouter[key],
  },
  educationDetails: [
    {
      degreeLevel: 'Master’s or Higher',
      degreeTitle: 'Master in Computer Application',
      collegeName: 'IETE, New Delhi',
      country: 'India',
      startDate: '14/06/2019',
      endDate: '14/06/2020',
    },
  ],
  certificateDetails: [
    {
      name: 'AWS Solution Architect',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
      certificateId: 'ABC123',
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

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = educationDetailsForm();
    expect(gen.next().value).toEqual(takeLatest(SAVE_FOR_LATER, saveForLater));
  });
});

describe('Testing editEducation form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(editEducation);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(editEducation);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(editEducation);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(editEducation);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = educationDetailsForm();
    gen.next();
    expect(gen.next().value).toEqual(takeLatest(EDIT_EDUCATION, editEducation));
  });
});

describe('Testing editCertificate form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(editCertificate);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(editCertificate);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(editCertificate);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(editCertificate);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = educationDetailsForm();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(takeLatest(EDIT_CERTIFICATE, editCertificate));
  });
});

describe('Testing addEducation form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(addEducation);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(addEducation);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(addEducation);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(addEducation);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = educationDetailsForm();
    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(takeLatest(ADD_EDUCATION, addEducation));
  });
});

describe('Testing addCertificate form', () => {
  test('Request With Status One', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(addCertificate);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status One', async () => {
    data.payload = 'submitForm';
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    await recordSaga(addCertificate);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Status Zero', async () => {
    data.payload = 'test';
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(addCertificate);
    expect(request).toHaveBeenCalled();
  });
  test('Request With Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(addCertificate);
    expect(request).toHaveBeenCalled();
  });
});

describe('Testing setStateLicenseInformations', () => {
  test('setStateLicenseInformations', () => {
    const gen = educationDetailsForm();
    gen.next();
    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().value).toEqual(takeLatest(ADD_CERTIFICATE, addCertificate));
  });
});
