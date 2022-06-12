import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { MultiSelectDatePicker as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  history: [],
  teamPreference: '',
  dispatch: jest.fn(),
  assignments: '',
  handleDayClick: jest.fn(),
  selectedDays: [],
};
const getWrapper = () => shallow(<MainForm {...props} />);

const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Preference detail Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('handleDayClick', () => {
  const wrapper = shallow(<MainForm handleDayClick={jest.fn()} />);
  it('handleDayClick ', () => {
    const mockState = { selectedDays: [new Date()] };
    wrapper.setState({ ...mockState });

    const handleDayClick = jest.spyOn(wrapper.instance(), 'handleDayClick');
    handleDayClick(new Date(), { selected: true });
    expect(handleDayClick).toHaveBeenCalledTimes(1);
  });

  it('handleDayClick  with selected -> false', () => {
    const mockState = { selectedDays: [new Date()] };
    wrapper.setState({ ...mockState });

    const handleDayClick = jest.spyOn(wrapper.instance(), 'handleDayClick');
    handleDayClick(new Date(), { selected: false });
    expect(handleDayClick).toHaveBeenCalledTimes(2);
  });
});
