/*
 * ForgotPasswordPage Actions
 */

import { CHANGE_EMAIL, FORGOT_PASSWORD_SUBMIT } from './constants';

export function changeEmail(payload) {
  return {
    type: CHANGE_EMAIL,
    payload,
  };
}

export function submitForgotPassword() {
  return {
    type: FORGOT_PASSWORD_SUBMIT,
  };
}
