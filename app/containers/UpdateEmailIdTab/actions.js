/*
 * UpdateEmailTab Actions
 */

import { SEND_CODE, VERIFY_CODE, PASSWORD } from './constants';

export function sendEmailCode(payload, data, onSuccess) {
  return {
    type: SEND_CODE,
    payload,
    data,
    onSuccess,
  };
}

export function changePassword(payload, data, onSuccess) {
  return {
    type: PASSWORD,
    payload,
    data,
    onSuccess,
  };
}

export function verifyCode(data, onSuccess) {
  return {
    type: VERIFY_CODE,
    data,
    onSuccess,
  };
}
