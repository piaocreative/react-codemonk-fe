import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { SkillRating as MainForm } from '../SkillRating';

jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  skills: [
    {
      label: 'ABCD',
      rating: 5,
      value: 'ABCD',
    },
    {
      label: 'XYZ',
      rating: 7,
      value: 'XYZ',
    },
  ],
  dispatch: jest.fn(),
  onChangeSkills: jest.fn(),
  formKey: 'professionalForm',
  onChangeProject: jest.fn(),
  invalid: false,
  loading: false,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },
};

const props2 = props;
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

  test('Testing if onClickHandlerRating', () => {
    const onClickHandlerRating = jest.spyOn(getInstance(), 'onClickHandlerRating');
    onClickHandlerRating(0, 7);
    expect(onClickHandlerRating).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSelectChangeTags', () => {
    const skills = [
      {
        label: 'ABCD',
        rating: 5,
        value: 'ABCD',
      },
      {
        label: 'XYZ',
        rating: 7,
        value: 'XYZ',
      },
    ];
    const handleSelectChangeTags = jest.spyOn(getInstance(), 'handleSelectChangeTags');
    handleSelectChangeTags(skills);
    expect(handleSelectChangeTags).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSelectChangeTags without skills', () => {
    const handleSelectChangeTags = jest.spyOn(getInstance(), 'handleSelectChangeTags');
    handleSelectChangeTags();
    expect(handleSelectChangeTags).toHaveBeenCalledTimes(1);
  });

  test('Testing componentDidMount without onBoarding', () => {
    const getWrapper3 = shallow(<MainForm store={store} onBoarding />);
    const getInstance3 = getWrapper3.instance();

    jest.spyOn(getInstance3, 'componentDidMount');
    getInstance3.componentDidMount();
    expect(getInstance3.componentDidMount).toHaveBeenCalledTimes(1);
  });

  test('Testing componentDidMount with onBoarding', () => {
    const setValues = jest.spyOn(getInstance2(), 'setValues');
    expect(setValues).toHaveBeenCalledTimes(0);
  });

  test('Testing setValues', () => {
    const skills = [
      {
        _id: '5f1a7a78b9f0ed09a73982fc',
        name: 'Amazon Kinesis',
        rate: 4,
      },
      {
        _id: '5f1a7a78b9f0ed09a73982fd',
        name: 'Android',
        rate: 7,
      },
    ];
    const setValues = jest.spyOn(getInstance(), 'setValues');
    setValues(skills, 'professionalForm');
    expect(setValues).toHaveBeenCalledTimes(1);
  });
});
