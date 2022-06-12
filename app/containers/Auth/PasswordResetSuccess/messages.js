/*
 * PasswordResetSuccess Messages
 *
 * This contains all the text for the PasswordResetSuccess component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.PasswordResetSuccess';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Password Changed!',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Password Changed!',
  },
  headingPasswordChanged: {
    id: `${scope}.headingPasswordChanged`,
    defaultMessage: 'Password Changed!',
  },
  textIntro: {
    id: `${scope}.textIntro`,
    defaultMessage: 'Your password has successfully been changed! Login to your account.',
  },
  signInButtonText: {
    id: `${scope}.signInButtonText`,
    defaultMessage: 'Login',
  },
});
