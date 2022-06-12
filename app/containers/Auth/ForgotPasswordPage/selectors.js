/**
 * ForgotPasswordPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const ForgotPasswordForm = state => state.ForgotPasswordForm || initialState;

const makeSelectEmail = () =>
  createSelector(
    ForgotPasswordForm,
    formState => formState.email,
  );
export { ForgotPasswordForm, makeSelectEmail };
