import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { RateComponents as MainForm } from '../Rate';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  onChangeRate: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('RateComponents Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if handleRateChange', () => {
    const handleRateChange = jest.spyOn(getInstance(), 'handleRateChange');
    handleRateChange({ target: { name: 'ratePerHour', value: '100' } });
    expect(handleRateChange).toHaveBeenCalledTimes(1);
  });
});
