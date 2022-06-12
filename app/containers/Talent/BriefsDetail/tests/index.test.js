import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { BriefsDetail as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitSubscribe: jest.fn(),
  match: {
    params: { briefID: '1234' },
  },
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('BriefsDetail Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if loadBriefDetailData', () => {
    const loadBriefDetailData = jest.spyOn(getInstance(), 'loadBriefDetailData');
    loadBriefDetailData();
    expect(loadBriefDetailData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setBriefDetailData', () => {
    const setBriefDetailData = jest.spyOn(getInstance(), 'setBriefDetailData');
    const reponse = {
      status: 1,
      data: {
        skills: ['web-development'],
        workPreference: ['parttime-weekends'],
        teamPreference: ['x-large-team'],
        assignments: ['long-term-onsite'],
        status: 1,
        _id: '5f97c921a350e416d1a5ebbe',
        name: 'Test',
        description: 'This is test',
        budget: '$50k-$150k',
        updatedAt: '2020-10-28T07:49:54.698Z',
      },
      message: 'Success',
    };
    setBriefDetailData(reponse);
    expect(setBriefDetailData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setBriefDetailData with else', () => {
    const setBriefDetailData = jest.spyOn(getInstance(), 'setBriefDetailData');
    const reponse = {
      status: 0,
      message: 'Success',
    };
    setBriefDetailData(reponse);
    expect(setBriefDetailData).toHaveBeenCalledTimes(1);
  });
});
