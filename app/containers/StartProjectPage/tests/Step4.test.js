import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Step4 as MainForm } from '../Step4';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  onBudgetChange: jest.fn(),
  handleBudgetChange: jest.fn(),
  budget: '',
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Step4 Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if handleBudgetChange', () => {
    const handleBudgetChange = jest.spyOn(getInstance(), 'handleBudgetChange');
    const event = {
      target: {
        value: '',
      },
    };
    handleBudgetChange(event);
    expect(handleBudgetChange).toHaveBeenCalledTimes(1);
  });
});
