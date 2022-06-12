import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import request from 'utils/request';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import { PersonalIdComponent as MainForm } from '../PersonalIdComponent';

jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  idProof: '',
  addressProof: '',
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
props2.idProof = 'file1.jpg';
props2.addressProof = 'file1.jpg';

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

  test('Testing if renderIdProof', () => {
    const renderIdProof = jest.spyOn(getInstance2(), 'renderIdProof');
    renderIdProof();
    expect(renderIdProof).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderIdProof not', () => {
    const renderIdProof = jest.spyOn(getInstance(), 'renderIdProof');
    renderIdProof();
    expect(renderIdProof).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderAddressProof', () => {
    const renderAddressProof = jest.spyOn(getInstance2(), 'renderAddressProof');
    renderAddressProof();
    expect(renderAddressProof).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderAddressProof not', () => {
    const renderAddressProof = jest.spyOn(getInstance(), 'renderAddressProof');
    renderAddressProof();
    expect(renderAddressProof).toHaveBeenCalledTimes(1);
  });
});
