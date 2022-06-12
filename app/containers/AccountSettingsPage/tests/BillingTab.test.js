import React from 'react';
import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import initialState from 'containers/Auth/PaymentAndBilling/reducer';
import { CHANGE_BILLING_TYPE, CHANGE_COMPANY_DETAILS, EDIT_BILLING } from 'containers/Auth/PaymentAndBilling/constants';
import { BillingTab as MainForm, mapDispatchToProps } from '../BillingTab';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  billingType: '',
  companyDetails: {},

  dispatch: jest.fn(),
  handleSubmit: jest.fn(),

  invalid: false,
  loading: false,
  responseSuccess: false,
  responseError: false,
  history: { push: jest.fn(), replace: jest.fn() },
  location: {},

  onChangeBillingType: jest.fn(),
  onChangeCompanyDetails: jest.fn(),
  onSubmitBilling: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('<MainForm />', () => {
  const renderer = new ShallowRenderer();
  it('should render and match the snapshot', () => {
    renderer.render(<MainForm store={store} {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if setBillingData ', () => {
    const setBillingData = jest.spyOn(getInstance(), 'setBillingData');
    setBillingData({});
    expect(setBillingData).toHaveBeenCalledTimes(1);
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

  test('Testing if onFileChange ', () => {
    const onFileChange = jest.spyOn(getInstance(), 'onFileChange');
    onFileChange({ target: { name: 'idProof', files: {} } });
    expect(onFileChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with file length 0', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('idProof', { length: 0 });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with file length 1', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('idProof', { length: 1, 0: { size: 12121 } });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with file length 1 and no error', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('idProof', { length: 1, 0: { size: 20480, type: 'image/png' } });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with file length greater than 1', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('idProof', { length: 2, 0: { size: 12121 }, 1: { size: 12121 } });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if fileChanged ', () => {
    const fileChanged = jest.spyOn(getInstance(), 'fileChanged');
    fileChanged('idProof', { length: 1, 0: { size: 12121, name: 'file1.jpg' } });
    expect(fileChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if onDeleteFile ', () => {
    const onDeleteFile = jest.spyOn(getInstance(), 'onDeleteFile');
    onDeleteFile('idProof');
    expect(onDeleteFile).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeCompanyDetails ', () => {
    const handleChangeCompanyDetails = jest.spyOn(getInstance(), 'handleChangeCompanyDetails');
    handleChangeCompanyDetails({ target: { value: 'abcd', name: 'companyName' } });
    expect(handleChangeCompanyDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeBilling ', () => {
    const handleChangeBilling = jest.spyOn(getInstance(), 'handleChangeBilling');
    handleChangeBilling({ target: { value: 'freelancer', name: 'billingType' } });
    expect(handleChangeBilling).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleBillingSubmit ', () => {
    const handleBillingSubmit = jest.spyOn(getInstance(), 'handleBillingSubmit');
    handleBillingSubmit({ target: { preventDefault: jest.fn() } });
    expect(handleBillingSubmit).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  CHANGE_BILLING_TYPE are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeBillingType('freelancer');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'freelancer',
      type: CHANGE_BILLING_TYPE,
    });
  });

  test('Testing if  CHANGE_COMPANY_DETAILS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeCompanyDetails({});
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: {},
      type: CHANGE_COMPANY_DETAILS,
    });
  });

  const onSuccess = jest.fn();
  test('Testing if the  LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitBilling(event, {}, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the  EDIT_BILLING events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitBilling(event, {}, onSuccess);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: EDIT_BILLING,
      changedFiles: {},
      onSuccess,
    });
  });
});
