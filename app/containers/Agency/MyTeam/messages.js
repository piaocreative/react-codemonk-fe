/*
 * MyTeam Messages
 *
 * This contains all the text for the MyTeam component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.MyTeam';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'My Team',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'My Team',
  },
  headingMyTeam: {
    id: `${scope}.headingMyTeam`,
    defaultMessage: 'My Team',
  },
  deleteModalTitle: {
    id: `${scope}.deleteModalTitle`,
    defaultMessage: 'Are you sure ?',
  },
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Apply for this project',
  },
  modalContent: {
    id: `${scope}.modalContent`,
    defaultMessage: 'Do you really want to delete this record?',
  },
  btnAddTalent: {
    id: `${scope}.btnAddTalent`,
    defaultMessage: 'Add talent',
  },
  btnAddTalents: {
    id: `${scope}.btnAddTalents`,
    defaultMessage: 'Add talents',
  },
  btnUploadFile: {
    id: `${scope}.btnUploadFile`,
    defaultMessage: 'Or upload file',
  },
  btnCancel: {
    id: `${scope}.btnCancel`,
    defaultMessage: 'Cancel',
  },
  btnDelete: {
    id: `${scope}.btnDelete`,
    defaultMessage: 'Delete',
  },
});
