/*
 * Timesheets Messages
 *
 * This contains all the text for the Timesheets component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.Timesheets';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Timesheets',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Timesheets',
  },
  timesheetHeading: {
    id: `${scope}.timesheetHeading`,
    defaultMessage: 'Timesheets',
  },
  searchByProjectName: {
    id: `${scope}.searchByProjectName`,
    defaultMessage: 'Find by project',
  },
});
