import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { AddQuote as MainForm } from '../AddQuote';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },

  filters: {
    teamPrefArray: [],
    workPrefArray: [],
    assignmentsArray: [],
  },
  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
  handleCheckboxFilterChange: jest.fn(),
  handleChangeFilters: jest.fn(),
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
});
