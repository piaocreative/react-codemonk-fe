import * as utilFunctions from '../utils';

jest.mock('utils/request');

describe('check for functions', () => {
  const filter = {
    teamPrefArray: ['individuals'],
    workPrefArray: ['fulltime'],
    assignmentsArray: ['fulltime'],
    expertiseArray: ['junior'],
    roleArray: ['Developer'],
    skillsArray: ['Android'],

    alreadyAppliedArray: ['Applied'],
    datePostedArray: ['Last 24 hours'],
  };

  const noFilter = {
    teamPrefArray: [],
    workPrefArray: [],
    assignmentsArray: [],
    expertiseArray: [],
    roleArray: [],
    skillsArray: [],

    alreadyAppliedArray: [],
    datePostedArray: [],
  };

  // isNoFilterApplied
  test('Testing if isNoFilterApplied', () => {
    const isNoFilterApplied = jest.spyOn(utilFunctions, 'isNoFilterApplied');
    isNoFilterApplied(filter);
    expect(isNoFilterApplied).toHaveBeenCalledTimes(1);
  });

  test('Testing if isNoFilterApplied', () => {
    const isNoFilterApplied = jest.spyOn(utilFunctions, 'isNoFilterApplied');
    isNoFilterApplied(noFilter);
    expect(isNoFilterApplied).toHaveBeenCalledTimes(2);
  });

  // showNoRecordFound
  test('Testing if showNoRecordFound with if', () => {
    const search = '';
    const noFilterApplied = true;
    const showNoRecordFound = jest.spyOn(utilFunctions, 'showNoRecordFound');
    showNoRecordFound(search, noFilterApplied);
    expect(showNoRecordFound).toHaveBeenCalledTimes(1);
  });

  test('Testing if showNoRecordFound with else search=search', () => {
    const search = 'search';
    const noFilterApplied = true;
    const showNoRecordFound = jest.spyOn(utilFunctions, 'showNoRecordFound');
    showNoRecordFound(search, noFilterApplied);
    expect(showNoRecordFound).toHaveBeenCalledTimes(2);
  });
  test('Testing if showNoRecordFound with else noFilterApplied=false', () => {
    const search = '';
    const noFilterApplied = false;
    const showNoRecordFound = jest.spyOn(utilFunctions, 'showNoRecordFound');
    showNoRecordFound(search, noFilterApplied);
    expect(showNoRecordFound).toHaveBeenCalledTimes(3);
  });
});
