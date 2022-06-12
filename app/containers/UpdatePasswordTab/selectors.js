import { createSelector } from 'reselect';
import { initialState } from './reducer';

const updatePasswordForm = state => state.updatePasswordForm || initialState;

const makeSelectOldPassword = () =>
  createSelector(
    updatePasswordForm,
    formState => formState.oldPassword,
  );
const makeSelectPassword = () =>
  createSelector(
    updatePasswordForm,
    formState => formState.password,
  );
const makeSelectConfirmPassword = () =>
  createSelector(
    updatePasswordForm,
    formState => formState.confirmPassword,
  );
export { updatePasswordForm, makeSelectOldPassword, makeSelectPassword, makeSelectConfirmPassword };
