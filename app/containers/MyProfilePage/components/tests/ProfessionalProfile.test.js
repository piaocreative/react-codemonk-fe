import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import initialState from 'containers/Auth/ProfessionalDetail/reducer';
import { LOAD_REPOS, POP_UP_SAGA } from 'containers/App/constants';
import { CHANGE_LINKEDIN_PROFILE, CHANGE_GITHUB_PROFILE, CHANGE_STACKOVERFLOW_PROFILE } from 'containers/Auth/ProfessionalDetail/constants';
import { ProfessionalProfile as MainForm, mapDispatchToProps } from '../ProfessionalProfile';

jest.mock('utils/request');
let store;
const mockStore = configureStore();

const props = {
  data: { linkedInUrl: '', gitHubUrl: '', stackOverFlowUrl: '' },
  linkedInProfile: '',
  githubProfile: '',
  stackoverflowProfile: '',
  popUpSaga: false,
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeProject: jest.fn(),
  modalOpen: jest.fn(),
  modalClose: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },

  loadProfileData: jest.fn(),
  onChangeLinkedInProfile: jest.fn(),
  onChangeGithubProfile: jest.fn(),
  onChangeStackoverflowProfile: jest.fn(),
  onChangeDribbleProfile: jest.fn(),
  onChangeBehanceProfile: jest.fn(),
  onChangePersonalProfile: jest.fn(),
  onSubmitProfessionalProfile: jest.fn(),
};

const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Languages Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('for componentDidUpdate with if', () => {
    const prevProps = props;
    prevProps.popUpSaga = true;
    prevProps.currentModal = 'ProfessionalProfile';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ popUpSaga: false });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for componentDidUpdate with else', () => {
    const prevProps = props;
    prevProps.popUpSaga = false;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ popUpSaga: false });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleProfileOpenModal', () => {
    const handleProfileOpenModal = jest.spyOn(getInstance(), 'handleProfileOpenModal');
    handleProfileOpenModal();
    expect(handleProfileOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleProfileCloseModal', () => {
    const handleProfileCloseModal = jest.spyOn(getInstance(), 'handleProfileCloseModal');
    handleProfileCloseModal();
    expect(handleProfileCloseModal).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if  CHANGE_LINKEDIN_PROFILE are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeLinkedInProfile({ target: { value: 'linkedin' } });
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_LINKEDIN_PROFILE,
      payload: 'linkedin',
    });
  });
  test('Testing if  CHANGE_GITHUB_PROFILE are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeGithubProfile({ target: { value: 'github' } });
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_GITHUB_PROFILE,
      payload: 'github',
    });
  });

  test('Testing if  CHANGE_STACKOVERFLOW_PROFILE are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeStackoverflowProfile({ target: { value: 'stackoverflow' } });
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_STACKOVERFLOW_PROFILE,
      payload: 'stackoverflow',
    });
  });

  test('Testing if  LOAD_REPOS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitProfessionalProfile([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if  popUpSagaAction are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitProfessionalProfile([]);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: POP_UP_SAGA,
      payload: true,
    });
  });

  test('Testing if  submitProfessionalDetailForm are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitProfessionalProfile(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
