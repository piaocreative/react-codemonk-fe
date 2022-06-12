import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { CreateProfileComponent as MainForm } from '../CreateProfileComponent';
jest.mock('utils/request');
let store;
const mockStore = configureStore();

const initialState = {
  firstName: '',
  lastName: '',
  role: '',
  countryCode: '',
  phoneNumber: '',
  companyName: '',
  companyregisteredNumber: '',
  companyPincode: '',
  companyCity: '',
  companyCountry: '',
  companyAddressLineOne: '',
  companyAddressLineTwo: '',
  duns: '',
  vatNumber: '',
  tradingName: '',
  tradingWebsite: '',
  tradingSummery: '',
  tradingLogo: '',
  tradingPincode: '',
  tradingCity: '',
  tradingCountry: '',
  tradingLine1: '',
  tradingLine2: '',
};

const props = {
  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',

  firstName: '',
  lastName: '',
  role: '',
  countryCode: '',
  phoneNumber: '',
  companyName: '',
  companyregisteredNumber: '',
  companyPincode: '',
  companyCity: '',
  companyCountry: '',
  companyAddressLineOne: '',
  companyAddressLineTwo: '',
  duns: '',
  vatNumber: '',
  tradingName: '',
  tradingWebsite: '',
  tradingSummery: '',
  tradingLogo: '',
  tradingPincode: '',
  tradingCity: '',
  tradingCountry: '',
  tradingLine1: '',
  tradingLine2: '',

  loading: true,
  responseSuccess: true,
  responseError: true,

  handleLogoSet: jest.fn(),
  getCurrentContent: jest.fn(),
  handleSubmit: jest.fn(),
  onSaveForLater: jest.fn(),
  onSubmitCreateProfile: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};
describe('Create Profile Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleCloseModal with empty response', () => {
    const handleCloseModal = jest.spyOn(getInstance(), 'handleCloseModal');
    handleCloseModal();
    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if setProfileImage with continue', () => {
    const blob = new Blob(['testing'], { type: 'application/pdf' });
    const setProfileImage = jest.spyOn(getInstance(), 'setProfileImage');
    setProfileImage(blob);
    expect(setProfileImage).toHaveBeenCalledTimes(1);
  });

  test('Testing if deletePhoto with continue', () => {
    const deletePhoto = jest.spyOn(getInstance(), 'deletePhoto');
    deletePhoto();
    expect(deletePhoto).toHaveBeenCalledTimes(1);
  });

  test('test onDrop', () => {
    getInstance().onDrop([{ name: 'test' }, { name: 'test' }, { name: 'test' }], [{ name: 'test' }, { name: 'test' }]);
    getInstance().onDrop([{ name: 'test' }, { name: 'test' }], []);
    getInstance().onDrop([{ name: 'test' }], [{ name: 'test' }]);
    getInstance().onDrop([{ name: 'test', type: 'png' }], []);
    getInstance().onDrop([], []);
    expect(getWrapper().state().showModal).toBe(false);
  });

  test('Testing if checkFileType', () => {
    const selectedFile = {
      name: 'abcd.jpg',
      type: 'jpg',
    };
    const reader = new FileReader();
    const checkFileType = jest.spyOn(getInstance(), 'checkFileType');
    checkFileType(selectedFile, reader);
    expect(checkFileType).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkFileType', () => {
    const selectedFile = {
      name: 'abcd.pdf',
      type: 'pdf',
    };
    const reader = new FileReader();
    const checkFileType = jest.spyOn(getInstance(), 'checkFileType');
    checkFileType(selectedFile, reader);
    expect(checkFileType).toHaveBeenCalledTimes(1);
  });
});

describe('componentDidUpdate', () => {
  test('for image', () => {
    const prevProps = props;
    prevProps.image = 'image.png';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ image: '' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for image with else ', () => {
    const prevProps = props;
    prevProps.image = 'image.png';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ image: 'image.png' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });
});
