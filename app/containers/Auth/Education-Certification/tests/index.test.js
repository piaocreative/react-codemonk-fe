import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { EducationCertification as MainForm, mapDispatchToProp } from '../index';
import initialState from '../reducer';
import {
  CHANGE_EDUCATION_DETAILS,
  CHANGE_CERTIFICATE_DETAILS,
  CHANGE_COLLEGE,
  CHANGE_COUNTRY,
  CHANGE_START_YEAR,
  CHANGE_END_YEAR,
  CHANGE_DEGREE_TITLE,
  CHANGE_DEGREE_LEVEL,
  CHANGE_CERTIFICATE_NAME,
  CHANGE_ORGANISATION,
  CHANGE_DATE_OBTAINED,
  CHANGE_CERTIFICATE_URL,
  SAVE_FOR_LATER,
} from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  education: [
    {
      id: 'dsder-1f78-4564-b162-bee97877953a',
      degreeLevel: 'Master’s or Higher',
      degreeTitle: 'Master in Computer Application',
      collegeName: 'IETE, New Delhi',
      country: 'India',
      startYear: '14/06/2019',
      endYear: '14/06/2020',
    },
  ],
  certificate: [
    {
      id: 'ds-1f78-4564-b162-bee97877953a',
      name: 'AWS Solution Architect',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
      certificateId: 'ABC123',
    },
  ],
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),

  invalid: false,
  loading: false,
  responseSuccess: false,
  responseError: false,
  onReset: jest.fn(),
  history: { push: jest.fn(), replace: jest.fn() },
  location: {},

  onChangeEducation: jest.fn(),
  onChangeCertificate: jest.fn(),
  onSaveForLater: jest.fn(),
  onSubmitEducationForm: jest.fn(),

  onAddEducationForm: jest.fn(),
  onAddCertificateForm: jest.fn(),
  onDeleteEducationForm: jest.fn(),
  onDeleteCertificateForm: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if fetchFieldValues with status 0', () => {
    const fetchFieldValues = jest.spyOn(getInstance(), 'fetchFieldValues');
    fetchFieldValues({ status: 0 });
    expect(fetchFieldValues).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSaveForLater ', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() });
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProp Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  CHANGE_EDUCATION_DETAILS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeEducation([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: [],
      type: CHANGE_EDUCATION_DETAILS,
    });
  });
  test('Testing if  CHANGE_CERTIFICATE_DETAILS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeCertificate([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: [],
      type: CHANGE_CERTIFICATE_DETAILS,
    });
  });

  test('Testing if change colleage are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onChangeCollege(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COLLEGE,
    });
  });

  test('Testing if change country are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onChangeCountry(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COUNTRY,
    });
  });

  test('Testing if change start year are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onChangeStartYear(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_START_YEAR,
    });
  });

  test('Testing if change end year are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onChangeEndYear(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_END_YEAR,
    });
  });

  test('Testing if change degree title are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProp(dispatch).onChangeDegreeTitle(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_DEGREE_TITLE,
    });
  });

  test('Testing if change degree level are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onChangeDegreeLevel(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_DEGREE_LEVEL,
    });
  });

  test('Testing if change certificate name are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onChangeCertificateName(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_CERTIFICATE_NAME,
    });
  });

  test('Testing if change organisation name are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProp(dispatch).onChangeOrganisation(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_ORGANISATION,
    });
  });

  test('Testing if change date obtained are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onChangeDateObtained(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_DATE_OBTAINED,
    });
  });

  test('Testing if change certificate url name are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProp(dispatch).onChangeCertificateURL(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_CERTIFICATE_URL,
    });
  });

  test('Testing if the save for later events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'saveForLater',
      type: SAVE_FOR_LATER,
    });
  });

  test('Testing if education submit event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitAddEducationForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if certificate submit event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitAddCertificateForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
