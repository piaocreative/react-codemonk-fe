import { textFileIcon, projectsIcon, calendarWithTimeIcon, quotesIcon } from 'containers/App/constants';
import * as functions from '../utils';

jest.mock('utils/request');

describe('test functions', () => {
  test('Testing if notificationTimeAgo', () => {
    const notificationTimeAgo = jest.spyOn(functions, 'notificationTimeAgo');
    const createdAt = new Date();
    notificationTimeAgo(createdAt);
    expect(notificationTimeAgo).toHaveBeenCalledTimes(1);
  });

  // talentNotficationRedirectTo
  test('Testing if talentNotficationRedirectTo with BRIEF_ADDED', () => {
    const talentNotficationRedirectTo = jest.spyOn(functions, 'talentNotficationRedirectTo');
    const notificationType = 'BRIEF_ADDED';
    const test = talentNotficationRedirectTo(notificationType);
    const output = { link: '/talent/job-briefs', icon: textFileIcon, subTitle: 'Briefs' };
    expect(test).toEqual(output);
  });
  test('Testing if talentNotficationRedirectTo with TALENT_ADDED', () => {
    const talentNotficationRedirectTo = jest.spyOn(functions, 'talentNotficationRedirectTo');
    const notificationType = 'TALENT_ADDED';
    const test = talentNotficationRedirectTo(notificationType);
    const output = { link: '/talent/my-projects', icon: projectsIcon, subTitle: 'Projects' };
    expect(test).toEqual(output);
  });
  test('Testing if talentNotficationRedirectTo with TIMESHEET_APPROVED', () => {
    const talentNotficationRedirectTo = jest.spyOn(functions, 'talentNotficationRedirectTo');
    const notificationType = 'TIMESHEET_APPROVED';
    const test = talentNotficationRedirectTo(notificationType);
    const output = { link: '/talent/timesheets', icon: calendarWithTimeIcon, subTitle: 'Timesheets' };
    expect(test).toEqual(output);
  });
  test('Testing if talentNotficationRedirectTo with TIMESHEET_INREVIEW', () => {
    const talentNotficationRedirectTo = jest.spyOn(functions, 'talentNotficationRedirectTo');
    const notificationType = 'TIMESHEET_INREVIEW';
    const test = talentNotficationRedirectTo(notificationType);
    const output = { link: '/talent/timesheets', icon: calendarWithTimeIcon, subTitle: 'Timesheets' };
    expect(test).toEqual(output);
  });
  test('Testing if talentNotficationRedirectTo with TIMESHEET_SETTELED', () => {
    const talentNotficationRedirectTo = jest.spyOn(functions, 'talentNotficationRedirectTo');
    const notificationType = 'TIMESHEET_SETTELED';
    const test = talentNotficationRedirectTo(notificationType);
    const output = { link: '/talent/timesheets', icon: calendarWithTimeIcon, subTitle: 'Timesheets' };
    expect(test).toEqual(output);
  });
  test('Testing if talentNotficationRedirectTo with DEFAULT', () => {
    const talentNotficationRedirectTo = jest.spyOn(functions, 'talentNotficationRedirectTo');
    const notificationType = 'DEFAULT';
    const test = talentNotficationRedirectTo(notificationType);
    const output = { link: '', icon: '', subTitle: '' };
    expect(test).toEqual(output);
  });

  // agencyNotficationRedirectTo
  test('Testing if agencyNotficationRedirectTo with NEW_QUOTE', () => {
    const agencyNotficationRedirectTo = jest.spyOn(functions, 'agencyNotficationRedirectTo');
    const notificationType = 'NEW_QUOTE';
    const test = agencyNotficationRedirectTo(notificationType);
    const output = { link: '/talent/quotes', icon: quotesIcon, subTitle: 'Quotes' };
    expect(test).toEqual(output);
  });
  test('Testing if agencyNotficationRedirectTo with TALENT_ADDED', () => {
    const agencyNotficationRedirectTo = jest.spyOn(functions, 'agencyNotficationRedirectTo');
    const notificationType = 'TALENT_ADDED';
    const test = agencyNotficationRedirectTo(notificationType);
    const output = { link: '/talent/agency-projects', icon: projectsIcon, subTitle: 'Projects' };
    expect(test).toEqual(output);
  });
  test('Testing if agencyNotficationRedirectTo with TIMESHEET_SUBMIT', () => {
    const agencyNotficationRedirectTo = jest.spyOn(functions, 'agencyNotficationRedirectTo');
    const notificationType = 'TIMESHEET_SUBMIT';
    const test = agencyNotficationRedirectTo(notificationType);
    const output = { link: '/talent/timesheets', icon: calendarWithTimeIcon, subTitle: 'Timesheets' };
    expect(test).toEqual(output);
  });
  test('Testing if agencyNotficationRedirectTo with TIMESHEET_INREVIEW', () => {
    const agencyNotficationRedirectTo = jest.spyOn(functions, 'agencyNotficationRedirectTo');
    const notificationType = 'TIMESHEET_INREVIEW';
    const test = agencyNotficationRedirectTo(notificationType);
    const output = { link: '/talent/timesheets', icon: calendarWithTimeIcon, subTitle: 'Timesheets' };
    expect(test).toEqual(output);
  });
  test('Testing if agencyNotficationRedirectTo with TIMESHEET_APPROVED', () => {
    const agencyNotficationRedirectTo = jest.spyOn(functions, 'agencyNotficationRedirectTo');
    const notificationType = 'TIMESHEET_APPROVED';
    const test = agencyNotficationRedirectTo(notificationType);
    const output = { link: '/talent/timesheets', icon: calendarWithTimeIcon, subTitle: 'Timesheets' };
    expect(test).toEqual(output);
  });
  test('Testing if agencyNotficationRedirectTo with TIMESHEET_SETTELED', () => {
    const agencyNotficationRedirectTo = jest.spyOn(functions, 'agencyNotficationRedirectTo');
    const notificationType = 'TIMESHEET_SETTELED';
    const test = agencyNotficationRedirectTo(notificationType);
    const output = { link: '/talent/timesheets', icon: calendarWithTimeIcon, subTitle: 'Timesheets' };
    expect(test).toEqual(output);
  });
  test('Testing if agencyNotficationRedirectTo with DEFAULT', () => {
    const agencyNotficationRedirectTo = jest.spyOn(functions, 'agencyNotficationRedirectTo');
    const notificationType = 'DEFAULT';
    const test = agencyNotficationRedirectTo(notificationType);
    const output = { link: '', icon: '', subTitle: '' };
    expect(test).toEqual(output);
  });

  // clientNotficationRedirectTo
  test('Testing if clientNotficationRedirectTo with TALENT_ADDED', () => {
    const clientNotficationRedirectTo = jest.spyOn(functions, 'clientNotficationRedirectTo');
    const notificationType = 'TALENT_ADDED';
    const test = clientNotficationRedirectTo(notificationType);
    const output = { link: '/client/projects', icon: projectsIcon, subTitle: 'Projects' };
    expect(test).toEqual(output);
  });
  test('Testing if clientNotficationRedirectTo with TIMESHEET_SUBMIT', () => {
    const clientNotficationRedirectTo = jest.spyOn(functions, 'clientNotficationRedirectTo');
    const notificationType = 'TIMESHEET_SUBMIT';
    const test = clientNotficationRedirectTo(notificationType);
    const output = { link: '/client/timesheets', icon: calendarWithTimeIcon, subTitle: 'Timesheets' };
    expect(test).toEqual(output);
  });
  test('Testing if clientNotficationRedirectTo with DEFAULT', () => {
    const clientNotficationRedirectTo = jest.spyOn(functions, 'clientNotficationRedirectTo');
    const notificationType = 'DEFAULT';
    const test = clientNotficationRedirectTo(notificationType);
    const output = { link: '', icon: '', subTitle: '' };
    expect(test).toEqual(output);
  });

  // notificationRedirectTo
  test('Testing if notificationRedirectTo with userType=1', () => {
    const notificationRedirectTo = jest.spyOn(functions, 'notificationRedirectTo');
    const userType = '1';
    const notificationType = 'TALENT_ADDED';
    notificationRedirectTo(userType, notificationType);
    expect(notificationRedirectTo).toHaveBeenCalledTimes(1);
  });
  test('Testing if notificationRedirectTo with userType=2', () => {
    const notificationRedirectTo = jest.spyOn(functions, 'notificationRedirectTo');
    const userType = '2';
    const notificationType = 'TALENT_ADDED';
    notificationRedirectTo(userType, notificationType);
    expect(notificationRedirectTo).toHaveBeenCalledTimes(2);
  });
  test('Testing if notificationRedirectTo with userType=3', () => {
    const notificationRedirectTo = jest.spyOn(functions, 'notificationRedirectTo');
    const userType = '3';
    const notificationType = 'TALENT_ADDED';
    notificationRedirectTo(userType, notificationType);
    expect(notificationRedirectTo).toHaveBeenCalledTimes(3);
  });
  test('Testing if notificationRedirectTo with userType=0', () => {
    const notificationRedirectTo = jest.spyOn(functions, 'notificationRedirectTo');
    const userType = '0';
    const notificationType = 'TALENT_ADDED';
    notificationRedirectTo(userType, notificationType);
    expect(notificationRedirectTo).toHaveBeenCalledTimes(4);
  });
});
