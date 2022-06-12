import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { SortComponent as MainForm } from '../index';
jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),

  sortArray: [
    { label: 'Name (A-Z)', value: 'aToZ' },
    { label: 'Name (Z-A)', value: 'zToA' },
    { label: 'Experience (Low to High)', value: 'lowToHigh' },
    { label: 'Experience (High to Low)', value: 'highToLow' },
  ],
  currentSort: '',
  handleSortChange: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('SortComponent Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if dropdownToggle', () => {
    const dropdownToggle = jest.spyOn(getInstance(), 'dropdownToggle');
    dropdownToggle();
    expect(dropdownToggle).toHaveBeenCalledTimes(1);
  });
});
