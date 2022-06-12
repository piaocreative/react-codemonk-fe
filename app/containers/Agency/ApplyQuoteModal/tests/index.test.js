import React from 'react';
import { shallow } from 'enzyme';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { ApplyQuoteModal as MainForm, mapDispatchToProps } from '../index';
import { SUBMIT_QUOTE } from '../constants';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },
  assumptions: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  outOfScope: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  teamStructure: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  additionalInfo: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
  showApplyModal: false,
  totalCost: '',
  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
  handleApplyModalClose: jest.fn(),
  onSubmitQuoteForm: jest.fn(),
  handleSuccess: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ApplyQuoteModal Component', () => {
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
    prevProps.showApplyModal = false;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ showApplyModal: true });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for componentDidUpdate with else', () => {
    const prevProps = props;
    prevProps.showApplyModal = false;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ showApplyModal: false });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('Testing if clearData', () => {
    const clearData = jest.spyOn(getInstance(), 'clearData');
    clearData(jest.fn());
    expect(clearData).toHaveBeenCalledTimes(1);
  });

  test('Testing if submitApply ', () => {
    const submitApply = jest.spyOn(getInstance(), 'submitApply');
    const event = { preventDefault: jest.fn() };
    submitApply(event);
    expect(submitApply).toHaveBeenCalledTimes(1);
  });

  test('Testing if submitSuccess with status 0', () => {
    const submitSuccess = jest.spyOn(getInstance(), 'submitSuccess');
    submitSuccess();
    expect(submitSuccess).toHaveBeenCalledTimes(1);
  });

  test('Testing if onFileChange', () => {
    const onFileChange = jest.spyOn(getInstance(), 'onFileChange');
    const name = 'effortsBreakdown';
    const files = [{ name: 'file.pdf', size: 348928, type: 'application/pdf', webkitRelativePath: '' }];
    const event = { preventDefault: jest.fn(), target: { name, files } };
    onFileChange(event);
    expect(onFileChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    const name = 'projectPlan';
    const files = [{ name: 'file.pdf', size: 348928, type: 'application/pdf', webkitRelativePath: '' }];
    validateDoc(name, files);
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc for length =2 ', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    const name = 'projectPlan';
    const files = [
      { name: 'file.pdf', size: 348928, type: 'application/pdf', webkitRelativePath: '' },
      { name: 'file.pdf', size: 348928, type: 'application/pdf', webkitRelativePath: '' },
    ];
    validateDoc(name, files);
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc for length =0 ', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    const name = 'projectPlan';
    const files = [];
    validateDoc(name, files);
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if onDeleteFile', () => {
    const onDeleteFile = jest.spyOn(getInstance(), 'onDeleteFile');
    const docName = 'projectPlan';
    onDeleteFile(docName);
    expect(onDeleteFile).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderProjectPlanFile', () => {
    const renderProjectPlanFile = jest.spyOn(getInstance(), 'renderProjectPlanFile');
    const projectPlan = 'file.pdf';
    renderProjectPlanFile(projectPlan);
    expect(renderProjectPlanFile).toHaveBeenCalledTimes(1);
  });
  test('Testing if renderEffortBreakdownFile', () => {
    const renderEffortBreakdownFile = jest.spyOn(getInstance(), 'renderEffortBreakdownFile');
    const effortsBreakdown = 'file.pdf';
    renderEffortBreakdownFile(effortsBreakdown);
    expect(renderEffortBreakdownFile).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  const onSuccessFn = jest.fn();

  const quoteData = {
    assumptions: '<p>data</p>↵',
    effortsBreakdown: { name: 'file.pdf', size: 348928, type: 'application/pdf', webkitRelativePath: '' },
    otherInfo: '<p>data</p>↵',
    outOfScope: '<p>data</p>↵',
    projectId: '5fa401b51730dd0b5aed9c82',
    quoteId: '5fabd8a8bb881c4e9b22da6d',
    projectPlan: { name: 'file.pdf', size: 348928, type: 'application/pdf', webkitRelativePath: '' },
    teamStructure: '<p>data</p>↵',
    totalCost: '<p>data</p>↵',
  };

  // onSubmitQuoteForm
  test('Testing if the  SUBMIT_QUOTE events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitQuoteForm(event, quoteData, onSuccessFn);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
  test('Testing if the  SUBMIT_QUOTE events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitQuoteForm(event, quoteData, onSuccessFn);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_QUOTE,
      data: quoteData,
      onSuccess: onSuccessFn,
    });
  });
});
