import { toast } from 'react-toastify';
import sha512 from 'sha512';
import base from 'base-64';
import ReactGA from 'react-ga';
import { scroller, animateScroll } from 'react-scroll';
import { TALENT_LOGIN_PAGE_URL, CLIENT_LOGIN_PAGE_URL, ADMIN_LOGIN_PAGE_URL } from 'containers/App/constants';
import history from 'utils/history';
import AuthTokenService from './AuthTokenService';
import StorageService from './StorageService';

/**
 * check user are login or not
 * @author Innovify
 */
export function userExists() {
  if (AuthTokenService.exists()) {
    AuthTokenService.init();
    return true;
  }
  return false;
}

/**
 * call userdetail api
 * @author Innovify
 */
export function authUser() {
  StorageService.set('unAuthorize', true);
}
/**
 * print a notification if page un-mount the component before the notification load
 * @author Innovify
 */

export function showStoredNotification() {
  toast.dismiss();
  const options = {};
  if (StorageService.exists('Notification')) {
    options.type = StorageService.get('NotificationType');
    if (options.type) {
      switch (options.type) {
        case 'success':
          options.className = 'Toast-success';
          break;
        case 'error':
          options.className = 'Toast-error';
          break;
        default:
          options.className = '';
      }
    }
    toast(StorageService.get('Notification'), options);
  }
  StorageService.delete('Notification');
  StorageService.delete('NotificationType');
}

/**
 * get userId
 * @author Innovify
 * @Developer Innovify
 */
export function userId() {
  if (AuthTokenService.exists()) {
    return StorageService.get('user').userId;
  }
  return false;
}

/**
 * Google GA.
 * @author Innovify
 * @Developer Innovify
 */

export function pageView() {
  setTimeout(() => {
    ReactGA.set({ page: window.location.href });
    ReactGA.pageview(window.location.href);
    if (AuthTokenService.exists()) {
      ReactGA.set({ userId: userId() });
    }
  }, 1000);
}

/**
 * print a notification if page un-mount the component before the notification load
 * also support when Google GA adds.
 * @author Innovify
 * @Developer Innovify
 */

export function pageUpdate() {
  pageView();
  animateScroll.scrollToTop();
  showStoredNotification();
}

/**
 * to logout user from system
 * @author Innovify
 * @Developer Innovify
 */
export function logout() {
  AuthTokenService.clear();
  StorageService.clear();
  StorageService.delete('fcmToken');
}

/**
 * password encryption on submit form to server.
 * @author Innovify
 * @Developer Innovify
 */
export function passwordEncrypt(value) {
  const hash = sha512(value);
  return hash.toString('hex');
}

/**
 * Base encode decode.
 * @author Innovify
 * @Developer Innovify
 */
export function baseEncodeDecode(value, encode = false) {
  if (encode) {
    return base.encode(value);
  }
  return base.decode(value);
}

/**
 * User comes first time.
 * @author Innovify
 * @Developer Innovify
 */
export function onBoarding() {
  const user = StorageService.get('user');
  if (user.firstTimeLogin) {
    delete user.firstTimeLogin;
    StorageService.set('user', user);
    return true;
  }
  return false;
}

export function userIcon() {
  let username = 'SC';
  if (StorageService.get('user')) {
    const user = StorageService.get('user');
    username = user.firstName.charAt(0) + user.surname.charAt(0);
  }
  return username;
}

/**
 * get user Roles
 * @author Innovify
 * @Developer Innovify
 */
export function getUserRole() {
  const user = StorageService.get('user');
  return user.userRole;
}

/**
 * get user Details
 * @author Innovify
 * @Developer Innovify
 */
export function getUserDetail() {
  const user = StorageService.get('user');
  if (user) {
    return user;
  }
  return false;
}

/**
 * set location when user click on directly on private url
 * @author Innovify
 * @Developer Innovify
 */
export function setNextLocation(location) {
  StorageService.set('location', location);
  return false;
}

/**
 * get location when user click on directly on private url
 * @author Innovify
 * @Developer Innovify
 */
export function getLocation() {
  if (StorageService.get('location')) {
    return StorageService.get('location');
  }
  return false;
}

/**
 * clear location when user click on directly on private url
 * @author Innovify
 * @Developer Innovify
 */
export function clearLocation() {
  StorageService.delete('location');
  return true;
}

/**
 * scroll to particular element
 * @author Innovify
 * @Developer Innovify
 */
export function scrollToFirstError(fieldName) {
  if (document.querySelectorAll(`[name="${fieldName}"]`).length) {
    scroller.scrollTo(fieldName, { offset: -100, smooth: true });
  }
  return true;
}

/**
 * get user role from the URL
 * @author Innovify
 * @Developer Innovify
 */
export function getUserRoleFromURL() {
  const { pathname } = history.location;
  const filteredPathname = pathname.split('/', 2);
  return filteredPathname[1];
}

export function getUserType() {
  const currentUser = StorageService.get('userType');
  let output = '';
  switch (currentUser) {
    case '1':
      output = 'talent';
      break;
    case '2':
      output = 'client';
      break;
    case '3':
      output = 'agency';
      break;
    case '4':
      output = 'admin';
      break;
    default:
  }
  return output;
}

export function checkCurrectUserPage() {
  const currentUser = getUserType();
  const currentUserPath = getUserRoleFromURL();
  let output = currentUser === currentUserPath;
  if (currentUserPath === 'user') {
    output = true;
  }
  return output;
}

/**
 * get user register type
 * @author Innovify
 * @Developer Innovify
 */
export function getUserRegisterType() {
  const currentRole = StorageService.get('userType');
  const currentRegisterType = StorageService.get('registerType');
  let userRoleType = '';
  if (currentRole === '1' && currentRegisterType === 'freelancer') {
    userRoleType = 'talent';
  } else if (currentRole === '1' && currentRegisterType === 'agency') {
    userRoleType = 'talent_agency';
  } else if (currentRole === '3') {
    userRoleType = 'agency';
  } else if (currentRole === '2') {
    userRoleType = 'client';
  } else {
    userRoleType = 'admin';
  }
  return userRoleType;
}

export const dashboardPathURL = () => {
  let output = '';
  const userRole = getUserRoleFromURL();

  if (userRole === 'talent') {
    output = '/talent';
  } else if (userRole === 'client') {
    output = '/client';
  } else if (userRole === 'admin') {
    output = '/admin/';
  }
  return output;
};

export const dashboardPath = () => {
  let output = '';
  const userType = getUserType();

  if (userType === 'talent') {
    output = '/talent/';
  } else if (userType === 'client') {
    output = '/client/';
  } else if (userType === 'admin') {
    output = '/admin/';
  }
  return output;
};

export const loginPath = () => {
  let output = '';
  const userRole = getUserRoleFromURL();

  if (userRole === 'talent') {
    output = TALENT_LOGIN_PAGE_URL;
  } else if (userRole === 'client') {
    output = CLIENT_LOGIN_PAGE_URL;
  } else if (userRole === 'admin') {
    output = ADMIN_LOGIN_PAGE_URL;
  }
  return output;
};

/**
 *
 * @param {object} options
 * event - Event Name
 */
export const gtm = options => {
  if (options.directGA) {
    ReactGA.event(options);
  } else {
    const dataLayer = window.dataLayer || [];
    dataLayer.push(options);
  }
};

export const proxyLogin = () => {
  let output = '';
  const proxyType = StorageService.get('proxyType');
  if (proxyType) {
    output = StorageService.get('proxyToken');
  }
  return output;
};
