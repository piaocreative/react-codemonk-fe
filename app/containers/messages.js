/*
 * Container Messages
 */
import { defineMessages } from 'react-intl';
export const scope = 'CodeMonk.containers.containerMessage';

export default defineMessages({
  // on-boarding common
  backButton: {
    id: `${scope}.backButton`,
    defaultMessage: 'Back',
  },
  btnNewProject: {
    id: `${scope}.btnNewProject`,
    defaultMessage: 'New project',
  },
  skipButton: {
    id: `${scope}.skipButton`,
    defaultMessage: 'Skip',
  },
  saveLaterButton: {
    id: `${scope}.saveLaterButton`,
    defaultMessage: 'Save for Later',
  },
  continueButton: {
    id: `${scope}.continueButton`,
    defaultMessage: 'Continue',
  },
  optionalText: {
    id: `${scope}.optionalText`,
    defaultMessage: '(optional)',
  },

  labelEmailAddress: {
    id: `${scope}.labelEmailAddress`,
    defaultMessage: 'Email',
  },
  placeholderEmailAddress: {
    id: `${scope}.placeholderEmailAddress`,
    defaultMessage: 'e.g. johndoe@gmail.com',
  },
  placeholderPasswordAddress: {
    id: `${scope}.placeholderPassword`,
    defaultMessage: 'Enter your password',
  },
  confirmChanges: {
    id: `${scope}.confirmChanges`,
    defaultMessage: 'Confirm changes',
  },
  labelOldPassword: {
    id: `${scope}.labelOldPassword`,
    defaultMessage: 'Current Password',
  },
  placeHolderOldPassword: {
    id: `${scope}.placeHolderOldPassword`,
    defaultMessage: 'Enter current password',
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Change your password',
  },
  /* emailAddress update tab */
  editEmailAddress: {
    id: `${scope}.editEmailAddress`,
    defaultMessage: 'Change your email',
  },
  headingEditCTA: {
    id: `${scope}.headingEditCTA`,
    defaultMessage: 'Edit',
  },
  labelOldEmail: {
    id: `${scope}.labelOldEmail`,
    defaultMessage: 'Your current email address',
  },
  labelnewEmail: {
    id: `${scope}.labelNewEmail`,
    defaultMessage: 'Enter your new email address',
  },
  labelPasswordConfirm: {
    id: `${scope}.labelPasswordConfirm`,
    defaultMessage: 'Enter your password to confirm',
  },
  labelProjectName: {
    id: `${scope}.labelProjectName`,
    defaultMessage: 'Project name',
  },
  labelTalentName: {
    id: `${scope}.labelTalentName`,
    defaultMessage: 'Talent name',
  },
  placeholderProjectName: {
    id: `${scope}.placeholderProjectName`,
    defaultMessage: 'Project name',
  },
  placeholderProjectSummary: {
    id: `${scope}.placeholderProjectSummary`,
    defaultMessage: 'Project description',
  },
  projectLabel: {
    id: `${scope}.projectLabel`,
    defaultMessage: 'Project',
  },
  passwordDescription: {
    id: `${scope}.passwordDescription`,
    defaultMessage: `Please enter your password to confirm these changes`,
  },

  // dropper messages
  browseButton: {
    id: `${scope}.browseButton`,
    defaultMessage: 'Browse',
  },
  applyButton: {
    id: `${scope}.applyButton`,
    defaultMessage: 'Apply',
  },
  draftButton: {
    id: `${scope}.draftButton`,
    defaultMessage: 'Draft',
  },
  btnCancel: {
    id: `${scope}.btnCancel`,
    defaultMessage: 'Cancel',
  },
  btnSave: {
    id: `${scope}.btnSave`,
    defaultMessage: 'Save',
  },
  btnUpdate: {
    id: `${scope}.btnUpdate`,
    defaultMessage: 'Update',
  },
  btnArchive: {
    id: `${scope}.btnArchive`,
    defaultMessage: 'Archive',
  },
  btnHire: {
    id: `${scope}.btnHire`,
    defaultMessage: 'Hire',
  },
  btnAllocate: {
    id: `${scope}.btnAllocate`,
    defaultMessage: 'Allocate',
  },
  deleteButton: {
    id: `${scope}.deleteButton`,
    defaultMessage: 'Delete Photo',
  },
  deleteFile: {
    id: `${scope}.deleteFile`,
    defaultMessage: 'Delete File',
  },
  titlePreview: {
    id: `${scope}.titlePreview`,
    defaultMessage: 'Preview',
  },
  textFilter: {
    id: `${scope}.textFilter`,
    defaultMessage: 'Filter',
  },

  // deleteLater
  btnBack: {
    id: `${scope}.btnBack`,
    defaultMessage: 'Back',
  },

  // project listing messages
  btnView: {
    id: `${scope}.btnView`,
    defaultMessage: 'View',
  },
  noRecord: {
    id: `${scope}.noRecord`,
    defaultMessage: 'There is no record to display',
  },

  noResultText: {
    id: `${scope}.noResultText`,
    defaultMessage: 'No result found',
  },
  btnClose: {
    id: `${scope}.btnClose`,
    defaultMessage: 'Close',
  },

  // project-detail messages
  backToProject: {
    id: `${scope}.backToProject`,
    defaultMessage: 'Back to project list',
  },
  projectTitle: {
    id: `${scope}.projectTitle`,
    defaultMessage: 'Project title:',
  },
  labelDescription: {
    id: `${scope}.labelDescription`,
    defaultMessage: 'Description:',
  },
  labelJobDescription: {
    id: `${scope}.labelJobDescription`,
    defaultMessage: 'Job description',
  },
  labelTitle: {
    id: `${scope}.labelTitle`,
    defaultMessage: 'Title:',
  },
  labelAttachment: {
    id: `${scope}.labelAttachment`,
    defaultMessage: 'Attachment:',
  },
  labelDownloadAttachment: {
    id: `${scope}.labelDownloadAttachment`,
    defaultMessage: 'Download attachment',
  },

  // project-detail tabs
  tabTimesheet: {
    id: `${scope}.tabTimesheet`,
    defaultMessage: 'Timesheet',
  },
  tabTeam: {
    id: `${scope}.tabTeam`,
    defaultMessage: 'Talents',
  },
  tabBrief: {
    id: `${scope}.tabBrief`,
    defaultMessage: 'Brief',
  },
  tabQuote: {
    id: `${scope}.tabQuote`,
    defaultMessage: 'Quote',
  },
  tabOpenRoles: {
    id: `${scope}.tabOpenRoles`,
    defaultMessage: 'Environments',
  },
  tabOtherInfo: {
    id: `${scope}.tabOtherInfo`,
    defaultMessage: 'Other Info',
  },

  // brief
  subHeadingTeam: {
    id: `${scope}.subHeadingTeam`,
    defaultMessage: 'Team size',
  },
  subHeadingAssignment: {
    id: `${scope}.subHeadingAssignment`,
    defaultMessage: 'Work location',
  },
  labelWorkSchedule: {
    id: `${scope}.labelWorkSchedule`,
    defaultMessage: 'Work schedule',
  },
  subProjectExpertiseLevelBrief: {
    id: `${scope}.subProjectExpertiseLevelBrief`,
    defaultMessage: 'Expertise level',
  },
  subProjectRolesBrief: {
    id: `${scope}.subProjectRolesBrief`,
    defaultMessage: 'Primary role',
  },
  subProjectSkills: {
    id: `${scope}.subProjectSkills`,
    defaultMessage: 'Skills',
  },
  subAlreadyApplied: {
    id: `${scope}.subAlreadyApplied`,
    defaultMessage: 'Already applied',
  },
  subDatePosted: {
    id: `${scope}.subDatePosted`,
    defaultMessage: 'Date posted',
  },
  subShowFilter: {
    id: `${scope}.subShowFilter`,
    defaultMessage: 'Status',
  },
  titleAvailability: {
    id: `${scope}.titleAvailability`,
    defaultMessage: 'Availability',
  },

  // Edit Project
  modalEditProject: {
    id: `${scope}.modalEditProject`,
    defaultMessage: 'Edit Project',
  },

  // admin interviewDetail

  labelClientNamePlaceHolder: {
    id: `${scope}.labelClientNamePlaceHolder`,
    defaultMessage: 'Client name',
  },
  labelClientName: {
    id: `${scope}.labelClientName`,
    defaultMessage: 'Client name:',
  },
  labelClientEmail: {
    id: `${scope}.labelClientEmail`,
    defaultMessage: 'Client email:',
  },

  // brief
  noBrief: {
    id: `${scope}.noBrief`,
    defaultMessage: 'There is currently no brief added to this project',
  },
  noQuote: {
    id: `${scope}.noQuote`,
    defaultMessage: 'There is currently no quote added to this project',
  },
  noOpenRoles: {
    id: `${scope}.noOpenRoles`,
    defaultMessage: 'There is currently no open roles added to this project',
  },

  // Urls
  labelProfileLinkedIn: {
    id: `${scope}.labelProfileLinkedIn`,
    defaultMessage: 'LinkedIn',
  },
  labelProfileGithub: {
    id: `${scope}.labelProfileGithub`,
    defaultMessage: 'Github',
  },
  labelWeb: {
    id: `${scope}.labelWeb`,
    defaultMessage: 'Website',
  },

  // Certifications
  labelCertification: {
    id: `${scope}.labelCertification`,
    defaultMessage: 'Certifications',
  },
  placeholderDate: {
    id: `${scope}.placeholderDate`,
    defaultMessage: 'DD/MM/YYYY',
  },

  // Bank details
  labelAccountNo: {
    id: `${scope}.labelAccountNo`,
    defaultMessage: 'Account / IBAN No',
  },
  placeholderAccountNumber: {
    id: `${scope}.placeholderAccountNumber`,
    defaultMessage: 'Account / IBAN No',
  },
  labelIFSC: {
    id: `${scope}.labelIFSC`,
    defaultMessage: 'BIC / SWIFT / Sort-Code / IFSC / ABA',
  },
  placeholderIFSCCode: {
    id: `${scope}.placeholderIFSCCode`,
    defaultMessage: 'BIC / SWIFT / Sort-Code / IFSC / ABA',
  },

  noTalent: {
    id: `${scope}.noTalent`,
    defaultMessage: 'There is currently no talent added to this project',
  },
  noQuoteAgency: {
    id: `${scope}.noQuoteAgency`,
    defaultMessage: 'There is currently no quote available',
  },
  noOtherInfo: {
    id: `${scope}.noOtherInfo`,
    defaultMessage: 'There is currently no other info available',
  },
  // quote
  badgeApplied: {
    id: `${scope}.badgeApplied`,
    defaultMessage: 'Applied',
  },
  badgeSubmitted: {
    id: `${scope}.badgeSubmitted`,
    defaultMessage: 'Submitted',
  },
  btnSubmit: {
    id: `${scope}.btnSubmit`,
    defaultMessage: 'Submit',
  },
  btnSubmitQuote: {
    id: `${scope}.btnSubmitQuote`,
    defaultMessage: 'Submit Quote',
  },
  searchPlaceholder: {
    id: `${scope}.searchPlaceholder`,
    defaultMessage: 'Search',
  },

  // tab messages
  tabEmail: {
    id: `${scope}.tabEmail`,
    defaultMessage: 'Email',
  },
  tabPassword: {
    id: `${scope}.tabPassword`,
    defaultMessage: 'Password',
  },

  // password Tooltip messages
  lowerCase: {
    id: `${scope}.lowerCase`,
    defaultMessage: 'Lower case letters (a-z)',
  },
  upperCase: {
    id: `${scope}.upperCase`,
    defaultMessage: 'Upper case letters (A-Z)',
  },
  numbersInString: {
    id: `${scope}.numbersInString`,
    defaultMessage: 'Numbers (i.e 0-9)',
  },
  specialCharacter: {
    id: `${scope}.specialCharacter`,
    defaultMessage: 'Special Characters (i.e ^£$%&*@)',
  },
  stringLength: {
    id: `${scope}.stringLength`,
    defaultMessage: 'Min 8 Characters long',
  },

  // talent No project message
  noProjectTalent: {
    id: `${scope}.noProjectTalent`,
    defaultMessage: "You don't have an active project. Explore and apply to new",
  },
  noProjectTalentBriefs: {
    id: `${scope}.noProjectTalentBriefs`,
    defaultMessage: 'Briefs',
  },

  // client Profile
  labelRegisterType: {
    id: `${scope}.labelRegisterType`,
    defaultMessage: 'Register Type',
  },
  labelFirstName: {
    id: `${scope}.labelFirstName`,
    defaultMessage: 'First name',
  },
  labelLastName: {
    id: `${scope}.labelLastName`,
    defaultMessage: 'Last name',
  },
  labelJobTitle: {
    id: `${scope}.labelJobTitle`,
    defaultMessage: 'Job title',
  },

  labelLine1: {
    id: `${scope}.labelLine1`,
    defaultMessage: 'Line 1',
  },
  labelLine2: {
    id: `${scope}.labelLine2`,
    defaultMessage: 'Line 2',
  },

  labelCity: {
    id: `${scope}.labelCity`,
    defaultMessage: 'City',
  },
  labelCountry: {
    id: `${scope}.labelCountry`,
    defaultMessage: 'Country',
  },
  labelPostcode: {
    id: `${scope}.labelPostcode`,
    defaultMessage: 'Postcode / Zip code',
  },
  labelTimezone: {
    id: `${scope}.labelTimezone`,
    defaultMessage: 'Time zone',
  },

  // company details
  labelCompanyName: {
    id: `${scope}.labelCompanyName`,
    defaultMessage: 'Company legal name',
  },
  placeHolderCompanyName: {
    id: `${scope}.placeHolderCompanyName`,
    defaultMessage: 'Your company name',
  },
  labelCompanyRegistrationNo: {
    id: `${scope}.labelCompanyRegistrationNo`,
    defaultMessage: 'Registration No.',
  },
  labelCompanySize: {
    id: `${scope}.labelCompanySize`,
    defaultMessage: 'Company size',
  },
  labelProjectDuration: {
    id: `${scope}.labelProjectDuration`,
    defaultMessage: 'Project duration',
  },

  labelWebsite: {
    id: `${scope}.labelWebsite`,
    defaultMessage: 'Website',
  },

  labelDUNSNo: {
    id: `${scope}.labelDUNSNo`,
    defaultMessage: 'DUNS No.',
  },
  labelVatNo: {
    id: `${scope}.labelVatNo`,
    defaultMessage: 'VAT (or Tax) No.',
  },

  labelEmail: {
    id: `${scope}.labelEmail`,
    defaultMessage: 'Email address',
  },
  labelPhoneNumber: {
    id: `${scope}.labelPhoneNumber`,
    defaultMessage: 'Phone Number',
  },
  filterStatus: {
    id: `${scope}.filterStatus`,
    defaultMessage: 'Status',
  },
  textGetQuote: {
    id: `${scope}.textGetQuote`,
    defaultMessage: 'Get a quote',
  },
  labelTradingName: {
    id: `${scope}.labelTradingName`,
    defaultMessage: 'Trading name',
  },
  labelTradingSummary: {
    id: `${scope}.labelTradingSummary`,
    defaultMessage: 'Summary',
  },
  labelRole: {
    id: `${scope}.labelRole`,
    defaultMessage: 'Role in company',
  },

  titlePersonalAddress: {
    id: `${scope}.titlePersonalAddress`,
    defaultMessage: 'Personal address',
  },
  titleCompanyDetails: {
    id: `${scope}.titleCompanyDetails`,
    defaultMessage: 'Company details',
  },
  titleCompanyRegisteredAddress: {
    id: `${scope}.titleCompanyRegisteredAddress`,
    defaultMessage: "Company's registered address",
  },

  // brief
  companyName: {
    id: `${scope}.companyName`,
    defaultMessage: 'Company name:',
  },
  clientEmail: {
    id: `${scope}.clientEmail`,
    defaultMessage: 'Client email address:',
  },
  // briefPopup
  addBriefPopupTitle: {
    id: `${scope}.addBriefPopupTitle`,
    defaultMessage: 'Create new brief',
  },
  editBriefPopupTitle: {
    id: `${scope}.editBriefPopupTitle`,
    defaultMessage: 'Edit brief',
  },

  addNew: {
    id: `${scope}.addNew`,
    defaultMessage: 'Add new',
  },
  createBrief: {
    id: `${scope}.createBrief`,
    defaultMessage: 'Create brief',
  },

  // timesheetPopup
  addTimesheetPopupTitle: {
    id: `${scope}.addTimesheetPopupTitle`,
    defaultMessage: 'Add timesheet',
  },
  editTimesheetPopupTitle: {
    id: `${scope}.editTimesheetPopupTitle`,
    defaultMessage: 'Edit timesheet',
  },
  actionLabel: {
    id: `${scope}.actionLabel`,
    defaultMessage: 'Action',
  },
  talentLabel: {
    id: `${scope}.talentLabel`,
    defaultMessage: 'Talent',
  },
  talentNameLabel: {
    id: `${scope}.talentNameLabel`,
    defaultMessage: 'Talent name',
  },

  // quoteModal
  addQuotePopupTitle: {
    id: `${scope}.addQuotePopupTitle`,
    defaultMessage: 'Add quote',
  },
  editQuotePopupTitle: {
    id: `${scope}.editQuotePopupTitle`,
    defaultMessage: 'Edit quote',
  },

  // verificationMail
  verificationMailTextIntro: {
    id: `${scope}.verificationMailTextIntro`,
    defaultMessage: 'We have sent a 6-digits unique verification code to your email',
  },
  verificationPhoneTextIntro: {
    id: `${scope}.verificationPhoneTextIntro`,
    defaultMessage: 'Please enter the 6-digit OTP you received to your phone',
  },
  headingVerificationEmail: {
    id: `${scope}.headingVerificationEmail`,
    defaultMessage: 'Verify your Email',
  },
  labelProjectAchievement: {
    id: `${scope}.labelProjectAchievement`,
    defaultMessage: 'Key Achievement',
  },
  labelStartDate: {
    id: `${scope}.labelStartDate`,
    defaultMessage: 'Start Date',
  },
  labelEndDate: {
    id: `${scope}.labelEndDate`,
    defaultMessage: 'End Date',
  },
  modalAddProjectHeader: {
    id: `${scope}.modalAddProjectHeader`,
    defaultMessage: 'Add Project',
  },
  labelTimeZone: {
    id: `${scope}.labelTimeZone`,
    defaultMessage: 'Time zone',
  },
  placeHolderSelectTimeZone: {
    id: `${scope}.placeHolderSelectTimeZone`,
    defaultMessage: 'Select time zone',
  },
  labelCurrency: {
    id: `${scope}.labelCurrency`,
    defaultMessage: 'Currency',
  },
  chooseCurrency: {
    id: `${scope}.chooseCurrency`,
    defaultMessage: 'Choose Currency',
  },
  labelDISCProfile: {
    id: `${scope}.labelDISCProfile`,
    defaultMessage: 'DISC Profile',
  },
  labelTeamWorking: {
    id: `${scope}.labelTeamWorking`,
    defaultMessage: 'Team Working',
  },
  teamWorkingPlaceholder: {
    id: `${scope}.teamWorkingPlaceholder`,
    defaultMessage: 'Select team working',
  },
  labelCertifications: {
    id: `${scope}.labelCertifications`,
    defaultMessage: 'Certifications',
  },
  certificationPlaceholder: {
    id: `${scope}.certificationPlaceholder`,
    defaultMessage: 'Select certifications',
  },
  labelHourlyRates: {
    id: `${scope}.labelHourlyRates`,
    defaultMessage: 'Hourly rate',
  },
  placeholderNumberEg: {
    id: `${scope}.placeholderNumberEg`,
    defaultMessage: 'e.g. 12345678',
  },
  urlPlaceholder: {
    id: `${scope}.urlPlaceholder`,
    defaultMessage: 'http://',
  },
  BtnProfileComplete: {
    id: `${scope}.BtnProfileComplete`,
    defaultMessage: 'Complete your profile',
  },
  linkViewAll: {
    id: `${scope}.linkViewAll`,
    defaultMessage: 'View all',
  },
  yourTopSkills: {
    id: `${scope}.yourTopSkills`,
    defaultMessage: 'Your top skills',
  },
  topSkills: {
    id: `${scope}.topSkills`,
    defaultMessage: 'Top skills',
  },
  usedSkills: {
    id: `${scope}.usedSkills`,
    defaultMessage: 'Skills & Tools used',
  },
  uploadProfilePicture: {
    id: `${scope}.uploadProfilePicture`,
    defaultMessage: 'Upload your profile picture',
  },
  yourDetails: {
    id: `${scope}.yourDetails`,
    defaultMessage: 'Your details',
  },
  cropperModalHeader: {
    id: `${scope}.cropperModalHeader`,
    defaultMessage: 'Crop, adjust & save',
  },
  sortBy: {
    id: `${scope}.sortBy`,
    defaultMessage: `Sort by`,
  },
  // archiveModal Messages
  archiveModalTitle: {
    id: `${scope}.archiveModalTitle`,
    defaultMessage: 'Are you sure?',
  },
  archiveModalContent: {
    id: `${scope}.archiveModalContent`,
    defaultMessage: 'This action cannot be reversed. Confirm below that you want to archive this brief.',
  },
  SelectPlaceHolder: {
    id: `${scope}.SelectPlaceHolder`,
    defaultMessage: 'Select',
  },
  labelContractType: {
    id: `${scope}.labelContractType`,
    defaultMessage: 'Contract type',
  },
});
