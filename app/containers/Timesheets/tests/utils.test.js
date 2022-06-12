import * as functions from '../utils';

jest.mock('utils/request');

describe('test functions', () => {
  test('Testing if getDayWorkClass with 0.25', () => {
    const getDayWorkClass = jest.spyOn(functions, 'getDayWorkClass');
    const howMuchWorked = 0.25;
    const output = getDayWorkClass(howMuchWorked);
    const test = 'semi-quarter-circle';
    expect(output).toEqual(test);
  });

  test('Testing if getDayWorkClass with 0.5', () => {
    const getDayWorkClass = jest.spyOn(functions, 'getDayWorkClass');
    const howMuchWorked = 0.5;
    const output = getDayWorkClass(howMuchWorked);
    const test = 'half-circle';
    expect(output).toEqual(test);
  });

  test('Testing if getDayWorkClass with 0.75', () => {
    const getDayWorkClass = jest.spyOn(functions, 'getDayWorkClass');
    const howMuchWorked = 0.75;
    const output = getDayWorkClass(howMuchWorked);
    const test = 'quarter-circle';
    expect(output).toEqual(test);
  });

  test('Testing if getDayWorkClass with 1', () => {
    const getDayWorkClass = jest.spyOn(functions, 'getDayWorkClass');
    const howMuchWorked = 1;
    const output = getDayWorkClass(howMuchWorked);
    const test = 'active';
    expect(output).toEqual(test);
  });
  test('Testing if getDayWorkClass with 2', () => {
    const getDayWorkClass = jest.spyOn(functions, 'getDayWorkClass');
    const howMuchWorked = 2;
    const output = getDayWorkClass(howMuchWorked);
    const test = '';
    expect(output).toEqual(test);
  });

  // weekStart
  test('for sortUrl with sort weekStart asc', () => {
    const sort = { column: 'weekStart', sortDirection: 'asc' };
    const val = { dateStart: 1, _id: 1 };
    const url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort weekStart desc', () => {
    const sort = { column: 'weekStart', sortDirection: 'desc' };
    const val = { dateStart: -1, _id: -1 };
    const url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  // project
  test('for sortUrl with sort project asc', () => {
    const sort = { column: 'project', sortDirection: 'asc' };
    const val = { projectName: 1, _id: 1 };
    const url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort project desc', () => {
    const sort = { column: 'project', sortDirection: 'desc' };
    const val = { projectName: -1, _id: -1 };
    const url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  // sort timesheetId
  test('for sortUrl with sort timesheetId asc', () => {
    const sort = { column: 'timesheetId', sortDirection: 'asc' };
    const val = { _id: 1 };
    const url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort timesheetId desc', () => {
    const sort = { column: 'timesheetId', sortDirection: 'desc' };
    const val = { _id: -1 };
    const url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  // sort talentShortName
  test('for sortUrl with sort talentShortName asc', () => {
    const sort = { column: 'talentShortName', sortDirection: 'asc' };
    const val = { talentShortName: 1, _id: 1 };
    const url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort talentShortName desc', () => {
    const sort = { column: 'talentShortName', sortDirection: 'desc' };
    const val = { talentShortName: -1, _id: -1 };
    const url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  // sort clientName
  // userType 1
  test('for sortUrl with sort clientName asc', () => {
    const sort = { column: 'clientName', sortDirection: 'asc' };
    const val = { clientName: 1, _id: 1 };
    const url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort clientName desc', () => {
    const sort = { column: 'clientName', sortDirection: 'desc' };
    const val = { clientName: -1, _id: -1 };
    const url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  // sort default
  // userType 1
  test('for sortUrl with sort default asc', () => {
    const sort = { column: '', sortDirection: 'asc' };
    const url = '';
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort default desc', () => {
    const sort = { column: '', sortDirection: 'desc' };
    const url = '';
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  // timesheetPageFilter
  test('Testing if timesheetPageFilter userType=1', () => {
    const timesheetPageFilter = jest.spyOn(functions, 'timesheetPageFilter');
    const userType = '1';
    timesheetPageFilter(userType);
    expect(timesheetPageFilter).toHaveBeenCalledTimes(1);
  });
  test('Testing if timesheetPageFilter userType=2', () => {
    const timesheetPageFilter = jest.spyOn(functions, 'timesheetPageFilter');
    const userType = '2';
    timesheetPageFilter(userType);
    expect(timesheetPageFilter).toHaveBeenCalledTimes(2);
  });
  test('Testing if timesheetPageFilter userType=3', () => {
    const timesheetPageFilter = jest.spyOn(functions, 'timesheetPageFilter');
    const userType = '3';
    timesheetPageFilter(userType);
    expect(timesheetPageFilter).toHaveBeenCalledTimes(3);
  });
  test('Testing if timesheetPageFilter userType=4', () => {
    const timesheetPageFilter = jest.spyOn(functions, 'timesheetPageFilter');
    const userType = '4';
    timesheetPageFilter(userType);
    expect(timesheetPageFilter).toHaveBeenCalledTimes(4);
  });
  test('Testing if timesheetPageFilter userType=default', () => {
    const timesheetPageFilter = jest.spyOn(functions, 'timesheetPageFilter');
    const userType = 'default';
    timesheetPageFilter(userType);
    expect(timesheetPageFilter).toHaveBeenCalledTimes(5);
  });

  // projectDetailsPageFilters
  test('Testing if projectDetailsPageFilters userType=1', () => {
    const projectDetailsPageFilters = jest.spyOn(functions, 'projectDetailsPageFilters');
    const userType = '1';
    projectDetailsPageFilters(userType);
    expect(projectDetailsPageFilters).toHaveBeenCalledTimes(1);
  });
  test('Testing if projectDetailsPageFilters userType=2', () => {
    const projectDetailsPageFilters = jest.spyOn(functions, 'projectDetailsPageFilters');
    const userType = '2';
    projectDetailsPageFilters(userType);
    expect(projectDetailsPageFilters).toHaveBeenCalledTimes(2);
  });
  test('Testing if projectDetailsPageFilters userType=3', () => {
    const projectDetailsPageFilters = jest.spyOn(functions, 'projectDetailsPageFilters');
    const userType = '3';
    projectDetailsPageFilters(userType);
    expect(projectDetailsPageFilters).toHaveBeenCalledTimes(3);
  });
  test('Testing if projectDetailsPageFilters userType=4', () => {
    const projectDetailsPageFilters = jest.spyOn(functions, 'projectDetailsPageFilters');
    const userType = '4';
    projectDetailsPageFilters(userType);
    expect(projectDetailsPageFilters).toHaveBeenCalledTimes(4);
  });

  test('Testing if projectDetailsPageFilters userType=default', () => {
    const projectDetailsPageFilters = jest.spyOn(functions, 'projectDetailsPageFilters');
    const userType = 'default';
    projectDetailsPageFilters(userType);
    expect(projectDetailsPageFilters).toHaveBeenCalledTimes(5);
  });

  // timesheetFilter
  test('Testing if timesheetFilter with projectDetailsPage true', () => {
    const timesheetFilter = jest.spyOn(functions, 'timesheetFilter');
    const userType = '1';
    const projectDetailsPage = true;
    timesheetFilter(userType, projectDetailsPage);
    expect(timesheetFilter).toHaveBeenCalledTimes(1);
  });
  test('Testing if timesheetFilter with projectDetailsPage true', () => {
    const timesheetFilter = jest.spyOn(functions, 'timesheetFilter');
    const userType = '1';
    timesheetFilter(userType);
    expect(timesheetFilter).toHaveBeenCalledTimes(2);
  });

  test('Testing if getShortName projectDetailsPage = true', () => {
    const getShortName = jest.spyOn(functions, 'getShortName');
    const projectDetailsPage = true;
    const user = '2';
    const projectID = 'abcd';
    const talentId = 'abcd';
    const talentShortName = 'Talent';
    getShortName(projectDetailsPage, user, projectID, talentId, talentShortName);
    expect(getShortName).toHaveBeenCalledTimes(1);
  });

  test('Testing if getShortName projectDetailsPage = false', () => {
    const getShortName = jest.spyOn(functions, 'getShortName');
    const projectDetailsPage = false;
    const user = '4';
    const projectID = 'abcd';
    const talentId = 'abcd';
    const talentShortName = 'Talent';
    getShortName(projectDetailsPage, user, projectID, talentId, talentShortName);
    expect(getShortName).toHaveBeenCalledTimes(2);
  });

  test('Testing if getShortName user = else', () => {
    const getShortName = jest.spyOn(functions, 'getShortName');
    const projectDetailsPage = false;
    const user = '1';
    const projectID = 'abcd';
    const talentId = 'abcd';
    const talentShortName = 'Talent';
    const profilePicture = 'image.png';
    getShortName(projectDetailsPage, user, projectID, talentId, talentShortName, profilePicture);
    expect(getShortName).toHaveBeenCalledTimes(3);
  });
});
