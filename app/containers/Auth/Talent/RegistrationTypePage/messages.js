/*
 * RegistrationTypePage Messages
 *
 * This contains all the text for the RegistrationTypePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.RegistrationTypePage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Create your profile',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Create your profile',
  },
  headingRegistrationTypeProfile: {
    id: `${scope}.headingRegistrationTypeProfile`,
    defaultMessage: 'Create your profile',
  },
  subHeadingRegistrationType: {
    id: `${scope}.subHeadingRegistrationType`,
    defaultMessage: 'Registration Type',
  },
  continueButton: {
    id: `${scope}.continueButton`,
    defaultMessage: 'Continue',
  },
  saveLaterButton: {
    id: `${scope}.saveLaterButton`,
    defaultMessage: 'Save for Later',
  },
});
