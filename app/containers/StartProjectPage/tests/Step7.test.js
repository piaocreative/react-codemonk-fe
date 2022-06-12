import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Step7 as MainForm } from '../Step7';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  onManageTeamChange: jest.fn(),
  teamManageType: '',
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Step7 Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if handleManageTeamChange', () => {
    const handleManageTeamChange = jest.spyOn(getInstance(), 'handleManageTeamChange');
    const event = {
      target: {
        value: '',
      },
    };
    handleManageTeamChange(event);
    expect(handleManageTeamChange).toHaveBeenCalledTimes(1);
  });
});
