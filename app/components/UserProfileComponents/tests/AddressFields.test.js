import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { AddressFields as MainForm } from '../AddressFields';

jest.mock('utils/request');

const props = {};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('AddressFields Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});
