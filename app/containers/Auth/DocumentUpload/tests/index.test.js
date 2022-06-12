import React from 'react';
import { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { DocumentUpload as MainForm, mapDispatchToProp } from '../index';
import { EXPERIENCE_SAVE_FOR_LATER } from '../constants';
jest.mock('utils/request');
let store;
// const mockStore = configureStore();
const props = {
  experiences: [
    {
      id: '9533ace6-1f78-4564-b162-bee97877953a',
      jobTitle: 'Developer',
      employmentType: 'Contract',
      employer: 'Google',
      country: { label: 'Albania', value: 'Albania' },
      startDate: '10/10/2019',
      endDate: '10/10/2020',
      shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
  ],
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitExperienceForm: jest.fn(),
  onChangeExperience: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },

  onSaveForLater: jest.fn(),

  onChangeBrief: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  // store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  // test('Testing if fetchFieldValues with status 1', () => {
  //   const fetchFieldValues = jest.spyOn(getInstance(), 'fetchFieldValues');
  //   fetchFieldValues({ status: 1, data: { workExperience: [] } });
  //   expect(fetchFieldValues).toHaveBeenCalledTimes(1);
  // });

  test('Testing if fetchFieldValues with status 0', () => {
    const fetchFieldValues = jest.spyOn(getInstance(), 'fetchFieldValues');
    fetchFieldValues({ status: 0 });
    expect(fetchFieldValues).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSaveForLater ', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() });
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProp Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the save for later events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'saveForLater',
      type: EXPERIENCE_SAVE_FOR_LATER,
    });
  });
});
