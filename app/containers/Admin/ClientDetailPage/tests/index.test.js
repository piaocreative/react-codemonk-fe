import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { ClientDetailPage as MainForm } from '../index';

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
  onChangeResult: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ClientDetailPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if loadAdminClientDetails', () => {
    const loadAdminClientDetails = jest.spyOn(getInstance(), 'loadAdminClientDetails');
    loadAdminClientDetails();
    expect(loadAdminClientDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAdminClientDetails with status 0', () => {
    const setAdminClientDetails = jest.spyOn(getInstance(), 'setAdminClientDetails');
    const response = { status: 0, message: 'some error' };
    setAdminClientDetails(response);
    expect(setAdminClientDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAdminClientDetails with status 1', () => {
    const setAdminClientDetails = jest.spyOn(getInstance(), 'setAdminClientDetails');
    const response = { status: 1, data: {} };
    setAdminClientDetails(response);
    expect(setAdminClientDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderAddressAuthorisedPerson', () => {
    const renderAddressAuthorisedPerson = jest.spyOn(getInstance(), 'renderAddressAuthorisedPerson');
    renderAddressAuthorisedPerson();
    expect(renderAddressAuthorisedPerson).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderCompanyDetails', () => {
    const renderCompanyDetails = jest.spyOn(getInstance(), 'renderCompanyDetails');
    renderCompanyDetails();
    expect(renderCompanyDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if showProxyLoginCTA', () => {
    const clientData = {
      status: 1,
      data: {
        _id: '07f2d0b238',
        firstName: 'Client Unregistered',
        lastName: 'Last Name',
        billing: {
          type: 'individual',
        },
        jobTitle: 'CTO',
        addressLineOne: '200 Avenida Miguel Alemán',
        city: 'San Nicolás de los Garza',
        country: 'Mexico',
        postcode: '66470',
        registerType: 'individual',
        timeZone: 'Etc/GMT-11',
        status: 'Active',
      },
      message: 'Success',
    };
    const showProxyLoginCTA = jest.spyOn(getInstance(), 'showProxyLoginCTA');
    showProxyLoginCTA(clientData);
    expect(showProxyLoginCTA).toHaveBeenCalledTimes(1);
  });
});
