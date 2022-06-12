import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { textFileIcon, projectsIcon, calendarWithTimeIcon, quotesIcon } from 'containers/App/constants';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export const notificationTimeAgo = createdAt => timeAgo.format(new Date(createdAt));

export const talentNotficationRedirectTo = notificationType => {
  let output = { link: '', icon: '', subTitle: '' };

  switch (notificationType) {
    case 'BRIEF_ADDED':
      output = { link: '/talent/job-briefs', icon: textFileIcon, subTitle: 'Briefs' };
      break;
    case 'TALENT_ADDED':
      output = { link: '/talent/my-projects', icon: projectsIcon, subTitle: 'Projects' };
      break;
    case 'TIMESHEET_APPROVED':
    case 'TIMESHEET_INREVIEW':
    case 'TIMESHEET_SETTELED':
      output = { link: '/talent/timesheets', icon: calendarWithTimeIcon, subTitle: 'Timesheets' };
      break;
    default:
  }
  return output;
};

export const agencyNotficationRedirectTo = notificationType => {
  let output = { link: '', icon: '', subTitle: '' };

  switch (notificationType) {
    case 'NEW_QUOTE':
      output = { link: '/talent/quotes', icon: quotesIcon, subTitle: 'Quotes' };
      break;
    case 'TALENT_ADDED':
      output = { link: '/talent/agency-projects', icon: projectsIcon, subTitle: 'Projects' };
      break;
    case 'TIMESHEET_SUBMIT':
    case 'TIMESHEET_INREVIEW':
    case 'TIMESHEET_APPROVED':
    case 'TIMESHEET_SETTELED':
      output = { link: '/talent/timesheets', icon: calendarWithTimeIcon, subTitle: 'Timesheets' };
      break;
    default:
  }
  return output;
};

export const clientNotficationRedirectTo = notificationType => {
  let output = { link: '', icon: '', subTitle: '' };

  switch (notificationType) {
    case 'TALENT_ADDED':
      output = { link: '/client/projects', icon: projectsIcon, subTitle: 'Projects' };
      break;
    case 'TIMESHEET_SUBMIT':
      output = { link: '/client/timesheets', icon: calendarWithTimeIcon, subTitle: 'Timesheets' };
      break;
    default:
  }
  return output;
};

export const notificationRedirectTo = (userType, notificationType) => {
  let output = '';
  switch (userType) {
    case '1':
      output = talentNotficationRedirectTo(notificationType);
      break;
    case '2':
      output = clientNotficationRedirectTo(notificationType);
      break;
    case '3':
      output = agencyNotficationRedirectTo(notificationType);
      break;
    default:
  }
  return output;
};
