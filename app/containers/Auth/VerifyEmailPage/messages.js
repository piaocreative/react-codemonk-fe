/*
 * VerifyEmailPage Messages
 *
 * This contains all the text for the VerifyEmailPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.VerifyEmailPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Check your Email',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Check your Email',
  },
  headingVerifyEmail: {
    id: `${scope}.headingVerifyEmail`,
    defaultMessage: 'Check your Email',
  },
  textIntro: {
    id: `${scope}.textIntro`,
    defaultMessage:
      'A password reset link has been sent to your registered email address. Please check your inbox or spam folder and click on the link sent to reset the password',
  },
  signInButtonText: {
    id: `${scope}.signInButtonText`,
    defaultMessage: 'Login',
  },
});
