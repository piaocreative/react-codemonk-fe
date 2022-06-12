/*
 * ResetPasswordPage Messages
 *
 * This contains all the text for the ResetPasswordPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.ResetPasswordPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Reset Password',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Reset Password',
  },
  headingResetPassword: {
    id: `${scope}.headingResetPassword`,
    defaultMessage: 'Set up a new password',
  },
  labelNewPassword: {
    id: `${scope}.labelNewPassword`,
    defaultMessage: 'New Password',
  },
  labelConfirmPassword: {
    id: `${scope}.labelConfirmPassword`,
    defaultMessage: 'Confirm Password',
  },
  placeHolderNewPassword: {
    id: `${scope}.placeHolderNewPassword`,
    defaultMessage: 'Enter new password',
  },
  placeHolderRepeatPassword: {
    id: `${scope}.placeHolderRepeatPassword`,
    defaultMessage: 'Repeat new password',
  },
  textBeforeSignupButton: {
    id: `${scope}.textBeforeSignupButton`,
    defaultMessage: 'New to Codemonk? ',
  },
  signupButtonText: {
    id: `${scope}.signupButtonText`,
    defaultMessage: 'Sign up',
  },
  resetPasswordButton: {
    id: `${scope}.resetPasswordButton`,
    defaultMessage: 'Set up this password',
  },
  invalidLink: {
    id: `${scope}.invalidLink`,
    defaultMessage: ' Link is invalid',
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Change password',
  },
});
