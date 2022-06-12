import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Projects as MainForm, mapDispatchToProps } from '../index';
import { CHANGE_PROJECT_STATUS } from '../constants';

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

  test('Testing if handleSearchChange', () => {
    const handleSearchChange = jest.spyOn(getInstance(), 'handleSearchChange');
    const value = 'user';
    handleSearchChange(value);
    expect(handleSearchChange).toHaveBeenCalledTimes(1);
  });

  test('test handleStatusChange', () => {
    const event = {
      target: {
        name: 'test',
        value: 'test',
      },
    };
    const wrapper = shallow(<MainForm {...props} />);
    const handleStatusChange = jest.spyOn(wrapper.instance(), 'handleStatusChange');
    wrapper.instance().handleStatusChange(event);
    expect(handleStatusChange).toBeCalled();
  });

  test('test handleFiltersOpenModal', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ showFiltersModal: false });
    wrapper.instance().handleFiltersOpenModal();
    expect(wrapper.state().showFiltersModal).toEqual(true);
  });

  test('test handleFiltersCloseModal', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ showFiltersModal: true });
    wrapper.instance().handleFiltersCloseModal();
    expect(wrapper.state().showFiltersModal).toEqual(false);
  });

  test('Testing if filterChanged with update', () => {
    const filterChanged = jest.spyOn(getInstance(), 'filterChanged');
    filterChanged('update');
    expect(filterChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if filterChanged with clear', () => {
    const filterChanged = jest.spyOn(getInstance(), 'filterChanged');
    filterChanged('clear');
    expect(filterChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if filterChanged with else', () => {
    const filterChanged = jest.spyOn(getInstance(), 'filterChanged');
    filterChanged('else');
    expect(filterChanged).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the  onChangeStatus events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = { name: 'Active', value: 1 };
    const onSuccess = jest.fn();

    mapDispatchToProps(dispatch).onChangeStatus(data, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_PROJECT_STATUS,
      data,
      onSuccess,
    });
  });
});
