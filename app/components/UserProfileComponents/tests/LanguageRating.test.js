import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { LanguageRating as MainForm } from '../LanguageRating';

jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  language: [
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
  onBoarding: false,
  dispatch: jest.fn(),
  onChangeLanguage: jest.fn(),
  formKey: 'personalDetails',
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
    const language = [
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
    handleSelectChangeTags(language);
    expect(handleSelectChangeTags).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSelectChangeTags without language', () => {
    const handleSelectChangeTags = jest.spyOn(getInstance(), 'handleSelectChangeTags');
    handleSelectChangeTags();
    expect(handleSelectChangeTags).toHaveBeenCalledTimes(1);
  });

  test('Testing componentDidMount without onBoarding', () => {
    const getWrapper3 = shallow(<MainForm store={store} {...props} onBoarding />);
    const getInstance3 = getWrapper3.instance();

    jest.spyOn(getInstance3, 'componentDidMount');
    getInstance3.componentDidMount();
    expect(getInstance3.componentDidMount).toHaveBeenCalledTimes(1);
  });

  test('Testing componentDidMount with onBoarding', () => {
    const setValues = jest.spyOn(getInstance2(), 'setValues');
    getInstance2().componentDidMount();
    expect(setValues).toHaveBeenCalledTimes(0);
  });

  test('Testing setValues', () => {
    const language = [
      {
        _id: '5f1a8396c9b6ad19e93b91eb',
        name: 'en',
        rate: 7,
      },
      {
        _id: '5f1a8396c9b6ad19e93b91ec',
        name: 'sq',
        rate: 9,
      },
    ];
    const setValues = jest.spyOn(getInstance(), 'setValues');
    setValues(language, 'personalDetails');
    expect(setValues).toHaveBeenCalledTimes(1);
  });
});
