/*
 * Verification Messages
 * This contains all the text for the Verification component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.Verification';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Verify your email',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Verify your email',
  },
  labelVerificatonCode: {
    id: `${scope}.labelVerificatonCode`,
    defaultMessage: 'Verification Code',
  },
  placeholderVerificatonCode: {
    id: `${scope}.placeholderVerificatonCode`,
    defaultMessage: 'Enter verification code',
  },
  textResendCode: {
    id: `${scope}.textResendCode`,
    defaultMessage: 'Didn’t receive the code?',
  },
  textCheckSpam: {
    id: `${scope}.textCheckSpam`,
    defaultMessage: ' Please check the Spam folder or',
  },
  linkResendCode: {
    id: `${scope}.linkResendCode`,
    defaultMessage: 'Resend in 2 mins',
  },
  linkDifferentEmail: {
    id: `${scope}.linkDifferentEmail`,
    defaultMessage: 'Sign up with a different email',
  },
});
