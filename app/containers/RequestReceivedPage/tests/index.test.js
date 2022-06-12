import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { RequestReceivedPage as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitProjectDetailsForm: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('RequestReceivedPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});
