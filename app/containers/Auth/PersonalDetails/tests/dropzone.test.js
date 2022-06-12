import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { PersonalDetails as MainForm } from '../index';
import initialState from '../reducer';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  history: [],
  dispatch: '',
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
  phoneNumber: 1234567890,
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
  onStateCountry: jest.fn(),
  timeZone: '',
  onChangeTimeZone: jest.fn(),
  language: '',
  onSaveForLater: jest.fn(),
  onSubmitPersonalDetailsForm: jest.fn(),
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
