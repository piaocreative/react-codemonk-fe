/*
 * AddTimesheet Messages
 *
 * This contains all the text for the AddTimesheet component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AddTimesheet';

export default defineMessages({
  addTimeSheet: {
    id: `${scope}.addTimeSheet`,
    defaultMessage: 'Add timesheet',
  },
  weekStartingLabel: {
    id: `${scope}.weekStartingLabel`,
    defaultMessage: 'Week starting',
  },
  selectDaysWorkedLabel: {
    id: `${scope}.selectDaysWorkedLabel`,
    defaultMessage: 'Select Half / Full day you worked',
  },
  projectLabel: {
    id: `${scope}.projectLabel`,
    defaultMessage: 'Project',
  },
  privacyPolicy: {
    id: `${scope}.privacyPolicy`,
    defaultMessage: 'I confirm that I have worked for all the hours indicated on the timesheet and will provide the worklogs on request.',
  },
});
