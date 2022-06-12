import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { BriefTab as MainForm } from '../BriefTab';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },

  data: [
    {
      _id: '105f12bd91',
      skills: ['Adobe Illustrator'],
      workPreference: ['fulltime'],
      teamPreference: ['large-team'],
      assignments: [],
      projectId: 'a2e6209512343',
      name: 'Brief 1',
      description: '<p>The false text also gives not a realistic overview of</p>\n<p></p>\n',
      role: 'Data Scientist',
      expertise: 'mid-level',
      duration: 5,
    },
  ],

  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('BriefTab Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('for componentDidUpdate', () => {
    const prevProps = props;
    const data = [
      {
        _id: '105f12bd91',
        skills: ['Adobe Illustrator'],
        workPreference: ['fulltime'],
        teamPreference: ['large-team'],
        assignments: [],
        projectId: 'a2e6209512343',
        name: 'Brief Old',
        description: '<p>The false text also gives not a realistic overview of</p>\n<p></p>\n',
        role: 'Data Scientist',
        expertise: 'mid-level',
        duration: 5,
      },
    ];
    prevProps.data = data;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ image: '' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('for componentDidUpdate with else', () => {
    const prevProps = props;
    const data = [
      {
        _id: '105f12bd91',
        skills: ['Adobe Illustrator'],
        workPreference: ['fulltime'],
        teamPreference: ['large-team'],
        assignments: [],
        projectId: 'a2e6209512343',
        name: 'Brief 1',
        description: '<p>The false text also gives not a realistic overview of</p>\n<p></p>\n',
        role: 'Data Scientist',
        expertise: 'mid-level',
        duration: 5,
      },
    ];
    prevProps.data = data;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ image: '' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('Testing if setBriefDetails with checked', () => {
    const setBriefDetails = jest.spyOn(getInstance(), 'setBriefDetails');
    const pageNum = 1;
    setBriefDetails(pageNum);
    expect(setBriefDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if briefCard without checked', () => {
    const briefCard = jest.spyOn(getInstance(), 'briefCard');
    const data = {
      _id: '105f12bd91',
      skills: ['Adobe Illustrator'],
      workPreference: ['fulltime'],
      teamPreference: ['large-team'],
      assignments: [],
      projectId: 'a2e6209512343',
      name: 'Brief 25',
      description: '<p>The false text also gives not a realistic overview of</p>\n<p></p>\n',
      role: 'Data Scientist',
      expertise: 'mid-level',
      duration: 5,
    };
    const index = false;
    briefCard(data, index);
    expect(briefCard).toHaveBeenCalledTimes(1);
  });
});
