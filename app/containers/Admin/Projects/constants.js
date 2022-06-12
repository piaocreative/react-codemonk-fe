/*
 * AdminProjects Constants
 */

export const key = 'AdminProjects';
export const FILTER_KEYS = ['status'];

export const DEFAULT_PAGE_NO = 1;
export const CHANGE_PROJECTS_ARRAY = 'CodeMonk/AdminProjects/CHANGE_PROJECTS_ARRAY';
export const CHANGE_PROJECT_STATUS = 'CodeMonk/AdminProjects/CHANGE_STATUS';
export const ADD_PROJECT = 'CodeMonk/AdminProjects/ADD_PROJECT';

export const projectStatusPopup = [
  {
    label: 'Proposed',
    value: '1',
  },
  {
    label: 'Discovery',
    value: '2',
  },
  {
    label: 'Kick-off',
    value: '3',
  },
  {
    label: 'In Progress',
    value: '4',
  },
  {
    label: 'On Hold',
    value: '5',
  },
  {
    label: 'Suspended',
    value: '6',
  },
  {
    label: 'Closed',
    value: '7',
  },
];

const adminProjectsColumns1 = [
  {
    name: 'SL No',
    selector: 'number',
    maxWidth: '110px',
    style: {
      paddingLeft: '40px',
    },
  },
  {
    name: 'Project Name',
    selector: 'name',
  },
  {
    name: 'Client Name',
    selector: 'clientName',
  },
  {
    name: 'Company Name',
    selector: 'companyName',
  },
];
const adminProjectsColumns2 = [
  {
    name: 'Start Date',
    selector: 'startDate',
  },
  {
    name: 'End Date',
    selector: 'endDate',
  },
  {
    name: 'Status',
    selector: 'status',
    maxWidth: '165px',
    allowOverflow: true,
  },
  {
    name: '',
    selector: 'action',
    style: {
      paddingRight: '40px',
      justifyContent: 'center',
    },
  },
];
export const adminProjectsColumns = [...adminProjectsColumns1, ...adminProjectsColumns2];
