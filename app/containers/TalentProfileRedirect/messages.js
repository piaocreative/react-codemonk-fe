/*
 * Talent Profile Messages
 */
import { defineMessages } from 'react-intl';
export const scope = 'CodeMonk.containers.TalentProfile';

export default defineMessages({
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Talent Profile',
  },
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Talent Profile',
  },
  heading: {
    id: `${scope}.heading`,
    defaultMessage: 'Access denied',
  },
  talentProfileHeading: {
    id: `${scope}.talentProfileHeading`,
    defaultMessage: 'Sorry! you are not authorised to view this page.',
  },
  backToHome: {
    id: `${scope}.backToHome`,
    defaultMessage: 'Back to home',
  },
});
