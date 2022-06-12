import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { CompanyDocuments as MainForm } from '../CompanyDocuments';

jest.mock('utils/request');

const props = {
  companyIncorporationCertificateUrl: jest.fn(),
  companyTaxRegistrationCertificateUrl: jest.fn(),
  utilityBillDocumentUrl: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('CompanyDocuments Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});
