/*
 * SignUp Page Actions
 */

import { SIGN_UP, SIGN_UP_EMAIL, SIGN_UP_PASSWORD, CHANGE_PRIVACY_POLICY, REFERRAL } from './constants';

export function signUpEmail(email) {
  return {
    type: SIGN_UP_EMAIL,
    email,
  };
}

export function signUpPassword(password) {
  return {
    type: SIGN_UP_PASSWORD,
    password,
  };
}

export function changePrivacyPolicy(payload) {
  return {
    type: CHANGE_PRIVACY_POLICY,
    payload,
  };
}

export function signUpReferral(referral) {
  return {
    type: REFERRAL,
    referral,
  };
}

export function signUp(agencyTalent, talentToken) {
  return {
    type: SIGN_UP,
    agencyTalent,
    talentToken,
  };
}
