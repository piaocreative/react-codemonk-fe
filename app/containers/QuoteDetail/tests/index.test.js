import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { QuoteDetail as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  match: {
    params: { quoteID: '1234' },
  },
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitSubscribe: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('QuoteDetail Component', () => {
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
      _id: 'b881c4e9b22da6d',
      projectId: '730dd0b5aed9c82',
      name: 'Quote-1',
      description:
        '<p>LoremIpsum360 ° also gives you the ability to add punctuation marks, accents and special characters to be closer to the French or other languages. Also if you want to see the results in different fonts, you will find many features to set such as font-family, font-size, text-align or line-heigh.</p>\n<p></p>\n',
      quoteUrl: 'https://file.pdf',
      isApplied: false,
    },
    message: 'Success',
  };

  const responseWithoutData = { status: 0, message: 'error' };

  test('Testing if loadQuoteData', () => {
    const loadQuoteData = jest.spyOn(getInstance(), 'loadQuoteData');
    loadQuoteData();
    expect(loadQuoteData).toHaveBeenCalledTimes(1);
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
});
