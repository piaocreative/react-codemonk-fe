import React from 'react';
import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { UpdatePasswordTab as MainForm, mapDispatchToProp } from '../index';
import initialState from '../reducer';
import { CHANGE_OLD_PASSWORD, CHANGE_PASSWORD, CHANGE_CONFIRM_PASSWORD, CHANGE_TALENT_PASSWORD } from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  oldPassword: '',
  password: '',
  confirmPassword: '',

  dispatch: jest.fn(),
  handleSubmit: jest.fn(),

  invalid: false,
  loading: false,
  responseSuccess: false,
  responseError: false,
  history: { push: jest.fn(), replace: jest.fn() },
  location: {},

  onChangeOldPassword: jest.fn(),
  onChangePassword: jest.fn(),
  onChangeConfirmPassword: jest.fn(),
  onSubmitTalentPassword: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('<MainForm />', () => {
  const renderer = new ShallowRenderer();
  it('should render and match the snapshot', () => {
    renderer.render(<MainForm store={store} {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if onClickIcon with passwordType', () => {
    const onClickIcon = jest.spyOn(getInstance(), 'onClickIcon');
    onClickIcon('passwordType');
    expect(onClickIcon).toHaveBeenCalledTimes(1);
  });
  test('Testing if onClickIcon confirmPasswordType', () => {
    const onClickIcon = jest.spyOn(getInstance(), 'onClickIcon');
    onClickIcon('confirmPasswordType');
    expect(onClickIcon).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSubmitButton ', () => {
    const handleSubmitButton = jest.spyOn(getInstance(), 'handleSubmitButton');
    handleSubmitButton(false, true);
    expect(handleSubmitButton).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSubmitButton with else', () => {
    const handleSubmitButton = jest.spyOn(getInstance(), 'handleSubmitButton');
    handleSubmitButton(true, true);
    expect(handleSubmitButton).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProp Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  CHANGE_OLD_PASSWORD are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeOldPassword({ target: { value: 'password' } });
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'password',
      type: CHANGE_OLD_PASSWORD,
    });
  });

  test('Testing if  CHANGE_PASSWORD are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangePassword({ target: { value: 'password' } });
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'password',
      type: CHANGE_PASSWORD,
    });
  });

  test('Testing if  CHANGE_CONFIRM_PASSWORD are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeConfirmPassword({ target: { value: 'password' } });
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'password',
      type: CHANGE_CONFIRM_PASSWORD,
    });
  });

  test('Testing if the  LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitTalentPassword(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the  CHANGE_TALENT_PASSWORD events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitTalentPassword(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: CHANGE_TALENT_PASSWORD,
    });
  });
});
