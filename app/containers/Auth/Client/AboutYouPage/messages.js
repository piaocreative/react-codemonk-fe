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
    defaultMessage: 'About you',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'About you',
  },
  aboutYou: {
    id: `${scope}.aboutYou`,
    defaultMessage: 'About you',
  },
  aboutYouTagLine: {
    id: `${scope}.aboutYouTagLine`,
    defaultMessage: 'Lets get started with us knowing you better',
  },
  saveLaterButton: {
    id: `${scope}.saveLaterButton`,
    defaultMessage: 'Save for Later',
  },
  continueButton: {
    id: `${scope}.continueButton`,
    defaultMessage: 'Continue',
  },
  labelJobRole: {
    id: `${scope}.labelJobRole`,
    defaultMessage: 'Job role',
  },
});
