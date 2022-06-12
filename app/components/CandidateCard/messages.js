/* eslint-disable prettier/prettier */
/*
 * Candidate Messages
 */
import { defineMessages } from 'react-intl';
export const scope = 'CodeMonk.candidate.card';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Preferred Candidate',
  },
  seniority: {
    id: `${scope}.seniority`,
    defaultMessage: 'Seniority',
  },
  skillFrameworks: {
    id: `${scope}.skillFrameworks`,
    defaultMessage: 'Skills, Tools & Frameworks',
  },
  softSkills: {
    id: `${scope}.softSkills`,
    defaultMessage: 'Soft Skills',
  },
  certifications: {
    id: `${scope}.certifications`,
    defaultMessage: 'Certifications',
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language',
  },
  timezone: {
    id: `${scope}.timezone`,
    defaultMessage: 'Timezone',
  },
  teamWork: {
    id: `${scope}.teamWork`,
    defaultMessage: 'Team Working Style',
  },
  industry: {
    id: `${scope}.industry`,
    defaultMessage: 'Industry Experience',
  },
});
