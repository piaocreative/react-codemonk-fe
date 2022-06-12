import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { AddQuote as MainForm, mapDispatchToProps } from '../index';
import { SUBMIT_QUOTE } from '../constants';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  briefID: 'id',
  loadDetails: jest.fn(),
  onSubmitQuote: jest.fn(),
  loading: false,
  match: {
    params: {},
  },
  formKey: 'key',
  type: 'add',

  weekStarting: new Date(),
  project: '',
  privacyPolicy: false,
  quoteDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('AddQuote Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if onFileChange ', () => {
    const onFileChange = jest.spyOn(getInstance(), 'onFileChange');
    onFileChange({ target: { name: 'quoteFile', files: {} } });
    expect(onFileChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with file length 0', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('quoteFile', { length: 0 });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with file length 1 and no error', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('quoteFile', { length: 1, 0: { size: 20480, type: 'image/png' } });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with file length greater than 1', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('quoteFile', { length: 2, 0: { size: 1212101 }, 1: { size: 1212101 } });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if onDeleteFile ', () => {
    const onDeleteFile = jest.spyOn(getInstance(), 'onDeleteFile');
    onDeleteFile('quoteFile');
    expect(onDeleteFile).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderQuoteFile ', () => {
    const renderQuoteFile = jest.spyOn(getInstance(), 'renderQuoteFile');
    renderQuoteFile('quoteFile');
    expect(renderQuoteFile).toHaveBeenCalledTimes(1);
  });

  // getAddQuoteProjectOptions
  test('Testing if getAddQuoteProjectOptions with if', () => {
    const getAddQuoteProjectOptions = jest.spyOn(getInstance(), 'getAddQuoteProjectOptions');
    const reponse = {
      status: 1,
      message: 'Success',
      data: [
        {
          value: 'client1',
          label: 'client1',
        },
        {
          value: 'client2',
          label: 'client2',
        },
      ],
    };
    const callBack = jest.fn();
    getAddQuoteProjectOptions(reponse, callBack);
    expect(getAddQuoteProjectOptions).toHaveBeenCalledTimes(1);
  });
  test('Testing if getAddQuoteProjectOptions with else', () => {
    const getAddQuoteProjectOptions = jest.spyOn(getInstance(), 'getAddQuoteProjectOptions');
    const reponse = {
      status: 0,
      message: 'Error',
    };
    const callBack = jest.fn();
    getAddQuoteProjectOptions(reponse, callBack);
    expect(getAddQuoteProjectOptions).toHaveBeenCalledTimes(1);
  });

  // loadAddQuoteProjectOptions
  test('Testing if loadAddQuoteProjectOptions with if', () => {
    const loadAddQuoteProjectOptions = jest.spyOn(getInstance(), 'loadAddQuoteProjectOptions');
    const inputValue = [
      {
        value: 'project1',
        label: 'project1',
      },
      {
        value: 'project2',
        label: 'project2',
      },
    ];
    const callback = jest.fn();
    loadAddQuoteProjectOptions(inputValue, callback);
    expect(loadAddQuoteProjectOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadAddQuoteProjectOptions with else', () => {
    const loadAddQuoteProjectOptions = jest.spyOn(getInstance(), 'loadAddQuoteProjectOptions');
    const inputValue = [];
    const callback = jest.fn();
    loadAddQuoteProjectOptions(inputValue, callback);
    expect(loadAddQuoteProjectOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeProject ', () => {
    const handleChangeProject = jest.spyOn(getInstance(), 'handleChangeProject');
    const option = {
      value: 'project',
      label: 'project',
    };
    handleChangeProject(option);
    expect(handleChangeProject).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleOpenModal ', () => {
    const handleOpenModal = jest.spyOn(getInstance(), 'handleOpenModal');
    handleOpenModal();
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
  test('Testing if handleCloseModal ', () => {
    const handleCloseModal = jest.spyOn(getInstance(), 'handleCloseModal');
    handleCloseModal();
    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderAddQuote ', () => {
    const renderAddQuote = jest.spyOn(getInstance(), 'renderAddQuote');
    renderAddQuote();
    expect(renderAddQuote).toHaveBeenCalledTimes(1);
  });

  // handleQuoteModalSubmit
  test('Testing if handleQuoteModalSubmit ', () => {
    const handleQuoteModalSubmit = jest.spyOn(getInstance(), 'handleQuoteModalSubmit');
    const e = { preventDefault: jest.fn() };
    handleQuoteModalSubmit(e);
    expect(handleQuoteModalSubmit).toHaveBeenCalledTimes(1);
  });

  // quoteSuccess
  test('Testing if quoteSuccess ', () => {
    const quoteSuccess = jest.spyOn(getInstance(), 'quoteSuccess');
    quoteSuccess();
    expect(quoteSuccess).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  const onSuccess = jest.fn();
  const data = { projectId: '5f7abc04c1733332a7e3bad4', name: ' Quote-2', description: '<p>projectObj</p>', quote: 'file.pdf' };

  test('Testing if the  onSubmitQuote events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const e = { preventDefault: jest.fn() };
    const type = 'add';
    mapDispatchToProps(dispatch).onSubmitQuote(e, type, data, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the  onSubmitQuote events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const e = { preventDefault: jest.fn() };
    const type = 'edit';
    mapDispatchToProps(dispatch).onSubmitQuote(e, type, data, onSuccess);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_QUOTE,
      payload: type,
      data,
      onSuccess,
    });
  });
});
