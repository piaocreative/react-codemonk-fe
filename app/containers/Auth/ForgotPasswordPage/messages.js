/*
 * ForgotPasswordPage Messages
 *
 * This contains all the text for the ForgotPasswordPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.ForgotPasswordPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Forgot password?',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Forgot password?',
  },
  headingForgotPassword: {
    id: `${scope}.headingForgotPassword`,
    defaultMessage: 'Forgot password?',
  },
  textIntro: {
    id: `${scope}.textIntro`,
    defaultMessage: 'Enter your email to get a link to set up a new password',
  },
  buttonResetLink: {
    id: `${scope}.buttonResetLink`,
    defaultMessage: 'Send me a link',
  },
  textBackTo: {
    id: `${scope}.textBackTo`,
    defaultMessage: 'Back to',
  },
  loginLink: {
    id: `${scope}.loginLink`,
    defaultMessage: 'Login',
  },
});
