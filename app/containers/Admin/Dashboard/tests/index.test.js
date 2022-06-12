import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Dashboard as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitSubscribe: jest.fn(),
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

  test('Testing if callFetchAPI', () => {
    const callFetchAPI = jest.spyOn(getInstance(), 'callFetchAPI');
    callFetchAPI();
    expect(callFetchAPI).toHaveBeenCalledTimes(1);
  });
});
