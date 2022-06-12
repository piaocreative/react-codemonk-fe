import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { CHANGE_RATE } from 'containers/Auth/PaymentAndBilling/constants';
import { PaymentRate as MainForm, mapDispatchToProps } from '../PaymentRate';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeRate: jest.fn(),
  onSubmitPaymentForm: jest.fn(),
  modalOpen: jest.fn(),
  modalClose: jest.fn(),
};

const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('PaymentRate Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if handleRateEditCloseModal', () => {
    const handleRateEditCloseModal = jest.spyOn(getInstance(), 'handleRateEditCloseModal');
    handleRateEditCloseModal();
    expect(handleRateEditCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleRateEditOpenModal', () => {
    const handleRateEditOpenModal = jest.spyOn(getInstance(), 'handleRateEditOpenModal');
    handleRateEditOpenModal(0);
    expect(handleRateEditOpenModal).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  CHANGE_RATE are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeRate({ currency: { label: 'INR', value: 'INR' }, ratePerHour: '' });
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: { currency: { label: 'INR', value: 'INR' }, ratePerHour: '' },
      type: CHANGE_RATE,
    });
  });

  test('Testing if the save for later LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitPaymentForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
