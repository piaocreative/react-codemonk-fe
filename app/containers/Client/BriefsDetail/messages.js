/*
 * ClientBriefsDetail Messages
 *
 * This contains all the text for the ClientBriefsDetail component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.ClientBriefsDetail';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Brief Detail',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Brief Detail',
  },
  jobDetails: {
    id: `${scope}.jobDetails`,
    defaultMessage: 'Job details',
  },
  btnBackToBriefs: {
    id: `${scope}.btnBackToBriefs`,
    defaultMessage: 'Back to briefs',
  },
  projectTitle: {
    id: `${scope}.projectTitle`,
    defaultMessage: 'Project Title:',
  },
  projectDescription: {
    id: `${scope}.projectDescription`,
    defaultMessage: 'Project Description:',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description:',
  },
  noTalent: {
    id: `${scope}.noTalent`,
    defaultMessage: 'There is currently no application on this brief',
  },

  // backToBrief
  backToBriefs: {
    id: `${scope}.backToBriefs`,
    defaultMessage: 'Back to briefs',
  },
  backToProjectDetails: {
    id: `${scope}.backToProjectDetails`,
    defaultMessage: 'Back to project details',
  },

  recommended: {
    id: `${scope}.recommended`,
    defaultMessage: 'Recommended',
  },
  applications: {
    id: `${scope}.applications`,
    defaultMessage: 'Applications',
  },
  interviewed: {
    id: `${scope}.interviewed`,
    defaultMessage: 'Interviewed',
  },
  hired: {
    id: `${scope}.hired`,
    defaultMessage: 'Hired',
  },
  archived: {
    id: `${scope}.archived`,
    defaultMessage: 'Archived',
  },
  jobDescription: {
    id: `${scope}.jobDescription`,
    defaultMessage: 'Job Description',
  },
  searchCandidate: {
    id: `${scope}.searchCandidate`,
    defaultMessage: 'Search more candidates',
  },
});
