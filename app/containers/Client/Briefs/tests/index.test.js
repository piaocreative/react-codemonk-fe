import React from 'react';
import { shallow } from 'enzyme';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import request from 'utils/request';
import { ClientBriefs as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitBriefForm: jest.fn(),

  history: { push: jest.fn() },
  briefProjectName: '',
  briefProjectDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  briefTitle: '',
  briefRole: '',
  briefDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  briefExpertiseLevel: '',
  briefDuration: '',
  briefSkills: [],
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ClientBriefs Component', () => {
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
          _id: '350e416d1a5ebbe',
          name: 'Test',
          description: 'This is test',
          budget: '$50k-$150k',
          skills: ['web-development'],
          workPreference: ['parttime-weekends'],
          teamPreference: ['x-large-team'],
          assignments: ['long-term-onsite'],
          isApplied: false,
        },
        {
          _id: '0e416d1a5ebbd',
          name: 'Test',
          description: 'This is test',
          budget: '$50k-$150k',
          skills: ['web-development'],
          workPreference: ['parttime-weekends'],
          teamPreference: ['x-large-team'],
          assignments: ['long-term-onsite'],
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
      nextPage: 2,
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

  test('Testing if loadClientBrief', () => {
    const loadClientBrief = jest.spyOn(getInstance(), 'loadClientBrief');
    loadClientBrief(1);
    expect(loadClientBrief).toHaveBeenCalledTimes(1);
  });

  test('Testing if setClientBriefs', () => {
    const setClientBriefs = jest.spyOn(getInstance(), 'setClientBriefs');
    setClientBriefs(responseWithData);
    expect(setClientBriefs).toHaveBeenCalledTimes(1);
  });

  test('Testing if setClientBriefs with else', () => {
    const setClientBriefs = jest.spyOn(getInstance(), 'setClientBriefs');
    setClientBriefs(responseWithoutData);
    expect(setClientBriefs).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleBriefArchived', () => {
    const handleBriefArchived = jest.spyOn(getInstance(), 'handleBriefArchived');
    handleBriefArchived();
    expect(handleBriefArchived).toHaveBeenCalledTimes(1);
  });

  test('Testing if briefCard', () => {
    const briefCard = jest.spyOn(getInstance(), 'briefCard');
    const brief = responseWithData.data.docs[0];
    briefCard(brief, 0);
    expect(briefCard).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderBriefCards', () => {
    const renderBriefCards = jest.spyOn(getInstance(), 'renderBriefCards');
    renderBriefCards();
    expect(renderBriefCards).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSearchChange ', () => {
    const handleSearchChange = jest.spyOn(getInstance(), 'handleSearchChange');
    handleSearchChange();
    expect(handleSearchChange).toHaveBeenCalledTimes(1);
  });
});
