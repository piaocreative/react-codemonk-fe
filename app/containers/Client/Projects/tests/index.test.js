import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { ADD_PROJECT } from 'containers/Admin/Projects/constants';
import { Projects as MainForm, mapDispatchToProps } from '../index';
import { LOAD_REPOS, POP_UP_SAGA } from '../../../App/constants';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Projects Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if loadProjects', () => {
    const loadProjects = jest.spyOn(getInstance(), 'loadProjects');
    loadProjects(1);
    expect(loadProjects).toHaveBeenCalledTimes(1);
  });

  test('Testing if setProjectDetails with status 0', () => {
    const setProjectDetails = jest.spyOn(getInstance(), 'setProjectDetails');
    const response = { status: 0, message: 'some error' };
    setProjectDetails(response);
    expect(setProjectDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setProjectDetails with status 1', () => {
    const setProjectDetails = jest.spyOn(getInstance(), 'setProjectDetails');
    const response = { status: 1, message: 'some error' };
    setProjectDetails(response);
    expect(setProjectDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeStatus with status 1', () => {
    const handleChangeStatus = jest.spyOn(getInstance(), 'handleChangeStatus');
    const data = { label: 'All', value: -1 };
    handleChangeStatus(data);
    expect(handleChangeStatus).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the  LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAddProjectForm(event, []);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the  ADD_PROJECT events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAddProjectForm(event, []);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: POP_UP_SAGA,
      payload: true,
    });
  });

  test('Testing if the  ADD_PROJECT events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAddProjectForm(event, []);
    expect(dispatch.mock.calls[2][0]).toEqual({
      type: ADD_PROJECT,
      data: [],
    });
  });
});
