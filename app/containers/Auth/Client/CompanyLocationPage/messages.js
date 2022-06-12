/*
 * AboutYouPage Messages
 *
 * This contains all the text for the AboutYouPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AboutYouPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Company locations',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Company locations',
  },
  companyLocations: {
    id: `${scope}.companyLocations`,
    defaultMessage: 'Company locations',
  },
  companyLocationsTagLine: {
    id: `${scope}.companyLocationsTagLine`,
    defaultMessage: 'Add your company locations',
  },
  saveLaterButton: {
    id: `${scope}.saveLaterButton`,
    defaultMessage: 'Save for Later',
  },
  continueButton: {
    id: `${scope}.continueButton`,
    defaultMessage: 'Continue',
  },
  labelAdd: {
    id: `${scope}.labelAdd`,
    defaultMessage: ' Add location',
  },
});
