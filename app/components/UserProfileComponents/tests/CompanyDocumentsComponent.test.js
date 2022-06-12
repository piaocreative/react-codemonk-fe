import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import request from 'utils/request';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import { CompanyDocumentsComponent as MainForm } from '../CompanyDocumentsComponent';

jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  companyIncorporationCertificateUrl: '',
  companyVatRegistrationCertificateUrl: '',
  companyInsuranceDocumentUrl: '',
  fileUploading: {},
  docError: {},
  onFileChange: jest.fn(),
  onDeleteFile: jest.fn(),
  editFlag: true,

  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeCertificate: jest.fn(),
  onChangeSecondForm: jest.fn(),

  onSubmitCertificateForm: jest.fn(),
  onSubmitAddCertificateForm: jest.fn(),
  onSubmitDeleteCertificateForm: jest.fn(),

  onBoarding: false,
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },

  onSaveForLater: jest.fn(),
  formKey: 'WorkExperienceForm',
};

const props2 = jsonCopy(props);
props2.companyIncorporationCertificateUrl = 'file1.jpg';
props2.companyVatRegistrationCertificateUrl = 'file1.jpg';
props2.companyInsuranceDocumentUrl = 'file1.jpg';

const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();

const getWrapper2 = () => shallow(<MainForm store={store} {...props2} />);
const getInstance2 = () => getWrapper2().instance();

const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if renderIncCerti', () => {
    const renderIncCerti = jest.spyOn(getInstance2(), 'renderIncCerti');
    renderIncCerti();
    expect(renderIncCerti).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderIncCerti not', () => {
    const renderIncCerti = jest.spyOn(getInstance(), 'renderIncCerti');
    renderIncCerti();
    expect(renderIncCerti).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderVatCerti', () => {
    const renderVatCerti = jest.spyOn(getInstance2(), 'renderVatCerti');
    renderVatCerti();
    expect(renderVatCerti).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderVatCerti not', () => {
    const renderVatCerti = jest.spyOn(getInstance(), 'renderVatCerti');
    renderVatCerti();
    expect(renderVatCerti).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderInstCerti', () => {
    const renderInstCerti = jest.spyOn(getInstance2(), 'renderInstCerti');
    renderInstCerti();
    expect(renderInstCerti).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderInstCerti not', () => {
    const renderInstCerti = jest.spyOn(getInstance(), 'renderInstCerti');
    renderInstCerti();
    expect(renderInstCerti).toHaveBeenCalledTimes(1);
  });
});
