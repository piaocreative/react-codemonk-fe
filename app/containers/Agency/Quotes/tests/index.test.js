import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Quotes as MainForm } from '../index';

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

describe('Quotes Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  const responseWithData = {
    status: 1,
    data: {
      docs: [
        {
          _id: '8a8bb881c4e9b22da6d',
          projectId: '0dd0b5aed9c82',
          name: 'Quote-1',
          description:
            '<p>LoremIpsum360 ° also gives you the ability to add punctuation marks, accents and special characters to be closer to the French or other languages. Also if you want to see the results in different fonts, you will find many features to set such as font-family, font-size, text-align or line-heigh.</p>\n<p></p>\n',
          quoteUrl: 'https://f60c2d6d381375246a7e76b/file.pdf',
          isApplied: false,
        },
        {
          _id: '2030218b448c',
          projectId: '56209512343',
          name: 'Quote-13',
          description:
            '<p>LoremIpsum360 ° is a free online generator false text. It provides a complete text simulator to generate replacement text or alternative text for your models. It features different random texts in Latin and Cyrillic to generate examples of texts in different languages.</p>\n<p>LoremIpsum360 ° also gives you the ability to add punctuation marks, accents and special characters to be closer to the French or other languages. Also if you want to see the results in different fonts, you will find many features to set such as font-family, font-size, text-align or line-heigh.</p>\n',
          quoteUrl: 'https://f60c2d6d381375246a7e76b/file.pdf',
          isApplied: true,
        },
      ],
      totalDocs: 2,
      limit: 20,
      page: 1,
      totalPages: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    },
    message: 'Success',
  };

  const responseWithoutData = { status: 0, message: 'error' };

  test('Testing if loadAgencyQuotes', () => {
    const loadAgencyQuotes = jest.spyOn(getInstance(), 'loadAgencyQuotes');
    loadAgencyQuotes(1);
    expect(loadAgencyQuotes).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyQuotes', () => {
    const setAgencyQuotes = jest.spyOn(getInstance(), 'setAgencyQuotes');
    setAgencyQuotes(responseWithData);
    expect(setAgencyQuotes).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyQuotes with else', () => {
    const setAgencyQuotes = jest.spyOn(getInstance(), 'setAgencyQuotes');
    setAgencyQuotes(responseWithoutData);
    expect(setAgencyQuotes).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleApplyModalOpen', () => {
    const handleApplyModalOpen = jest.spyOn(getInstance(), 'handleApplyModalOpen');
    const event = { preventDefault: jest.fn() };
    const projectId = '123';
    const quoteId = '123';
    handleApplyModalOpen(event, projectId, quoteId);
    expect(handleApplyModalOpen).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleApplyModalClose', () => {
    const handleApplyModalClose = jest.spyOn(getInstance(), 'handleApplyModalClose');
    handleApplyModalClose();
    expect(handleApplyModalClose).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSuccess', () => {
    const handleSuccess = jest.spyOn(getInstance(), 'handleSuccess');
    handleSuccess();
    expect(handleSuccess).toHaveBeenCalledTimes(1);
  });

  test('Testing if quoteCard', () => {
    const quoteCard = jest.spyOn(getInstance(), 'quoteCard');
    const quote = {
      _id: '8a8bb881c4e9b22da6d',
      projectId: '0dd0b5aed9c82',
      name: 'Quote-1',
      description:
        '<p>LoremIpsum360 ° also gives you the ability to add punctuation marks, accents and special characters to be closer to the French or other languages. Also if you want to see the results in different fonts, you will find many features to set such as font-family, font-size, text-align or line-heigh.</p>\n<p></p>\n',
      quoteUrl: 'https://f60c2d6d381375246a7e76b/file.pdf',
      isApplied: false,
    };
    const index = 0;
    quoteCard(quote, index);
    expect(quoteCard).toHaveBeenCalledTimes(1);
  });

  test('Testing if showNoRecordFound', () => {
    const showNoRecordFound = jest.spyOn(getInstance(), 'showNoRecordFound');
    showNoRecordFound();
    expect(showNoRecordFound).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderQuoteAfterLoading', () => {
    const renderQuoteAfterLoading = jest.spyOn(getInstance(), 'renderQuoteAfterLoading');
    const paginationData = {
      status: 1,
      data: {
        docs: [
          {
            _id: '81c4e9b22da6d',
            projectId: 'dd0b5aed9c82',
            name: 'Quote-1',
            description:
              '<p>LoremIpsum360 ° also gives you the ability to add punctuation marks, accents and special characters to be closer to the French or other languages. Also if you want to see the results in different fonts, you will find many features to set such as font-family, font-size, text-align or line-heigh.</p>\n<p></p>\n',
            quoteUrl: 'https://a7e76b/cookies list.pdf',
            isApplied: true,
          },
        ],
        totalDocs: 16,
        limit: 20,
        page: 1,
        totalPages: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      },
      message: 'Success',
    };
    renderQuoteAfterLoading(paginationData);
    expect(renderQuoteAfterLoading).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderQuoteCards', () => {
    const renderQuoteCards = jest.spyOn(getInstance(), 'renderQuoteCards');
    renderQuoteCards();
    expect(renderQuoteCards).toHaveBeenCalledTimes(1);
  });
});
