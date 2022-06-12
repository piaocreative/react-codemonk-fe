import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { InterviewRequests as MainForm, mapDispatchToProps } from '../index';
import { CHANGE_INTERVIEW_STATUS } from '../constants';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
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

describe('InterviewRequests Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleFilterChange', () => {
    const handleFilterChange = jest.spyOn(getInstance(), 'handleFilterChange');
    const event = {
      target: {
        name: 'status',
        value: 0,
      },
    };
    handleFilterChange(event);
    expect(handleFilterChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if setReservedFilter', () => {
    const setReservedFilter = jest.spyOn(getInstance(), 'setReservedFilter');
    const pageNumber = 1;
    setReservedFilter(pageNumber);
    expect(setReservedFilter).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadInterviewDetails', () => {
    const loadInterviewDetails = jest.spyOn(getInstance(), 'loadInterviewDetails');
    const pageNumber = 1;
    loadInterviewDetails(pageNumber);
    expect(loadInterviewDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setInterviewDetails with status 0', () => {
    const setInterviewDetails = jest.spyOn(getInstance(), 'setInterviewDetails');
    const response = { status: 0, message: 'some error' };
    setInterviewDetails(response);
    expect(setInterviewDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setInterviewDetails with status 1', () => {
    const setInterviewDetails = jest.spyOn(getInstance(), 'setInterviewDetails');
    const response = {
      status: 1,
      data: {
        docs: [
          {
            clientName: 'user',
            companyName: 'user',
            clientEmail: 'user@yopmail.com',
            talentName: 'Test Second',
            talentEmail: 'demo2second@mailinator.com',
            _id: 'f79e277a92',
            clientId: '5ab1f5054fb3',
            talentId: 'f0c6139a1f17b6b',
            name: 'demo project new',
            description:
              '<p>sdcdscdfdfdvfdvfdvf dcdfnvkdfjv sdcdscdfdfdvfdvfdvf dcdfnvkdfjv sdcdscdfdfdvfdvfdvf dcdfnvkdfjv sdcdscdfdfdvfdvfdvf dcdfnvkdfjv</p>\n',
            timeSlots: [
              {
                isAccepted: 0,
                _id: '5f79e4cdee5e2032ce277a93',
                requestedSlot: '2020-10-16T18:00:00.000Z',
              },
            ],
            dateRequested: '2020-10-04T15:05:49.000Z',
            status: 'In Progress',
            talentStatus: '',
          },
        ],
        totalDocs: 2,
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
    setInterviewDetails(response);
    expect(setInterviewDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if filterChanged with update', () => {
    const filterChanged = jest.spyOn(getInstance(), 'filterChanged');
    filterChanged('update');
    expect(filterChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if filterChanged with clear', () => {
    const filterChanged = jest.spyOn(getInstance(), 'filterChanged');
    filterChanged('clear');
    expect(filterChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if filterChanged with else', () => {
    const filterChanged = jest.spyOn(getInstance(), 'filterChanged');
    filterChanged('else');
    expect(filterChanged).toHaveBeenCalledTimes(1);
  });

  test('test handleFiltersOpenModal', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ showFiltersModal: false });
    wrapper.instance().handleFiltersOpenModal();
    expect(wrapper.state().showFiltersModal).toEqual(true);
  });

  test('test handleFiltersCloseModal', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ showFiltersModal: true });
    wrapper.instance().handleFiltersCloseModal();
    expect(wrapper.state().showFiltersModal).toEqual(false);
  });

  test('Testing if handleChangeStatus', () => {
    const handleChangeStatus = jest.spyOn(getInstance(), 'handleChangeStatus');
    const interviewId = 'abcd';
    const selectedVal = 1;
    handleChangeStatus(interviewId, selectedVal);
    expect(handleChangeStatus).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleInterviewSearchChange', () => {
    const handleInterviewSearchChange = jest.spyOn(getInstance(), 'handleInterviewSearchChange');
    const value = 'search';
    handleInterviewSearchChange(value);
    expect(handleInterviewSearchChange).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the  onChangeStatus events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = {};
    const onSuccess = jest.fn();
    mapDispatchToProps(dispatch).onChangeStatus(data, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_INTERVIEW_STATUS,
      data,
      onSuccess,
    });
  });
});
