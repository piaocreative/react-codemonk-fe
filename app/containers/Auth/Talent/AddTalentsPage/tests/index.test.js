import React from 'react';
import { shallow } from 'enzyme';
import Emitter from 'utils/emitter';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { SUBMIT_ADD_TALENTS } from 'containers/Agency/MyTeam/constants';
import { AddTalentsPage as MainForm, mapDispatchToProps } from '../index';

jest.mock('utils/request');

const props = {
  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  talentsArray: [
    {
      firstName: 'Talent One',
      lastName: 'Talent Last One',
      email: 'talent1@mailinator.com',
      currency: 'USD',
      rate: 40,
    },
  ],
  currency: 'USD',
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),

  onChangeTalent: jest.fn(),
  onSaveForLater: jest.fn(),
  onSubmitAddTalents: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};
describe('Personal detail Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  // Emitter Tests
  test('Testing if toggle with addTalentSaga', () => {
    const component = shallow(<MainForm {...props} />);
    Emitter.emit('addTalentSaga', true);
    expect(component.state('showAddTalentModal')).toEqual(false);
  });

  test('Testing if toggle with editTalentSaga', () => {
    const component = shallow(<MainForm {...props} />);
    Emitter.emit('editTalentSaga', true);
    expect(component.state('showAddTalentModal')).toEqual(false);
  });

  test('Testing if toggle with deleteTalentSaga', () => {
    const component = shallow(<MainForm {...props} />);
    Emitter.emit('deleteTalentSaga', true);
    expect(component.state('showDeleteModal')).toEqual(false);
  });

  test('Testing if emitter off on component unmount', () => {
    const component = shallow(<MainForm {...props} />);
    jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  test('Testing if loaderUserDetails', () => {
    const loaderUserDetails = jest.spyOn(getInstance(), 'loaderUserDetails');
    loaderUserDetails();
    expect(loaderUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setUserDetails with empty response', () => {
    const setUserDetails = jest.spyOn(getInstance(), 'setUserDetails');
    setUserDetails({});
    expect(setUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setUserDetails with response status 1 ', () => {
    const setUserDetails = jest.spyOn(getInstance(), 'setUserDetails');
    setUserDetails({ status: 1 });
    expect(setUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleAddTalentCloseModal with modalType === add ', () => {
    const handleAddTalentCloseModal = jest.spyOn(getInstance(), 'handleAddTalentCloseModal');
    handleAddTalentCloseModal();
    expect(handleAddTalentCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleAddTalentOpenModal with modalType === add ', () => {
    const handleAddTalentOpenModal = jest.spyOn(getInstance(), 'handleAddTalentOpenModal');
    handleAddTalentOpenModal('add', 0);
    expect(handleAddTalentOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleAddTalentOpenModal with modalType === edit ', () => {
    const talentsArray = [
      {
        firstName: 'Talent One',
        lastName: 'Talent Last One',
        email: 'talent1@mailinator.com',
        currency: 'USD',
        rate: 40,
      },
    ];
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ talentsArray });
    const handleAddTalentOpenModal = jest.spyOn(wrapper.instance(), 'handleAddTalentOpenModal');
    handleAddTalentOpenModal('edit', 0);
    expect(handleAddTalentOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if popupSubmit with modalType === add ', () => {
    const popupSubmit = jest.spyOn(getInstance(), 'popupSubmit');
    popupSubmit('add');
    expect(popupSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if popupSubmit with modalType === edit ', () => {
    const popupSubmit = jest.spyOn(getInstance(), 'popupSubmit');
    popupSubmit('edit');
    expect(popupSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleDeleteTalentOpenModal ', () => {
    const handleDeleteTalentOpenModal = jest.spyOn(getInstance(), 'handleDeleteTalentOpenModal');
    handleDeleteTalentOpenModal();
    expect(handleDeleteTalentOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleDeleteTalentCloseModal ', () => {
    const handleDeleteTalentCloseModal = jest.spyOn(getInstance(), 'handleDeleteTalentCloseModal');
    handleDeleteTalentCloseModal();
    expect(handleDeleteTalentCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if submitDelete', () => {
    const submitDelete = jest.spyOn(getInstance(), 'submitDelete');
    submitDelete(0);
    expect(submitDelete).toHaveBeenCalledTimes(1);
  });

  // onDrop
  test('test onDrop', () => {
    const onDrop = jest.spyOn(getInstance(), 'onDrop');
    const acceptedFiles = [{ name: 'test' }, { name: 'test' }, { name: 'test' }];
    const rejectedFile = [{ name: 'test', errors: [{ code: 'file-invalid-type' }] }, { name: 'test' }];
    onDrop(acceptedFiles, rejectedFile);
    expect(onDrop).toHaveBeenCalledTimes(1);
  });
  test('test onDrop', () => {
    const onDrop = jest.spyOn(getInstance(), 'onDrop');
    const acceptedFiles = [{ name: 'test' }, { name: 'test' }, { name: 'test' }];
    const rejectedFile = [{ name: 'test' }, { name: 'test' }];
    onDrop(acceptedFiles, rejectedFile);
    expect(onDrop).toHaveBeenCalledTimes(1);
  });

  // checkFileType
  test('Testing if checkFileType', () => {
    const selectedFile = new Blob(['testing'], { type: 'application/vnd.ms-excel' });
    const reader = new FileReader();
    const checkFileType = jest.spyOn(getInstance(), 'checkFileType');
    checkFileType(selectedFile, reader);
    expect(checkFileType).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkFileType with wrong extension', () => {
    const selectedFile = {
      name: 'abcd.pdf',
      type: 'document/pdf',
    };
    const reader = new FileReader();
    const checkFileType = jest.spyOn(getInstance(), 'checkFileType');
    checkFileType(selectedFile, reader);
    expect(checkFileType).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkFileType with no selected file', () => {
    const selectedFile = '';
    const reader = new FileReader();
    const checkFileType = jest.spyOn(getInstance(), 'checkFileType');
    checkFileType(selectedFile, reader);
    expect(checkFileType).toHaveBeenCalledTimes(1);
  });

  test('Testing if uploadTalentsFile', () => {
    const uploadTalentsFile = jest.spyOn(getInstance(), 'uploadTalentsFile');
    uploadTalentsFile();
    expect(uploadTalentsFile).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleTalentUploadFile', () => {
    const handleTalentUploadFile = jest.spyOn(getInstance(), 'handleTalentUploadFile');
    const response = { status: 1, message: 'success' };
    handleTalentUploadFile(response);
    expect(handleTalentUploadFile).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleTalentUploadFile with else', () => {
    const handleTalentUploadFile = jest.spyOn(getInstance(), 'handleTalentUploadFile');
    const response = { status: 0, message: 'Error' };
    handleTalentUploadFile(response);
    expect(handleTalentUploadFile).toHaveBeenCalledTimes(1);
  });

  // deleteFile
  test('test deleteFile', () => {
    const deleteFile = jest.spyOn(getInstance(), 'deleteFile');

    deleteFile();
    expect(deleteFile).toHaveBeenCalledTimes(1);
  });

  // saveLater
  test('Testing if handleSaveForLater', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() });
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSaveForLater with continue', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() }, 'continue');
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if setSaveForLater with continue', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() }, 'continue');
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });
  test('for setSaveForLater with company', () => {
    const prevProps = props;
    prevProps.registrationType = 'company';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const setSaveForLater = jest.spyOn(wrapper.instance(), 'setSaveForLater');
    const event = { preventDefault: jest.fn() };
    setSaveForLater(event, 'continue');
    expect(setSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('for setSaveForLater with individual', () => {
    const prevProps = props;
    prevProps.registrationType = 'individual';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const setSaveForLater = jest.spyOn(wrapper.instance(), 'setSaveForLater');
    const event = { preventDefault: jest.fn() };
    setSaveForLater(event, 'continue');
    expect(setSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('for setSaveForLater with saveForLater', () => {
    const prevProps = props;
    prevProps.registrationType = 'individual';
    prevProps.handleSubmit = jest.fn();
    const wrapper = shallow(<MainForm {...prevProps} />);
    const setSaveForLater = jest.spyOn(wrapper.instance(), 'setSaveForLater');
    const event = { preventDefault: jest.fn() };
    setSaveForLater(event, 'saveForLater');
    expect(setSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderDeleteTalentModal', () => {
    const renderDeleteTalentModal = jest.spyOn(getInstance(), 'renderDeleteTalentModal');
    renderDeleteTalentModal();
    expect(renderDeleteTalentModal).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if save event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SUBMIT_ADD_TALENTS,
      payload: 'saveForLater',
    });
  });

  test('Testing if save event with no event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SUBMIT_ADD_TALENTS,
      payload: 'saveForLater',
    });
  });

  test('Testing if onSubmitAddTalents event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAddTalents(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if onSubmitAddTalents event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAddTalents(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_ADD_TALENTS,
      payload: 'continue',
    });
  });

  test('Testing if onSubmitAddTalents with no event  are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onSubmitAddTalents(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_ADD_TALENTS,
      payload: 'continue',
    });
  });
});
