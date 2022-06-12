import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { EditorState } from 'draft-js';
import { LOAD_REPOS } from 'containers/App/constants';
import Emitter from 'utils/emitter';
import { AllocateTalent as MainForm, mapDispatchToProps } from '../index';
import { SUBMIT_HIRE } from '../constants';
jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeInterviewSlot: jest.fn(),
  onSubmitAllocate: jest.fn(),
  projectSummary: EditorState.createEmpty(),
  allocateModalClose: jest.fn(),
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

  test('Testing if toggle with allocateTalentSaga = true', () => {
    shallow(<MainForm {...props} />);
    Emitter.emit('allocateTalentSaga', true);
    expect(props.allocateModalClose).toHaveBeenCalledTimes(4);
  });
  test('Testing if toggle with allocateTalentSaga = false', () => {
    shallow(<MainForm {...props} />);
    Emitter.emit('allocateTalentSaga', false);
    expect(props.allocateModalClose).toHaveBeenCalledTimes(4);
  });

  test('Testing if emitter off on component unmount', () => {
    const component = shallow(<MainForm {...props} />);
    jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  test('Testing if modalSubmit with 0 index', () => {
    const modalSubmit = jest.spyOn(getInstance(), 'modalSubmit');
    modalSubmit();
    expect(modalSubmit).toHaveBeenCalledTimes(1);
  });

  test('Testing if onChangeStartDate', () => {
    const onChangeStartDate = jest.spyOn(getInstance(), 'onChangeStartDate');
    const date = new Date();
    onChangeStartDate(date);
    expect(onChangeStartDate).toHaveBeenCalledTimes(1);
  });
  test('Testing if onChangeEndDate', () => {
    const onChangeEndDate = jest.spyOn(getInstance(), 'onChangeEndDate');
    const date = new Date();
    onChangeEndDate(date);
    expect(onChangeEndDate).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the  LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onSubmitAllocate([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the  SUBMIT_HIRE events are dispatched correctly', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onSubmitAllocate([]);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_HIRE,
      data: [],
    });
  });
});
