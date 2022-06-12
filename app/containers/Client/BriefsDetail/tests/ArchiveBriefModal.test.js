import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { ArchiveBriefModal as MainForm } from '../ArchiveBriefModal';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  briefID: 'id',
  showArchiveBriefModal: false,
  handleArchiveBriefCloseModal: jest.fn(),
  handleBriefArchived: jest.fn(),
  loading: false,
  match: {
    params: {},
  },
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ArchiveBriefModal Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };

  // handleArchiveBriefOpenModal
  test('Testing if handleArchiveBriefOpenModal', () => {
    const handleArchiveBriefOpenModal = jest.spyOn(getInstance(), 'handleArchiveBriefOpenModal');
    const briefID = 'abcd';
    handleArchiveBriefOpenModal(event, briefID);
    expect(handleArchiveBriefOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleArchiveBriefCloseModal', () => {
    const handleArchiveBriefCloseModal = jest.spyOn(getInstance(), 'handleArchiveBriefCloseModal');
    handleArchiveBriefCloseModal();
    expect(handleArchiveBriefCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if submitArchive', () => {
    const submitArchive = jest.spyOn(getInstance(), 'submitArchive');
    submitArchive();
    expect(submitArchive).toHaveBeenCalledTimes(1);
  });

  test('Testing if briefArchived', () => {
    const briefArchived = jest.spyOn(getInstance(), 'briefArchived');
    const reponse = {
      status: 1,
      message: 'You have sucesfully applied to this job post',
    };
    briefArchived(reponse);
    expect(briefArchived).toHaveBeenCalledTimes(1);
  });

  test('Testing if briefArchived with else', () => {
    const briefArchived = jest.spyOn(getInstance(), 'briefArchived');
    const reponse = {
      status: 0,
      message: 'Success',
    };
    briefArchived(reponse);
    expect(briefArchived).toHaveBeenCalledTimes(1);
  });
});
