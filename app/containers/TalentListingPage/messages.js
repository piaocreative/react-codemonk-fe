/*
 * TalentListingPage Messages
 *
 * This contains all the text for the TalentListingPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.TalentListingPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Talent Listing',
  },
  titleFilter: {
    id: `${scope}.titleFilter`,
    defaultMessage: 'Filters',
  },
  titlePrimaryRole: {
    id: `${scope}.titlePrimaryRole`,
    defaultMessage: 'Primary Role',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Talent Listing',
  },
  titleExpInPrimaryRole: {
    id: `${scope}.titleExpInPrimaryRole`,
    defaultMessage: 'Experience in Primary role',
  },
  titleLocation: {
    id: `${scope}.titleLocation`,
    defaultMessage: 'Location',
  },
  titleEducationLevel: {
    id: `${scope}.titleEducationLevel`,
    defaultMessage: 'Education level',
  },
  titleLanguages: {
    id: `${scope}.titleLanguages`,
    defaultMessage: 'Languages',
  },
  noResultText: {
    id: `${scope}.noResultText`,
    defaultMessage: 'No result found',
  },
  btnClearAll: {
    id: `${scope}.btnClearAll`,
    defaultMessage: 'Clear all',
  },
  noOptions: {
    id: `${scope}.noOptions`,
    defaultMessage: 'No options',
  },
  placeholderSearch: {
    id: `${scope}.placeholderSearch`,
    defaultMessage: 'Search',
  },

  // hireTalent
  hireTalentTitle: {
    id: `${scope}.hireTalentTitle`,
    defaultMessage: 'Request to hire this talent ?',
  },
  allocateTalentTitle: {
    id: `${scope}.allocateTalentTitle`,
    defaultMessage: 'Add talent',
  },

  labelProjectSummary: {
    id: `${scope}.labelProjectSummary`,
    defaultMessage: 'Project Description',
  },

  placeholderProjectSummary: {
    id: `${scope}.placeholderProjectSummary`,
    defaultMessage: 'Project Description',
  },
  labelInterviewSlot: {
    id: `${scope}.labelInterviewSlot`,
    defaultMessage: 'Interview Slot',
  },
  labelInterviewSlotSmall: {
    id: `${scope}.labelInterviewSlotSmall`,
    defaultMessage: '(each interview time slot is of one hour by default)',
  },
  labelInterviewOption: {
    id: `${scope}.labelInterviewOption`,
    defaultMessage: 'Option',
  },
  btnHire: {
    id: `${scope}.btnHire`,
    defaultMessage: 'Hire',
  },
  labelStartDate: {
    id: `${scope}labelStartDate`,
    defaultMessage: 'Start date:',
  },
  labelEndDate: {
    id: `${scope}labelEndDate`,
    defaultMessage: 'End date:',
  },
});
