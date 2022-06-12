/*
 * ClientAddBriefs Messages
 *
 * This contains all the text for the ClientAddBriefs component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.ClientAddBriefs';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Briefs',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Briefs',
  },
  projectTitle: {
    id: `${scope}.projectTitle`,
    defaultMessage: 'Project Title:',
  },
  heading: {
    id: `${scope}.heading`,
    defaultMessage: 'Briefs',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description:',
  },
  modelFiltersHeader: {
    id: `${scope}.modelFiltersHeader`,
    defaultMessage: 'Filters',
  },
  addBriefSkillsPlaceholder: {
    id: `${scope}.addBriefSkillsPlaceholder`,
    defaultMessage: 'select skills',
  },

  // searchTalent Messages
  modalContent1: {
    id: `${scope}.modalContent1`,
    defaultMessage: 'Your request to hire ',
  },
  modalContent2: {
    id: `${scope}.modalContent2`,
    defaultMessage: 'has been posted successfully. Here is a selection of matching talent for you to review.',
  },
  modalCTA: {
    id: `${scope}.modalCTA`,
    defaultMessage: 'Review Talents',
  },
  labelHardSkills: {
    id: `${scope}.labelHardSkills`,
    defaultMessage: 'Technical skills & Frameworks',
  },
  selectUpto7: {
    id: `${scope}.selectUpto7`,
    defaultMessage: '(Select up to 7)',
  },
  selectUpto3: {
    id: `${scope}.selectUpto3`,
    defaultMessage: '(Select up to 3)',
  },
  hardSkillsPlaceholder: {
    id: `${scope}.hardSkillsPlaceholder`,
    defaultMessage: 'Select hard skills',
  },
  labelSoftSkills: {
    id: `${scope}.labelSoftSkills`,
    defaultMessage: 'Soft Skills',
  },
  softSkillsPlaceholder: {
    id: `${scope}.softSkillsPlaceholder`,
    defaultMessage: 'Select soft skills',
  },
  labelIndustryBG: {
    id: `${scope}.labelIndustryBG`,
    defaultMessage: 'Industry experience',
  },
  IndustryBGPlaceholder: {
    id: `${scope}.IndustryBGPlaceholder`,
    defaultMessage: 'Select industry background',
  },
  labelSpokenLanguages: {
    id: `${scope}.labelSpokenLanguages`,
    defaultMessage: 'Spoken Languages',
  },
  spokenLangPlaceholder: {
    id: `${scope}.spokenLangPlaceholder`,
    defaultMessage: 'Select spoken languages',
  },
  labelEngagement: {
    id: `${scope}.labelEngagement`,
    defaultMessage: 'Engagement',
  },
  labelDayRates: {
    id: `${scope}.labelDayRates`,
    defaultMessage: 'Hourly rate',
  },
  labelBaseSalary: {
    id: `${scope}.labelBaseSalary`,
    defaultMessage: 'Base salary',
  },
  assignmentPlaceholder: {
    id: `${scope}.assignmentPlaceholder`,
    defaultMessage: 'Select assignment',
  },
  btnPostJobViewMatches: {
    id: `${scope}.btnPostJobViewMatches`,
    defaultMessage: 'Post job & view matches',
  },
  hourlyTooltip: {
    id: `${scope}.hourlyTooltip`,
    defaultMessage: 'Please enter the maximum hourly rate you are willing to pay for this role, excluding other costs and our fees.',
  },
  basetToltip: {
    id: `${scope}.baseTooltip`,
    defaultMessage:
      'Please enter the maximum annual salary you are willing to pay for this role, excluding all other employment related costs and benefits, and our fees.',
  },
});
