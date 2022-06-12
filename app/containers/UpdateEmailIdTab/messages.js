/*
 * UpdateEmailIdTab Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.UpdateEmailIdTab';

export default defineMessages({
  btnSendCode: {
    id: `${scope}.btnSendCode`,
    defaultMessage: 'Send Code',
  },
  btnVerifyCode: {
    id: `${scope}.btnVerifyCode`,
    defaultMessage: 'Verify',
  },
  labelEnterEmailOTPCode: {
    id: `${scope}.labelEnterEmailOTPCode`,
    defaultMessage: '6-digit verification code',
  },
  emailOtpPlaceholder: {
    id: `${scope}.emailOtpPlaceholder`,
    defaultMessage: 'Enter varification code',
  },
  resendCodeCTA: {
    id: `${scope}.resendCodeCTA`,
    defaultMessage: 'Resend',
  },
});
