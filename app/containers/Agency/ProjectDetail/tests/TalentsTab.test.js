import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { TalentsTab as MainForm } from '../TalentsTab';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },
  data: {
    talentsDetails: [
      {
        _id: '187301000870a9e5',
        email: 'user1@yopmail.com',
        name: 'User',
        shortName: 'AB',
        status: 'Inactive',
        allocationTill: '',
        talentUserId: '7301000870a9e5',
        talentId: '301000870a9e6',
        primaryRole: 'Developer',
        ratePerHour: 14.3,
        currency: 'GBP',
      },
      {
        _id: '0008740c32',
        email: 'user@mailinator.com',
        name: 'User 3',
        shortName: 'TY',
        status: 'Active',
        allocationTill: '',
        talentUserId: 'cf0008740c32',
        talentId: 'cf0008740c33',
        primaryRole: 'UX Manager',
        ratePerHour: 130,
        currency: 'USD',
      },
      {
        _id: '58000883923c',
        email: 'user2@yopmail.com',
        name: 'User',
        shortName: 'TF',
        status: 'Inactive',
        allocationTill: '',
        talentUserId: '58000883923c',
        talentId: '08558000883923d',
        primaryRole: 'Product (UI) designer',
        ratePerHour: 15.6,
        currency: 'USD',
      },
    ],
  },

  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
  onChangeStatus: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('TalentsTab Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if setAgencyTalentsDetails', () => {
    const setAgencyTalentsDetails = jest.spyOn(getInstance(), 'setAgencyTalentsDetails');
    const pageNum = 1;
    setAgencyTalentsDetails(pageNum);
    expect(setAgencyTalentsDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderNoTalents', () => {
    const renderNoTalents = jest.spyOn(getInstance(), 'renderNoTalents');
    renderNoTalents();
    expect(renderNoTalents).toHaveBeenCalledTimes(1);
  });
});
