/*
 * AddDirectorsPage Messages
 *
 * This contains all the text for the AddDirectorsPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AddDirectorsPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Add directors & shareholder',
  },
  titleAddress: {
    id: `${scope}.titleAddress`,
    defaultMessage: 'Address',
  },
  headingAddDirector: {
    id: `${scope}.headingAddDirector`,
    defaultMessage: 'Add directors & shareholder',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Add directors & shareholder',
  },
  titleRole: {
    id: `${scope}.titleRole`,
    defaultMessage: 'Role in company?',
  },

  titleListTalents: {
    id: `${scope}.titleListTalents`,
    defaultMessage: 'List of directors & shareholders',
  },
  modalAddPersonHeader: {
    id: `${scope}.modalAddPersonHeader`,
    defaultMessage: 'Add person',
  },
  modalEditPersonHeader: {
    id: `${scope}.modalEditPersonHeader`,
    defaultMessage: 'Edit person',
  },
  btnAddPerson: {
    id: `${scope}.btnAddPerson`,
    defaultMessage: 'Add person',
  },
  labelOwnership: {
    id: `${scope}.labelOwnership`,
    defaultMessage: 'How much % ownership in the company',
  },
  placeHolderOwnership: {
    id: `${scope}.placeHolderOwnership`,
    defaultMessage: 'e.g. 20',
  },
  roleGuidelines: {
    id: `${scope}.roleGuidelines`,
    defaultMessage: 'Please select Shareholder only when you have more than 20% stake in the company',
  },
});
