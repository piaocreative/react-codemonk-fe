import React from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { AddBrief as MainForm, mapDispatchToProps } from '../index';
import { SAVE_BRIEF_STEP1 } from '../constants';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  briefID: 'id',
  loadDetails: jest.fn(),
  onSubmitRoleForm: jest.fn(),
  onSubmitPreferredCandidateForm: jest.fn(),
  onSubmitEngagementForm: jest.fn(),
  loading: false,
  match: {
    params: {},
  },
  formKey: 'key',
  filters: { teamPrefArray: [], workPrefArray: [], assignmentsArray: [] },
  clientBrief: true,
  type: 'add',

  briefProjectName: '',
  briefProjectDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  briefTitle: '',
  briefRole: '',
  briefDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  briefExpertiseLevel: '',
  briefDuration: '',
  briefClientName: '',
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('AddBrief Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleCheckboxFilterChange', () => {
    const handleCheckboxFilterChange = jest.spyOn(getInstance(), 'handleCheckboxFilterChange');
    const name = 'teamPrefArray';
    const checked = true;
    const type = 'teamPrefArray';
    handleCheckboxFilterChange(name, checked, type);
    expect(handleCheckboxFilterChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleCheckboxFilterChange with else ', () => {
    const handleCheckboxFilterChange = jest.spyOn(getInstance(), 'handleCheckboxFilterChange');
    const name = 'teamPrefArray';
    const checked = false;
    const type = 'teamPrefArray';
    handleCheckboxFilterChange(name, checked, type);
    expect(handleCheckboxFilterChange).toHaveBeenCalledTimes(1);
  });

  // getProjectOptions
  test('Testing if getProjectOptions with if', () => {
    const getProjectOptions = jest.spyOn(getInstance(), 'getProjectOptions');
    const reponse = {
      status: 1,
      message: 'Success',
      data: [
        {
          value: 'client1',
          label: 'client1',
        },
        {
          value: 'client2',
          label: 'client2',
        },
      ],
    };
    const callBack = jest.fn();
    getProjectOptions(reponse, callBack);
    expect(getProjectOptions).toHaveBeenCalledTimes(1);
  });
  test('Testing if getProjectOptions with else', () => {
    const getProjectOptions = jest.spyOn(getInstance(), 'getProjectOptions');
    const reponse = {
      status: 0,
      message: 'Error',
    };
    const callBack = jest.fn();
    getProjectOptions(reponse, callBack);
    expect(getProjectOptions).toHaveBeenCalledTimes(1);
  });

  // getClientOptions
  test('Testing if getClientOptions with if', () => {
    const getClientOptions = jest.spyOn(getInstance(), 'getClientOptions');
    const reponse = {
      status: 1,
      message: 'Success',
      data: [
        {
          value: 'client1',
          label: 'client1',
        },
        {
          value: 'client2',
          label: 'client2',
        },
      ],
    };
    const callBack = jest.fn();
    getClientOptions(reponse, callBack);
    expect(getClientOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if getClientOptions with else', () => {
    const getClientOptions = jest.spyOn(getInstance(), 'getClientOptions');
    const reponse = {
      status: 0,
      message: 'Error',
    };
    const callBack = jest.fn();
    getClientOptions(reponse, callBack);
    expect(getClientOptions).toHaveBeenCalledTimes(1);
  });

  // loadProjectOptions
  test('Testing if loadProjectOptions with if', () => {
    const loadProjectOptions = jest.spyOn(getInstance(), 'loadProjectOptions');
    const inputValue = [
      {
        value: 'project1',
        label: 'project1',
      },
      {
        value: 'project2',
        label: 'project2',
      },
    ];
    const callback = jest.fn();
    loadProjectOptions(inputValue, callback);
    expect(loadProjectOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadProjectOptions with else', () => {
    const loadProjectOptions = jest.spyOn(getInstance(), 'loadProjectOptions');
    const inputValue = [];
    const callback = jest.fn();
    loadProjectOptions(inputValue, callback);
    expect(loadProjectOptions).toHaveBeenCalledTimes(1);
  });

  // loadClientOptions
  test('Testing if loadClientOptions with if', () => {
    const loadClientOptions = jest.spyOn(getInstance(), 'loadClientOptions');
    const inputValue = [
      {
        value: 'client1',
        label: 'client1',
      },
      {
        value: 'client2',
        label: 'client2',
      },
    ];
    const callback = jest.fn();
    loadClientOptions(inputValue, callback);
    expect(loadClientOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadClientOptions with else', () => {
    const loadClientOptions = jest.spyOn(getInstance(), 'loadClientOptions');
    const inputValue = [];
    const callback = jest.fn();
    loadClientOptions(inputValue, callback);
    expect(loadClientOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleProjectNameChange ', () => {
    const handleProjectNameChange = jest.spyOn(getInstance(), 'handleProjectNameChange');
    const option = {
      value: 'project',
      label: 'project',
    };
    handleProjectNameChange(option);
    expect(handleProjectNameChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleClientChange ', () => {
    const handleClientChange = jest.spyOn(getInstance(), 'handleClientChange');
    const option = {
      value: 'client',
      label: 'client',
    };
    handleClientChange(option);
    expect(handleClientChange).toHaveBeenCalledTimes(1);
  });

  // renderFetchClient
  test('Testing if renderFetchClient ', () => {
    const renderFetchClient = jest.spyOn(getInstance(), 'renderFetchClient');
    const briefClientName = {
      value: 'client',
      label: 'client',
    };
    renderFetchClient(briefClientName);
    expect(renderFetchClient).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderTeamSize ', () => {
    const renderTeamSize = jest.spyOn(getInstance(), 'renderTeamSize');
    const briefTeamPreference = 'teamPreference';
    renderTeamSize(briefTeamPreference);
    expect(renderTeamSize).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderProjectDesciption ', () => {
    const renderProjectDesciption = jest.spyOn(getInstance(), 'renderProjectDesciption');
    const briefProjectDescription = 'description';
    renderProjectDesciption(briefProjectDescription);
    expect(renderProjectDesciption).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderJobTitle ', () => {
    const renderJobTitle = jest.spyOn(getInstance(), 'renderJobTitle');
    const briefTitle = 'briefTitle';
    renderJobTitle(briefTitle);
    expect(renderJobTitle).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderProjectName ', () => {
    const renderProjectName = jest.spyOn(getInstance(), 'renderProjectName');
    const briefProjectName = 'projectName';
    renderProjectName(briefProjectName);
    expect(renderProjectName).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderFetchClient ', () => {
    const renderFetchClient = jest.spyOn(getInstance(), 'renderFetchClient');
    const briefClientName = 'clientName';
    renderFetchClient(briefClientName);
    expect(renderFetchClient).toHaveBeenCalledTimes(1);
  });

  // renderBriefPopup
  test('Testing if renderBriefPopup ', () => {
    const renderBriefPopup = jest.spyOn(getInstance(), 'renderBriefPopup');
    renderBriefPopup();
    expect(renderBriefPopup).toHaveBeenCalledTimes(1);
  });

  // handleAddBriefOpenModal
  test('Testing if handleAddBriefOpenModal ', () => {
    const handleAddBriefOpenModal = jest.spyOn(getInstance(), 'handleAddBriefOpenModal');
    handleAddBriefOpenModal();
    expect(handleAddBriefOpenModal).toHaveBeenCalledTimes(1);
  });

  // handleAddBriefCloseModal
  test('Testing if handleAddBriefCloseModal ', () => {
    const handleAddBriefCloseModal = jest.spyOn(getInstance(), 'handleAddBriefCloseModal');
    handleAddBriefCloseModal();
    expect(handleAddBriefCloseModal).toHaveBeenCalledTimes(1);
  });

  // handleEngagementFormSubmit
  test('Testing if handleEngagementFormSubmit ', () => {
    const handleEngagementFormSubmit = jest.spyOn(getInstance(), 'handleEngagementFormSubmit');
    const e = { preventDefault: jest.fn() };
    handleEngagementFormSubmit(e);
    expect(handleEngagementFormSubmit).toHaveBeenCalledTimes(1);
  });

  // handleSearchTalent
  test('Testing if handleSearchTalent ', () => {
    const handleSearchTalent = jest.spyOn(getInstance(), 'handleSearchTalent');
    handleSearchTalent();
    expect(handleSearchTalent).toHaveBeenCalledTimes(1);
  });

  // searchTalentPopup
  test('Testing if searchTalentPopup ', () => {
    const searchTalentPopup = jest.spyOn(getInstance(), 'searchTalentPopup');
    searchTalentPopup();
    expect(searchTalentPopup).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  const dispatch = jest.fn();
  const event = {
    preventDefault: jest.fn(),
  };

  const type = 'add';
  const data = jest.fn();
  const onSuccess = jest.fn();

  test('Testing if LOAD_REPOS events are dispatched correctly', () => {
    mapDispatchToProps(dispatch).onSubmitRoleForm(event, type, data, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if LOAD_REPOS events are dispatched correctly', () => {
    mapDispatchToProps(dispatch).onSubmitRoleForm(event, type, data, onSuccess);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SAVE_BRIEF_STEP1,
      payload: type,
      data,
      onSuccess,
    });
  });
});
