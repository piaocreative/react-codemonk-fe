/*
 * UpdatePasswordPage Actions
 */

import { CHANGE_OLD_PASSWORD, CHANGE_PASSWORD, CHANGE_CONFIRM_PASSWORD, CHANGE_TALENT_PASSWORD } from './constants';

export function changeOldPassword(payload) {
  return {
    type: CHANGE_OLD_PASSWORD,
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

export function submitTalentPassword() {
  return {
    type: CHANGE_TALENT_PASSWORD,
  };
}
