/*
 * AgencyProfilePage Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AgencyProfilePage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'My Profile',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'My Profile',
  },
  editCTA: {
    id: `${scope}.editCTA`,
    defaultMessage: 'Edit',
  },

  headingEditTalents: {
    id: `${scope}.headingEditTalents`,
    defaultMessage: 'Password',
  },

  // personalProfessional Tab
  personalProfessionalTab: {
    id: `${scope}.personalProfessionalTab`,
    defaultMessage: 'Personal & company details',
  },
  personalProfessionalTitle: {
    id: `${scope}.personalProfessionalTitle`,
    defaultMessage: 'Personal & company details',
  },
  personalProfessionalEditTitle: {
    id: `${scope}.personalProfessionalEditTitle`,
    defaultMessage: 'Edit Personal & company details',
  },
  personalProfessionalEditData: {
    id: `${scope}.personalProfessionalEditData`,
    defaultMessage: 'Edit',
  },

  // Talents Tab
  talentsTab: {
    id: `${scope}.talentsTab`,
    defaultMessage: 'Talents',
  },
  listOfTalents: {
    id: `${scope}.listOfTalents`,
    defaultMessage: 'List of talents',
  },
  noResultText: {
    id: `${scope}.noResultText`,
    defaultMessage: 'No result found',
  },
  btnAddTalent: {
    id: `${scope}.btnAddTalent`,
    defaultMessage: 'Add talent',
  },
  editTalents: {
    id: `${scope}.editTalents`,
    defaultMessage: 'Edit talents',
  },

  // Certifications Tab
  certificationsTitle: {
    id: `${scope}.certificationsTitle`,
    defaultMessage: 'Agency certifications',
  },
  certificationsEditTitle: {
    id: `${scope}.certificationsEditTitle`,
    defaultMessage: 'Edit agency certifications',
  },

  // CredentialsTab Tab
  credentialsTab: {
    id: `${scope}.credentialsTab`,
    defaultMessage: 'Credentials',
  },

  credentialsTitle: {
    id: `${scope}.credentialsTitle`,
    defaultMessage: 'Agency credentials',
  },

  credentialsEditTitle: {
    id: `${scope}.credentialsEditTitle`,
    defaultMessage: 'Edit agency credentials',
  },
});
