/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.Header';

export default defineMessages({
  menuItemMyProfile: {
    id: `${scope}.menuItemMyProfile`,
    defaultMessage: 'My profile',
  },
  menuItemAccountSetting: {
    id: `${scope}.menuItemAccountSetting`,
    defaultMessage: 'Account settings',
  },
  menuItemBackToAdmin: {
    id: `${scope}.menuItemBackToAdmin`,
    defaultMessage: 'Back to admin',
  },
  menuItemLogout: {
    id: `${scope}.menuItemLogout`,
    defaultMessage: 'Log out',
  },
  buttonBuildTeam: {
    id: `${scope}.buttonBuildTeam`,
    defaultMessage: 'Build team',
  },
  menuItemPostBrief: {
    id: `${scope}.menuItemPostBrief`,
    defaultMessage: 'Post a Job Brief',
  },
  menuItemSearchTalent: {
    id: `${scope}.menuItemSearchTalent`,
    defaultMessage: 'Search Talent',
  },
  menuItemHireTalent: {
    id: `${scope}.menuItemHireTalent`,
    defaultMessage: 'Hire talent',
  },
  menuRequestQuote: {
    id: `${scope}.menuRequestQuote`,
    defaultMessage: 'Request Quote',
  },
});
