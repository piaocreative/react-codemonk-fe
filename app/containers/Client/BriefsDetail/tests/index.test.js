import React from 'react';
import { shallow } from 'enzyme';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import request from 'utils/request';
import { ClientBriefDetail as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitBriefForm: jest.fn(),

  match: { params: { briefID: 'id' } },
  briefProjectName: '',
  briefProjectDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  briefTitle: '',
  briefRole: '',
  briefDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  briefExpertiseLevel: '',
  briefDuration: '',
  briefSkills: [],

  loading: false,
  responseSuccess: false,
  responseError: false,
  popUpSaga: false,
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ClientBriefDetail Component', () => {
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
      _id: '5fe0741d3cbd1251eaa08254',
      skills: ['Amazon Kinesis'],
      workPreference: ['fulltime'],
      teamPreference: ['individuals'],
      assignments: ['long-term-onsite'],
      status: 1,
      isArchived: false,
      name: 'Brief 3',
      description:
        '<p>The false text also gives not a realistic overview of typographic grayscale, especially in the case of justified text. The spacing of the false text is still somewhat higher than with a real text, which will present look darker and less readable than the false text with which the designer made his trials. This can distort the final presentation of printing.</p>\n',
      role: 'Product (UI) designer',
      expertise: 'Principal- 12 - 15 yrs',
      duration: 23,
      projectId: '5f3ceb1bd3e24e5ec862fccd',
      talentDetails: [
        {
          _id: '5f354f58f5937c23f0c73be2',
          name: 'RA',
          talentUserId: '5f354f58f5937c23f0c73be2',
          talentId: '5f354f58f5937c23f0c73be3',
          primaryRole: 'Developer',
          ratePerHour: 29.9,
          currency: 'USD',
          timeZone: 'Etc/GMT-11',
        },
      ],
      projectName: 'test project 22',
      projectDescription:
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop</p>\n",
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

  test('Testing if loadBriefData', () => {
    const loadBriefData = jest.spyOn(getInstance(), 'loadBriefData');
    loadBriefData(1);
    expect(loadBriefData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setBriefData', () => {
    const setBriefData = jest.spyOn(getInstance(), 'setBriefData');
    setBriefData(responseWithData);
    expect(setBriefData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setBriefData with else', () => {
    const setBriefData = jest.spyOn(getInstance(), 'setBriefData');
    setBriefData(responseWithoutData);
    expect(setBriefData).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleArchiveBriefCloseModal', () => {
    const handleArchiveBriefCloseModal = jest.spyOn(getInstance(), 'handleArchiveBriefCloseModal');
    handleArchiveBriefCloseModal();
    expect(handleArchiveBriefCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleBriefArchived', () => {
    const handleBriefArchived = jest.spyOn(getInstance(), 'handleBriefArchived');
    handleBriefArchived();
    expect(handleBriefArchived).toHaveBeenCalledTimes(1);
  });

  // incomplete
  test('Testing if renderTalentList', () => {
    const renderTalentList = jest.spyOn(getInstance(), 'renderTalentList');
    const isListLoading = false;
    const paginationData = {};
    const talentList = [];
    const pageNum = 1;
    renderTalentList(isListLoading, paginationData, talentList, pageNum);
    expect(renderTalentList).toHaveBeenCalledTimes(1);
  });

  test('Testing if hireTalent ', () => {
    const hireTalent = jest.spyOn(getInstance(), 'hireTalent');
    const id = 'abcd';
    hireTalent(event, id);
    expect(hireTalent).toHaveBeenCalledTimes(1);
  });
});
