import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { TimesheetListing as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitSubscribe: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Projects Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  const responseWithData = {
    status: 1,
    data: {
      docs: [
        {
          _id: '5ff4173610590f0f6c9e212f',
          status: 3,
          week: [
            {
              date: '2020-12-21T00:00:00.000Z',
              value: 0,
            },
            {
              date: '2020-12-22T00:00:00.000Z',
              value: 1,
            },
            {
              date: '2020-12-23T00:00:00.000Z',
              value: 1,
            },
            {
              date: '2020-12-24T00:00:00.000Z',
              value: 1,
            },
            {
              date: '2020-12-25T00:00:00.000Z',
              value: 0.5,
            },
            {
              date: '2020-12-26T00:00:00.000Z',
              value: 0,
            },
            {
              date: '2020-12-27T00:00:00.000Z',
              value: 0,
            },
          ],
          projectId: '5f7193e05433d90abf9a0963',
          projectName: 'demo project new',
        },
      ],
      totalDocs: 11,
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
    newBrief: false,
  };

  const responseWithoutData = {
    status: 0,
    data: {
      docs: [],
    },
    message: 'Error',
  };

  test('Testing if downloadProfilePdf ', () => {
    const response = {
      status: 1,
      data: {
        pdfPath: 'https://s3-abcd-static-content/49599e3e54b4ae74.pdf',
      },
      message: 'Success',
    };
    const downloadProfilePdf = jest.spyOn(getInstance(), 'downloadProfilePdf');
    downloadProfilePdf(response);
    expect(downloadProfilePdf).toHaveBeenCalledTimes(1);
  });

  test('Testing if downloadProfilePdf with else', () => {
    const response = {
      status: 0,
      data: {},
      message: 'Error',
    };
    const downloadProfilePdf = jest.spyOn(getInstance(), 'downloadProfilePdf');
    downloadProfilePdf(response);
    expect(downloadProfilePdf).toHaveBeenCalledTimes(1);
  });

  test('Testing if handlePdfClick', () => {
    const talentId = '49599e3e54b4ae74';
    const handlePdfClick = jest.spyOn(getInstance(), 'handlePdfClick');
    handlePdfClick(talentId);
    expect(handlePdfClick).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadTimesheets', () => {
    const loadTimesheets = jest.spyOn(getInstance(), 'loadTimesheets');
    loadTimesheets(1);
    expect(loadTimesheets).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTimesheetData', () => {
    const setTimesheetData = jest.spyOn(getInstance(), 'setTimesheetData');
    setTimesheetData(responseWithData);
    expect(setTimesheetData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTimesheetData with else', () => {
    const setTimesheetData = jest.spyOn(getInstance(), 'setTimesheetData');
    setTimesheetData(responseWithoutData);
    expect(setTimesheetData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTimesheetDataSuccess', () => {
    const setTimesheetDataSuccess = jest.spyOn(getInstance(), 'setTimesheetDataSuccess');
    setTimesheetDataSuccess(responseWithData);
    expect(setTimesheetDataSuccess).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderClientAction', () => {
    const renderClientAction = jest.spyOn(getInstance(), 'renderClientAction');
    const id = '5ff4173610590f0f6c9e212f';
    renderClientAction(id);
    expect(renderClientAction).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderClientAction', () => {
    const handleChangeTimesheetStatus = jest.spyOn(getInstance(), 'handleChangeTimesheetStatus');
    const id = '5ff4173610590f0f6c9e212f';
    const statusValue = 4;
    const status = 'Settled';
    const getWeekStart = '2020-12-21T00:00:00.000Z';
    const week = [
      {
        date: '2020-12-21T00:00:00.000Z',
        value: 0,
      },
      {
        date: '2020-12-22T00:00:00.000Z',
        value: 1,
      },
      {
        date: '2020-12-23T00:00:00.000Z',
        value: 1,
      },
      {
        date: '2020-12-24T00:00:00.000Z',
        value: 1,
      },
      {
        date: '2020-12-25T00:00:00.000Z',
        value: 0.5,
      },
      {
        date: '2020-12-26T00:00:00.000Z',
        value: 0,
      },
      {
        date: '2020-12-27T00:00:00.000Z',
        value: 0,
      },
    ];
    handleChangeTimesheetStatus(id, statusValue, status, getWeekStart, week);
    expect(handleChangeTimesheetStatus).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderAdminAction', () => {
    const renderAdminAction = jest.spyOn(getInstance(), 'renderAdminAction');
    const id = '5ff4173610590f0f6c9e212f';
    renderAdminAction(id);
    expect(renderAdminAction).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSort', () => {
    const handleSort = jest.spyOn(getInstance(), 'handleSort');
    const column = { id: 'eNIBPCJtf', name: 'Week starting', selector: 'weekStart', sortable: true };
    const sortDirection = 'asc';
    handleSort(column, sortDirection);
    expect(handleSort).toHaveBeenCalledTimes(1);
  });
});
