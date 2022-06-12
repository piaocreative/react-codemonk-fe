import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Quotes as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  history: { replace: jest.fn(), push: jest.fn() },
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Quotes Component', () => {
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
    const value = 'search';
    handleTimesheetSearchChange(value);
    expect(handleTimesheetSearchChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleStatusFilter', () => {
    const handleStatusFilter = jest.spyOn(getInstance(), 'handleStatusFilter');
    const e = { label: 'All', value: -1 };
    handleStatusFilter(e);
    expect(handleStatusFilter).toHaveBeenCalledTimes(1);
  });
});
