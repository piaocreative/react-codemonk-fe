/**
 * ForgotPasswordPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectVerification = state => state.verificationForm || initialState;

const makeSelectOTP = () =>
  createSelector(
    selectVerification,
    verificationState => verificationState.otp,
  );

export { selectVerification, makeSelectOTP };
