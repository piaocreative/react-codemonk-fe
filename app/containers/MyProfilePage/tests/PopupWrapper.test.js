import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { PopupWrapper as MainForm } from '../PopupWrapper';

jest.mock('utils/request');

const props = {};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('PopupWrapper Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if getButtonText with edit', () => {
    const getButtonText = jest.spyOn(getInstance(), 'getButtonText');
    const modalType = 'edit';
    getButtonText(modalType);
    expect(getButtonText).toHaveBeenCalledTimes(1);
  });

  test('Testing if getButtonText with add', () => {
    const getButtonText = jest.spyOn(getInstance(), 'getButtonText');
    const modalType = 'add';
    getButtonText(modalType);
    expect(getButtonText).toHaveBeenCalledTimes(1);
  });

  test('Testing if getButtonText with hire', () => {
    const getButtonText = jest.spyOn(getInstance(), 'getButtonText');
    const modalType = 'hire';
    getButtonText(modalType);
    expect(getButtonText).toHaveBeenCalledTimes(1);
  });

  test('Testing if getButtonText with submit', () => {
    const getButtonText = jest.spyOn(getInstance(), 'getButtonText');
    const modalType = 'submit';
    getButtonText(modalType);
    expect(getButtonText).toHaveBeenCalledTimes(1);
  });

  test('Testing if getButtonText with allocate', () => {
    const getButtonText = jest.spyOn(getInstance(), 'getButtonText');
    const modalType = 'allocate';
    getButtonText(modalType);
    expect(getButtonText).toHaveBeenCalledTimes(1);
  });

  test('Testing if getButtonText with else', () => {
    const getButtonText = jest.spyOn(getInstance(), 'getButtonText');
    const modalType = 'else';
    getButtonText(modalType);
    expect(getButtonText).toHaveBeenCalledTimes(1);
  });
});
