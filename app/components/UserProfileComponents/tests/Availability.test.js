import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { AvailabilityComponents as MainForm } from '../Availability';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  onChangeBrief: jest.fn(),
  onAvailabilityChange: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('AvailabilityComponents Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('Availability Component', () => {
  intializeSetup();
  test('onChangeAvailability call', () => {
    const wrappper = getWrapper();
    const test = wrappper.find('[data-testid="SwitchButton"]');
    test.props().onChange();
    expect(props.onAvailabilityChange).toBeCalled();
  });
});
