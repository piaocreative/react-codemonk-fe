import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Step6 as MainForm } from '../Step6';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  onProjectSpeedChange: jest.fn(),
  speed: '',
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Step6 Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if handleProjectSpeedChange', () => {
    const handleProjectSpeedChange = jest.spyOn(getInstance(), 'handleProjectSpeedChange');
    const event = {
      target: {
        value: '',
      },
    };
    handleProjectSpeedChange(event);
    expect(handleProjectSpeedChange).toHaveBeenCalledTimes(1);
  });
});
