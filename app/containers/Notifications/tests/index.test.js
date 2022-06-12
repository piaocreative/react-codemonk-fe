import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Notifications as MainForm } from '../index';

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

  const response = {
    status: 1,
    data: {
      docs: [
        {
          _id: '6009455b1000240fab384d56',
          isRead: 1,
          createdAt: '2021-01-21T07:02:05.089Z',
          notificationType: 'TALENT_ADDED',
          message: 'You have been added to a new Project:  eewewewew',
          userId: '5f0d5f415dec8d0007386665',
        },
        {
          _id: '600929fc1000240fab384d4e',
          isRead: 1,
          createdAt: '2021-01-21T07:02:05.089Z',
          userId: '5f0d5f415dec8d0007386665',
          notificationType: 'BRIEF_ADDED',
          message: 'A new Brief has been just been posted for you to apply',
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
    newBrief: false,
  };

  const responseWithError = {
    status: 0,
    data: {},
    message: 'error',
    newBrief: false,
  };

  test('Testing if loadNotifications', () => {
    const loadNotifications = jest.spyOn(getInstance(), 'loadNotifications');
    loadNotifications();
    expect(loadNotifications).toHaveBeenCalledTimes(1);
  });

  test('Testing if setNotificationDetails with success', () => {
    const setNotificationDetails = jest.spyOn(getInstance(), 'setNotificationDetails');
    setNotificationDetails(response);
    expect(setNotificationDetails).toHaveBeenCalledTimes(1);
  });
  test('Testing if setNotificationDetails with error', () => {
    const setNotificationDetails = jest.spyOn(getInstance(), 'setNotificationDetails');
    setNotificationDetails(responseWithError);
    expect(setNotificationDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if notificationToggle ', () => {
    const notificationToggle = jest.spyOn(getInstance(), 'notificationToggle');
    notificationToggle();
    expect(notificationToggle).toHaveBeenCalledTimes(1);
  });

  test('Testing if makeReadNotification ', () => {
    const makeReadNotification = jest.spyOn(getInstance(), 'makeReadNotification');
    makeReadNotification();
    expect(makeReadNotification).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleNotificationClick ', () => {
    const handleNotificationClick = jest.spyOn(getInstance(), 'handleNotificationClick');
    const id = '600929fc100';
    const link = '/talent/job-briefs';
    handleNotificationClick(id, link);
    expect(handleNotificationClick).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderNotificationCard ', () => {
    const renderNotificationCard = jest.spyOn(getInstance(), 'renderNotificationCard');
    const notification = response.data.docs[0];
    renderNotificationCard(notification);
    expect(renderNotificationCard).toHaveBeenCalledTimes(1);
  });
});
