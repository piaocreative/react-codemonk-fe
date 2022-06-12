import React from 'react';
import { shallow } from 'enzyme';
import PaymentFooter from '../paymentFooter';

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),

  rate: {},
  billingType: '',
  companyDetails: {},
  payType: '',
  bankPayDetails: {},
  payPalEmail: '',

  invalid: false,
  loading: false,
  responseSuccess: false,
  responseError: false,
  onReset: jest.fn(),
  history: {},

  onChangeRate: jest.fn(),
  onChangeBillingType: jest.fn(),
  onChangeCompanyDetails: jest.fn(),
  onChangePayType: jest.fn(),
  onChangeBankPayDetails: jest.fn(),
  onChangePayPalDetails: jest.fn(),

  onSaveForLater: jest.fn(),
  onSubmitPaymentForm: jest.fn(),
};

describe('CompanyDetails Component', () => {
  test('If the Component Renders Without Crashing', () => {
    const wrapper = shallow(<PaymentFooter {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});
