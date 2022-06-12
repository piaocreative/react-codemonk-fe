import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Referrals as MainForm } from '../index';

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

  test('Testing if loadReferrals', () => {
    const loadReferrals = jest.spyOn(getInstance(), 'loadReferrals');
    loadReferrals(1);
    expect(loadReferrals).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSort', () => {
    const handleSort = jest.spyOn(getInstance(), 'handleSort');
    const column = { id: 'eNIBPCJtf', name: 'Week starting', selector: 'weekStart', sortable: true };
    const sortDirection = 'asc';
    handleSort(column, sortDirection);
    expect(handleSort).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleStatusFilter', () => {
    const handleStatusFilter = jest.spyOn(getInstance(), 'handleStatusFilter');
    const e = { label: 'Draft', value: 3 };
    handleStatusFilter(e);
    expect(handleStatusFilter).toHaveBeenCalledTimes(1);
  });
});
