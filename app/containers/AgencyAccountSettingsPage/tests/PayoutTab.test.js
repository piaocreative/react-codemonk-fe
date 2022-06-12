import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import initialState from 'containers/Auth/Talent/PayoutDetailsPage/reducer';
import { CHANGE_BANKNAME, CHANGE_ACCOUNT_NUMBER, CHANGE_BANK_CODE } from 'containers/Auth/Talent/PayoutDetailsPage/constants';
import { PayoutTab as MainForm, mapDispatchToProps } from '../PayoutTab';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  history: [],
  dispatch: jest.fn(),
  onChangeLanguage: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
  bankName: '',
  onChangeBankName: jest.fn(),
  bankAccountNumber: '',
  onChangeAccountNumber: jest.fn(),
  bankCode: '',
  onChangeBankCode: jest.fn(),
  onSaveForLater: jest.fn(),
  onSubmitPayoutDetailsForm: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};
describe('Personal detail Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if change bankname are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeBankName(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_BANKNAME,
    });
  });

  test('Testing if change account number are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeAccountNumber(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_ACCOUNT_NUMBER,
    });
  });

  test('Testing if change bank code are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeBankCode(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_BANK_CODE,
    });
  });

  test('Testing if continue button event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitPayoutDetailsForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
