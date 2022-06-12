import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from '../../../App/constants';
import { EnterPhonePage as MainForm, mapDispatchToProps } from '../index';
import initialState from '../reducer';
import { CHANGE_COUNTRYCODE, CHANGE_PHONENUMBER, SUBMIT_ENTER_PHONE_PAGE_FORM } from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onReset: jest.fn(),
  onChangeCountryCode: jest.fn(),
  otp: '',
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if CHANGE_COUNTRYCODE are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeCountryCode(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COUNTRYCODE,
    });
  });

  test('Testing if CHANGE_PHONENUMBER are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangePhoneNumber(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_PHONENUMBER,
    });
  });

  test('Testing if LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitForm(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_ENTER_PHONE_PAGE_FORM,
    });
  });
});
