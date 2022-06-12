import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { CHANGE_TALENT_STATUS } from '../constants';
import { Talents as MainForm, mapDispatchToProps } from '../index';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeStatus: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

const response = {
  status: 1,
  data: {
    docs: [
      {
        _id: '5f7abc04c1733332a7e3bad4',
        currency: 'GBP',
        primaryRole: 'Developer',
        ratePerHour: 156,
        profilePicture:
          'https://s3-eu-west-1.amazonaws.com/s3-codemonk-static-content/development-proflie-pictures/5f9180e74a4ff642324fb559',
        talentShortName: 'Jack',
        status: 1,
        projectName: 'blue',
        talentUserId: '5f9180e74a4ff642324fb559',
        talentId: '5f9180e74a4ff642324fb55a',
        allocationTill: '2021-01-30T00:00:00.000Z',
      },
      {
        _id: '5f7abc04c1733332a7e3bad4',
        currency: 'GBP',
        primaryRole: 'Database Architect',
        ratePerHour: 156,
        profilePicture:
          'https://s3-eu-west-1.amazonaws.com/s3-codemonk-static-content/development-proflie-pictures/5f89ae98afa60879df5577b2',
        talentShortName: 'Elizabeth',
        status: 1,
        projectName: 'blue',
        talentUserId: '5f89ae98afa60879df5577b2',
        talentId: '5f89ae98afa60879df5577b3',
        allocationTill: '2021-03-20T00:00:00.000Z',
      },
    ],
    totalDocs: 2,
    limit: 20,
    page: 1,
    totalPages: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: 1,
  },
  message: 'Success',
  newTimesheet: false,
  newNotification: false,
};

const responseWithError = {
  status: 0,
  data: {},
  message: 'error',
  newTimesheet: false,
  newNotification: false,
};

describe('Projects Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if loadTalents', () => {
    const loadTalents = jest.spyOn(getInstance(), 'loadTalents');
    loadTalents(1);
    expect(loadTalents).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentDetails with status 0', () => {
    const setTalentDetails = jest.spyOn(getInstance(), 'setTalentDetails');
    setTalentDetails(responseWithError);
    expect(setTalentDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentDetails with status 1', () => {
    const setTalentDetails = jest.spyOn(getInstance(), 'setTalentDetails');
    setTalentDetails(response);
    expect(setTalentDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeStatus with status 1', () => {
    const talentID = 'id';
    const projectID = 'id';
    const selectedVal = { name: 'val', value: 'val' };
    const handleChangeStatus = jest.spyOn(getInstance(), 'handleChangeStatus');
    handleChangeStatus(talentID, projectID, selectedVal);
    expect(handleChangeStatus).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the  onChangeStatus events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeStatus(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      data: event,
      type: CHANGE_TALENT_STATUS,
    });
  });
});
