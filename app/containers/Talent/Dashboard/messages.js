/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard component.
 */
import { defineMessages } from 'react-intl';
import StorageService from 'utils/StorageService';

export const scope = 'boilerplate.containers.Dashboard';

const changeEmailContent = `Dear ${StorageService.get('firstName')}, you have been removed by your employer.
 If you want to retain your account with CodeMonk and continue finding great work as a freelancer,
then simply change your email address here`;
export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Dashboard',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Dashboard',
  },
  buttonInvite: {
    id: `${scope}.buttonInvite`,
    defaultMessage: 'Send',
  },
  modelInvitePeopleHeader: {
    id: `${scope}.modelInvitePeopleHeader`,
    defaultMessage: 'Invite people',
  },
  labelInviteLink: {
    id: `${scope}.labelInviteLink`,
    defaultMessage: 'Invite link',
  },
  labelFullName: {
    id: `${scope}.labelFullName`,
    defaultMessage: 'Full name',
  },
  placeholderFullName: {
    id: `${scope}.placeholderFullName`,
    defaultMessage: 'Full name',
  },
  textOR: {
    id: `${scope}.textOR`,
    defaultMessage: 'or',
  },
  buttonCopyLink: {
    id: `${scope}.buttonCopyLink`,
    defaultMessage: 'Copy link',
  },
  buttonAddAnother: {
    id: `${scope}.buttonAddAnother`,
    defaultMessage: 'Add row',
  },
  copiedToClipBoard: {
    id: `${scope}.copiedToClipBoard`,
    defaultMessage: 'Invite link copied to your clipboard.',
  },
  AddTalent: {
    id: `${scope}.AddTalent`,
    defaultMessage: 'Add Talent',
  },
  placeHolderlabelRating: {
    id: `${scope}.placeHolderlabelRating`,
    defaultMessage: 'e.g. 100',
  },
  taskTitle: {
    id: `${scope}.taskTitle`,
    defaultMessage: 'Tasks',
  },
  activeProjectsTitle: {
    id: `${scope}.activeProjectsTitle`,
    defaultMessage: 'Active projects',
  },
  earningAndWithdrawTitle: {
    id: `${scope}.earningAndWithdrawTitle`,
    defaultMessage: 'Earning & Withdraw',
  },
  referAndEarnTitle: {
    id: `${scope}.referAndEarnTitle`,
    defaultMessage: 'Refer & Earn',
  },
  InviteMore: {
    id: `${scope}.InviteMore`,
    defaultMessage: 'Invite more talents like you',
  },
  comingSoon: {
    id: `${scope}.comingSoon`,
    defaultMessage: 'Coming soon',
  },
  agencyNoTalent: {
    id: `${scope}.agencyNoTalent`,
    defaultMessage: 'There is no talent associated with the agency account',
  },
  changeEmail: {
    id: `${scope}.changeEmail`,
    defaultMessage: 'change Email',
  },
  changeEmailContent: {
    id: `${scope}.changeEmailContent`,
    defaultMessage: changeEmailContent,
  },
  BtnChangeProfile: {
    id: `${scope}.BtnChangeProfile`,
    defaultMessage: 'Change Email',
  },
  activeProjects: {
    id: `${scope}.activeProjects`,
    defaultMessage: 'Active projects',
  },
  recommededJobs: {
    id: `${scope}.recommededJobs`,
    defaultMessage: 'Recommended jobs',
  },
  listContent1: {
    id: `${scope}.listContent1`,
    defaultMessage: 'Discover your own skills graph',
  },
  listContent2: {
    id: `${scope}.listContent2`,
    defaultMessage: 'Personalised job matching',
  },
  listContent3: {
    id: `${scope}.listContent3`,
    defaultMessage: 'Quicker hiring process',
  },
  profileInfoContent: {
    id: `${scope}.profileInfoContent`,
    defaultMessage: 'Please complete your profile and start working for fastest growing tech companies and accelerate your career growth:',
  },
});
