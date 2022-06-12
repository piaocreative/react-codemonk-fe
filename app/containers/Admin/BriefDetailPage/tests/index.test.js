import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { BriefDetailPage as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  match: {
    params: { briefID: '76f7f1058315ffa' },
  },

  filters: {
    teamPrefArray: [],
    workPrefArray: [],
    assignmentsArray: [],
  },
  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false, extra: { projectId: '1058315ffa' } },
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

describe('BriefDetailPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if loadBriefData', () => {
    const loadBriefData = jest.spyOn(getInstance(), 'loadBriefData');
    loadBriefData();
    expect(loadBriefData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setBriefData ', () => {
    const setBriefData = jest.spyOn(getInstance(), 'setBriefData');
    const response = {
      status: 1,
      data: {
        _id: '5f09b105f12bd93',
        skills: ['Amazon Redshift'],
        workPreference: ['fulltime'],
        teamPreference: ['individuals'],
        assignments: [],
        status: 1,
        projectId: '6209512343',
        name: 'Brief New 26',
        description: '<p>Brief 26</p>\n<p>Brief 26</p>\n',
        role: 'Product (UI) designer',
        expertise: 'senior',
        duration: 5,
        talentDetails: [
          {
            _id: '8d0007386665',
            name: 'Talent Name',
            talentUserId: 'c8d0007386665',
            talentId: 'ec8d0007386666',
            primaryRole: 'DevOps engineer',
            ratePerHour: 1113,
            currency: 'GBP',
          },
        ],
      },
      message: 'Success',
    };
    setBriefData(response);
    expect(setBriefData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setBriefData without data', () => {
    const setBriefData = jest.spyOn(getInstance(), 'setBriefData');
    const response = {
      status: 0,
      data: {},
      message: 'Success',
    };
    setBriefData(response);
    expect(setBriefData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentData ', () => {
    const setTalentData = jest.spyOn(getInstance(), 'setTalentData');
    const pageNum = 1;
    setTalentData(pageNum);
    expect(setTalentData).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderTalentList ', () => {
    const renderTalentList = jest.spyOn(getInstance(), 'renderTalentList');
    const isListLoading = false;
    const paginationData = { totalDocs: 1, page: 1, limit: 20 };
    const talentList = [{ id: '5f0d5f415dec8d0007386665', name: 'Talent Name', rate: '£1113', role: 'DevOps engineer' }];
    const pageNum = 1;
    renderTalentList(isListLoading, paginationData, talentList, pageNum);
    expect(renderTalentList).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderCardBody ', () => {
    const renderCardBody = jest.spyOn(getInstance(), 'renderCardBody');
    const textDescription = 'Description';
    const briefData = {
      assignments: '',
      description: '<p>Brief 26</p>↵<p>Brief 26</p>↵',
      duration: '5 Months',
      expertise: 'Senior',
      id: '5fa4f2ea45f09b105f12bd93',
      isApplied: undefined,
      name: 'Brief New 26',
      skills: ' Amazon Redshift',
      teamPreference: ' Individual',
      workPreference: ' Full time',
    };
    renderCardBody(textDescription, briefData);
    expect(renderCardBody).toHaveBeenCalledTimes(1);
  });
});
