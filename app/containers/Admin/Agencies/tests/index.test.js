import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Agencies as MainForm, mapDispatchToProps } from '../index';
import { CHANGE_AGENCY_STATUS } from '../constants';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeAgencyStatus: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Admin Agency Listing Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  const response = {
    status: 1,
    data: {
      docs: [
        {
          _id: '5f47a943b551c9667f7644f8',
          email: 'devagency1@mailinator.com',
          agencyUserId: '5f47a8bd9147df608e52672d',
          name: null,
          agencyName: null,
          status: 'Unregistered',
        },
      ],
      totalDocs: 1,
      limit: 20,
      page: 1,
      totalPages: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: true,
      prevPage: null,
      nextPage: null,
    },
    message: 'Success',
  };
  const responseWithStatus0 = {
    status: 0,
    data: {},
    message: 'Error',
  };

  test('test handleFilterChange', () => {
    const event = {
      target: {
        name: 'test',
        value: 'test',
      },
    };
    const wrapper = shallow(<MainForm {...props} />);
    const handleFilterChange = jest.spyOn(wrapper.instance(), 'handleFilterChange');
    wrapper.instance().handleFilterChange(event);
    expect(handleFilterChange).toBeCalled();
  });

  test('test loadAgencyDetails', () => {
    const pageNum = 1;
    const loadAgencyDetails = jest.spyOn(getInstance(), 'loadAgencyDetails');
    loadAgencyDetails(pageNum);
    expect(loadAgencyDetails).toHaveBeenCalledTimes(1);
  });

  test('test setAdminAgencyListingDetails', () => {
    const setAdminAgencyListingDetails = jest.spyOn(getInstance(), 'setAdminAgencyListingDetails');
    setAdminAgencyListingDetails(response);
    expect(setAdminAgencyListingDetails).toHaveBeenCalledTimes(1);
  });
  test('test setAdminAgencyListingDetails with else', () => {
    const setAdminAgencyListingDetails = jest.spyOn(getInstance(), 'setAdminAgencyListingDetails');
    setAdminAgencyListingDetails(responseWithStatus0);
    expect(setAdminAgencyListingDetails).toHaveBeenCalledTimes(1);
  });

  test('test agencyFiltersOpenModal', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ showFiltersModal: false });
    wrapper.instance().agencyFiltersOpenModal();
    expect(wrapper.state().showFiltersModal).toEqual(true);
  });

  test('test agencyFiltersCloseModal', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ showFiltersModal: true });
    wrapper.instance().agencyFiltersCloseModal();
    expect(wrapper.state().showFiltersModal).toEqual(false);
  });

  test('Testing if handleAgencyStatusChange', () => {
    const handleAgencyStatusChange = jest.spyOn(getInstance(), 'handleAgencyStatusChange');
    const agencyID = 'ajhfda8';
    const selectedVal = { label: 'Active', value: '1' };
    handleAgencyStatusChange(agencyID, selectedVal);
    expect(handleAgencyStatusChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if agencyFilterChanged with update', () => {
    const agencyFilterChanged = jest.spyOn(getInstance(), 'agencyFilterChanged');
    agencyFilterChanged('update');
    expect(agencyFilterChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if agencyFilterChanged with clear', () => {
    const agencyFilterChanged = jest.spyOn(getInstance(), 'agencyFilterChanged');
    agencyFilterChanged('clear');
    expect(agencyFilterChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if agencyFilterChanged with else', () => {
    const agencyFilterChanged = jest.spyOn(getInstance(), 'agencyFilterChanged');
    agencyFilterChanged('else');
    expect(agencyFilterChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSearchChange', () => {
    const handleSearchChange = jest.spyOn(getInstance(), 'handleSearchChange');
    const value = 'user';
    handleSearchChange(value);
    expect(handleSearchChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if agencyFilterPopupRow', () => {
    const agencyFilterPopupRow = jest.spyOn(getInstance(), 'agencyFilterPopupRow');
    const status = 1;
    agencyFilterPopupRow(status);
    expect(agencyFilterPopupRow).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the  onChangeAgencyStatus events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = { name: 'Active', value: 1 };
    const onSuccess = jest.fn();

    mapDispatchToProps(dispatch).onChangeAgencyStatus(data, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_AGENCY_STATUS,
      data,
      onSuccess,
    });
  });
});
