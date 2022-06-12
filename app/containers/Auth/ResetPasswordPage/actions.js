/*
 * ResetPasswordPage Actions
 */

import { CHANGE_TOKEN, CHANGE_PASSWORD, CHANGE_CONFIRM_PASSWORD, RESET_PASSWORD } from './constants';

export function changeToken(payload) {
  return {
    type: CHANGE_TOKEN,
    payload,
  };
}
export function changePassword(payload) {
  return {
    type: CHANGE_PASSWORD,
    payload,
  };
}
export function changeConfirmPassword(payload) {
  return {
    type: CHANGE_CONFIRM_PASSWORD,
    payload,
  };
}

export function submitResetPassword() {
  return {
    type: RESET_PASSWORD,
  };
}
