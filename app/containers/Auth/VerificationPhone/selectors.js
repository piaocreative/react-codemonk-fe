/**
 * clientPhoneOTPVerificationForm selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const clientPhoneOTPVerificationForm = state => state.clientPhoneOTPVerificationForm || initialState;

const makeSelectOTP = () =>
  createSelector(
    clientPhoneOTPVerificationForm,
    state => state.otp,
  );

export { clientPhoneOTPVerificationForm, makeSelectOTP };
