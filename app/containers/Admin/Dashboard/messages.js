/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Dashboard';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Dashboard',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Dashboard',
  },
  btnToday: {
    id: `${scope}.btnToday`,
    defaultMessage: 'Today',
  },
  btnWeek: {
    id: `${scope}.btnWeek`,
    defaultMessage: 'This Week',
  },
  btnMonth: {
    id: `${scope}.btnMonth`,
    defaultMessage: 'This Month',
  },
  btnAllTime: {
    id: `${scope}.btnAllTime`,
    defaultMessage: 'All Time',
  },
  titleOverview: {
    id: `${scope}.titleOverview`,
    defaultMessage: 'Overview',
  },
  subTitleBriefs: {
    id: `${scope}.subTitleBriefs`,
    defaultMessage: 'Job Briefs',
  },
  subTitleQuotes: {
    id: `${scope}.subTitleQuotes`,
    defaultMessage: 'Quotes',
  },
  subTitleInterviews: {
    id: `${scope}.subTitleInterviews`,
    defaultMessage: 'Interviews',
  },
  subTitleProjects: {
    id: `${scope}.subTitleProjects`,
    defaultMessage: 'Projects',
  },
  subTitleTotalActive: {
    id: `${scope}.subTitleTotalActive`,
    defaultMessage: 'Total Active',
  },
  subTitleTotalSignup: {
    id: `${scope}.subTitleTotalSignup`,
    defaultMessage: 'Total Signed-up',
  },
});
