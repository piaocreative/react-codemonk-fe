import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { MyProjectDetail as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },

  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ProjectDetailPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  const projectDataWithReponse = {
    status: 1,
    data: {
      _id: '5f7abc04c1733332a7e3bad4',
      name: 'blue',
      description:
        '<p>Quis autem vel eum iure reprehend</p>\n<p>erit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eu</p>\n<p>m fugiat quo voluptas nulla pariatur?</p>\n<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis pr</p>\n<p>aesentium voluptatum deleniti atque</p>\n',
      status: 'In Progress',
    },
    message: 'Success',
    newBrief: false,
  };
  const projectDataWithoutReponse = {
    status: 0,
    data: {},
    message: 'Error',
    newBrief: false,
  };

  test('Testing if loadTalentProjectDetails', () => {
    const loadTalentProjectDetails = jest.spyOn(getInstance(), 'loadTalentProjectDetails');
    loadTalentProjectDetails();
    expect(loadTalentProjectDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentProjectDetails with if', () => {
    const setTalentProjectDetails = jest.spyOn(getInstance(), 'setTalentProjectDetails');
    setTalentProjectDetails(projectDataWithReponse);
    expect(setTalentProjectDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentProjectDetails with else', () => {
    const setTalentProjectDetails = jest.spyOn(getInstance(), 'setTalentProjectDetails');
    setTalentProjectDetails(projectDataWithoutReponse);
    expect(setTalentProjectDetails).toHaveBeenCalledTimes(1);
  });
});
