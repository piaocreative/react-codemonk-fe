/*
 * VerificationPhone Messages
 * This contains all the text for the VerificationPhone component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.VerificationPhone';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Verify your Phone',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Verify your Phone',
  },
  headingVerification: {
    id: `${scope}.headingVerification`,
    defaultMessage: 'Verify your Phone',
  },
  labelVerificatonCode: {
    id: `${scope}.labelVerificatonCode`,
    defaultMessage: 'Enter OTP',
  },
  textResendCode: {
    id: `${scope}.textResendCode`,
    defaultMessage: 'Didn’t receive the OTP?',
  },
  linkResendCode: {
    id: `${scope}.linkResendCode`,
    defaultMessage: 'Resend',
  },
  linkDifferentPhone: {
    id: `${scope}.linkDifferentPhone`,
    defaultMessage: 'Sign up with a different phone number',
  },
  placeholderPhoneOTP: {
    id: `${scope}.placeholderPhoneOTP`,
    defaultMessage: 'Enter OTP',
  },
});
