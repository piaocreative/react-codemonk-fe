/*
 * ProfessionalDetails Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.Preferences';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Preferences',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Preferences',
  },
  headingPreferences: {
    id: `${scope}.headingPreferences`,
    defaultMessage: 'Preferences',
  },
  preferencesTagLine: {
    id: `${scope}.preferencesTagLine`,
    defaultMessage:
      'Please select your preferred project, company and work setting for us to better match you with relevant opportunities.',
  },

  labelIndividual: {
    id: `${scope}.labelIndividual`,
    defaultMessage: 'Individuals',
  },
  labelSmallTeam: {
    id: `${scope}.labelSmallTeam`,
    defaultMessage: 'Small team (<6)',
  },
  labelLargeTeam: {
    id: `${scope}.labelLargeTeam`,
    defaultMessage: 'Large Team (7 - 12)',
  },
  labelXLargeTeam: {
    id: `${scope}.labelXLargeTeam`,
    defaultMessage: 'X-Large Team (12+)',
  },
  labelRemoteOnly: {
    id: `${scope}.labelRemoteOnly`,
    defaultMessage: 'Remote Only',
  },
  labelOccassionalVisit: {
    id: `${scope}.labelOccassionalVisit`,
    defaultMessage: 'Occasional Site Visit',
  },
  labelShortTerm: {
    id: `${scope}.labelShortTerm`,
    defaultMessage: 'Short-term Onsite (< 3 months)',
  },
  labelMidTerm: {
    id: `${scope}.labelMidTerm`,
    defaultMessage: 'Mid-term Onsite (3 - 6 months)',
  },
  labelLongTerm: {
    id: `${scope}.labelLongTerm`,
    defaultMessage: 'Long-term Onsite (6 - 12 months)',
  },
});
