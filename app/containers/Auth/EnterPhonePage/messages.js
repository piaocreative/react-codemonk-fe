/*
 * EnterPhonePage Messages
 *
 * This contains all the text for the EnterPhonePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.EnterPhonePage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Enter your phone number',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Enter your phone number',
  },
  headingEnterPhone: {
    id: `${scope}.headingEnterPhone`,
    defaultMessage: 'Enter your phone number',
  },
  sendOTPButton: {
    id: `${scope}.sendOTPButton`,
    defaultMessage: 'Send OTP',
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
