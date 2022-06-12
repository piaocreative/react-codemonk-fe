import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import moment from 'moment';
import request from 'utils/request';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { EducationComponent as MainForm } from '../EducationComponent';

jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  education: [
    {
      _id: '5ef1bc3ed692e5441ab6f87c',
      degreeLevel: 'Master’s or Higher',
      degreeTitle: 'Master in Computer Application',
      collegeName: 'IETE, New Delhi',
      country: 'India',
      startYear: '14/06/2019',
      endYear: '14/06/2020',
    },
  ],
  index: 0,
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeEducation: jest.fn(),
  onChangeSecondForm: jest.fn(),

  onSubmitEducationForm: jest.fn(),
  onSubmitAddEducationForm: jest.fn(),
  onSubmitDeleteEducationForm: jest.fn(),

  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },

  onSaveForLater: jest.fn(),
  formKey: 'WorkExperienceForm',
};

const props2 = props;
props2.education = [
  {
    _id: 'saddfgsfgsdfsdf',
    degreeLevel: 'Master’s or Higher',
    degreeTitle: 'Master in Computer Application',
    collegeName: 'IETE, New Delhi',
    country: 'India',
    startYear: '14/06/2019',
    endYear: '14/06/2020',
  },
  {
    _id: '5ef1bc3ed692e5441ab6f87c',
    degreeLevel: 'Master’s or Higher',
    degreeTitle: 'Master in Computer Application',
    collegeName: 'RIM, New Delhi',
    country: 'India',
    startYear: '14/06/2019',
    endYear: '14/06/2020',
  },
];
props2.onBoarding = true;

const props3 = props2;
props3.secondFormTouch = true;

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

  const education = [
    {
      _id: '5ef1bc3ed692e5441ab6f87c',
      degreeLevel: 'Master’s or Higher',
      degreeTitle: 'Master in Computer Application',
      collegeName: 'IETE, New Delhi',
      country: 'India',
      startYear: '14/06/2019',
      endYear: '14/06/2020',
    },
  ];

  test('Testing if setEducationValues', () => {
    const setEducationValues = jest.spyOn(getInstance(), 'setEducationValues');
    setEducationValues(education, 0, 'WorkExperienceForm');
    expect(setEducationValues).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleFieldData ', () => {
    const handleFieldData = jest.spyOn(getInstance(), 'handleFieldData');
    handleFieldData({ target: { value: 'ABCD', name: 'jobTitle0' } }, 0);
    expect(handleFieldData).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleFieldData ', () => {
    const handleFieldData = jest.spyOn(getInstance(), 'handleFieldData');
    handleFieldData({ target: { value: 'employer', name: 'employer' } }, 0);
    expect(handleFieldData).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleDateChange ', () => {
    const handleDateChange = jest.spyOn(getInstance(), 'handleDateChange');
    const newDate = new Date();
    handleDateChange(newDate, 0, 'startYear0');
    expect(handleDateChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if getMaxStartDate ', () => {
    const getMaxStartDate = jest.spyOn(getInstance2(), 'getMaxStartDate');
    getMaxStartDate(education, 0);
    expect(getMaxStartDate).toHaveBeenCalledTimes(1);
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

describe('test datepicker functions', () => {
  const education = [
    {
      _id: '123asda42',
      jobTitle: 'Job',
      employmentType: 'Full Time',
      employer: 'ABCD',
      startYear: '10/10/2019',
      endYear: '10/10/2020',
      country: 'India',
      shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
  ];
  const educationLen2 = [
    {
      _id: '123asda42',
      jobTitle: 'Job',
      employmentType: 'Full Time',
      employer: 'ABCD',
      startYear: moment(),
      endYear: moment(),
      country: 'India',
      shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
    {
      _id: '123aadsda42',
      jobTitle: 'Job2',
      employmentType: 'Part Time',
      employer: 'XYZ',
      startYear: moment(),
      endYear: moment(),
      country: 'India',
      shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
  ];

  test('Testing if checkIfValidDate ', () => {
    const checkIfValidDate = jest.spyOn(getInstance2(), 'checkIfValidDate');
    const output = checkIfValidDate(moment());
    expect(output).toEqual(true);
  });

  test('Testing if checkIfValidDate with wrong date', () => {
    const checkIfValidDate = jest.spyOn(getInstance2(), 'checkIfValidDate');
    const output = checkIfValidDate('test');
    expect(output).toEqual(false);
  });

  test('Testing if onChangeRaw ', () => {
    const onChangeRaw = jest.spyOn(getInstance2(), 'onChangeRaw');
    onChangeRaw(moment(), education, 0, 'startYear');
    expect(onChangeRaw).toHaveBeenCalledTimes(1);
  });

  test('Testing if dateValidation ', () => {
    const dateValidation = jest.spyOn(getInstance2(), 'dateValidation');
    dateValidation(moment(), education, 0, 'startYear');
    expect(dateValidation).toHaveBeenCalledTimes(1);
  });

  test('Testing if dateValidation for endYear', () => {
    const dateValidation = jest.spyOn(getInstance2(), 'dateValidation');
    dateValidation(moment(), education, 0, 'endYear');
    expect(dateValidation).toHaveBeenCalledTimes(1);
  });

  test('Testing if onBlurDate ', () => {
    const onBlurDate = jest.spyOn(getInstance2(), 'onBlurDate');
    onBlurDate(education, 0, 'startYear');
    expect(onBlurDate).toHaveBeenCalledTimes(1);
  });

  test('Testing if onBlurDate for if condition', () => {
    const onBlurDate = jest.spyOn(getInstance2(), 'onBlurDate');
    onBlurDate(educationLen2, 1, 'startYear');
    expect(onBlurDate).toHaveBeenCalledTimes(1);
  });

  test('Testing if dateChange with index 1', () => {
    const dateChange = jest.spyOn(getInstance2(), 'dateChange');
    dateChange(educationLen2, moment(), 1, 'startYear');
    expect(dateChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if dateChange with index 0', () => {
    const dateChange = jest.spyOn(getInstance2(), 'dateChange');
    dateChange(education, moment(), 0, 'endYear');
    expect(dateChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkValidStartDate ', () => {
    const checkValidStartDate = jest.spyOn(getInstance2(), 'checkValidStartDate');
    checkValidStartDate(education, 0);
    expect(checkValidStartDate).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkValidEndDate ', () => {
    const checkValidEndDate = jest.spyOn(getInstance2(), 'checkValidEndDate');
    checkValidEndDate(education, 0);
    expect(checkValidEndDate).toHaveBeenCalledTimes(1);
  });

  test('Testing if getMaxStartDate ', () => {
    const getMaxStartDate = jest.spyOn(getInstance2(), 'getMaxStartDate');
    getMaxStartDate(educationLen2, 0);
    expect(getMaxStartDate).toHaveBeenCalledTimes(1);
  });
});
