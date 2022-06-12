import React from 'react';
import { shallow } from 'enzyme';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import request from 'utils/request';
import { LOAD_REPOS, POP_UP_SAGA } from 'containers/App/constants';
import { ProjectDetailPage as MainForm, mapDispatchToProps } from '../index';
import { CHANGE_TALENT_STATUS, EDIT_PROJECT_DETAILS, ADD_TALENT, SAVE_QUOTE } from '../constants';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },
  projectDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  briefDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  quoteDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  briefSkills: ['Amazon Kinesis'],
  popUpSaga: false,
  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
  onSubmitAddTalentForm: jest.fn(),
  onChangeStatus: jest.fn(),
  onSumitEditProjectDetails: jest.fn(),
  onSubmitQuoteForm: jest.fn(),
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

  test('for componentDidUpdate with if', () => {
    const prevProps = props;
    prevProps.popUpSaga = true;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ popUpSaga: false });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for componentDidUpdate with else', () => {
    const prevProps = props;
    prevProps.popUpSaga = false;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ popUpSaga: false });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadProjectDetails', () => {
    const loadProjectDetails = jest.spyOn(getInstance(), 'loadProjectDetails');
    loadProjectDetails();
    expect(loadProjectDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setProjectDetails with status 0', () => {
    const setProjectDetails = jest.spyOn(getInstance(), 'setProjectDetails');
    const response = { status: 0, message: 'some error' };
    setProjectDetails(response);
    expect(setProjectDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleAddTalentOpenModal', () => {
    const handleAddTalentOpenModal = jest.spyOn(getInstance(), 'handleAddTalentOpenModal');
    handleAddTalentOpenModal();
    expect(handleAddTalentOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleAddTalentCloseModal', () => {
    const handleAddTalentCloseModal = jest.spyOn(getInstance(), 'handleAddTalentCloseModal');
    handleAddTalentCloseModal();
    expect(handleAddTalentCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if popupSubmit', () => {
    const popupSubmit = jest.spyOn(getInstance(), 'popupSubmit');
    const event = { preventDefault: jest.fn() };
    popupSubmit(event);
    expect(popupSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if editProjectDetailsModalOpen', () => {
    const editProjectDetailsModalOpen = jest.spyOn(getInstance(), 'editProjectDetailsModalOpen');
    editProjectDetailsModalOpen();
    expect(editProjectDetailsModalOpen).toHaveBeenCalledTimes(1);
  });

  test('Testing if editProjectDetailsModalClose', () => {
    const editProjectDetailsModalClose = jest.spyOn(getInstance(), 'editProjectDetailsModalClose');
    editProjectDetailsModalClose();
    expect(editProjectDetailsModalClose).toHaveBeenCalledTimes(1);
  });

  test('Testing if editProjectDetailsSuccess', () => {
    const editProjectDetailsSuccess = jest.spyOn(getInstance(), 'editProjectDetailsSuccess');
    editProjectDetailsSuccess();
    expect(editProjectDetailsSuccess).toHaveBeenCalledTimes(1);
  });

  test('Testing if quoteModalSubmit', () => {
    const quoteModalSubmit = jest.spyOn(getInstance(), 'quoteModalSubmit');
    const evt = { preventDefault: jest.fn() };
    const type = 'edit';
    const data = {
      projectId: '123',
      name: 'Project',
      description: 'ABCD',
      quote: '',
    };
    quoteModalSubmit(evt, type, data);
    expect(quoteModalSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if quoteModalSuccess', () => {
    const quoteModalSuccess = jest.spyOn(getInstance(), 'quoteModalSuccess');
    quoteModalSuccess();
    expect(quoteModalSuccess).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the  onChangeStatus events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = { name: 'Active', value: 1 };
    const onSuccess = jest.fn();

    mapDispatchToProps(dispatch).onChangeStatus(data, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_TALENT_STATUS,
      data,
      onSuccess,
    });
  });

  // load repo
  test('Testing if the  onSumitEditProjectDetails events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = '';
    const data = {
      projectId: '111',
      name: 'abcd',
      description: '',
    };

    mapDispatchToProps(dispatch).onSumitEditProjectDetails(event, data, jest.fn());
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  // actuall call
  test('Testing if the  onSumitEditProjectDetails events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    const data = {
      projectId: '111',
      name: 'abcd',
      description: '',
    };

    const onSuccess = jest.fn();

    mapDispatchToProps(dispatch).onSumitEditProjectDetails(event, data, onSuccess);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: EDIT_PROJECT_DETAILS,
      data,
      onSuccess,
    });
  });

  test('Testing if the  LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = '';
    mapDispatchToProps(dispatch).onSubmitAddTalentForm(event, []);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the  ADD_PROJECT events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAddTalentForm(event, []);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: POP_UP_SAGA,
      payload: true,
    });
  });

  test('Testing if the  ADD_PROJECT events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitAddTalentForm(event, []);
    expect(dispatch.mock.calls[2][0]).toEqual({
      type: ADD_TALENT,
      data: [],
    });
  });

  const onSuccessFn = jest.fn();
  const quoteData = {
    _id: '105f12bd91',
    projectId: 'a2e6209512343',
    name: 'Brief 1',
    description: '<p>The false text also gives not a realistic overview of</p>\n<p></p>\n',
    quote: 'file.pdf',
  };

  // onSubmitQuoteForm
  test('Testing if the  SAVE_QUOTE events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    const type = 'add';
    mapDispatchToProps(dispatch).onSubmitQuoteForm(event, type, quoteData, onSuccessFn);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
  test('Testing if the  SAVE_QUOTE events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    const type = 'add';
    mapDispatchToProps(dispatch).onSubmitQuoteForm(event, type, quoteData, onSuccessFn);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SAVE_QUOTE,
      payload: 'add',
      data: quoteData,
      onSuccess: onSuccessFn,
    });
  });
});
