/*
 * ClientProfile Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.ClientProfile';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Your profile',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Your profile',
  },
  headingYourProfile: {
    id: `${scope}.headingYourProfile`,
    defaultMessage: 'Your profile',
  },
  headingEditYourProfile: {
    id: `${scope}.headingEditYourProfile`,
    defaultMessage: 'Edit your profile',
  },
  headingEditCTA: {
    id: `${scope}.headingEditCTA`,
    defaultMessage: 'Edit',
  },
  subHeadingRegistrationType: {
    id: `${scope}.subHeadingRegistrationType`,
    defaultMessage: 'Registration: ',
  },
});
