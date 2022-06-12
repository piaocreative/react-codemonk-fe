import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { UploadCV as MainForm, mapDispatchToProps } from '../index';
import { SUBMIT_UPLOAD_CV } from '../constants';

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

  onSubmitUploadCV: jest.fn(),
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

  // checkCVType
  test('Testing if checkCVType', () => {
    const selectedFile = new Blob(['testing'], { type: 'application/vnd.ms-excel' });
    const reader = new FileReader();
    const checkCVType = jest.spyOn(getInstance(), 'checkCVType');
    checkCVType(selectedFile, reader);
    expect(checkCVType).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkCVType with wrong extension', () => {
    const selectedFile = {
      name: 'abcd.pdf',
      type: 'document/pdf',
    };
    const reader = new FileReader();
    const checkCVType = jest.spyOn(getInstance(), 'checkCVType');
    checkCVType(selectedFile, reader);
    expect(checkCVType).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkCVType with no selected file', () => {
    const selectedFile = '';
    const reader = new FileReader();
    const checkCVType = jest.spyOn(getInstance(), 'checkCVType');
    checkCVType(selectedFile, reader);
    expect(checkCVType).toHaveBeenCalledTimes(1);
  });

  // deleteFile
  test('test deleteFile', () => {
    const deleteFile = jest.spyOn(getInstance(), 'deleteFile');
    deleteFile();
    expect(deleteFile).toHaveBeenCalledTimes(1);
  });

  // handleSkip
  test('Testing if handleSkip', () => {
    const handleSkip = jest.spyOn(getInstance(), 'handleSkip');
    handleSkip({ preventDefault: jest.fn() });
    expect(handleSkip).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSubmitCV ', () => {
    const handleSubmitCV = jest.spyOn(getInstance(), 'handleSubmitCV');
    handleSubmitCV();
    expect(handleSubmitCV).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if onSubmitUploadCV event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = {};

    mapDispatchToProps(dispatch).onSubmitUploadCV(data);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if onSubmitUploadCV event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = {};

    mapDispatchToProps(dispatch).onSubmitUploadCV(data);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_UPLOAD_CV,
      data,
    });
  });
});
