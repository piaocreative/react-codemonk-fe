import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { ClientHomePage as MainForm } from '../index';

jest.mock('utils/request');
let store;
const mockStore = configureStore();

const props = { history: { replace: jest.fn() }, location: { redirection: false } };
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

  test('Testing if loadActiveProject', () => {
    const loadActiveProject = jest.spyOn(getInstance(), 'loadActiveProject');
    loadActiveProject();
    expect(loadActiveProject).toHaveBeenCalledTimes(1);
  });
  test('Testing if setActiveProjects', () => {
    const setActiveProjects = jest.spyOn(getInstance(), 'setActiveProjects');
    setActiveProjects();
    expect(setActiveProjects).toHaveBeenCalledTimes(1);
  });
  test('Testing if loadJobBrief', () => {
    const loadJobBrief = jest.spyOn(getInstance(), 'loadJobBrief');
    loadJobBrief();
    expect(loadJobBrief).toHaveBeenCalledTimes(1);
  });
  test('Testing if setJobBrief', () => {
    const setJobBrief = jest.spyOn(getInstance(), 'setJobBrief');
    setJobBrief();
    expect(setJobBrief).toHaveBeenCalledTimes(1);
  });
  test('Testing if loadTimesheets', () => {
    const loadTimesheets = jest.spyOn(getInstance(), 'loadTimesheets');
    loadTimesheets();
    expect(loadTimesheets).toHaveBeenCalledTimes(1);
  });
  test('Testing if setTimesheetDataSuccess', () => {
    const setTimesheetDataSuccess = jest.spyOn(getInstance(), 'setTimesheetDataSuccess');
    setTimesheetDataSuccess();
    expect(setTimesheetDataSuccess).toHaveBeenCalledTimes(1);
  });
  test('Testing if loadTeamDetails', () => {
    const loadTeamDetails = jest.spyOn(getInstance(), 'loadTeamDetails');
    loadTeamDetails();
    expect(loadTeamDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTeamDetails with status 0', () => {
    const setTeamDetails = jest.spyOn(getInstance(), 'setTeamDetails');
    const response = { status: 0, message: 'some error' };
    setTeamDetails(response);
    expect(setTeamDetails).toHaveBeenCalledTimes(1);
  });
});
