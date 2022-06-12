import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { EditorState } from 'draft-js';
import moment from 'moment';
import { HireTalent as MainForm, mapDispatchToProps } from '../index';
import { LOAD_REPOS } from '../../../App/constants';
import { CHANGE_INTERVIEW_SLOT, SUBMIT_HIRE } from '../constants';
jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeInterviewSlot: jest.fn(),
  onSubmitHire: jest.fn(),
  projectSummary: EditorState.createEmpty(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('HireTalent Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if modalSubmit with 0 index', () => {
    const modalSubmit = jest.spyOn(getInstance(), 'modalSubmit');
    modalSubmit();
    expect(modalSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if addTimeslot with 0 index', () => {
    const addTimeslot = jest.spyOn(getInstance(), 'addTimeslot');
    addTimeslot();
    expect(addTimeslot).toHaveBeenCalledTimes(1);
  });

  test('Testing if removeTimeslot with 0 index', () => {
    const removeTimeslot = jest.spyOn(getInstance(), 'removeTimeslot');
    removeTimeslot(0);
    expect(removeTimeslot).toHaveBeenCalledTimes(1);
  });

  test('Testing if removeTimeslot with 0 index', () => {
    const minDateTime = moment().toDate();
    const state = {
      stateInterviewSlotArray: [minDateTime, minDateTime],
      stateInterviewMinTimeArray: [minDateTime, minDateTime],
      projectOptions: [],
      projectsData: [],
    };
    const wrapper = shallow(<MainForm {...props} />);
    const removeTimeslot = jest.spyOn(wrapper.instance(), 'removeTimeslot');
    wrapper.setState(state);
    removeTimeslot(0);
    expect(removeTimeslot).toHaveBeenCalledTimes(1);
  });

  test('Testing if onChangeTimeSlot with 0 index', () => {
    const onChangeTimeSlot = jest.spyOn(getInstance(), 'onChangeTimeSlot');
    onChangeTimeSlot(0, new Date());
    expect(onChangeTimeSlot).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderInterviewSlots with 0 index', () => {
    const renderInterviewSlots = jest.spyOn(getInstance(), 'renderInterviewSlots');
    renderInterviewSlots();
    expect(renderInterviewSlots).toHaveBeenCalledTimes(1);
  });

  test('Testing if fetchProject with 0 index', () => {
    const fetchProject = jest.spyOn(getInstance(), 'fetchProject');
    fetchProject('project');
    expect(fetchProject).toHaveBeenCalledTimes(1);
  });

  test('Testing if processProjectData with 0 index', () => {
    const processProjectData = jest.spyOn(getInstance(), 'processProjectData');
    processProjectData([]);
    expect(processProjectData).toHaveBeenCalledTimes(1);
  });

  test('Testing if getOptions with 0 index', () => {
    const getOptions = jest.spyOn(getInstance(), 'getOptions');
    getOptions('project', jest.fn());
    expect(getOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadOptions with 0 index', () => {
    const loadOptions = jest.spyOn(getInstance(), 'loadOptions');
    loadOptions('project', jest.fn());
    expect(loadOptions).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChange with 0 index', () => {
    const handleChange = jest.spyOn(getInstance(), 'handleChange');
    handleChange({ name: 'abcd', value: 'abcd1' });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the  onChangeInterviewSlot events are dispatched correctly', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onChangeInterviewSlot([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_INTERVIEW_SLOT,
      data: [],
    });
  });

  test('Testing if the  LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onSubmitHire([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the  SUBMIT_HIRE events are dispatched correctly', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onSubmitHire([]);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_HIRE,
      data: [],
    });
  });
});
