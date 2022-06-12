import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import ProjectFooter from '../projectFooter';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  briefID: 'id',
  loadDetails: jest.fn(),
  onSubmitTimesheet: jest.fn(),
  loading: false,
  match: {
    params: {},
  },
  formKey: 'key',
  type: 'add',

  weekStarting: new Date(),
  project: '',
  privacyPolicy: false,
};
const getWrapper = () => shallow(<ProjectFooter {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ProjectFooter Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});
