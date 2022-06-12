/*
 * fieldMessages Messages
 *
 * This contains all the text for the fieldMessages component.
 */

import { defineMessages } from 'react-intl';
export const scope = 'CodeMonk.containers.fieldMessages';

export default defineMessages({
  // talentSignUp
  talentSignupEmail: {
    id: `${scope}.talentSignupEmail`,
    defaultMessage: 'Please enter a valid email address for you to continue',
  },
  talentSignupPassword: {
    id: `${scope}.talentSignupPassword`,
    defaultMessage: 'Your Password must be at least 8 characters long, 1 Upper Case, 1 Lower Case, 1 number & 1 special character',
  },
  // talentLogin
  talentLoginPassword: {
    id: `${scope}.talentLoginPassword`,
    defaultMessage: 'Please enter your password',
  },
  // talentVerificationOTP
  talentVerificationOTP: {
    id: `${scope}.talentVerificationOTP`,
    defaultMessage: 'Please enter a valid 6 digits verification code',
  },
  // talentPersonalDetails
  talentPersonalDetailsProfilePhoto: {
    id: `${scope}.talentPersonalDetailsProfilePhoto`,
    defaultMessage: 'Please upload your most recent photo',
  },
  talentPersonalDetailsProfilePhotoFormat: {
    id: `${scope}.talentPersonalDetailsProfilePhotoFormat`,
    defaultMessage: 'Please upload a valid photo file. Only PNG, JPG and JPEG file format allowed',
  },
  talentPersonalDetailsProfilePhotoSize: {
    id: `${scope}.talentPersonalDetailsProfilePhotoSize`,
    defaultMessage: 'Please upload a valid file. Min 5Kb and maximum 5Mb file is allowed',
  },
  talentPersonalDetailsFirstNameMin: {
    id: `${scope}.talentPersonalDetailsFirstNameMin`,
    defaultMessage: 'Minimum 2 characters are required',
  },
  talentPersonalDetailsFirstNameMax: {
    id: `${scope}.talentPersonalDetailsFirstNameMax`,
    defaultMessage: 'Maximum 30 characters are allowed',
  },

  // clientMessages
});
