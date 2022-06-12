/*
 * ProjectDetailPage Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.ProjectDetailPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Project details',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Project details',
  },
  modalAddTalentHeader: {
    id: `${scope}.modalAddTalentHeader`,
    defaultMessage: 'Add talent',
  },
  btnAddTalent: {
    id: `${scope}.btnAddTalent`,
    defaultMessage: 'Add talent',
  },
  labelStartDate: {
    id: `${scope}.labelStartDate`,
    defaultMessage: 'Start date:',
  },
  labelEndDate: {
    id: `${scope}.labelEndDate`,
    defaultMessage: 'End date:',
  },
  labelStatus: {
    id: `${scope}.labelStatus`,
    defaultMessage: 'Status:',
  },
  titleProjectDetails: {
    id: `${scope}.titleProjectDetails`,
    defaultMessage: 'Project details',
  },
  titleTalentList: {
    id: `${scope}.titleTalentList`,
    defaultMessage: 'Talent List',
  },
  backToProject: {
    id: `${scope}.backToProject`,
    defaultMessage: 'Back to project list',
  },
  noRecord: {
    id: `${scope}.noRecord`,
    defaultMessage: 'There is no record to display',
  },
  placeholderTalentName: {
    id: `${scope}.placeholderTalentName`,
    defaultMessage: 'Search...',
  },

  // briefTab
  addBriefTitle: {
    id: `${scope}.addBriefTitle`,
    defaultMessage: 'Title',
  },
  addBriefRole: {
    id: `${scope}.addBriefRole`,
    defaultMessage: 'Role',
  },
  addBriefRolePlaceholder: {
    id: `${scope}.addBriefRolePlaceholder`,
    defaultMessage: 'Select role',
  },
  addBriefDescription: {
    id: `${scope}.addBriefDescription`,
    defaultMessage: 'Description',
  },
  addBriefSkills: {
    id: `${scope}.addBriefSkills`,
    defaultMessage: 'Skills',
  },
  addBriefSkillsSmallText: {
    id: `${scope}.addBriefSkillsSmallText`,
    defaultMessage: '(You can enter multiple skills)',
  },
  addBriefSkillsPlaceholder: {
    id: `${scope}.addBriefSkillsPlaceholder`,
    defaultMessage: 'select skills',
  },
  labelExperienceLevel: {
    id: `${scope}.labelExperienceLevel`,
    defaultMessage: 'Experience level',
  },
  addBriefExpertiseLevelPlaceholder: {
    id: `${scope}.addBriefExpertiseLevelPlaceholder`,
    defaultMessage: 'Select expertise level',
  },
  labelMinDuration: {
    id: `${scope}.labelMinDuration`,
    defaultMessage: 'Min Duration',
  },
  labelInMonths: {
    id: `${scope}.labelInMonths`,
    defaultMessage: '(in Months)',
  },

  // Add Details - quote
  labelTitle: {
    id: `${scope}.labelTitle`,
    defaultMessage: 'Title',
  },
  placeHolderTitle: {
    id: `${scope}.placeHolderTitle`,
    defaultMessage: 'Title',
  },
  labelDescription: {
    id: `${scope}.labelDescription`,
    defaultMessage: 'Description',
  },
  placeHolderDescription: {
    id: `${scope}.placeHolderDescription`,
    defaultMessage: 'Description',
  },
  labelAttachment: {
    id: `${scope}.labelAttachment`,
    defaultMessage: 'Attachment',
  },
  labelAttachmentSmallText: {
    id: `${scope}.labelAttachmentSmallText`,
    defaultMessage: '(PDF, DOCX, ZIP, RAR Only)',
  },

  // quotePopup
  addQuotePopupTitle: {
    id: `${scope}.addQuotePopupTitle`,
    defaultMessage: 'Add quote',
  },
  editQuotePopupTitle: {
    id: `${scope}.editQuotePopupTitle`,
    defaultMessage: 'Edit quote',
  },

  // old
  // Tab Quote
  howMuchBeenDone: {
    id: `${scope}.howMuchBeenDone`,
    defaultMessage: 'How much has been done so far?',
  },

  whatAreYouLooking: {
    id: `${scope}.whatAreYouLooking`,
    defaultMessage: 'What are you looking for?',
  },
  whatsYourBudget: {
    id: `${scope}.whatsYourBudget`,
    defaultMessage: 'Whats your budget?',
  },

  anythingElseWeShould: {
    id: `${scope}.anythingElseWeShould`,
    defaultMessage: 'Anything else we should know?',
  },
  howFast: {
    id: `${scope}.howFast`,
    defaultMessage: 'How fast you want your project to be completed?',
  },

  howWouldManageTeam: {
    id: `${scope}.howWouldManageTeam`,
    defaultMessage: 'How would you like to manage the team?',
  },

  // briefTab
  tabBrief: {
    id: `${scope}.tabBrief`,
    defaultMessage: 'Brief',
  },

  // what are you looking for
  uxAndUiDesign: {
    id: `${scope}.uxAndUiDesign`,
    defaultMessage: 'UX and UI Design',
  },

  softwareDevelopment: {
    id: `${scope}.softwareDevelopment`,
    defaultMessage: 'Software Development',
  },
  developmentTeam: {
    id: `${scope}.developmentTeam`,
    defaultMessage: 'Development Team',
  },

  dataAiMl: {
    id: `${scope}.dataAiMl`,
    defaultMessage: 'Data, AI & ML',
  },
  growthHacking: {
    id: `${scope}.growthHacking`,
    defaultMessage: 'Growth Hacking',
  },
  agielCoaching: {
    id: `${scope}.agielCoaching`,
    defaultMessage: 'Agile Coaching',
  },
  otherRequirement: {
    id: `${scope}.otherRequirement`,
    defaultMessage: 'Other',
  },
});
