import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Step2 as MainForm } from '../Step2';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  onWorkProgressChange: jest.fn(),
  onChangeProjectURL: jest.fn(),
  buildStatus: '',
  projectUrl: ['test', 'test'],
  preventDefault: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();

const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Step2 Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if handleBuildStatusChange', () => {
    const handleBuildStatusChange = jest.spyOn(getInstance(), 'handleBuildStatusChange');
    const event = {
      target: {
        value: '',
      },
    };
    handleBuildStatusChange(event);
    expect(handleBuildStatusChange).toHaveBeenCalledTimes(1);
  });
});
