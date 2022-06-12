/*
 * Referrals Messages
 *
 * This contains all the text for the Referrals component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.Referrals';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Referrals',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Referrals',
  },
  allReferrals: {
    id: `${scope}.allReferrals`,
    defaultMessage: 'All your Referrals',
  },
});
