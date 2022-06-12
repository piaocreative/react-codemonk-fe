/*
 * CreateProfilePage Messages
 *
 * This contains all the text for the CreateProfilePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.CreateProfilePage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Add Talents',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Add Talents',
  },
  headingAddTalent: {
    id: `${scope}.headingAddTalent`,
    defaultMessage: 'Add Talents',
  },
  titleUploadFile: {
    id: `${scope}.titleUploadFile`,
    defaultMessage: 'or Upload file',
  },
  titleListTalents: {
    id: `${scope}.titleListTalents`,
    defaultMessage: 'List of talents',
  },
  modalAddTalentHeader: {
    id: `${scope}.modalAddTalentHeader`,
    defaultMessage: 'Add talent',
  },
  modalEditTalentHeader: {
    id: `${scope}.modalEditTalentHeader`,
    defaultMessage: 'Edit talent',
  },
  btnAddTalent: {
    id: `${scope}.btnAddTalent`,
    defaultMessage: 'Add talent',
  },
  textIntructions: {
    id: `${scope}.textIntructions`,
    defaultMessage: 'For more detailed instructions, read the importing guidelines',
  },
  linkHere: {
    id: `${scope}.linkHere`,
    defaultMessage: 'here',
  },
  linkSampleFile: {
    id: `${scope}.linkSampleFile`,
    defaultMessage: 'Sample file',
  },
  placeHolderlabelRating: {
    id: `${scope}.placeHolderlabelRating`,
    defaultMessage: 'e.g. 100',
  },
});
