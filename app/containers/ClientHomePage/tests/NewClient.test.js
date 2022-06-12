import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { NewClient as MainForm } from '../NewClient';

jest.mock('utils/request');

let store;
const mockStore = configureStore();

const props = { history: { replace: jest.fn(), push: jest.fn() }, location: { redirection: false } };
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('NewClient Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('NewClient Functions', () => {
  intializeSetup();
  getWrapper();
  it('Testing if loadClientBrief', () => {
    const loadClientBrief = jest.spyOn(getInstance(), 'loadClientBrief');
    loadClientBrief();
    expect(loadClientBrief).toHaveBeenCalledTimes(1);
  });

  it('Testing if loadProjectDetails', () => {
    const loadProjectDetails = jest.spyOn(getInstance(), 'loadProjectDetails');
    loadProjectDetails();
    expect(loadProjectDetails).toHaveBeenCalledTimes(1);
  });
});
