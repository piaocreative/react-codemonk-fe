import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CompanyDetails as MainForm } from '../CompanyDetails';

configure({ adapter: new Adapter() });

jest.mock('utils/request');

const props = {
  history: { push: jest.fn() },
  dispatch: jest.fn(),

  invalid: '',
  loading: false,

  billingType: '',
  companyDetails: {},
  fileUploading: {},
  docError: {},
  companyIncorporationCertificateUrl: '',
  companyVatRegistrationCertificateUrl: '',
  companyInsuranceDocumentUrl: '',
  handleChangeCompanyDetails: jest.fn(),
  onFileChange: jest.fn(),
  onDeleteFile: jest.fn(),
};

const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();

describe('CompanyDetails Component', () => {
  test('If the Component Renders Without Crashing', () => {
    const wrapper = shallow(<MainForm {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('test functions', () => {
  getWrapper();

  test('Testing if renderRow1', () => {
    const renderRow1 = jest.spyOn(getInstance(), 'renderRow1');
    renderRow1();
    expect(renderRow1).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderRow2', () => {
    const renderRow2 = jest.spyOn(getInstance(), 'renderRow2');
    renderRow2();
    expect(renderRow2).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderRow3', () => {
    const renderRow3 = jest.spyOn(getInstance(), 'renderRow3');
    renderRow3();
    expect(renderRow3).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderRow4', () => {
    const renderRow4 = jest.spyOn(getInstance(), 'renderRow4');
    renderRow4();
    expect(renderRow4).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderRow5', () => {
    const renderRow5 = jest.spyOn(getInstance(), 'renderRow5');
    renderRow5();
    expect(renderRow5).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChange', () => {
    const handleChange = jest.spyOn(getInstance(), 'handleChange');
    const address = 'address';
    handleChange(address);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
