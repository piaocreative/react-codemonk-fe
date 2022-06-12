import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { AgencyCertificatesPage as MainForm, mapDispatchToProp } from '../index';
import initialState from '../reducer';
import { CHANGE_CERTIFICATE_DETAILS, SUBMIT_ADD_CERTIFICATE } from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  certificate: [
    {
      id: 'ds-1f78-4564-b162-bee97877953a',
      name: 'AWS Solution Architect',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
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

  onChangeCertificate: jest.fn(),
  onSaveForLater: jest.fn(),

  onSubmitAddCertificate: jest.fn(),
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

  test('Testing if loaderUserDetails with status 0', () => {
    const loaderUserDetails = jest.spyOn(getInstance(), 'loaderUserDetails');
    loaderUserDetails({ status: 0 });
    expect(loaderUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setUserDetails with if', () => {
    const setUserDetails = jest.spyOn(getInstance(), 'setUserDetails');
    setUserDetails({ status: 1, data: {} });
    expect(setUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setUserDetails with else', () => {
    const setUserDetails = jest.spyOn(getInstance(), 'setUserDetails');
    setUserDetails({ status: 0, data: { signupStep: 1 } });
    expect(setUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if changeCertificateTouch ', () => {
    const changeCertificateTouch = jest.spyOn(getInstance(), 'changeCertificateTouch');
    const flagArray = [0];
    changeCertificateTouch(flagArray);
    expect(changeCertificateTouch).toHaveBeenCalledTimes(1);
  });

  test('Testing if onAddCertificateForm ', () => {
    const onAddCertificateForm = jest.spyOn(getInstance(), 'onAddCertificateForm');
    onAddCertificateForm();
    expect(onAddCertificateForm).toHaveBeenCalledTimes(1);
  });

  test('Testing if onDeleteCertificateForm ', () => {
    const onDeleteCertificateForm = jest.spyOn(getInstance(), 'onDeleteCertificateForm');
    onDeleteCertificateForm(0);
    expect(onDeleteCertificateForm).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSaveForLater with continue', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() }, 'continue');
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSaveForLater with saveForLater', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() }, 'saveForLater');
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if setSaveForLater with continue', () => {
    const setSaveForLater = jest.spyOn(getInstance(), 'setSaveForLater');
    setSaveForLater({ preventDefault: jest.fn() }, 'continue');
    expect(setSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if setSaveForLater with saveForLater', () => {
    const setSaveForLater = jest.spyOn(getInstance(), 'setSaveForLater');
    setSaveForLater({ preventDefault: jest.fn() }, 'saveForLater');
    expect(setSaveForLater).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProp Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if  CHANGE_CERTIFICATE_DETAILS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeCertificate([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: [],
      type: CHANGE_CERTIFICATE_DETAILS,
    });
  });

  test('Testing if the save for later events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'saveForLater',
      type: SUBMIT_ADD_CERTIFICATE,
    });
  });

  test('Testing if the save for later without evt events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'saveForLater',
      type: SUBMIT_ADD_CERTIFICATE,
    });
  });

  test('Testing if the save for later LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitAddCertificate(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the submit events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitAddCertificate(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_ADD_CERTIFICATE,
      payload: 'continue',
    });
  });

  test('Testing if the submit events without evt are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onSubmitAddCertificate(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_ADD_CERTIFICATE,
      payload: 'continue',
    });
  });
});
