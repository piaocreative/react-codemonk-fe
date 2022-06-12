/*
 * AccountSettingsPage Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AccountSettingsPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Account Settings',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Account Settings',
  },
  headingEditCTA: {
    id: `${scope}.headingEditCTA`,
    defaultMessage: 'Edit',
  },
  payoutTab: {
    id: `${scope}.payoutTab`,
    defaultMessage: 'Payout',
  },
});
