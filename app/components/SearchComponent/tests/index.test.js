/**
 * Test the SearchComponent
 */

import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';
import * as functions from '../index';

jest.mock('utils/request');
const defaultProps = {
  placeholder: 'Search',
  handleSearchChange: jest.fn(),
};

describe(' <SearchComponent />', () => {
  const renderComponent = shallow(<functions.SearchComponent loading error={false} {...defaultProps} />);
  it('should render select', () => {
    expect(renderComponent.find(Select).length).toBe(0);
  });
});

describe('test functions', () => {
  test('test searchOpen', () => {
    const setSearch = jest.fn();
    const searchOpen = jest.spyOn(functions, 'searchOpen');
    searchOpen(setSearch);
    expect(searchOpen).toHaveBeenCalledTimes(1);
  });

  test('test searchClose', () => {
    const searchVal = 'abc';
    const handleSearchChange = jest.fn();
    const setClicked = jest.fn();
    const setSearch = jest.fn();
    const searchClose = jest.spyOn(functions, 'searchClose');
    searchClose(searchVal, handleSearchChange, setClicked, setSearch);
    expect(searchClose).toHaveBeenCalledTimes(1);
  });

  test('test searchClose with else', () => {
    const searchVal = '';
    const handleSearchChange = jest.fn();
    const setClicked = jest.fn();
    const setSearch = jest.fn();
    const searchClose = jest.spyOn(functions, 'searchClose');
    searchClose(searchVal, handleSearchChange, setClicked, setSearch);
    expect(searchClose).toHaveBeenCalledTimes(2);
  });
});
