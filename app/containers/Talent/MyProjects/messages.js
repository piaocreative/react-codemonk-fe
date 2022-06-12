/*
 * Talent Projects Messages
 */
import { defineMessages } from 'react-intl';
export const scope = 'CodeMonk.containers.TalentProjects';

export default defineMessages({
  TalentProjectsTitle: {
    id: `${scope}.title.head`,
    defaultMessage: 'My Projects',
  },
  TalentProjectsMetaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Talent Projects',
  },
  TalentProjectsHeadingProject: {
    id: `${scope}.headingProject`,
    defaultMessage: 'My Projects',
  },
  AgencyProjectsTitle: {
    id: `${scope}.AgencyProjectsTitle`,
    defaultMessage: 'Projects',
  },
  AgencyProjectsMetaTitle: {
    id: `${scope}.AgencyProjectsMetaTitle`,
    defaultMessage: 'Projects',
  },
  AgencyProjectsHeadingProject: {
    id: `${scope}.headingProject`,
    defaultMessage: 'Projects',
  },
  emptyStateHeader: {
    id: `${scope}.emptyStateHeader`,
    defaultMessage: 'You are not working on any project yet!',
  },
  backToDashboard: {
    id: `${scope}.backToDashboard`,
    defaultMessage: 'Back to Dashboard',
  },
  emptyStateContent: {
    id: `${scope}.emptyStateContent`,
    defaultMessage: `You will be able to see your active projects here when you are hired by our clients. Please ensure your profile is all up-to-date to get matched faster.`,
  },
  projectStatus: {
    id: `${scope}.projectStatus`,
    defaultMessage: `Project Status`,
  },
  updateResult: {
    id: `${scope}.updateResult`,
    defaultMessage: `Update results`,
  },
  filters: {
    id: `${scope}.filters`,
    defaultMessage: `Filters`,
  },
  clearAll: {
    id: `${scope}.clearAll`,
    defaultMessage: `Clear all`,
  },
  allProjects: {
    id: `${scope}.allProjects`,
    defaultMessage: `All projects`,
  },
});
