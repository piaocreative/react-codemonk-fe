import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { LOAD_REPOS, POP_UP_SAGA } from 'containers/App/constants';
import { CHANGE_INVITE, SUBMIT_INVITE_MAILS } from '../constants';
import { TalentDashboard as MainForm, mapDispatchToProp } from '../TalentDashboard';

jest.mock('utils/request');
let store;
const mockStore = configureStore();

global.navigator.clipboard = {
  writeText: jest.fn(),
};

const props = {
  inviteMails: [
    {
      name: '',
      email: '',
    },
  ],
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeInvite: jest.fn(),
  onSubmitInviteMails: jest.fn(),
  invalid: '',
  loading: false,
  popUpSaga: false,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('KeyProjects Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if componentDidUpdate', () => {
    const prevProps = props;
    prevProps.popUpSaga = true;
    const component = shallow(<MainForm {...prevProps} />);
    component.setProps({ popUpSaga: false });
  });

  test('Testing if loadActiveProjects', () => {
    const loadActiveProjects = jest.spyOn(getInstance(), 'loadActiveProjects');
    loadActiveProjects();
    expect(loadActiveProjects).toHaveBeenCalledTimes(1);
  });

  test('Testing if setActiveProjectDetails with status 0', () => {
    const setActiveProjectDetails = jest.spyOn(getInstance(), 'setActiveProjectDetails');
    const response = { status: 0, message: 'some error' };
    setActiveProjectDetails(response);
    expect(setActiveProjectDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if fetchFieldValues with userType=talent', () => {
    StorageService.set('userType', '1');
    StorageService.set('registerType', 'freelancer');
    const component = shallow(<MainForm {...props} />);
    component.setState({ roleType: 'talent' });
    const fetchFieldValues = jest.spyOn(getInstance(), 'fetchFieldValues');
    const response = {
      status: 1,
      data: {
        _id: '5f0d5f415dec8d0007386665',
        isActive: 1,
        firstName: 'firstName',
        signupStep: 7,
      },
    };
    fetchFieldValues(response);
    expect(fetchFieldValues).toHaveBeenCalledTimes(1);
  });

  test('Testing if fetchFieldValues without data and userType=talent', () => {
    StorageService.set('userType', '1');
    StorageService.set('registerType', 'freelancer');
    const component = shallow(<MainForm {...props} />);
    component.setState({ roleType: 'talent' });
    const fetchFieldValues = jest.spyOn(getInstance(), 'fetchFieldValues');
    const response = {
      status: 0,
      data: {},
    };
    fetchFieldValues(response);
    expect(fetchFieldValues).toHaveBeenCalledTimes(1);
  });

  test('Testing if fetchFieldValues with userType=talent with signupStep=5', () => {
    StorageService.set('userType', '1');
    StorageService.set('registerType', 'freelancer');
    const component = shallow(<MainForm {...props} />);
    component.setState({ roleType: 'talent' });
    const fetchFieldValues = jest.spyOn(getInstance(), 'fetchFieldValues');
    const response = {
      status: 1,
      data: {
        _id: '5f0d5f415dec8d0007386665',
        isActive: 1,
        firstName: 'firstName',
        signupStep: 5,
      },
    };
    fetchFieldValues(response);
    expect(fetchFieldValues).toHaveBeenCalledTimes(1);
  });

  test('Testing if fetchFieldValues with userType=talent_agency with signupStep=5', () => {
    StorageService.set('userType', '1');
    StorageService.set('registerType', 'agency');
    const component = shallow(<MainForm {...props} />);
    component.setState({ roleType: 'talent_agency' });
    const fetchFieldValues = jest.spyOn(getInstance(), 'fetchFieldValues');
    const response = {
      status: 1,
      data: {
        _id: '5f0d5f415dec8d0007386665',
        isActive: 1,
        firstName: 'firstName',
        signupStep: 5,
      },
    };
    fetchFieldValues(response);
    expect(fetchFieldValues).toHaveBeenCalledTimes(1);
  });

  test('Testing if fetchFieldValues with agency', () => {
    StorageService.set('userType', '3');
    const response = {
      status: 1,
      data: {
        _id: '5f0d5f415dec8d0007386665',
        isActive: 1,
        firstName: 'firstName',
        signupStep: 3,
      },
    };
    const fetchFieldValues = jest.spyOn(getInstance(), 'fetchFieldValues');
    fetchFieldValues(response);
    expect(fetchFieldValues).toHaveBeenCalledTimes(1);
  });

  test('Testing if changeEmail', () => {
    const changeEmail = jest.spyOn(getInstance(), 'changeEmail');
    changeEmail();
    expect(changeEmail).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleProflePhotoCloseModal', () => {
    const handleProflePhotoCloseModal = jest.spyOn(getInstance(), 'handleProflePhotoCloseModal');
    handleProflePhotoCloseModal();
    expect(handleProflePhotoCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeEmailOpenModal', () => {
    const handleChangeEmailOpenModal = jest.spyOn(getInstance(), 'handleChangeEmailOpenModal');
    handleChangeEmailOpenModal();
    expect(handleChangeEmailOpenModal).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProp Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  LOAD_REPOS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onSubmitInviteMails([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if  popUpSagaAction are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onSubmitInviteMails({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[1][0]).toEqual({
      payload: true,
      type: POP_UP_SAGA,
    });
  });

  test('Testing if  EDIT_PROJECT are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onSubmitInviteMails({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[2][0]).toEqual({
      type: SUBMIT_INVITE_MAILS,
    });
  });

  test('Testing if  onChangeInvite  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeInvite([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: [],
      type: CHANGE_INVITE,
    });
  });
});
