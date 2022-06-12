/*
 * Experiences Pages
 *
 * This contains all the text for the WorkExperienceForm component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.WorkExperienceForm';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Experience',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Experience',
  },
  headingExperience: {
    id: `${scope}.headingExperience`,
    defaultMessage: 'Experience',
  },
  experienceTagLine: {
    id: `${scope}.experienceTagLine`,
    defaultMessage:
      'Add all your professional work experience starting with most recent first. At least one professional experience is required for your profile to be approved. ',
  },
  labelWorkExperience: {
    id: `${scope}.labelWorkExperience`,
    defaultMessage: 'Work Experience',
  },
  labelAdd: {
    id: `${scope}.labelAdd`,
    defaultMessage: ' Add Experience',
  },
});
