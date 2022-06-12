import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import moment from 'moment';
import request from 'utils/request';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import { CertificateComponent as MainForm } from '../CertificateComponent';

jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  certificate: [
    {
      _id: '5ef1bc3ed692e5441ab6f87c',
      name: 'AWS Solution Architect 2',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
      certificateId: 'ABC123',
    },
    {
      _id: '5ef1bc3sdaded692e5441ab6f87c',
      name: 'AWS Solution Architect 2',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
      certificateId: 'ABC123',
    },
  ],
  index: 0,
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
props2.certificate = [
  {
    _id: '5ef1bc3ed692e5441ab6f87c',
    name: 'AWS Solution Architect 2',
    dateObtained: '30/08/2019',
    issuedBy: 'Amazon',
    certificateId: 'ABC123',
  },
  {
    _id: '5ef1bc3ed692e5441ab6f87c',
    name: 'AWS Solution Architect 2',
    dateObtained: '30/08/2019',
    issuedBy: 'Amazon',
    certificateId: 'ABC123',
  },
];
props2.onBoarding = true;
props2.dispatch = jest.fn();
props2.onChangeCertificate = jest.fn();
props2.onChangeSecondCertificate = jest.fn();
props2.secondCertificateFormTouch = [0, 0];

const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();

const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  const certificate = [
    {
      _id: '5ef1bc3ed692e5441ab6f87c',
      name: 'AWS Solution Architect 2',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
      certificateId: 'ABC123',
    },
  ];

  const certificateLen2 = [
    {
      _id: '5ef1bc3ed692e5441ab6f87c',
      name: 'AWS Solution Architect 3',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
      certificateId: '11245',
    },
    {
      _id: 'dasdasd',
      name: '',
      dateObtained: '',
      issuedBy: '',
      certificateId: '',
    },
  ];

  test('Testing if setValues', () => {
    const setValues = jest.spyOn(getInstance(), 'setValues');
    setValues(certificate, 0, 'WorkExperienceForm');
    expect(setValues).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleFieldData ', () => {
    const handleFieldData = jest.spyOn(getInstance(), 'handleFieldData');
    handleFieldData({ target: { value: 'ABS Ceritificate', name: 'name0' } }, 0);
    expect(handleFieldData).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleFieldData ', () => {
    const handleFieldData = jest.spyOn(getInstance(), 'handleFieldData');
    handleFieldData({ target: { value: '12345', name: 'certificateId' } }, 0);
    expect(handleFieldData).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleDateChange ', () => {
    const handleDateChange = jest.spyOn(getInstance(), 'handleDateChange');
    const newDate = new Date();
    handleDateChange(newDate, 0, 'startDate0');
    expect(handleDateChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if getValidation ', () => {
    const getValidation = jest.spyOn(getInstance(), 'getValidation');
    getValidation(0, [jest.fn()]);
    expect(getValidation).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkForEmpty ', () => {
    const checkForEmpty = jest.spyOn(getInstance(), 'checkForEmpty');
    checkForEmpty(certificateLen2, 0);
    expect(checkForEmpty).toHaveBeenCalledTimes(1);
  });

  test('Testing if changeFieldData ', () => {
    const changeFieldData = jest.spyOn(getInstance(), 'changeFieldData');
    changeFieldData({ target: { value: 'ABCD', name: 'issuedBy0' } }, 0);
    expect(changeFieldData).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderDeleteButton with if', () => {
    const renderDeleteButton = jest.spyOn(getInstance(), 'renderDeleteButton');
    renderDeleteButton(true, 0, jest.fn());
    expect(renderDeleteButton).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderDeleteButton with else', () => {
    const renderDeleteButton = jest.spyOn(getInstance(), 'renderDeleteButton');
    renderDeleteButton(false, 0, jest.fn());
    expect(renderDeleteButton).toHaveBeenCalledTimes(1);
  });
});

describe('test datepicker functions', () => {
  const certificate = [
    {
      _id: '5ef1bc3ed692e5441ab6f87c',
      name: 'AWS Solution Architect 3',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
      certificateId: '11245',
    },
  ];
  const certificateLen2 = [
    {
      _id: '5ef1bc3ed692e5441ab6f87c',
      name: 'AWS Solution Architect 3',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
      certificateId: '11245',
    },
    {
      _id: '5ef1bc3ed6ada441ab6f87c',
      name: 'Cisco',
      dateObtained: '10/01/1994',
      issuedBy: 'Amazon',
      certificateId: '11445',
    },
  ];

  test('Testing if onChangeRaw ', () => {
    const onChangeRaw = jest.spyOn(getInstance(), 'onChangeRaw');
    onChangeRaw(moment(), certificate, 0, 'dateObtained');
    expect(onChangeRaw).toHaveBeenCalledTimes(1);
  });

  test('Testing if dateChange with index 1', () => {
    const dateChange = jest.spyOn(getInstance(), 'dateChange');
    dateChange(certificateLen2, moment(), 1, 'dateObtained');
    expect(dateChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if dateChange with index 0', () => {
    const dateChange = jest.spyOn(getInstance(), 'dateChange');
    dateChange(certificate, moment(), 0, 'dateObtained');
    expect(dateChange).toHaveBeenCalledTimes(1);
  });
});
