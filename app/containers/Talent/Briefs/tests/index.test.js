import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Briefs as MainForm } from '../index';

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

describe('Briefs Component', () => {
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
          _id: '5fa4146045f09b105f12bd8e',
          skills: ['Amazon Kinesis'],
          workPreference: ['fulltime'],
          teamPreference: ['small-team'],
          assignments: [],
          projectId: '5f8837b20aca2e6209512343',
          name: 'Brief 15',
          description:
            '<p>One limitation of the use of the false text in the web design is that this text is never read, it does not check its actual readability. Moreover formulas designed with dummy text tend to underestimate the space forcing newsrooms then make simplistic titles or inaccurate, not to exceed the allotted space.</p>\n<p></p>\n',
          role: 'Developer',
          expertise: 'Intermediate - 5 - 8 yrs',
          duration: 2,
          isApplied: false,
        },
        {
          _id: '5fa414341730dd0b5aed9c83',
          skills: ['Android'],
          workPreference: ['fulltime'],
          teamPreference: ['small-team'],
          assignments: ['mid-term-onsite'],
          projectId: '5f8837b20aca2e6209512343',
          name: 'Brief 14',
          description:
            '<p>The false text also gives not a realistic overview of typographic grayscale, especially in the case of justified text. The spacing of the false text is still somewhat higher than with a real text, which will present look darker and less readable than the false text with which the designer made his trials. This can distort the final presentation of printing.</p>\n',
          role: 'Developer',
          expertise: 'Senior - 8 - 12 yrs',
          duration: 12,
          isApplied: false,
        },
      ],
      totalDocs: 55,
      limit: 20,
      page: 3,
      totalPages: 3,
      pagingCounter: 41,
      hasPrevPage: true,
      hasNextPage: false,
      prevPage: 2,
      nextPage: null,
    },
    message: 'Success',
    newBrief: false,
  };

  const responseWithoutData = {
    status: 0,
    data: {
      docs: [],
    },
    message: 'Error',
  };

  const filter = {
    teamPrefArray: ['individuals'],
    workPrefArray: [],
    assignmentsArray: [],
    expertiseArray: [],
    roleArray: [],
    skillsArray: [],
    alreadyAppliedArray: [],
    datePostedArray: [],
  };

  test('Testing if loadTalentBrief', () => {
    const loadTalentBrief = jest.spyOn(getInstance(), 'loadTalentBrief');
    loadTalentBrief(1);
    expect(loadTalentBrief).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentBriefs', () => {
    const setTalentBriefs = jest.spyOn(getInstance(), 'setTalentBriefs');
    setTalentBriefs(responseWithData);
    expect(setTalentBriefs).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentBriefs with else', () => {
    const setTalentBriefs = jest.spyOn(getInstance(), 'setTalentBriefs');
    setTalentBriefs(responseWithoutData);
    expect(setTalentBriefs).toHaveBeenCalledTimes(1);
  });

  test('Testing if briefCard', () => {
    const briefCard = jest.spyOn(getInstance(), 'briefCard');
    const brief = responseWithData.data.docs[0];
    briefCard(brief, 0);
    expect(briefCard).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderTalentBriefCards', () => {
    const renderTalentBriefCards = jest.spyOn(getInstance(), 'renderTalentBriefCards');
    renderTalentBriefCards();
    expect(renderTalentBriefCards).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleFilterChanged', () => {
    const handleFilterChanged = jest.spyOn(getInstance(), 'handleFilterChanged');
    handleFilterChanged(filter, false);
    expect(handleFilterChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSearchChange', () => {
    const handleSearchChange = jest.spyOn(getInstance(), 'handleSearchChange');
    const value = 'value';
    handleSearchChange(value);
    expect(handleSearchChange).toHaveBeenCalledTimes(1);
  });
});
