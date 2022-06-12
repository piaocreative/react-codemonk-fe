import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Timesheets as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitSubscribe: jest.fn(),
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
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleTimesheetSearchChange', () => {
    const handleTimesheetSearchChange = jest.spyOn(getInstance(), 'handleTimesheetSearchChange');
    const value = 'project';
    handleTimesheetSearchChange(value);
    expect(handleTimesheetSearchChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleStatusFilter', () => {
    const handleStatusFilter = jest.spyOn(getInstance(), 'handleStatusFilter');
    const e = { label: 'Draft', value: 3 };
    handleStatusFilter(e);
    expect(handleStatusFilter).toHaveBeenCalledTimes(1);
  });
});
