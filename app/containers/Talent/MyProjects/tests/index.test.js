import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import { MyProjects as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('MyProjects Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('Testing Functions', () => {
  intializeSetup();
  getWrapper();
  test('Testing if loadTalentProjects', () => {
    const loadTalentProjects = jest.spyOn(getInstance(), 'loadTalentProjects');
    loadTalentProjects(1);
    expect(loadTalentProjects).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentProject with status 0', () => {
    const setTalentProject = jest.spyOn(getInstance(), 'setTalentProject');
    const response = { status: 0, message: 'some error' };
    setTalentProject(response);
    expect(setTalentProject).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentProject with status 1', () => {
    const setTalentProject = jest.spyOn(getInstance(), 'setTalentProject');
    const data = {
      docs: [
        {
          _id: '5f7dfd88255c4060060f0571',
          name: 'Dummy Project_V',
          status: 'Discovery',
        },
        {
          _id: '5f6aef613d09b14c5df1a81c',
          name: 'Engage Bay from Dev',
          status: 'Proposed',
        },
        {
          _id: '5f606785cfcd8f364ae961c0',
          name: 'demo project demo project ',
          status: 'Requested',
        },
      ],
    };
    const response = { status: 1, message: 'success', data };
    setTalentProject(response);
    expect(setTalentProject).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentProject with status 1 with roleType agency', () => {
    StorageService.set('userType', '3');
    const setTalentProject = jest.spyOn(getInstance(), 'setTalentProject');

    const response = {
      status: 1,
      data: {
        docs: [
          {
            _id: '5f7cdbbfc1733332a7e3bae3',
            name: 'Dummy Project Vivek',
            talentsUserDetails: [
              {
                _id: '5f7ea6f2a6085d6155df5e60',
                name: 'Linda Williams',
                profilePicture: 'https://5f7ea6f2a6085d6155df5e60',
              },
              {
                _id: '5f89ae98afa60879df5577b2',
                name: 'Elizabeth Swann',
                profilePicture: 'https://5f89ae98afa60879df5577b2',
              },
              {
                _id: '5f9180e74a4ff642324fb559',
                name: 'Jack Sparrow',
                profilePicture: 'https://5f9180e74a4ff642324fb559',
              },
              {
                _id: '5f929e32b874a461dbeb22fc',
                name: 'Will Turner',
                profilePicture: 'https://5f929e32b874a461dbeb22fc',
              },
            ],
            status: 'On Hold',
          },
          {
            _id: '5f8837b20aca2e6209512343',
            name: 'Admin Project',
            talentsUserDetails: [
              {
                _id: '5f998598e700410d40a98c21',
                name: 'Hector Barbossa',
                profilePicture: 'https://5f998598e700410d40a98c21',
              },
              {
                _id: '5f998608a6ba330808ad4e3b',
                name: 'Joshamee Gibbs',
                profilePicture: 'https://5f998608a6ba330808ad4e3b',
              },
            ],
            status: 'In Progress',
          },
          {
            _id: '5f900bc8f58a297d2178f786',
            name: 'Event Management System',
            talentsUserDetails: [
              {
                _id: '5f89ae98afa60879df5577b2',
                name: 'Elizabeth Swann',
                profilePicture: 'https://5f89ae98afa60879df5577b2',
              },
              {
                _id: '5f9180e74a4ff642324fb559',
                name: 'Jack Sparrow',
                profilePicture: 'https://5f9180e74a4ff642324fb559',
              },
              {
                _id: '5f929e32b874a461dbeb22fc',
                name: 'Will Turner',
                profilePicture: 'https://5f929e32b874a461dbeb22fc',
              },
              {
                _id: '5f92eb840c450265c9c62bf6',
                name: 'Davvy Jones',
                profilePicture: 'https://5f92eb840c450265c9c62bf6',
              },
              {
                _id: '5f998598e700410d40a98c21',
                name: 'Hector Barbossa',
                profilePicture: 'https://5f998598e700410d40a98c21',
              },
              {
                _id: '5f998608a6ba330808ad4e3b',
                name: 'Joshamee Gibbs',
                profilePicture: 'https://5f998608a6ba330808ad4e3b',
              },
            ],
            status: 'Requested',
          },
        ],
        totalDocs: 3,
        limit: 20,
        page: 1,
        totalPages: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      },
      message: 'Success',
    };
    setTalentProject(response);
    expect(setTalentProject).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeFilter with status 1', () => {
    const handleChangeFilter = jest.spyOn(getInstance(), 'handleChangeFilter');
    const data = { label: 'All', value: -1 };
    handleChangeFilter(data);
    expect(handleChangeFilter).toHaveBeenCalledTimes(1);
  });
});
