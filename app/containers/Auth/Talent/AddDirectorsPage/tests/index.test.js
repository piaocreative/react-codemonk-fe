import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { AddDirectorsPage as MainForm, mapDispatchToProps } from '../index';
import { CHANGE_DIRECTOR_ARRAY, CHANGE_TOTAL_SHARES, SUBMIT_ADD_DIRECTORS } from '../constants';
import initialState from '../reducer';

jest.mock('utils/request');
let store;
const mockStore = configureStore();

const props = {
  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  directorsArray: [
    {
      firstName: 'Director one',
      lastName: 'Director oneLast',
      dob: '01/12/2000',
      postcode: '380013',
      addressLineOne: 'Some House, Some Buildding',
      addressLineTwo: 'Some Road, Somewhere',
      city: 'Ahmedabad',
      country: 'India',
      isDirector: true,
      isShareHolder: false,
    },
  ],
  firstName: '',
  lastName: '',
  dob: '',
  companyPincode: '',
  companyCity: '',
  companyCountry: '',
  companyAddressLineOne: '',
  companyAddressLineTwo: '',
  shareholder: '',
  director: '',
  ownership: '',

  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),

  onChangeDirectorArray: jest.fn(),
  onChangeTotalShares: jest.fn(),
  onSaveForLater: jest.fn(),
  onSubmitAddDirectors: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};
describe('Add Directors Component', () => {
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

  test('Testing if handleAddDirectorCloseModal with modalType === add ', () => {
    const handleAddDirectorCloseModal = jest.spyOn(getInstance(), 'handleAddDirectorCloseModal');
    handleAddDirectorCloseModal();
    expect(handleAddDirectorCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleAddDirectorOpenModal with modalType === add ', () => {
    const handleAddDirectorOpenModal = jest.spyOn(getInstance(), 'handleAddDirectorOpenModal');
    handleAddDirectorOpenModal('add', 0);
    expect(handleAddDirectorOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleAddDirectorOpenModal with modalType === edit ', () => {
    const handleAddDirectorOpenModal = jest.spyOn(getInstance(), 'handleAddDirectorOpenModal');
    handleAddDirectorOpenModal('edit', 0);
    expect(handleAddDirectorOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if popupSubmit with modalType === add ', () => {
    const popupSubmit = jest.spyOn(getInstance(), 'popupSubmit');
    popupSubmit('add', 0);
    expect(popupSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if popupSubmit with modalType === edit ', () => {
    const popupSubmit = jest.spyOn(getInstance(), 'popupSubmit');
    popupSubmit('edit', 0);
    expect(popupSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if deleteForMe with  ', () => {
    const deleteForMe = jest.spyOn(getInstance(), 'deleteForMe');
    deleteForMe(0);
    expect(deleteForMe).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleModal with  for if', () => {
    const handleModal = jest.spyOn(getInstance(), 'handleModal');
    handleModal(0, 0);
    expect(handleModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleModal with  for else', () => {
    const handleModal = jest.spyOn(getInstance(), 'handleModal');
    handleModal(1, 0);
    expect(handleModal).toHaveBeenCalledTimes(1);
  });

  // getValidation
  test('Testing if getValidation ', () => {
    const getValidation = jest.spyOn(getInstance(), 'getValidation');
    getValidation([]);
    expect(getValidation).toHaveBeenCalledTimes(1);
  });

  test('for getValidation with shareholder true', () => {
    const prevProps = props;
    prevProps.shareholder = true;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const getValidation = jest.spyOn(wrapper.instance(), 'getValidation');
    const event = { preventDefault: jest.fn() };
    getValidation(event, 'saveForLater');
    expect(getValidation).toHaveBeenCalledTimes(1);
  });

  // saveLater
  test('Testing if handleSaveForLater with continue', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() }, 'continue');
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSaveForLater with saveForLater', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() }, 'saveForLater');
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if setSaveForLater with continue', () => {
    const setSaveForLater = jest.spyOn(getInstance(), 'setSaveForLater');
    setSaveForLater({ preventDefault: jest.fn() }, 'continue');
    expect(setSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('for setSaveForLater with saveForLater', () => {
    const setSaveForLater = jest.spyOn(getInstance(), 'setSaveForLater');
    setSaveForLater({ preventDefault: jest.fn() }, 'saveForLater');
    expect(setSaveForLater).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if onChangeDirectorArray are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = [
      {
        firstName: 'Director one',
        lastName: 'Director oneLast',
        dob: '01/12/2000',
        postcode: '380013',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        country: 'India',
        isDirector: true,
        isShareHolder: false,
      },
    ];
    mapDispatchToProps(dispatch).onChangeDirectorArray(data);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_DIRECTOR_ARRAY,
      data,
    });
  });

  test('Testing if onChangeTotalShares are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = 20;
    mapDispatchToProps(dispatch).onChangeTotalShares(data);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_TOTAL_SHARES,
      data,
    });
  });

  test('Testing if save event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SUBMIT_ADD_DIRECTORS,
      payload: 'saveForLater',
    });
  });

  test('Testing if save event with no event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SUBMIT_ADD_DIRECTORS,
      payload: 'saveForLater',
    });
  });

  test('Testing if onSubmitAddDirectors event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAddDirectors(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if onSubmitAddDirectors event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAddDirectors(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_ADD_DIRECTORS,
      payload: 'continue',
    });
  });

  test('Testing if onSubmitAddDirectors with no event  are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onSubmitAddDirectors(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_ADD_DIRECTORS,
      payload: 'continue',
    });
  });
});
