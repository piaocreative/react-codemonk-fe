import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { ApplyBrief as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  loading: false,

  isPaymentSkipped: false,
  briefID: 'abcd',
  loadDetails: jest.fn(),
  handleSubmit: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ApplyBrief Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if submitApply', () => {
    const submitApply = jest.spyOn(getInstance(), 'submitApply');
    submitApply();
    expect(submitApply).toHaveBeenCalledTimes(1);
  });

  test('test handleProfileCompleteOpenModal', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ showCompleteProfileModal: false });
    wrapper.instance().handleProfileCompleteOpenModal();
    expect(wrapper.state().showCompleteProfileModal).toEqual(true);
  });

  test('Testing if briefApplied', () => {
    const briefApplied = jest.spyOn(getInstance(), 'briefApplied');
    const reponse = {
      status: 1,
      message: 'You have sucesfully applied to this job post',
    };
    briefApplied(reponse);
    expect(briefApplied).toHaveBeenCalledTimes(1);
  });

  test('Testing if briefApplied with else', () => {
    const briefApplied = jest.spyOn(getInstance(), 'briefApplied');
    const reponse = {
      status: 0,
      message: 'Success',
    };
    briefApplied(reponse);
    expect(briefApplied).toHaveBeenCalledTimes(1);
  });

  // test('Testing if applyModalContent ', () => {
  //   const applyModalContent = jest.spyOn(getInstance(), 'applyModalContent');
  //   applyModalContent();
  //   expect(applyModalContent).toHaveBeenCalledTimes(1);
  // });

  test('Testing if renderApplyModal ', () => {
    const renderApplyModal = jest.spyOn(getInstance(), 'renderApplyModal');
    renderApplyModal();
    expect(renderApplyModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleApplyProjectOpenModal ', () => {
    const handleApplyProjectOpenModal = jest.spyOn(getInstance(), 'handleApplyProjectOpenModal');
    const e = { preventDefault: jest.fn() };
    handleApplyProjectOpenModal(e);
    expect(handleApplyProjectOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleApplyProjectCloseModal ', () => {
    const handleApplyProjectCloseModal = jest.spyOn(getInstance(), 'handleApplyProjectCloseModal');
    handleApplyProjectCloseModal();
    expect(handleApplyProjectCloseModal).toHaveBeenCalledTimes(1);
  });
});
