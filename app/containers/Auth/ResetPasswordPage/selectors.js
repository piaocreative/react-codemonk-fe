import { createSelector } from 'reselect';
import { initialState } from './reducer';

const resetPasswordForm = state => state.resetPasswordForm || initialState;

const makeSelectToken = () =>
  createSelector(
    resetPasswordForm,
    formState => formState.token,
  );
const makeSelectPassword = () =>
  createSelector(
    resetPasswordForm,
    formState => formState.password,
  );
const makeSelectConfirmPassword = () =>
  createSelector(
    resetPasswordForm,
    formState => formState.confirmPassword,
  );
export { resetPasswordForm, makeSelectToken, makeSelectPassword, makeSelectConfirmPassword };
