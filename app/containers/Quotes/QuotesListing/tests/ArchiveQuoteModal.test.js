import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { ArchiveQuoteModal as MainForm } from '../ArchiveQuoteModal';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  quoteId: 'id',
  showArchiveQuoteModal: false,
  handleArchiveQuoteCloseModal: jest.fn(),
  handleQuoteArchived: jest.fn(),
  loading: false,
  match: {
    params: {},
  },
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ArchiveQuoteModal Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if submitArchive', () => {
    const submitArchive = jest.spyOn(getInstance(), 'submitArchive');
    submitArchive();
    expect(submitArchive).toHaveBeenCalledTimes(1);
  });

  test('Testing if quoteArchived', () => {
    const quoteArchived = jest.spyOn(getInstance(), 'quoteArchived');
    const reponse = {
      status: 1,
      message: 'You have sucesfully applied to this job post',
    };
    quoteArchived(reponse);
    expect(quoteArchived).toHaveBeenCalledTimes(1);
  });

  test('Testing if quoteArchived with else', () => {
    const quoteArchived = jest.spyOn(getInstance(), 'quoteArchived');
    const reponse = {
      status: 0,
      message: 'Success',
    };
    quoteArchived(reponse);
    expect(quoteArchived).toHaveBeenCalledTimes(1);
  });
});
