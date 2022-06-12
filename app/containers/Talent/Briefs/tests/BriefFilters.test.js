import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { BriefFilters as MainForm } from '../BriefFilters';

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

describe('BriefFilters Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleTalentFiltersOpenModal', () => {
    const handleTalentFiltersOpenModal = jest.spyOn(getInstance(), 'handleTalentFiltersOpenModal');
    handleTalentFiltersOpenModal();
    expect(handleTalentFiltersOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleTalentFiltersCloseModal', () => {
    const handleTalentFiltersCloseModal = jest.spyOn(getInstance(), 'handleTalentFiltersCloseModal');
    handleTalentFiltersCloseModal();
    expect(handleTalentFiltersCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleTalentCheckboxFilterChange', () => {
    const handleTalentCheckboxFilterChange = jest.spyOn(getInstance(), 'handleTalentCheckboxFilterChange');
    handleTalentCheckboxFilterChange('individuals', true, 'teamPrefArray');
    expect(handleTalentCheckboxFilterChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleTalentCheckboxFilterChange with false', () => {
    const handleTalentCheckboxFilterChange = jest.spyOn(getInstance(), 'handleTalentCheckboxFilterChange');
    handleTalentCheckboxFilterChange('individuals', false, 'teamPrefArray');
    expect(handleTalentCheckboxFilterChange).toHaveBeenCalledTimes(1);
  });

  // handleSkillsChange
  test('Testing if handleSkillsChange with false', () => {
    const handleSkillsChange = jest.spyOn(getInstance(), 'handleSkillsChange');
    const e = { label: 'Skill', value: 'Skills' };
    handleSkillsChange(e);
    expect(handleSkillsChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if briefFilterChanged with update', () => {
    const briefFilterChanged = jest.spyOn(getInstance(), 'briefFilterChanged');
    briefFilterChanged('update');
    expect(briefFilterChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if briefFilterChanged with clear', () => {
    const briefFilterChanged = jest.spyOn(getInstance(), 'briefFilterChanged');
    briefFilterChanged('clear');
    expect(briefFilterChanged).toHaveBeenCalledTimes(1);
  });

  test('Testing if briefFilterChanged with else', () => {
    const briefFilterChanged = jest.spyOn(getInstance(), 'briefFilterChanged');
    briefFilterChanged('else');
    expect(briefFilterChanged).toHaveBeenCalledTimes(1);
  });
});
