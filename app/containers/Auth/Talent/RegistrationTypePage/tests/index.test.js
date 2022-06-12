import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { RegistrationTypePage as MainForm, mapDispatchToProps } from '../index';
import { SUBMIT_REGISTRATION_TYPE } from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();

const initialState = { registrationType: '' };

const props = {
  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
  registrationType: '',
  onSaveForLater: jest.fn(),
  onSubmitRegistrationType: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();

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

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if loaderUserDetails', () => {
    const loaderUserDetails = jest.spyOn(getInstance(), 'loaderUserDetails');
    loaderUserDetails();
    expect(loaderUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setUserDetails with empty response', () => {
    const setUserDetails = jest.spyOn(getInstance(), 'setUserDetails');
    setUserDetails({});
    expect(setUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setUserDetails with response status 1 ', () => {
    const setUserDetails = jest.spyOn(getInstance(), 'setUserDetails');
    setUserDetails({ status: 1 });
    expect(setUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if progressBarValue with response status 1 ', () => {
    const progressBarValue = jest.spyOn(getInstance(), 'progressBarValue');
    progressBarValue('freelancer');
    expect(progressBarValue).toHaveBeenCalledTimes(1);
  });

  test('Testing if progressBarValue with response status 1 ', () => {
    const progressBarValue = jest.spyOn(getInstance(), 'progressBarValue');
    progressBarValue('agency');
    expect(progressBarValue).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeRegistrationType with response status 1 ', () => {
    const handleChangeRegistrationType = jest.spyOn(getInstance(), 'handleChangeRegistrationType');
    handleChangeRegistrationType('freelancer');
    expect(handleChangeRegistrationType).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeRegistrationType with response status 1 ', () => {
    const handleChangeRegistrationType = jest.spyOn(getInstance(), 'handleChangeRegistrationType');
    handleChangeRegistrationType('agency');
    expect(handleChangeRegistrationType).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSaveForLater with response status 1 ', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    const event = { preventDefault: jest.fn() };
    handleSaveForLater(event, 'saveForLater');
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });
  test('Testing if handleSaveForLater with response status 1 ', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    const event = { preventDefault: jest.fn() };
    handleSaveForLater(event, 'continue');
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if save event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SUBMIT_REGISTRATION_TYPE,
      payload: 'saveForLater',
    });
  });

  test('Testing if save event with no event', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SUBMIT_REGISTRATION_TYPE,
      payload: 'saveForLater',
    });
  });

  test('Testing if onSubmitRegistrationType event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitRegistrationType(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if onSubmitRegistrationType event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitRegistrationType(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_REGISTRATION_TYPE,
      payload: 'continue',
    });
  });

  test('Testing if onSubmitRegistrationType event with no event', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onSubmitRegistrationType(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_REGISTRATION_TYPE,
      payload: 'continue',
    });
  });
});
