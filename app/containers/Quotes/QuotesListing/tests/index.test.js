import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { QuotesListing as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitSubscribe: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Projects Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();
  const event = { preventDefault: jest.fn() };
  const responseWithData = {
    status: 1,
    data: {
      docs: [
        {
          _id: '600a63fe7c00550bced85e55',
          projectId: '5f7abc04c1733332a7e3bad4',
          name: 'Quote-12',
          description: '<p>QuoteList</p>\n',
          quoteUrl:
            'https://s3-eu-west-1.amazonaws.com/s3-codemonk-static-content/development-quotes/5f60c2d6d381375246a7e76b/Mac for Beginners 2020 - Download.pdf',
          isApplied: false,
        },
        {
          _id: '6009952cc309dc166dadc92d',
          projectId: '5f7abc04c1733332a7e3bad4',
          name: 'quote -test',
          description: '<p>quote</p>\n',
          quoteUrl:
            'https://s3-eu-west-1.amazonaws.com/s3-codemonk-static-content/development-quotes/5f60c2d6d381375246a7e76b/MVP framework.zip',
          isApplied: false,
        },
      ],
      totalDocs: 2,
      limit: 20,
      page: 1,
      totalPages: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: true,
      prevPage: null,
      nextPage: 1,
    },
    message: 'Success',
  };

  const responseWithoutData = {
    status: 0,
    data: {
      docs: [],
    },
    message: 'Error',
  };

  test('Testing if loadQuotes', () => {
    const loadQuotes = jest.spyOn(getInstance(), 'loadQuotes');
    loadQuotes(1);
    expect(loadQuotes).toHaveBeenCalledTimes(1);
  });

  test('Testing if setQuoteData', () => {
    const setQuoteData = jest.spyOn(getInstance(), 'setQuoteData');
    setQuoteData(responseWithData);
    expect(setQuoteData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setQuoteData with else', () => {
    const setQuoteData = jest.spyOn(getInstance(), 'setQuoteData');
    setQuoteData(responseWithoutData);
    expect(setQuoteData).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleArchiveQuoteOpenModal', () => {
    const handleArchiveQuoteOpenModal = jest.spyOn(getInstance(), 'handleArchiveQuoteOpenModal');
    handleArchiveQuoteOpenModal(event, 'id');
    expect(handleArchiveQuoteOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleArchiveQuoteCloseModal', () => {
    const handleArchiveQuoteCloseModal = jest.spyOn(getInstance(), 'handleArchiveQuoteCloseModal');
    handleArchiveQuoteCloseModal();
    expect(handleArchiveQuoteCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleQuoteArchived', () => {
    const handleQuoteArchived = jest.spyOn(getInstance(), 'handleQuoteArchived');
    handleQuoteArchived();
    expect(handleQuoteArchived).toHaveBeenCalledTimes(1);
  });
});
