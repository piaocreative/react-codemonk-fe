import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import * as functions from '../TradingAddressFields';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  onChangeRate: jest.fn(),
};
const getWrapper = () => shallow(<functions.TradingAddressFields {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('TradingAddressFields Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});
