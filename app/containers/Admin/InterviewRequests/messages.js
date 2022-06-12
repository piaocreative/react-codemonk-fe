/*
 * AdminInterviewRequests Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AdminInterviewRequests';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Interviews',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Interviews',
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
  headerManageInterviewRequest: {
    id: `${scope}.headerManageInterviewRequest`,
    defaultMessage: 'Interviews',
  },
  btnAddProject: {
    id: `${scope}.btnAddProject`,
    defaultMessage: 'Add Project',
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
