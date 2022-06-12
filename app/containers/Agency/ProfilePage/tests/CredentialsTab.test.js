import React from 'react';
import { shallow } from 'enzyme';
import Emitter from 'utils/emitter';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import initialState from 'containers/Auth/PaymentAndBilling/reducer';
import { SUBMIT_ADD_CERTIFICATE } from 'containers/Auth/Talent/AgencyCertificatesPage//constants';
import { CredentialsTab as MainForm, mapDispatchToProps } from '../CredentialsTab';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  billingType: '',
  companyDetails: {},

  dispatch: jest.fn(),
  handleSubmit: jest.fn(),

  linkedInUrl: '',
  gitHubUrl: '',
  dribbbleUrl: '',
  clutchUrl: '',
  goodfirmsUrl: '',
  otherWebsiteUrl: '',

  invalid: false,
  loading: false,
  responseSuccess: false,
  responseError: false,
  history: { push: jest.fn(), replace: jest.fn() },
  location: {},

  onSubmitCredentials: jest.fn(),
  onSubmitCertificate: jest.fn(),
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

  test('Testing if toggle with agencyCredentialsSaga', () => {
    const component = shallow(<MainForm {...props} />);
    Emitter.emit('agencyCredentialsSaga', true);
    expect(component.state('editFlag')).toEqual(false);
  });

  test('Testing if emitter off on component unmount', () => {
    const component = shallow(<MainForm {...props} />);
    jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyDetails ', () => {
    const response = { status: 1 };
    const setAgencyDetails = jest.spyOn(getInstance(), 'setAgencyDetails');
    setAgencyDetails(response);
    expect(setAgencyDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyDetails with else', () => {
    const response = { status: 0 };
    const setAgencyDetails = jest.spyOn(getInstance(), 'setAgencyDetails');
    setAgencyDetails(response);
    expect(setAgencyDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleEditCreds', () => {
    const handleEditCreds = jest.spyOn(getInstance(), 'handleEditCreds');
    handleEditCreds(true);
    expect(handleEditCreds).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleCredCancelButton', () => {
    const handleCredCancelButton = jest.spyOn(getInstance(), 'handleCredCancelButton');
    handleCredCancelButton(true);
    expect(handleCredCancelButton).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSubmitButton ', () => {
    const handleSubmitButton = jest.spyOn(getInstance(), 'handleSubmitButton');
    handleSubmitButton(false, true);
    expect(handleSubmitButton).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSubmitButton with else', () => {
    const handleSubmitButton = jest.spyOn(getInstance(), 'handleSubmitButton');
    handleSubmitButton(true, true);
    expect(handleSubmitButton).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSubmitCertificate ', () => {
    const event = { preventDefault: jest.fn() };
    const handleSubmitCertificate = jest.spyOn(getInstance(), 'handleSubmitCertificate');
    handleSubmitCertificate(event);
    expect(handleSubmitCertificate).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderCredFooter ', () => {
    const handleSubmit = jest.fn();
    const loading = false;
    const invalid = false;
    const editFlag = true;
    const renderCredFooter = jest.spyOn(getInstance(), 'renderCredFooter');
    renderCredFooter(handleSubmit, loading, invalid, editFlag);
    expect(renderCredFooter).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the  LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitCredentials(event, {});
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the  onSubmitCredentials events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitCredentials(event, {});
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_ADD_CERTIFICATE,
      payload: 'editCredentials',
      data: {},
    });
  });
});
