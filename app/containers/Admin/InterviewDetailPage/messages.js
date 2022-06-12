/*
 * InterviewDetailPage Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.InterviewDetailPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Interview Details',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Interview Details',
  },
  backToInterview: {
    id: `${scope}.backToInterview`,
    defaultMessage: 'Back to Interview List',
  },
  titleInterviewDetails: {
    id: `${scope}.titleInterviewDetails`,
    defaultMessage: 'Interview Details',
  },
  labelDateRequested: {
    id: `${scope}.labelDateRequested`,
    defaultMessage: 'Date request is raised:',
  },

  labelTalentName: {
    id: `${scope}.labelTalentName`,
    defaultMessage: 'Talent Name:',
  },
  labelTalentEmail: {
    id: `${scope}.labelTalentEmail`,
    defaultMessage: 'Talent Email:',
  },
  labelStatus: {
    id: `${scope}.labelStatus`,
    defaultMessage: 'Status:',
  },
  placeholderStatus: {
    id: `${scope}.placeholderStatus`,
    defaultMessage: 'Select Result',
  },
  labelInterviewSlotAdmin: {
    id: `${scope}.labelInterviewSlotAdmin`,
    defaultMessage: 'Interview Slot:',
  },
  labelOption: {
    id: `${scope}.labelOption`,
    defaultMessage: 'Option',
  },
  labelResult: {
    id: `${scope}.labelResult`,
    defaultMessage: 'Result:',
  },
  saveButton: {
    id: `${scope}.saveButton`,
    defaultMessage: 'Save',
  },
  editButton: {
    id: `${scope}.editButton`,
    defaultMessage: 'Edit',
  },
  labelClientFeedback: {
    id: `${scope}.labelClientFeedback`,
    defaultMessage: "Client's Feedback:",
  },
  labelTalentFeedback: {
    id: `${scope}.labelTalentFeedback`,
    defaultMessage: "Talent's Feedback:",
  },
});
