import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import moment from 'moment';
import request from 'utils/request';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { WorkExperienceComponent as MainForm } from '../WorkExperience';

jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  experiences: [
    {
      _id: '123asda42',
      jobTitle: '',
      employmentType: '',
      employer: '',
      startDate: '',
      endDate: '',
      country: '',
      shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
  ],
  index: 0,
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitProjectForm: jest.fn(),
  onChangeExperience: jest.fn(),
  onChangeSecondForm: jest.fn(),

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
props2.experiences = [
  {
    _id: '123asda42',
    jobTitle: 'Job',
    employmentType: 'Full Time',
    employer: 'ABCD',
    startDate: '10/10/2019',
    endDate: '10/10/2020',
    country: 'India',
    shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  },
  {
    _id: '123asadda42',
    jobTitle: '',
    employmentType: '',
    employer: '',
    startDate: '',
    endDate: '',
    country: '',
    shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
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

  const experiences = [
    {
      _id: '123asda42',
      jobTitle: 'Job',
      employmentType: 'Full Time',
      employer: 'ABCD',
      startDate: '10/10/2019',
      endDate: '10/10/2020',
      country: 'India',
      shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
  ];

  const experiencesLen2 = [
    {
      _id: '123asda42',
      jobTitle: 'Job',
      employmentType: 'Full Time',
      employer: 'ABCD',
      startDate: '10/10/2019',
      endDate: '10/10/2020',
      currentlyWork: true,
      country: 'India',
      shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
    {
      _id: '123aadsda42',
      jobTitle: 'Job2',
      employmentType: 'Part Time',
      employer: 'XYZ',
      startDate: '10/10/2019',
      endDate: '10/10/2020',
      currentlyWork: false,
      country: 'India',
      shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
  ];

  test('Testing if setValues', () => {
    const setValues = jest.spyOn(getInstance(), 'setValues');
    setValues(experiences, 0, 'WorkExperienceForm');
    expect(setValues).toHaveBeenCalledTimes(1);
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
    handleDateChange(newDate, 0, 'startDate0');
    expect(handleDateChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeShortDescription ', () => {
    const handleChangeShortDescription = jest.spyOn(getInstance(), 'handleChangeShortDescription');
    handleChangeShortDescription(EditorState.createEmpty(), 0);
    expect(handleChangeShortDescription).toHaveBeenCalledTimes(1);
  });

  test('Testing if getMaxStartDate ', () => {
    const getMaxStartDate = jest.spyOn(getInstance2(), 'getMaxStartDate');
    getMaxStartDate(experiences, 0);
    expect(getMaxStartDate).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleCurrentEndDate ', () => {
    const handleCurrentEndDate = jest.spyOn(getInstance2(), 'handleCurrentEndDate');
    handleCurrentEndDate(experiencesLen2, 0);
    expect(handleCurrentEndDate).toHaveBeenCalledTimes(1);
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
  const experiences = [
    {
      _id: '123asda42',
      jobTitle: 'Job',
      employmentType: 'Full Time',
      employer: 'ABCD',
      startDate: '10/10/2019',
      endDate: '10/10/2020',
      country: 'India',
      shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
  ];
  const experiencesLen2 = [
    {
      _id: '123asda42',
      jobTitle: 'Job',
      employmentType: 'Full Time',
      employer: 'ABCD',
      startDate: '10/10/2019',
      endDate: '10/10/2020',
      country: 'India',
      shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
    {
      _id: '123aadsda42',
      jobTitle: 'Job2',
      employmentType: 'Part Time',
      employer: 'XYZ',
      startDate: '10/10/2019',
      endDate: '10/10/2020',
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
    onChangeRaw(moment(), experiences, 0, 'startDate');
    expect(onChangeRaw).toHaveBeenCalledTimes(1);
  });

  test('Testing if dateValidation ', () => {
    const dateValidation = jest.spyOn(getInstance2(), 'dateValidation');
    dateValidation(moment(), experiences, 0, 'startDate');
    expect(dateValidation).toHaveBeenCalledTimes(1);
  });

  test('Testing if dateValidation for endDate', () => {
    const dateValidation = jest.spyOn(getInstance2(), 'dateValidation');
    dateValidation(moment(), experiences, 0, 'endDate');
    expect(dateValidation).toHaveBeenCalledTimes(1);
  });

  test('Testing if onBlurDate ', () => {
    const onBlurDate = jest.spyOn(getInstance2(), 'onBlurDate');
    onBlurDate(experiences, 0, 'startDate');
    expect(onBlurDate).toHaveBeenCalledTimes(1);
  });

  test('Testing if onBlurDate for if condition', () => {
    const onBlurDate = jest.spyOn(getInstance2(), 'onBlurDate');
    onBlurDate(experiencesLen2, 1, 'startDate');
    expect(onBlurDate).toHaveBeenCalledTimes(1);
  });

  test('Testing if dateChange with index 1', () => {
    const dateChange = jest.spyOn(getInstance2(), 'dateChange');
    dateChange(experiencesLen2, moment(), 1, 'startDate');
    expect(dateChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if dateChange with index 0', () => {
    const dateChange = jest.spyOn(getInstance2(), 'dateChange');
    dateChange(experiences, moment(), 0, 'endDate');
    expect(dateChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkValidStartDate ', () => {
    const checkValidStartDate = jest.spyOn(getInstance2(), 'checkValidStartDate');
    checkValidStartDate(experiences, 0);
    expect(checkValidStartDate).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkValidEndDate ', () => {
    const checkValidEndDate = jest.spyOn(getInstance2(), 'checkValidEndDate');
    checkValidEndDate(experiences, 0);
    expect(checkValidEndDate).toHaveBeenCalledTimes(1);
  });

  test('Testing if getMaxStartDate ', () => {
    const getMaxStartDate = jest.spyOn(getInstance2(), 'getMaxStartDate');
    getMaxStartDate(experiences, 0);
    expect(getMaxStartDate).toHaveBeenCalledTimes(1);
  });
});
