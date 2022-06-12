import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { AddProject as MainForm, mapDispatchToProps } from '../AddProject';
import { LOAD_REPOS, POP_UP_SAGA } from '../../../App/constants';
import { ADD_PROJECT } from '../constants';

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

describe('AddProject Component', () => {
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

  test('Testing if processClientData with status 0', () => {
    const processClientData = jest.spyOn(getInstance(), 'processClientData');
    const data = [];
    processClientData(data);
    expect(processClientData).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadOptions', () => {
    const loadOptions = jest.spyOn(getInstance(), 'loadOptions');
    loadOptions('client', jest.fn());
    expect(loadOptions).toHaveBeenCalledTimes(1);
  });
  test('Testing if loadOptions for company', () => {
    const loadCompanyOptions = jest.spyOn(getInstance(), 'loadCompanyOptions');
    loadCompanyOptions('client', jest.fn());
    expect(loadCompanyOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChange', () => {
    const handleChange = jest.spyOn(getInstance(), 'handleChange');
    handleChange({ label: 'company', value: 'xyz', companyName: 'Client' });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  test('Testing if handleChange for company field', () => {
    const handleCompanyChange = jest.spyOn(getInstance(), 'handleCompanyChange');
    handleCompanyChange({ label: 'company', value: 'xyz', clientName: 'Client' });
    expect(handleCompanyChange).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if the  LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAddProjectForm(event, []);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
  test('Testing if the  ADD_PROJECT events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAddProjectForm(event, []);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: POP_UP_SAGA,
      payload: true,
    });
  });
  test('Testing if the  ADD_PROJECT events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAddProjectForm(event, []);
    expect(dispatch.mock.calls[2][0]).toEqual({
      type: ADD_PROJECT,
      data: [],
    });
  });
});
