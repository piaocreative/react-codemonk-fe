import React from 'react';
import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from '../../../App/constants';
import { ForgotPasswordPage as MainForm, mapDispatchToProp } from '../index';
import initialState from '../reducer';
import { CHANGE_EMAIL, FORGOT_PASSWORD_SUBMIT } from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  email: '',

  dispatch: jest.fn(),
  handleSubmit: jest.fn(),

  invalid: false,
  loading: false,
  responseSuccess: false,
  responseError: false,
  history: { push: jest.fn(), replace: jest.fn() },
  location: {},

  onChangeEmail: jest.fn(),
  onSubmitForm: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
// const getInstance = () => getWrapper().instance();
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

describe('mapDispatchToProp Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  CHANGE_EMAIL are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeEmail({ target: { value: 'abcd@example.com' } });
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'abcd@example.com',
      type: CHANGE_EMAIL,
    });
  });

  test('Testing if the save for later LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the save for later FORGOT_PASSWORD_SUBMIT events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitForm(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: FORGOT_PASSWORD_SUBMIT,
    });
  });
});
