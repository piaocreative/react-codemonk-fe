import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS, POP_UP_SAGA } from 'containers/App/constants';
import initialState from 'containers/Auth/Education-Certification/reducer';
import { EDIT_CERTIFICATE, CHANGE_CERTIFICATE_DETAILS } from 'containers/Auth/Education-Certification/constants';
import { Certificate as MainForm, mapDispatchToProps } from '../Certificate';

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
  ],
  data: [
    {
      _id: '5ef1bc3ed692e5441ab6f87c',
      name: 'AWS Solution Architect 2',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
      certificateId: 'ABC123',
    },
  ],
  dispatch: jest.fn(),
  handleDateChange: jest.fn(),
  onAddExperience: jest.fn(),
  onDeleteForm: jest.fn(),
  handleSaveForLater: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitExperienceForm: jest.fn(),
  onChangeExperience: jest.fn(),
  modalOpen: jest.fn(),
  modalClose: jest.fn(),
  invalid: '',
  loading: false,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn(), replace: jest.fn() },
  location: { redirection: jest.fn() },

  onSaveForLater: jest.fn(),
};

const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Education-Certification Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleAddCertificateOpenModal', () => {
    const handleAddCertificateOpenModal = jest.spyOn(getInstance(), 'handleAddCertificateOpenModal');
    handleAddCertificateOpenModal();
    expect(handleAddCertificateOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleAddCertificateCloseModal', () => {
    const handleAddCertificateCloseModal = jest.spyOn(getInstance(), 'handleAddCertificateCloseModal');
    handleAddCertificateCloseModal();
    expect(handleAddCertificateCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleEditEducationOpenModal', () => {
    const handleEditCertificateOpenModal = jest.spyOn(getInstance(), 'handleEditCertificateOpenModal');
    handleEditCertificateOpenModal(0);
    expect(handleEditCertificateOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleEditCertificateCloseModal', () => {
    const handleEditCertificateCloseModal = jest.spyOn(getInstance(), 'handleEditCertificateCloseModal');
    handleEditCertificateCloseModal();
    expect(handleEditCertificateCloseModal).toHaveBeenCalledTimes(1);
  });
});
describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  LOAD_REPOS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitCertificateForm([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if  popUpSagaAction are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitCertificateForm({ preventDefault: jest.fn() }, 1);
    expect(dispatch.mock.calls[1][0]).toEqual({
      payload: true,
      type: POP_UP_SAGA,
    });
  });

  test('Testing if  EDIT_PROJECT are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitCertificateForm({ preventDefault: jest.fn() }, 1);
    expect(dispatch.mock.calls[2][0]).toEqual({
      payload: 'editCertificate',
      type: EDIT_CERTIFICATE,
      dataIndex: 1,
    });
  });

  test('Testing if  onSubmitAddEducationForm  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitAddCertificateForm({ preventDefault: jest.fn() }, 1);
    expect(dispatch.mock.calls[2][0]).toEqual({
      payload: 'addCertificate',
      type: EDIT_CERTIFICATE,
      dataIndex: 1,
    });
  });

  test('Testing if  onSubmitDeleteEducationForm  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitDeleteCertificateForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[1][0]).toEqual({
      payload: 'deleteCertificate',
      type: EDIT_CERTIFICATE,
    });
  });

  test('Testing if  onChangeEducation  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeCertificate([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: [],
      type: CHANGE_CERTIFICATE_DETAILS,
    });
  });
});
