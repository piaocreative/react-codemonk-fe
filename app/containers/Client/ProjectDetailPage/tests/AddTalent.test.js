import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { AddTalent as MainForm } from '../AddTalent';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },

  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
  onSubmitAddTalentForm: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('AddTalent Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if fetchClient', () => {
    const fetchClient = jest.spyOn(getInstance(), 'fetchClient');
    fetchClient('client');
    expect(fetchClient).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadOptions', () => {
    const loadOptions = jest.spyOn(getInstance(), 'loadOptions');
    loadOptions('client', jest.fn());
    expect(loadOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChange', () => {
    const handleChange = jest.spyOn(getInstance(), 'handleChange');
    handleChange();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleDateChange', () => {
    const handleDateChange = jest.spyOn(getInstance(), 'handleDateChange');
    handleDateChange('startDate', new Date());
    expect(handleDateChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleDateChange', () => {
    const handleDateChange = jest.spyOn(getInstance(), 'handleDateChange');
    handleDateChange('endDate', new Date());
    expect(handleDateChange).toHaveBeenCalledTimes(1);
  });
});
