import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { CompanyDetailsFields as MainForm } from '../CompanyDetailsFields';

jest.mock('utils/request');

const props = {
  companyCountry: { label: 'India', value: 'India' },
  authorityPersonalEditFlag: true,
  authorityAddressEditFlag: true,
  editFlag: true,
  formKey: 'key',
  dispatch: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('CompanyDetailsFields Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  test('test handleChange', () => {
    const address = 'abcd';
    const handleChange = jest.spyOn(getInstance(), 'handleChange');
    handleChange(address);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('test renderCompanyAddressFields', () => {
    const renderCompanyAddressFields = jest.spyOn(getInstance(), 'renderCompanyAddressFields');
    renderCompanyAddressFields();
    expect(renderCompanyAddressFields).toHaveBeenCalledTimes(1);
  });
});
