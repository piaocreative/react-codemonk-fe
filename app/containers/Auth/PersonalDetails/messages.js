/*
 * ProfessionalDetails Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.PersonalDetails';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Personal details',
  },
  dragAndDrop: {
    id: `${scope}.dragAndDrop`,
    defaultMessage: 'Drag & drop here or',
  },
  dragAndDropImgs: {
    id: `${scope}.dragAndDropImgs`,
    defaultMessage: 'Drag & drop images here or',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Personal details',
  },
  fileSizeInfo: {
    id: `${scope}.fileSizeInfo`,
    defaultMessage: 'Min 200px X 200px. JPG or PNG files of max 2MB.',
  },
  headingPersonalDetails: {
    id: `${scope}.headingPersonalDetails`,
    defaultMessage: 'About you',
  },
  aboutYouTagLine: {
    id: `${scope}.aboutYouTagLine`,
    defaultMessage: 'Lets get started with us knowing you better',
  },
  csvFileSizeInfo: {
    id: `${scope}.csvFileSizeInfo`,
    defaultMessage: 'CSV, XLS and XLSX files only. Maximum file size 5 MB.',
  },
  cvFileSizeInfo: {
    id: `${scope}.cvFileSizeInfo`,
    defaultMessage: 'DOC, DOCX and PDF files of max 2 MB.',
  },
  photoAndPdfSizeInfo: {
    id: `${scope}.photoAndPdfSizeInfo`,
    defaultMessage: 'JPG, PNG or PDF files of max 2MB.',
  },
  labelProfilePhoto: {
    id: `${scope}.labelProfilePhoto`,
    defaultMessage: 'Profile Photo',
  },
  subHeadingBasic: {
    id: `${scope}.subHeadingBasic`,
    defaultMessage: 'Basic',
  },
  titlePreview: {
    id: `${scope}.titlePreview`,
    defaultMessage: 'Preview',
  },
});
