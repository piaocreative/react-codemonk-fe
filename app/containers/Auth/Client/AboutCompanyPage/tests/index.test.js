import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { AboutCompanyPage as MainForm, mapDispatchToProps } from '../index';
import initialState from '../reducer';
import {
  SUBMIT_ABOUT_COMPANY_FORM,
  CHANGE_NAME,
  CHANGE_BRAND,
  CHANGE_REGISTER_NUMBER,
  CHANGE_VAT_NUMBER,
  CHANGE_INDUSTRY,
  CHANGE_COMPANY_TYPE,
  COMPANY_CULTURES,
  CHANGE_LINKEDIN_PROFILE,
  CHANGE_GITHUB_PROFILE,
  CHANGE_STACKOVERFLOW_PROFILE,
  CHANGE_DRIBBBLE_PROFILE,
  CHANGE_BEHANCE_PROFILE,
  CHANGE_PERSONAL_PROFILE,
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

  test('Testing if change company name are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeName(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_NAME,
    });
  });

  test('Testing if change company brand name are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeBrand(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_BRAND,
    });
  });

  test('Testing if changecompany register number are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeRegisteredNumber(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_REGISTER_NUMBER,
    });
  });

  test('Testing if change company VAT number are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeVatNumber(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_VAT_NUMBER,
    });
  });

  test('Testing if change Industry are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeIndustry(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_INDUSTRY,
    });
  });

  test('Testing if change Company Type are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeCompanyType(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COMPANY_TYPE,
    });
  });

  test('Testing if change Company Culture are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeCompanyCultures(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: COMPANY_CULTURES,
    });
  });

  test('Testing if change linkdin profile are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeLinkedInProfile(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_LINKEDIN_PROFILE,
    });
  });

  test('Testing if change github profile are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeGithubProfile(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_GITHUB_PROFILE,
    });
  });
  test('Testing if change stackoverflow profile are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeStackoverflowProfile(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_STACKOVERFLOW_PROFILE,
    });
  });

  test('Testing if change dribble profile are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeDribbleProfile(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_DRIBBBLE_PROFILE,
    });
  });

  test('Testing if change behance profile are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeBehanceProfile(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_BEHANCE_PROFILE,
    });
  });

  test('Testing if change personal profile are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangePersonalProfile(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_PERSONAL_PROFILE,
    });
  });

  test('Testing if submit about company details event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAboutCompanyForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
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
      type: SUBMIT_ABOUT_COMPANY_FORM,
      data: {},
    });
  });
});
