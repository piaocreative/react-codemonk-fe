/*
 * BriefsDetail Messages
 *
 * This contains all the text for the BriefsDetail component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.BriefsDetail';

const modalContent1 = 'Please ensure your profile and calendar is up-to-date. ';
const modalContent2 = 'We will analyse your skills and if there is a match, you will be invited to have an interview for this project.';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Brief Detail',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Brief Detail',
  },
  btnApply: {
    id: `${scope}.btnApply`,
    defaultMessage: 'Apply',
  },
  btnBackToBriefs: {
    id: `${scope}.btnBackToBriefs`,
    defaultMessage: 'Back to briefs',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description:',
  },
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Apply for this project',
  },
  modalContent: {
    id: `${scope}.modalContent`,
    defaultMessage: `${modalContent1}${modalContent2}`,
  },
  heading: {
    id: `${scope}.heading`,
    defaultMessage: 'Job details',
  },
});
