import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { DocumentsPage as MainForm, mapDispatchToProp } from '../index';

configure({ adapter: new Adapter() });

jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  invalid: '',
  loading: false,
  history: { push: jest.fn() },
  dispatch: jest.fn(),
  onSaveForLater: jest.fn(),
  onSubmitPaymentForm: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore();
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('PaymentAndBilling Component', () => {
  test('If the Component Renders Without Crashing', () => {
    const wrapper = shallow(<MainForm store={store} {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if callFetchAPI', () => {
    const callFetchAPI = jest.spyOn(getInstance(), 'callFetchAPI');
    callFetchAPI();
    expect(callFetchAPI).toHaveBeenCalledTimes(1);
  });

  test('Testing if fetchFieldValues', () => {
    const fetchFieldValues = jest.spyOn(getInstance(), 'fetchFieldValues');
    const response = {};
    fetchFieldValues(response);
    expect(fetchFieldValues).toHaveBeenCalledTimes(1);
  });

  test('Testing if setPaymentData', () => {
    const setPaymentData = jest.spyOn(getInstance(), 'setPaymentData');
    const data = {};
    setPaymentData(data);
    expect(setPaymentData).toHaveBeenCalledTimes(1);
  });

  test('Testing if onFileChange', () => {
    const onFileChange = jest.spyOn(getInstance(), 'onFileChange');
    onFileChange({ target: { name: 'idProof', files: { length: 0 } } });
    expect(onFileChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with length 0', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('idProof', { length: 0 });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with length greater than 1', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('idProof', { length: 2 });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with length equal to 1', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('idProof', { length: 2 });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if fileUpload', () => {
    const fileUpload = jest.spyOn(getInstance(), 'fileUpload');
    fileUpload('idProof', { 0: { length: 1, name: 'idProofName' } });
    expect(fileUpload).toHaveBeenCalledTimes(1);
  });

  test('Testing if onDeleteFile', () => {
    const onDeleteFile = jest.spyOn(getInstance(), 'onDeleteFile');
    onDeleteFile('idProof');
    expect(onDeleteFile).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProp Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the save for later LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitPaymentForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
