/*
 * VerificationPhone Page Actions
 */

import { VERIFY_OTP, CHANGE_OTP, RESET_OTP, RESEND_PHONE_CODE } from './constants';

/**
 * Verifies OTP
 *
 * @param  {otp} otp The OTP a user enters
 *
 * @return {object}    An action object with a type of SIGN_UP
 */
export function verifyOTP(otp) {
  return {
    type: VERIFY_OTP,
    otp,
  };
}

export function changeOTP(otp) {
  return {
    type: CHANGE_OTP,
    otp,
  };
}
export function resetOTP() {
  return {
    type: RESET_OTP,
  };
}

export function resendPhoneCode() {
  return {
    type: RESEND_PHONE_CODE,
  };
}
