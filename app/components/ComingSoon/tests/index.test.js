import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { ComingSoon as MainForm } from '../index';

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
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleSubscribe', () => {
    const handleSubscribe = jest.spyOn(getInstance(), 'handleSubscribe');
    const event = { preventDefault: jest.fn() };
    handleSubscribe(event);
    expect(handleSubscribe).toHaveBeenCalledTimes(1);
  });

  test('Testing if onSubmitSuccess with if', () => {
    const onSubmitSuccess = jest.spyOn(getInstance(), 'onSubmitSuccess');
    const response = { status: 1, message: 'success' };
    onSubmitSuccess(response);
    expect(onSubmitSuccess).toHaveBeenCalledTimes(1);
  });

  test('Testing if onSubmitSuccess with else', () => {
    const onSubmitSuccess = jest.spyOn(getInstance(), 'onSubmitSuccess');
    const response = { status: 0, message: 'error' };
    onSubmitSuccess(response);
    expect(onSubmitSuccess).toHaveBeenCalledTimes(1);
  });
});
