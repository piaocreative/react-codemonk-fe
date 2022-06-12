/*
 * AdminProjects Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AdminProjects';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Projects',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Projects',
  },
  labelClientName: {
    id: `${scope}.labelClientName`,
    defaultMessage: 'Client Name',
  },
  placeholderClientName: {
    id: `${scope}.placeholderClientName`,
    defaultMessage: 'Search...',
  },
  placeholderCompanyName: {
    id: `${scope}.placeholderCompanyName`,
    defaultMessage: 'Search...',
  },
  labelProjectSummary: {
    id: `${scope}.labelProjectSummary`,
    defaultMessage: 'Project Summary',
  },
  placeholderProjectSummary: {
    id: `${scope}.placeholderProjectSummary`,
    defaultMessage: 'Project summary',
  },
  labelStatus: {
    id: `${scope}.labelStatus`,
    defaultMessage: 'Status',
  },
  placeholderStatus: {
    id: `${scope}.placeholderStatus`,
    defaultMessage: 'Select',
  },

  // talent Popup
  labelTalentName: {
    id: `${scope}.labelTalentName`,
    defaultMessage: 'Talent Name',
  },
  placeholderTalentName: {
    id: `${scope}.placeholderTalentName`,
    defaultMessage: 'Talent name',
  },

  titleFilter: {
    id: `${scope}.titleFilter`,
    defaultMessage: 'Filters',
  },
  btnClearAll: {
    id: `${scope}.btnClearAll`,
    defaultMessage: 'Clear all',
  },
  titleStatus: {
    id: `${scope}.titleStatus`,
    defaultMessage: 'Status',
  },
  headerManageProject: {
    id: `${scope}.headerManageProject`,
    defaultMessage: 'Projects',
  },
  btnView: {
    id: `${scope}.btnView`,
    defaultMessage: 'View',
  },
  noRecord: {
    id: `${scope}.noRecord`,
    defaultMessage: 'There is no record to display',
  },
});
