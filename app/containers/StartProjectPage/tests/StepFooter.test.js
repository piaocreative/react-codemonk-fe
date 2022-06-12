import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { StepFooter as MainForm } from '../StepFooter';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitProjectDetailsForm: jest.fn(),
  goToStep: jest.fn(),
  nextStep: jest.fn(),
  previousStep: jest.fn(),
  history: { push: () => {} },
};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('StepFooter Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if handleContinue ', () => {
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    const test = {
      preventDefault: jest.fn(),
    };
    props.projectUrl = ['test'];
    getWrapper()
      .instance()
      .handleContinue(test);
    expect(test.preventDefault).toBeCalled();
  });
  test('Testing if handleBack ', () => {
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    const test = {
      test: 'test',
    };
    props.projectUrl = ['test'];
    getWrapper()
      .instance()
      .handleBack(test);
    expect(props.previousStep).toBeCalled();
  });
});
