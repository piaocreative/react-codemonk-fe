/**
 * ForgotPasswordPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSignup = state => state.signup || initialState;

const makeSelectEmail = () =>
  createSelector(
    selectSignup,
    signupState => signupState.email,
  );

const makeSelectPassword = () =>
  createSelector(
    selectSignup,
    signupState => signupState.password,
  );

const makeSelectReferralVal = () =>
  createSelector(
    selectSignup,
    signupState => signupState.referral,
  );

const makeSelectPrivacyCheck = () =>
  createSelector(
    selectSignup,
    signupState => signupState.privacyCheck,
  );
export { selectSignup, makeSelectEmail, makeSelectPassword, makeSelectPrivacyCheck, makeSelectReferralVal };
