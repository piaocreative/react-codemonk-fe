import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from '../../../App/constants';

import { PersonalDetails as MainForm, mapDispatchToProps } from '../index';
import { getBtnClass } from '../utils';
import initialState from '../reducer';
import {
  CHANGE_FIRSTNAME,
  CHANGE_LASTNAME,
  CHANGE_COUNTRYCODE,
  CHANGE_PHONENUMBER,
  CHANGE_DOB,
  CHANGE_GENDER,
  CHANGE_POSTCODE,
  CHANGE_ADDRESSLINEONE,
  CHANGE_ADDRESSLINETWO,
  CHANGE_CITY,
  CHANGE_COUNTRY,
  CHANGE_STATE,
  CHANGE_TIMEZONE,
  CHANGE_LANGUAGE,
  CHANGE_LINKEDIN_PROFILE,
  CHANGE_GITHUB_PROFILE,
  CHANGE_STACKOVERFLOW_PROFILE,
  CHANGE_DRIBBBLE_PROFILE,
  CHANGE_BEHANCE_PROFILE,
  CHANGE_PERSONAL_PROFILE,
  CHANGE_PRIMARY_ROLE,
  CHANGE_EXPERIENCE,
  SUBMIT_PERSONAL_DETAILS_FORM,
} from '../constants';
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
  firstName: '',
  onChangeFirstName: jest.fn(),
  lastName: '',
  onChangeLastName: jest.fn(),
  phoneNumber: '1234567890',
  countryCode: '',
  onChangeCountryCode: jest.fn(),
  onChangePhoneNumber: jest.fn(),
  dob: '',
  onChangeDob: jest.fn(),
  gender: 'Male',
  onChangeGender: jest.fn(),
  postcode: '',
  onChangePostcode: jest.fn(),
  addressLineOne: '',
  onChangeAddressLineOne: jest.fn(),
  addressLineTwo: '',
  onChangeAddressLineTwo: jest.fn(),
  city: '',
  onChangeCity: jest.fn(),
  country: '',
  onChangeCountry: jest.fn(),
  state: '',
  onChangeState: jest.fn(),
  timeZone: '',
  onChangeTimeZone: jest.fn(),
  language: '',
  onSaveForLater: jest.fn(),
  onSubmitPersonalDetailsForm: jest.fn(),
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
  test('test getBtnClass', () => {
    getBtnClass(true, true, true);
    expect(getWrapper().exists()).toBe(true);
  });
  test('test onDrop', () => {
    getInstance().onDrop([{ name: 'test' }, { name: 'test' }, { name: 'test' }], [{ name: 'test' }, { name: 'test' }]);
    getInstance().onDrop([{ name: 'test' }, { name: 'test' }], []);
    getInstance().onDrop([{ name: 'test' }], [{ name: 'test' }]);
    getInstance().onDrop([{ name: 'test', type: 'png' }], []);
    getInstance().onDrop([], []);
    expect(getWrapper().state().showModal).toBe(false);
  });

  test('Testing if handleSaveForLater', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() });
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('test handle Click', () => {
    getInstance().setProfileImage({});
    expect(getWrapper().state().isloading).toBe(false);
  });
  test('test handle Click', () => {
    getInstance().setProfileImage({ status: 1, data: { test } });
    expect(getWrapper().state().isloading).toBe(false);
  });
  test('Testing if the delete file events call', () => {
    const res = {
      status: 1,
    };
    getWrapper()
      .instance()
      .deletePhoto(res);
    expect(getWrapper().state().image).toEqual('');
  });
});

describe('Testing modal close', () => {
  intializeSetup();
  getWrapper();
  test('If the componentDidMount calles showModal state false', () => {
    expect(getWrapper().state().showModal).toEqual(false);
  });
  test('if the showModal work as expected', () => {
    getWrapper()
      .instance()
      .handleCloseModal();
    expect(getWrapper().state().showModal).toEqual(false);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if change firstname are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeFirstName(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value, // payload define in action
      type: CHANGE_FIRSTNAME, // CHANGE_FIRSTNAME define in constants
    });
  });

  test('Testing if change lastname are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeLastName(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_LASTNAME,
    });
  });

  test('Testing if change country code are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeCountryCode(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COUNTRYCODE,
    });
  });

  test('Testing if change phone number are dispatched correctly', () => {
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

  test('Testing if change dob are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeDob(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_DOB,
    });
  });

  test('Testing if change gender are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      value: 'male',
      label: 'male',
    };
    mapDispatchToProps(dispatch).onChangeGender(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_GENDER,
    });
  });

  test('Testing if change postcode are dispatched correctly', () => {
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

  test('Testing if change address line one are dispatched correctly', () => {
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

  test('Testing if change address line two are dispatched correctly', () => {
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

  test('Testing if change city are dispatched correctly', () => {
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

  test('Testing if change country are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeCountry(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COUNTRY,
    });
  });

  test('Testing if change state are dispatched correctly', () => {
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

  test('Testing if chnage time zone are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeTimeZone(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_TIMEZONE,
    });
  });

  test('Testing if change language are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeLanguage(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_LANGUAGE,
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

  test('Testing if change primary role are dispatched correctly', () => {
    const dispatch = jest.fn();
    const primaryRole = {
      value: 'Software Engineer',
      label: 'Software Engineer',
    };
    mapDispatchToProps(dispatch).onChangePrimaryRole(primaryRole);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: primaryRole,
      type: CHANGE_PRIMARY_ROLE,
    });
  });
  test('Testing if change yearsOfExperience are dispatched correctly', () => {
    const dispatch = jest.fn();
    const experience = {
      value: '10+ years',
      label: '10+ years',
    };

    mapDispatchToProps(dispatch).onChangeExperience(experience);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: experience,
      type: CHANGE_EXPERIENCE,
    });
  });

  test('Testing if the save for later events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSaveForLater(event, {});
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'saveForLater',
      type: SUBMIT_PERSONAL_DETAILS_FORM,
      userData: {},
    });
  });

  test('Testing if continue button event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitPersonalDetailsForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
