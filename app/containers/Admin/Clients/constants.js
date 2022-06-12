/*
 * AdminClients Constants
 */

export const key = 'AdminClients';
export const CHANGE_CLIENT_STATUS = 'CodeMonk/AdminClients/CHANGE_STATUS';
export const DEFAULT_PAGE_NO = 1;
export const FILTER_KEYS = ['status'];

export const columns = [
  {
    name: 'SL No',
    selector: 'number',
    maxWidth: '110px',
    style: {
      paddingLeft: '40px',
    },
  },
  {
    name: 'Name',
    selector: 'name',
  },
  {
    name: 'Company Name',
    selector: 'compnayName',
  },
  {
    name: 'Email',
    selector: 'email',
  },
  {
    name: 'Status',
    selector: 'status',
  },
  {
    name: 'Action',
    selector: 'action',
    allowOverflow: true,
    style: {
      paddingRight: '40px',
    },
  },
];

export const clientActionStatusArray = [
  {
    label: 'All',
    value: -1,
  },
  {
    label: 'Active',
    value: 1,
  },
  {
    label: 'Suspend',
    value: 2,
  },
  {
    label: 'Unregistered',
    value: 0,
  },
];
