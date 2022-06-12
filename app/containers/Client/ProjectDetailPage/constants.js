export const key = 'projectDetailsForm';

export const EDIT_PROJECT_DETAILS = 'CodeMonk/projectDetailsForm/EDIT_PROJECT_DETAILS';
export const ADD_TALENT = 'CodeMonk/projectDetailsForm/ADD_TALENT';
export const CHANGE_TALENT_STATUS = 'CodeMonk/projectDetailsForm/CHANGE_TALENT_STATUS';
export const SAVE_QUOTE = 'CodeMonk/projectDetailsForm/SAVE_QUOTE';

export const talentListingColumns = [
  {
    name: 'Name',
    selector: 'name',
    style: {
      paddingLeft: '20px',
    },
  },
  {
    name: 'Role',
    selector: 'role',
  },
  {
    name: 'Rate',
    selector: 'rate',
  },
  {
    name: 'Allocation till',
    selector: 'allocationTill',
  },
  {
    name: 'Status',
    selector: 'status',
    maxWidth: '210px',
    allowOverflow: true,
    style: {
      paddingRight: '20px',
    },
  },
];

export const admintalentListingColumns = [
  {
    name: 'Name',
    selector: 'name',
    style: {
      paddingLeft: '20px',
    },
  },
  {
    name: 'Role',
    selector: 'role',
  },
  {
    name: 'Rate',
    selector: 'rate',
  },
  {
    name: 'Start date',
    selector: 'startDate',
    allowOverflow: true,
  },
  {
    name: 'End date',
    selector: 'endDate',
    allowOverflow: true,
  },
  {
    name: 'Status',
    selector: 'status',
    maxWidth: '210px',
    allowOverflow: true,
    style: {
      paddingRight: '20px',
    },
  },
];

export const DEFAULT_PAGE_NO = 1;
export const DEFAULT_PAGE_SIZE = 20;
