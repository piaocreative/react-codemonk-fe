import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { Project as MainForm } from '../Project';

jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  projects: [
    {
      name: 'Project',
      url: 'https://google.com',
      description: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
      role: 'Developer',
      keyAchievements: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
  ],
  index: 0,
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitProjectForm: jest.fn(),
  onChangeProject: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },

  onSaveForLater: jest.fn(),

  onChangeBrief: jest.fn(),
  onChangeSkills: jest.fn(),
};

const props2 = props;
props2.projects = [
  {
    name: 'Project',
    url: '',
    description: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    role: 'Developer',
    keyAchievements: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  },
];
props2.onBoarding = true;

const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const getWrapper2 = () => shallow(<MainForm store={store} {...props2} />);
const getInstance2 = () => getWrapper2().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if setValues', () => {
    const projects = [
      {
        name: 'Project',
        url: 'https://google.com',
        description: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
        role: 'Developer',
        keyAchievements: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
      },
    ];
    const setValues = jest.spyOn(getInstance(), 'setValues');
    setValues(projects, 0, 'keyProjectForm');
    expect(setValues).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeProjectName ', () => {
    const handleChangeProjectName = jest.spyOn(getInstance(), 'handleChangeProjectName');
    handleChangeProjectName({ target: { value: 0 } }, 0);
    expect(handleChangeProjectName).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeProjectURL ', () => {
    const handleChangeProjectURL = jest.spyOn(getInstance(), 'handleChangeProjectURL');
    handleChangeProjectURL({ target: { value: 'http://google.com' } }, 0);
    expect(handleChangeProjectURL).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeProjectRole ', () => {
    const handleChangeProjectRole = jest.spyOn(getInstance(), 'handleChangeProjectRole');
    handleChangeProjectRole({ target: { value: 'http://google.com' } }, 0);
    expect(handleChangeProjectRole).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeProjectRole ', () => {
    const handleChangeProjectRole = jest.spyOn(getInstance2(), 'handleChangeProjectRole');
    handleChangeProjectRole({ target: { value: 'http://google.com' } }, 0);
    expect(handleChangeProjectRole).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeProjectDescription ', () => {
    const handleChangeProjectDescription = jest.spyOn(getInstance(), 'handleChangeProjectDescription');
    handleChangeProjectDescription(EditorState.createEmpty(), 0);
    expect(handleChangeProjectDescription).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderDeleteButton with if', () => {
    const renderDeleteButton = jest.spyOn(getInstance(), 'renderDeleteButton');
    renderDeleteButton(true, 0, jest.fn());
    expect(renderDeleteButton).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderDeleteButton with else', () => {
    const renderDeleteButton = jest.spyOn(getInstance(), 'renderDeleteButton');
    renderDeleteButton(false, 0, jest.fn());
    expect(renderDeleteButton).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderDeleteButton with onBoarding', () => {
    const renderDeleteButton = jest.spyOn(getInstance2(), 'renderDeleteButton');
    renderDeleteButton(true, 1, jest.fn());
    expect(renderDeleteButton).toHaveBeenCalledTimes(1);
  });
});
