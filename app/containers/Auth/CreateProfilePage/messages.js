/*
 * CreateProfilePage Messages
 *
 * This contains all the text for the CreateProfilePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.CreateProfilePage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Create your profile',
  },
  subHeadingBasic: {
    id: `${scope}.subHeadingBasic`,
    defaultMessage: 'Basic',
  },
  headingClientProfile: {
    id: `${scope}.headingClientProfile`,
    defaultMessage: 'Create your profile',
  },
  subHeadingPaymentAuthority: {
    id: `${scope}.subHeadingPaymentAuthority`,
    defaultMessage: 'Payment authority',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Create your profile',
  },
  subHeadingAuthorisedPerson: {
    id: `${scope}.subHeadingAuthorisedPerson`,
    defaultMessage: 'Address of authorised person',
  },
  continueButton: {
    id: `${scope}.continueButton`,
    defaultMessage: 'Continue',
  },
  saveLaterButton: {
    id: `${scope}.saveLaterButton`,
    defaultMessage: 'Save for Later',
  },
  backButton: {
    id: `${scope}.backButton`,
    defaultMessage: 'Back',
  },
  subHeadingPersonalAddress: {
    id: `${scope}.subHeadingPersonalAddress`,
    defaultMessage: 'Personal address',
  },
  subHeadingRegistrationType: {
    id: `${scope}.subHeadingRegistrationType`,
    defaultMessage: 'Registration Type',
  },
  labelJobTitle: {
    id: `${scope}.labelJobTitle`,
    defaultMessage: 'Job Title',
  },
  placeholderJobTitle: {
    id: `${scope}.placeholderJobTitle`,
    defaultMessage: 'e.g. Software Engineer',
  },
  labelUnavailabilityToolTip: {
    id: `${scope}.labelUnavailabilityToolTip`,
    defaultMessage:
      'Enter the details of the person (e.g. Director) who is responsible to enter the contract and make payments on the platform',
  },
});
