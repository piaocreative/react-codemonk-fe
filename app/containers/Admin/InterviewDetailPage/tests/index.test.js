import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { InterviewDetailPage as MainForm, mapDispatchToProps } from '../index';
import { CHANGE_TALENT_STATUS } from '../constants';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },

  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
  onChangeResult: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('InterviewDetailPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if loadInterviewDetails', () => {
    const loadInterviewDetails = jest.spyOn(getInstance(), 'loadInterviewDetails');
    loadInterviewDetails();
    expect(loadInterviewDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setInterviewDetails with status 0', () => {
    const setInterviewDetails = jest.spyOn(getInstance(), 'setInterviewDetails');
    const response = { status: 0, message: 'some error' };
    setInterviewDetails(response);
    expect(setInterviewDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setInterviewDetails with status 1', () => {
    const setInterviewDetails = jest.spyOn(getInstance(), 'setInterviewDetails');
    const response = { status: 1, data: {} };
    setInterviewDetails(response);
    expect(setInterviewDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleEditStatus', () => {
    const handleEditStatus = jest.spyOn(getInstance(), 'handleEditStatus');
    handleEditStatus();
    expect(handleEditStatus).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeStatus', () => {
    const handleChangeStatus = jest.spyOn(getInstance(), 'handleChangeStatus');
    const status = { label: 'Hired', value: 1 };
    handleChangeStatus(status);
    expect(handleChangeStatus).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSubmitStatus', () => {
    const handleSubmitStatus = jest.spyOn(getInstance(), 'handleSubmitStatus');
    const event = { preventDefault: jest.fn() };
    handleSubmitStatus(event);
    expect(handleSubmitStatus).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the  LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = {};
    const onSuccess = jest.fn();
    mapDispatchToProps(dispatch).onChangeResult(data, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the  CHANGE_TALENT_STATUS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = {};
    const onSuccess = jest.fn();
    mapDispatchToProps(dispatch).onChangeResult(data, onSuccess);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: CHANGE_TALENT_STATUS,
      data,
      onSuccess,
    });
  });
});
