import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { IndividualClientFields as MainForm } from '../IndividualClientFields';

jest.mock('utils/request');

const props = {};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('IndividualClientFields Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});
