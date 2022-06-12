import React from 'react';
import { shallow } from 'enzyme';
import Emitter from 'utils/emitter';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import initialState from 'containers/Auth/PaymentAndBilling/reducer';
import { CHANGE_CERTIFICATE_DETAILS, SUBMIT_ADD_CERTIFICATE } from 'containers/Auth/Talent/AgencyCertificatesPage//constants';
import { CertificationsTab as MainForm, mapDispatchToProps } from '../CertificationsTab';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  billingType: '',
  companyDetails: {},

  dispatch: jest.fn(),
  handleSubmit: jest.fn(),

  certificate: [],

  invalid: false,
  loading: false,
  responseSuccess: false,
  responseError: false,
  history: { push: jest.fn(), replace: jest.fn() },
  location: {},

  onChangeCertificate: jest.fn(),
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

  test('Testing if toggle with agencyCertificateSaga', () => {
    const component = shallow(<MainForm {...props} />);
    Emitter.emit('agencyCertificateSaga', true);
    expect(component.state('editFlag')).toEqual(false);
  });

  test('Testing if emitter off on component unmount', () => {
    const component = shallow(<MainForm {...props} />);
    jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  test('Testing if setUserDetails ', () => {
    const response = { status: 1 };
    const setCertiDetails = jest.spyOn(getInstance(), 'setCertiDetails');
    setCertiDetails(response);
    expect(setCertiDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setCertiDetails with else', () => {
    const response = { status: 0 };
    const setCertiDetails = jest.spyOn(getInstance(), 'setCertiDetails');
    setCertiDetails(response);
    expect(setCertiDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if changeCertificateTouch', () => {
    const flagArray = [1];
    const changeCertificateTouch = jest.spyOn(getInstance(), 'changeCertificateTouch');
    changeCertificateTouch(flagArray);
    expect(changeCertificateTouch).toHaveBeenCalledTimes(1);
  });

  test('Testing if onAddCertificateForm', () => {
    const onAddCertificateForm = jest.spyOn(getInstance(), 'onAddCertificateForm');
    onAddCertificateForm();
    expect(onAddCertificateForm).toHaveBeenCalledTimes(1);
  });

  test('Testing if onDeleteCertificateForm', () => {
    const onDeleteCertificateForm = jest.spyOn(getInstance(), 'onDeleteCertificateForm');
    onDeleteCertificateForm(0);
    expect(onDeleteCertificateForm).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleEdit', () => {
    const handleEdit = jest.spyOn(getInstance(), 'handleEdit');
    handleEdit(true);
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleCancelButton', () => {
    const handleCancelButton = jest.spyOn(getInstance(), 'handleCancelButton');
    handleCancelButton(true);
    expect(handleCancelButton).toHaveBeenCalledTimes(1);
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

  test('Testing if handleSubmitCertificate with else', () => {
    const event = { preventDefault: jest.fn() };
    const handleSubmitCertificate = jest.spyOn(getInstance(), 'handleSubmitCertificate');
    handleSubmitCertificate(event);
    expect(handleSubmitCertificate).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  CHANGE_BILLING_TYPE are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeCertificate([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: [],
      type: CHANGE_CERTIFICATE_DETAILS,
    });
  });

  test('Testing if the  LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitCertificate(event, []);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the  onSubmitCertificate events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitCertificate(event, []);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_ADD_CERTIFICATE,
      payload: 'editCertificate',
      data: [],
    });
  });
});
