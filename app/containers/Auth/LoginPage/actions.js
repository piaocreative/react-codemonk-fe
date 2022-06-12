/*
 * LoginPage Actions
 */

import { CHANGE_EMAIL, CHANGE_PASSWORD, LOGIN } from './constants';

export function changeEmail(payload) {
  return {
    type: CHANGE_EMAIL,
    payload,
  };
}

export function changePassword(payload) {
  return {
    type: CHANGE_PASSWORD,
    payload,
  };
}

export function login() {
  return {
    type: LOGIN,
  };
}
