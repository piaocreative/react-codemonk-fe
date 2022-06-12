import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { PersonalAddressFields as MainForm } from '../PersonalAddressFields';

jest.mock('utils/request');

const props = {};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('PersonalAddressFields Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});
