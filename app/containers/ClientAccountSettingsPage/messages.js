/*
 * ClientAccountSettingsPage Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.ClientAccountSettingsPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Account Settings',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Account Settings',
  },
  editPhoneNumber: {
    id: `${scope}.editPhoneNumber`,
    defaultMessage: 'Edit your phone number',
  },
  tabPhone: {
    id: `${scope}.tabPhone`,
    defaultMessage: 'Phone',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Phone Number',
  },
  btnSendCode: {
    id: `${scope}.btnSendCode`,
    defaultMessage: 'Send code',
  },
  btnVerifyCode: {
    id: `${scope}.btnVerifyCode`,
    defaultMessage: 'Verify',
  },
  otpPlaceholder: {
    id: `${scope}.otpPlaceholder`,
    defaultMessage: 'Enter OTP',
  },
  labelEnterOTPCode: {
    id: `${scope}.labelEnterOTPCode`,
    defaultMessage: 'Enter OTP',
  },
  resendCodeCTA: {
    id: `${scope}.resendCodeCTA`,
    defaultMessage: 'Resend',
  },
  labelPhoneNumber: {
    id: `${scope}.labelPhoneNumber`,
    defaultMessage: 'Phone number',
  },
  placeHolderPhoneNumber: {
    id: `${scope}.placeHolderPhoneNumber`,
    defaultMessage: 'e.g. 9999999999',
  },
});
