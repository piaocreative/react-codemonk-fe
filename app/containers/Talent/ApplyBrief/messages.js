/*
 * ApplyBrief Messages
 *
 * This contains all the text for the ApplyBrief component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.ApplyBrief';

export default defineMessages({
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description:',
  },
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Apply',
  },
  ProfileCompleteHeading: {
    id: `${scope}.ProfileCompleteHeading`,
    defaultMessage: 'Please complete your profile',
  },
  ProfileCompleteContent: {
    id: `${scope}.ProfileCompleteContent`,
    defaultMessage:
      'In-order for you to apply to any of our jobs or create a team, you need to first complete your profile with all the required information and get verified.',
  },
  benefitsInfo: {
    id: `${scope}.benefitsInfo`,
    defaultMessage: 'As a verified talent, some of the immediate benefits you receive are:',
  },
  benefitsItem1: {
    id: `${scope}.benefitsItem1`,
    defaultMessage: 'Increased profile visibility',
  },
  benefitsItem2: {
    id: `${scope}.benefitsItem2`,
    defaultMessage: 'Personalised job matching',
  },
  benefitsItem3: {
    id: `${scope}.benefitsItem3`,
    defaultMessage: 'Quicker hiring process',
  },
  motivateLabel: {
    id: `${scope}.motivateLabel`,
    defaultMessage: 'What motivates you for this role?',
  },
  whenToStartLabel: {
    id: `${scope}.whenToStartLabel`,
    defaultMessage: 'When is the earliest date you can start?',
  },
  btnApplyNow: {
    id: `${scope}.btnApplyNow`,
    defaultMessage: 'Apply now',
  },
});
