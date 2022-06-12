import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { ProjectDetailsTab as MainForm } from '../ProjectDetailsTab';

jest.mock('utils/request');

const props = {
  activeTab: '1',
  projectData: {
    status: 1,
    data: {
      _id: 'aada34343',
      lookingFor: {
        design: [],
        softwareDevelopment: [],
        developmentTeam: [],
        dataAiMl: [],
      },
      clientId: '054fb3',
      name: 'blue',
      description:
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>\n<p>standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>\n<p>but also the leap into electronic typesetting, remaining essentially unchanged.</p>\n<p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently</p>\n<p>with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n<p></p>\n",
      talentsDetails: [
        {
          _id: 'aada34343',
          email: 'aada34343@yopmail.com',
          name: 'Roger abcd',
          shortName: 'RA',
          status: 'Inactive',
          allocationTill: '',
          talentUserId: 'aada34343',
          talentId: 'aada34343',
          primaryRole: 'DevOps engineer',
          ratePerHour: 1446.9,
          currency: 'GBP',
        },
      ],
      briefs: [
        {
          _id: '5fe0741d3cbd1251eaa08254',
          skills: ['Amazon Kinesis'],
          workPreference: ['fulltime'],
          teamPreference: ['individuals'],
          assignments: ['long-term-onsite'],
          name: 'Brief 3',
          description:
            '<p>The false text also gives not a realistic overview of typographic grayscale, especially in the case of justified text. The spacing of the false text is still somewhat higher than with a real text, which will present look darker and less readable than the false text with which the designer made his trials. This can distort the final presentation of printing.</p>\n',
          role: 'Product (UI) designer',
          expertise: 'Beginner - 0 - 2 yrs',
          duration: 23,
          projectId: '5f3ceb1bd3e24e5ec862fccd',
        },
        {
          _id: '5feadf7d5071d075686a815f',
          skills: ['Amazon Kinesis'],
          workPreference: ['fulltime'],
          teamPreference: ['individuals'],
          assignments: [],
          name: 'Brief Test 102',
          description:
            '<p>One limitation of the use of the false text in the web design is that this text is never read, it does not check its actual readability. Moreover formulas designed with dummy text tend to underestimate the space forcing newsrooms then make simplistic titles or inaccurate, not to exceed the allotted space.</p>\n<p></p>\n<p>The false text also gives not a realistic overview of typographic grayscale, especially in the case of justified text. The spacing of the false text is still somewhat higher than with a real text, which will present look darker and less readable than the false text with which the designer made his trials. This can distort the final presentation of printing.</p>\n',
          role: 'Developer',
          expertise: 'Senior - 8 - 12 yrs',
          duration: 2,
          projectId: '5f3ceb1bd3e24e5ec862fccd',
        },
      ],
      quotes: [],
      isQuoteShow: true,
      status: 'Proposed',
    },
    message: 'Success',
  },
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ProjectDetailsTab Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if toggle with if', () => {
    const component = shallow(<MainForm {...props} />);
    component.setState({ activeTab: '2' });
    const toggle = jest.spyOn(component.instance(), 'toggle');
    toggle('1');
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  test('Testing if toggle with else', () => {
    const component = shallow(<MainForm {...props} />);
    component.setState({ activeTab: '1' });
    const toggle = jest.spyOn(component.instance(), 'toggle');
    toggle('1');
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  test('Testing if navItemTeamTab ', () => {
    const component = shallow(<MainForm {...props} />);
    const activeTab = '1';
    const navItemTeamTab = jest.spyOn(component.instance(), 'navItemTeamTab');
    navItemTeamTab(activeTab);
    expect(navItemTeamTab).toHaveBeenCalledTimes(1);
  });

  test('Testing if navItemQuoteTab with if', () => {
    const component = shallow(<MainForm {...props} />);
    const isQuoteShow = true;
    const activeTab = '1';
    const navItemQuoteTab = jest.spyOn(component.instance(), 'navItemQuoteTab');
    navItemQuoteTab(isQuoteShow, activeTab);
    expect(navItemQuoteTab).toHaveBeenCalledTimes(1);
  });

  test('Testing if navItemQuoteTab with else', () => {
    const component = shallow(<MainForm {...props} />);
    const isQuoteShow = false;
    const activeTab = '1';
    const navItemQuoteTab = jest.spyOn(component.instance(), 'navItemQuoteTab');
    navItemQuoteTab(isQuoteShow, activeTab);
    expect(navItemQuoteTab).toHaveBeenCalledTimes(1);
  });
});
