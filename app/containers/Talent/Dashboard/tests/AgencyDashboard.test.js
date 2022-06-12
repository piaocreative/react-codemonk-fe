import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { AgencyDashboard as MainForm } from '../AgencyDashboard';

jest.mock('utils/request');

const props = {
  inviteMails: [
    {
      name: '',
      email: '',
    },
  ],
  userData: { data: { signupStep: 6 } },

  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeInvite: jest.fn(),
  onSubmitAddTalentsForm: jest.fn(),
  invalid: '',
  loading: false,
  popUpSaga: false,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Agency Dashboard', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if loadCountData with projects', () => {
    const loadCountData = jest.spyOn(getInstance(), 'loadCountData');
    loadCountData('projects');
    expect(loadCountData).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadCountData with talents', () => {
    const loadCountData = jest.spyOn(getInstance(), 'loadCountData');
    loadCountData('talents');
    expect(loadCountData).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadAgencyTeamData', () => {
    const loadAgencyTeamData = jest.spyOn(getInstance(), 'loadAgencyTeamData');
    loadAgencyTeamData();
    expect(loadAgencyTeamData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyTeamData without data', () => {
    const response = {
      status: 0,
      message: 'Error',
    };
    const setAgencyTeamData = jest.spyOn(getInstance(), 'setAgencyTeamData');
    setAgencyTeamData(response);
    expect(setAgencyTeamData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyTeamData with data', () => {
    const response = {
      status: 1,
      data: [
        { value: 6, name: 'Product Manager' },
        { value: 6, name: 'Product (UI) designer' },
        { value: 4, name: 'Solution Architect' },
        { value: 3, name: 'Delivery Manager' },
        { value: 4, name: 'Data Scientist' },
        { value: 10, name: 'UX Manager' },
        { value: 15, name: 'Developer' },
        { value: 1, name: 'Database Architect' },
        { value: 14, name: 'DevOps engineer' },
      ],
      message: 'Success',
    };
    const setAgencyTeamData = jest.spyOn(getInstance(), 'setAgencyTeamData');
    setAgencyTeamData(response);
    expect(setAgencyTeamData).toHaveBeenCalledTimes(1);
  });

  test('Testing if Row1col2', () => {
    const Row1col2 = jest.spyOn(getInstance(), 'Row1col2');
    const projectCount = 10;
    const talentCount = 20;
    Row1col2(projectCount, talentCount);
    expect(Row1col2).toHaveBeenCalledTimes(1);
  });

  test('Testing if Row2Col', () => {
    const Row2Col = jest.spyOn(getInstance(), 'Row2Col');
    const team = [];
    Row2Col(team);
    expect(Row2Col).toHaveBeenCalledTimes(1);
  });

  test('Testing if Row2Col with data', () => {
    const Row2Col = jest.spyOn(getInstance(), 'Row2Col');
    const team = [];
    Row2Col(team);
    expect(Row2Col).toHaveBeenCalledTimes(1);
  });
});
