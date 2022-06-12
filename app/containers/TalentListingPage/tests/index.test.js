import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import { TalentListingPage as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  handleFilterChange: jest.fn(),
  handleSubmit: jest.fn(),
  dispatch: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('TalentListingPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('test setTalentDetails with if', () => {
    const setTalentDetails = jest.spyOn(getInstance(), 'setTalentDetails');
    const response = { status: 1, data: { docs: [] } };

    setTalentDetails(response);
    expect(setTalentDetails).toBeCalled();
  });

  test('test setTalentDetails with else', () => {
    const setTalentDetails = jest.spyOn(getInstance(), 'setTalentDetails');
    const response = { status: 0 };

    setTalentDetails(response);
    expect(setTalentDetails).toBeCalled();
  });

  test('test storeSelectedFilterValue with if keyName=language', () => {
    const modalFilter = {
      assignment: 'all',
      availability: 'all',
      degreeLevel: 'all',
      language: ['all'],
      languageSearch: [{ label: 'All', value: 'all', isChecked: true }],
      location: ['all'],
      teamPreference: 'all',
      workPreference: 'all',
      countrySearch: [{ label: 'All', value: 'all', isChecked: true }],
    };

    StorageService.set('filterObject', JSON.stringify(modalFilter));
    const keyName = 'language';
    const KeyValue = ['all'];

    const wrapper = shallow(<MainForm {...props} />);
    const storeSelectedFilterValue = jest.spyOn(wrapper.instance(), 'storeSelectedFilterValue');
    storeSelectedFilterValue(keyName, KeyValue);
    expect(storeSelectedFilterValue).toBeCalled();
  });

  test('test storeSelectedFilterValue with if keyName=location', () => {
    const modalFilter = {
      assignment: 'all',
      availability: 'all',
      degreeLevel: 'all',
      language: ['all'],
      languageSearch: [{ label: 'All', value: 'all', isChecked: true }],
      location: ['all'],
      teamPreference: 'all',
      workPreference: 'all',
      countrySearch: [{ label: 'All', value: 'all', isChecked: true }],
    };

    StorageService.set('filterObject', JSON.stringify(modalFilter));
    const keyName = 'location';
    const KeyValue = ['all'];

    const wrapper = shallow(<MainForm {...props} />);
    const storeSelectedFilterValue = jest.spyOn(wrapper.instance(), 'storeSelectedFilterValue');
    storeSelectedFilterValue(keyName, KeyValue);
    expect(storeSelectedFilterValue).toBeCalled();
  });

  test('test setReservedFilter with if', () => {
    const pageNumber = 1;
    const setReservedFilter = jest.spyOn(getInstance(), 'setReservedFilter');
    setReservedFilter(pageNumber);
    expect(setReservedFilter).toBeCalled();
  });

  test('test setReservedFilter with else', () => {
    const pageNumber = 1;
    StorageService.delete('filterObject');
    const setReservedFilter = jest.spyOn(getInstance(), 'setReservedFilter');
    setReservedFilter(pageNumber);
    expect(setReservedFilter).toBeCalled();
  });

  test('test handleFilterChange with if', () => {
    const event = {
      target: {
        name: 'test',
        value: 'test',
      },
    };
    const wrapper = shallow(<MainForm {...props} />);
    const handleFilterChange = jest.spyOn(wrapper.instance(), 'handleFilterChange');
    handleFilterChange(event, true);
    expect(handleFilterChange).toBeCalled();
  });

  test('test handleFilterChange with else', () => {
    const event = {
      target: {
        name: 'test',
        value: 'test',
      },
    };
    const wrapper = shallow(<MainForm {...props} />);
    const handleFilterChange = jest.spyOn(wrapper.instance(), 'handleFilterChange');
    handleFilterChange(event);
    expect(handleFilterChange).toBeCalled();
  });

  test('test resetFilter', () => {
    const testFilterObject = { test: 'test' };
    const filterObject = StorageService.get('filterObject', testFilterObject);
    const wrapper = shallow(<MainForm {...props} />);
    const loadTalentProfiles = jest.spyOn(wrapper.instance(), 'loadTalentProfiles');
    wrapper.instance().resetFilter('all', ['test', 'test']);
    wrapper.instance().resetFilter('test', ['test', 'test']);
    wrapper.instance().resetFilter(false, ['test', 'test']);
    wrapper.instance().resetFilter(JSON.parse(filterObject));
    expect(loadTalentProfiles).toBeCalled();
  });

  test('test resetFilter with if all=null and filter=language', () => {
    const modalFilter = {
      assignment: 'all',
      availability: 'all',
      degreeLevel: 'all',
      language: ['all'],
      languageSearch: [{ label: 'All', value: 'all', isChecked: true }],
      location: ['all'],
      teamPreference: 'all',
      workPreference: 'all',
      countrySearch: [{ label: 'All', value: 'all', isChecked: true }],
    };

    StorageService.set('filterObject', JSON.stringify(modalFilter));
    const filterKey = 'language';

    const wrapper = shallow(<MainForm {...props} />);
    const resetFilter = jest.spyOn(wrapper.instance(), 'resetFilter');
    resetFilter(null, filterKey);
    expect(resetFilter).toBeCalled();
  });

  test('test resetFilter with if all=null and filter=location', () => {
    const modalFilter = {
      assignment: 'all',
      availability: 'all',
      degreeLevel: 'all',
      language: ['all'],
      languageSearch: [{ label: 'All', value: 'all', isChecked: true }],
      location: ['all'],
      teamPreference: 'all',
      workPreference: 'all',
      countrySearch: [{ label: 'All', value: 'all', isChecked: true }],
    };

    StorageService.set('filterObject', JSON.stringify(modalFilter));
    const filterKey = 'location';

    const wrapper = shallow(<MainForm {...props} />);
    const resetFilter = jest.spyOn(wrapper.instance(), 'resetFilter');
    resetFilter(null, filterKey);
    expect(resetFilter).toBeCalled();
  });

  test('test resetFilter with if all=null and filtertype not array', () => {
    const modalFilter = {
      assignment: 'all',
      availability: 'all',
      degreeLevel: 'all',
      language: ['all'],
      languageSearch: [{ label: 'All', value: 'all', isChecked: true }],
      location: ['all'],
      teamPreference: 'all',
      workPreference: 'all',
      countrySearch: [{ label: 'All', value: 'all', isChecked: true }],
    };

    StorageService.set('filterObject', JSON.stringify(modalFilter));
    const filterKey = 'availability';

    const wrapper = shallow(<MainForm {...props} />);
    const resetFilter = jest.spyOn(wrapper.instance(), 'resetFilter');
    resetFilter(null, filterKey);
    expect(resetFilter).toBeCalled();
  });

  test('test languageValueChanged', () => {
    const wrapper = shallow(<MainForm {...props} />);
    const handleCheckboxFilterChange = jest.spyOn(wrapper.instance(), 'handleCheckboxFilterChange');
    const languageValueChanged = jest.spyOn(wrapper.instance(), 'languageValueChanged');
    wrapper.setState({ languageList: ['test'], test: ['all'] });
    wrapper.instance().languageValueChanged({ name: ['test'], value: { value: 'test' } });
    expect(handleCheckboxFilterChange).toBeCalled();
    expect(languageValueChanged).toBeCalled();
  });

  test('test countryValueChanged', () => {
    const wrapper = shallow(<MainForm {...props} />);
    const handleCheckboxFilterChange = jest.spyOn(wrapper.instance(), 'handleCheckboxFilterChange');
    const countryValueChanged = jest.spyOn(wrapper.instance(), 'countryValueChanged');
    wrapper.setState({ countryList: ['test'], test: ['all'] });
    wrapper.instance().countryValueChanged({ name: ['test'], value: { value: 'test' } });
    expect(handleCheckboxFilterChange).toBeCalled();
    expect(countryValueChanged).toBeCalled();
  });

  test('Testing if getFilterLabel with filterKey=workPreference', () => {
    const getFilterLabel = jest.spyOn(getInstance(), 'getFilterLabel');
    const filterKey = 'workPreference';
    const value = 'value';
    getFilterLabel(filterKey, value);
    expect(getFilterLabel).toHaveBeenCalledTimes(1);
  });

  test('Testing if getFilterLabel with filterKey=teamPreference', () => {
    const getFilterLabel = jest.spyOn(getInstance(), 'getFilterLabel');
    const filterKey = 'teamPreference';
    const value = 'value';
    getFilterLabel(filterKey, value);
    expect(getFilterLabel).toHaveBeenCalledTimes(1);
  });

  test('Testing if getFilterLabel with filterKey=assignment', () => {
    const getFilterLabel = jest.spyOn(getInstance(), 'getFilterLabel');
    const filterKey = 'assignment';
    const value = 'value';
    getFilterLabel(filterKey, value);
    expect(getFilterLabel).toHaveBeenCalledTimes(1);
  });

  test('Testing if getFilterLabel with filterKey=else', () => {
    const getFilterLabel = jest.spyOn(getInstance(), 'getFilterLabel');
    const filterKey = 'else';
    const value = 'value';
    getFilterLabel(filterKey, value);
    expect(getFilterLabel).toHaveBeenCalledTimes(1);
  });

  test('test handleSortChange', () => {
    const handleSortChange = jest.spyOn(getWrapper().instance(), 'handleSortChange');
    const sort = 'aToZ';
    handleSortChange(sort);
    expect(handleSortChange).toBeCalled();
  });

  test('test handleMultiSelectChange with isModel = true', () => {
    const handleMultiSelectChange = jest.spyOn(getInstance(), 'handleMultiSelectChange');
    const e = [{ name: 'Android', value: 'Android' }];
    const cb = jest.fn();
    const isModel = true;
    handleMultiSelectChange(e, cb, isModel);
    expect(handleMultiSelectChange).toBeCalled();
  });

  test('test handleMultiSelectChange with isModel = false', () => {
    const handleMultiSelectChange = jest.spyOn(getInstance(), 'handleMultiSelectChange');
    const e = [{ name: 'Android', value: 'Android' }];
    const cb = jest.fn();
    const isModel = false;
    handleMultiSelectChange(e, cb, isModel);
    expect(handleMultiSelectChange).toBeCalled();
  });

  test('Testing if filterChanged with type=update', () => {
    const filterChanged = jest.spyOn(getInstance(), 'filterChanged');
    const type = 'update';
    filterChanged(type);
    expect(filterChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if filterChanged with type=clear', () => {
    const filterChanged = jest.spyOn(getInstance(), 'filterChanged');
    const type = 'clear';
    filterChanged(type);
    expect(filterChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if filterChanged with type=else', () => {
    const filterChanged = jest.spyOn(getInstance(), 'filterChanged');
    const type = 'else';
    filterChanged(type);
    expect(filterChanged).toHaveBeenCalledTimes(1);
  });

  test('test handleFiltersOpenModal', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ showFiltersModal: false });
    wrapper.instance().handleFiltersOpenModal();
    expect(wrapper.state().showFiltersModal).toEqual(true);
  });
});
