/**
 * Test injectors
 */

// import sha512 from 'sha512';
import base from 'base-64';
import StorageService from '../StorageService';
import {
  userExists,
  // passwordEncrypt,
  baseEncodeDecode,
  onBoarding,
  showStoredNotification,
  userIcon,
  logout,
  getUserRole,
  userId,
  setNextLocation,
  getLocation,
  clearLocation,
  scrollToFirstError,
  pageUpdate,
  // pageView,
} from '../Helper';

describe('Helper', () => {
  it('should userExists', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token);
    expect(userExists()).toEqual(true);
  });
  it('should value exsits in localstorage', () => {
    StorageService.clear();
    expect(userExists()).toEqual(false);
  });
  it('should showStoredNotification', () => {
    StorageService.set('NotificationType', 'success');
    StorageService.set('Notification', 'logout sucessfully');
    showStoredNotification();
    expect(StorageService.exists('Notification')).toEqual(false);
  });
  it('should showStoredNotification', () => {
    StorageService.set('NotificationType', 'error');
    StorageService.set('Notification', 'logout sucessfully');
    showStoredNotification();
    expect(StorageService.exists('Notification')).toEqual(false);
  });
  it('should logout', () => {
    StorageService.set('NotificationType', 'error');
    StorageService.set('Notification', 'logout sucessfully');
    const token = 'testbyankit';
    StorageService.set('jwtToken', token);
    logout();
    expect(StorageService.exists('jwtToken')).toEqual(false);
  });
  /* it('should passwordEncrypt', () => {
    const token = 'test';
    const hash = sha512(token).toString('hex');
    expect(passwordEncrypt(token)).toEqual(hash);
  }); */

  it('should encode', () => {
    const token = 'testbyankit';
    const hash = base.encode(token);
    expect(baseEncodeDecode(token, true)).toEqual(hash);
  });

  it('should decode', () => {
    const token = 'testbyankit';
    const baseencode = 'dGVzdGJ5YW5raXQ=';
    expect(baseEncodeDecode(baseencode)).toEqual(token);
  });

  it('should check onBoarding', () => {
    const token = {
      firstName: 'Ankit',
      surname: 'Ankit',
      email: 'ankit50@mailinator.com',
      username: 'ankit50',
      userId: '1',
      status: 'pending',
      profilePicture: '',
      token: 'Ankit',
      firstTimeLogin: true,
    };
    StorageService.set('user', token);
    expect(onBoarding()).toEqual(true);
  });
  it('should check onBoarding', () => {
    const token = {
      firstName: 'Ankit',
      surname: 'Ankit',
      email: 'ankit50@mailinator.com',
      username: 'ankit50',
      userId: '1',
      status: 'pending',
      profilePicture: '',
      token: 'Ankit',
    };
    StorageService.set('user', token);
    expect(onBoarding()).toEqual(false);
  });
  it('should usericon', () => {
    const token = {
      firstName: 'Ankit',
      surname: 'Ankit',
      email: 'ankit50@mailinator.com',
      username: 'ankit50',
      userId: '1',
      status: 'pending',
      profilePicture: '',
      token: 'Ankit',
      userRole: 'user',
    };
    StorageService.set('user', token);
    const baseEncode = 'AA';
    expect(userIcon()).toEqual(baseEncode);
  });
  it('should usericon', () => {
    StorageService.clear();
    const baseEncode = 'SC';
    expect(userIcon()).toEqual(baseEncode);
  });
  it('should getUserRole', () => {
    const token = {
      firstName: 'Ankit',
      surname: 'Ankit',
      email: 'ankit50@mailinator.com',
      username: 'ankit50',
      userId: '1',
      status: 'pending',
      profilePicture: '',
      token: 'Ankit',
      userRole: 'user',
    };
    StorageService.set('user', token);
    expect(getUserRole()).toEqual('user');
  });
  it('should userId', () => {
    const user = {
      firstName: 'Ankit',
      surname: 'Ankit',
      email: 'ankit50@mailinator.com',
      username: 'ankit50',
      userId: '1',
      status: 'pending',
      profilePicture: '',
      token: 'Ankit',
      userRole: 'user',
    };
    const token = 'testbyankit';
    StorageService.set('jwtToken', token);
    StorageService.set('user', user);
    expect(userId()).toEqual('1');
  });
  /* it('should pageView', () => {
    expect(pageView()).toEqual();
  });
  it('should pageView with user', () => {
    const token = 'testbyankit';
    StorageService.set('jwtToken', token);
    expect(pageView()).toEqual();
  }); */
  it('should pageUpdate', () => {
    expect(pageUpdate()).toEqual();
  });
  it('should userId', () => {
    StorageService.clear();
    expect(userId()).toEqual(false);
  });
  it('should setNextLocation', () => {
    const token = 'location';
    StorageService.set('location', token);
    expect(setNextLocation(token)).toEqual(false);
  });
  it('should getLocation', () => {
    const token = 'location';
    StorageService.set('location', token);
    expect(getLocation()).toEqual(StorageService.get('location'));
  });
  it('should getLocation', () => {
    StorageService.clear();
    expect(getLocation()).toEqual(false);
  });
  it('should getLocation', () => {
    const token = 'location';
    StorageService.set('location', token);
    expect(clearLocation()).toEqual(true);
  });

  it('should scrollToFirstError', () => {
    expect(scrollToFirstError('ankit')).toEqual(true);
  });
});
