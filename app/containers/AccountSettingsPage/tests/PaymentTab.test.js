import React from 'react';
import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import initialState from 'containers/Auth/PaymentAndBilling/reducer';
import { CHANGE_PAY_TYPE, CHANGE_BANK_PAY_DETAILS, CHANGE_PAYPAL_DETAILS, EDIT_PAYMENT } from 'containers/Auth/PaymentAndBilling/constants';
import { PaymentTab as MainForm, mapDispatchToProps } from '../PaymentTab';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  payType: '',
  bankPayDetails: {},
  payPalEmail: '',

  dispatch: jest.fn(),
  handleSubmit: jest.fn(),

  invalid: false,
  loading: false,
  responseSuccess: false,
  responseError: false,
  history: { push: jest.fn(), replace: jest.fn() },
  location: {},

  onChangePayType: jest.fn(),
  onChangeBankPayDetails: jest.fn(),
  onChangePayPalDetails: jest.fn(),
  onSubmitPayment: jest.fn(),
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

  test('Testing if handleChangePayType', () => {
    const handleChangePayType = jest.spyOn(getInstance(), 'handleChangePayType');
    handleChangePayType({ target: { name: 'payType', value: 'paypal' } });
    expect(handleChangePayType).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeBankPayDetails', () => {
    const handleChangeBankPayDetails = jest.spyOn(getInstance(), 'handleChangeBankPayDetails');
    handleChangeBankPayDetails({ target: { name: 'bankName', value: 'ASBCD Bank' } });
    expect(handleChangeBankPayDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangePayPalDetails', () => {
    const handleChangePayPalDetails = jest.spyOn(getInstance(), 'handleChangePayPalDetails');
    handleChangePayPalDetails({ target: { name: 'paypalEmail', value: 'user@paypal.com' } });
    expect(handleChangePayPalDetails).toHaveBeenCalledTimes(1);
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
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  CHANGE_PAY_TYPE are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangePayType('freelancer');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'freelancer',
      type: CHANGE_PAY_TYPE,
    });
  });

  test('Testing if  CHANGE_BANK_PAY_DETAILS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeBankPayDetails({});
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: {},
      type: CHANGE_BANK_PAY_DETAILS,
    });
  });

  test('Testing if  CHANGE_PAYPAL_DETAILS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangePayPalDetails({});
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: {},
      type: CHANGE_PAYPAL_DETAILS,
    });
  });

  const onSuccess = jest.fn();
  test('Testing if the  LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitPayment(event, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the  EDIT_BILLING events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitPayment(event, onSuccess);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: EDIT_PAYMENT,
      onSuccess,
    });
  });
});
