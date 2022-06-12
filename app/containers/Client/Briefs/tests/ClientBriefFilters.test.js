import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { ClientBriefFilters as MainForm } from '../ClientBriefFilters';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  handleFilterChanged: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ClientBriefFilters Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleFiltersOpenModal', () => {
    const handleFiltersOpenModal = jest.spyOn(getInstance(), 'handleFiltersOpenModal');
    handleFiltersOpenModal();
    expect(handleFiltersOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleFiltersCloseModal', () => {
    const handleFiltersCloseModal = jest.spyOn(getInstance(), 'handleFiltersCloseModal');
    handleFiltersCloseModal();
    expect(handleFiltersCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleCheckboxFilterChange', () => {
    const handleCheckboxFilterChange = jest.spyOn(getInstance(), 'handleCheckboxFilterChange');
    handleCheckboxFilterChange('individuals', true, 'teamPrefArray');
    expect(handleCheckboxFilterChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleCheckboxFilterChange with false', () => {
    const handleCheckboxFilterChange = jest.spyOn(getInstance(), 'handleCheckboxFilterChange');
    handleCheckboxFilterChange('individuals', false, 'teamPrefArray');
    expect(handleCheckboxFilterChange).toHaveBeenCalledTimes(1);
  });

  // handleSkillsChange
  test('Testing if handleSkillsChange with false', () => {
    const handleSkillsChange = jest.spyOn(getInstance(), 'handleSkillsChange');
    const e = { label: 'Skill', value: 'Skills' };
    handleSkillsChange(e);
    expect(handleSkillsChange).toHaveBeenCalledTimes(1);
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
});
