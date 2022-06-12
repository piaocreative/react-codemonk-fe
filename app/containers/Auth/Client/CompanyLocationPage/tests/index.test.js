import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { CompanyLocationPage as MainForm, mapDispatchToProps } from '../index';
import initialState from '../reducer';
import {
  CHANGE_LOCATION_NAME,
  CHANGE_POSTCODE,
  CHANGE_ADDRESSLINEONE,
  CHANGE_ADDRESSLINETWO,
  CHANGE_CITY,
  CHANGE_COUNTRY,
  CHANGE_STATE,
  CHANGE_TIMEZONE,
  SUBMIT_COMPANY_LOCATION_FORM,
} from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitExperienceForm: jest.fn(),
  onChangeExperience: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },
  onSaveForLater: jest.fn(),
  onChangeBrief: jest.fn(),
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

  test('Testing if handleSaveForLater ', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() });
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if change Location name are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeLocationName(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_LOCATION_NAME,
    });
  });
  test('Testing if change Postcode are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangePostcode(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_POSTCODE,
    });
  });
  test('Testing if change Address Line One are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeAddressLineOne(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_ADDRESSLINEONE,
    });
  });
  test('Testing if change  Address Line Two are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeAddressLineTwo(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_ADDRESSLINETWO,
    });
  });
  test('Testing if change City are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeCity(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_CITY,
    });
  });
  test('Testing if change Country are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeCountry(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COUNTRY,
    });
  });
  test('Testing if change State are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeState(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_STATE,
    });
  });
  test('Testing if change Timezone are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeTimeZone(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_TIMEZONE,
    });
  });

  test('Testing if the save for later events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSaveForLater(event, {}, 'saveForLater');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'saveForLater',
      type: SUBMIT_COMPANY_LOCATION_FORM,
      data: {},
    });
  });
});
