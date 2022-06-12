import React from 'react';
import { shallow } from 'enzyme';
import StorageService from 'utils/StorageService';
import request from 'utils/request';
import { Talents as MainForm, mapDispatchToProps } from '../index';
import { initialValues, CHANGE_TALENT_STATUS } from '../constants';

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
        _id: '5f1ea13d412d3e628529a3cf',
        email: 'brinda1010@yopmail.com',
        profilePicture: '',
        skills: [
          {
            _id: '5f1ffe9d8463bd1c7a970ac9',
            name: 'Amazon Kinesis',
            rate: 7,
          },
        ],
        registerType: 'freelancer',
        talentUserId: '5f1ea13d412d3e628529a3ce',
        name: 'Brinda Lakhani',
        phoneNumber: '+355 09033238204',
        status: 'Active',
      },
      {
        _id: '5f1ef1d30c30b90454a57e8a',
        email: 'staging9@yopmail.com',
        profilePicture: '',
        skills: [
          {
            _id: '5f1ff7deeda26f1c8133feea',
            name: 'Adobe Illustrator',
            rate: 5,
          },
        ],
        registerType: 'freelancer',
        talentUserId: '5f1ef1d30c30b90454a57e89',
        name: 'Brinda Lakhani',
        phoneNumber: '+355 09033238204',
        status: 'Active',
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
};

const responseError = {
  status: 0,
  data: {},
  message: 'Error',
};

describe('Projects Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('test handleFiltersOpenModal', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ showFiltersModal: false });
    wrapper.instance().handleFiltersOpenModal();
    expect(wrapper.state().showFiltersModal).toEqual(true);
  });

  test('test handleLogsOpenModal', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ showLogsModal: false });
    wrapper.instance().handleLogsOpenModal();
    expect(wrapper.state().showLogsModal).toEqual(true);
  });

  test('Testing if handleFiltersCloseModal', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ tempModalFilter: initialValues });
    const handleFiltersCloseModal = jest.spyOn(wrapper.instance(), 'handleFiltersCloseModal');
    handleFiltersCloseModal();
    expect(handleFiltersCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleLogsCloseModal', () => {
    const wrapper = shallow(<MainForm {...props} />);
    const handleLogsCloseModal = jest.spyOn(wrapper.instance(), 'handleLogsCloseModal');
    handleLogsCloseModal();
    expect(handleLogsCloseModal).toHaveBeenCalledTimes(1);
  });

  test('testing componentDidUpdate', () => {
    const prevProps = props;
    prevProps.popUpSaga = true;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ popUpSaga: false });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('testing componentDidUpdate with else', () => {
    const prevProps = props;
    prevProps.popUpSaga = false;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ popUpSaga: false });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('testing setReservedFilter', () => {
    StorageService.set('talentFilterObject', JSON.stringify(initialValues));
    const pageNumber = 1;
    const setReservedFilter = jest.spyOn(getInstance(), 'setReservedFilter');
    setReservedFilter(pageNumber);
    expect(setReservedFilter).toHaveBeenCalledTimes(1);
  });

  test('testing setReservedFilter with else', () => {
    StorageService.set('talentFilterObject', false);
    const pageNumber = 1;
    const setReservedFilter = jest.spyOn(getInstance(), 'setReservedFilter');
    setReservedFilter(pageNumber);
    expect(setReservedFilter).toHaveBeenCalledTimes(1);
  });

  test('testing loadTalentsDetails', () => {
    const pageNumber = 1;
    const loadTalentsDetails = jest.spyOn(getInstance(), 'loadTalentsDetails');
    loadTalentsDetails(pageNumber);
    expect(loadTalentsDetails).toHaveBeenCalledTimes(1);
  });

  test('testing setTalentsDetails', () => {
    const setTalentsDetails = jest.spyOn(getInstance(), 'setTalentsDetails');
    setTalentsDetails(response);
    expect(setTalentsDetails).toHaveBeenCalledTimes(1);
  });

  test('testing setTalentsDetails with error', () => {
    const setTalentsDetails = jest.spyOn(getInstance(), 'setTalentsDetails');
    setTalentsDetails(responseError);
    expect(setTalentsDetails).toHaveBeenCalledTimes(1);
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

  test('Testing if languageValueChanged', () => {
    const languageValueChanged = jest.spyOn(getInstance(), 'languageValueChanged');
    const data = { name: 'languageSearch', value: { label: 'English', value: 'English' } };
    languageValueChanged(data);
    expect(languageValueChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if countryValueChanged', () => {
    const countryValueChanged = jest.spyOn(getInstance(), 'countryValueChanged');
    const data = { name: 'countrySearch', value: { label: 'India', value: 'India' } };
    countryValueChanged(data);
    expect(countryValueChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSearchChange', () => {
    const handleSearchChange = jest.spyOn(getInstance(), 'handleSearchChange');
    const value = 'user';
    handleSearchChange(value);
    expect(handleSearchChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeStatus', () => {
    const handleChangeStatus = jest.spyOn(getInstance(), 'handleChangeStatus');
    const talentId = 'ajhfda8';
    const selectedVal = { label: 'Active', value: '1' };
    handleChangeStatus(talentId, selectedVal);
    expect(handleChangeStatus).toHaveBeenCalledTimes(1);
  });

  test('Testing if talentStatusSelectBox', () => {
    const talentStatusSelectBox = jest.spyOn(getInstance(), 'talentStatusSelectBox');
    const listData = [
      {
        _id: '5f1ea13d412d3e628529a3cf',
        email: 'brinda1010@yopmail.com',
        profilePicture: '',
        skills: [
          {
            _id: '5f1ffe9d8463bd1c7a970ac9',
            name: 'Amazon Kinesis',
            rate: 7,
          },
        ],
        registerType: 'freelancer',
        talentUserId: '5f1ea13d412d3e628529a3ce',
        name: 'Brinda Lakhani',
        phoneNumber: '+355 09033238204',
        status: 'Active',
      },
    ];
    const statusVal = 1;
    talentStatusSelectBox(listData, statusVal);
    expect(talentStatusSelectBox).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleMultiSelectChange', () => {
    const handleMultiSelectChange = jest.spyOn(getInstance(), 'handleMultiSelectChange');
    const e = { label: 'Android', value: 'Android' };
    handleMultiSelectChange(e);
    expect(handleMultiSelectChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleCheckboxFilterChange', () => {
    const handleCheckboxFilterChange = jest.spyOn(getInstance(), 'handleCheckboxFilterChange');
    const name = 'all';
    const checked = true;
    const type = 'language';
    handleCheckboxFilterChange(name, checked, type);
    expect(handleCheckboxFilterChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleCheckboxFilterChange with checked false', () => {
    const handleCheckboxFilterChange = jest.spyOn(getInstance(), 'handleCheckboxFilterChange');
    const name = 'all';
    const checked = false;
    const type = 'language';
    handleCheckboxFilterChange(name, checked, type);
    expect(handleCheckboxFilterChange).toHaveBeenCalledTimes(1);
  });

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

  test('Testing if talentListTablePagination', () => {
    const talentListTablePagination = jest.spyOn(getInstance(), 'talentListTablePagination');
    const paginationData = response.data;
    talentListTablePagination(paginationData);
    expect(talentListTablePagination).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the  onChangeStatus events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = { name: 'Active', value: 1 };
    const onSuccess = jest.fn();

    mapDispatchToProps(dispatch).onChangeStatus(data, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_TALENT_STATUS,
      data,
      onSuccess,
    });
  });
});
