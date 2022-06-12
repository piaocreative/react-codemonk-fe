/*
 * UploadCV Messages
 *
 * This contains all the text for the UploadCV component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.UploadCV';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Upload CV',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Upload CV',
  },
  headingUploadCV: {
    id: `${scope}.headingUploadCV`,
    defaultMessage: 'Upload your CV',
  },
  subHeadingUploadCV: {
    id: `${scope}.subHeadingUploadCV`,
    defaultMessage:
      'Save time by automatically filling your professional and educational history. Alternatively, you can simply continue to enter the details manually.',
  },
  titleUploadFile: {
    id: `${scope}.titleUploadFile`,
    defaultMessage: 'Upload file',
  },
});
