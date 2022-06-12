export const DEFAULT_PAGE_NO = 1;
export const DEFAULT_PAGE_SIZE = 20;

export const listProjectsColumns = [
  {
    name: 'Name',
    selector: 'name',
    width: '70%',
    style: {
      paddingLeft: '40px',
    },
  },
  {
    name: 'Status',
    selector: 'status',
    minWidth: '170px',
    allowOverflow: true,
  },
  {
    name: '',
    selector: 'action',
    minWidth: '100px',
    style: {
      paddingRight: '40px',
      justifyContent: 'center',
    },
  },
];

export const listAgencyProjectsColumns = [
  {
    name: 'Name',
    selector: 'name',
    width: '40%',
    style: {
      paddingLeft: '40px',
    },
  },
  {
    name: 'Talents working',
    selector: 'talentsWorking',
    width: '30%',
  },
  {
    name: 'Status',
    selector: 'status',
    minWidth: '170px',
    allowOverflow: true,
  },
  {
    name: '',
    selector: 'action',
    minWidth: '100px',
    style: {
      paddingRight: '40px',
      justifyContent: 'center',
    },
  },
];

export const projectStatusArray = [
  {
    label: 'All',
    value: -1,
  },
  {
    label: 'Requested',
    value: 0,
  },
  {
    label: 'Proposed',
    value: 1,
  },
  {
    label: 'Discovery',
    value: 2,
  },
  {
    label: 'Kick-off',
    value: 3,
  },
  {
    label: 'In Progress',
    value: 4,
  },
  {
    label: 'On Hold',
    value: 5,
  },
  {
    label: 'Suspended',
    value: 6,
  },
  {
    label: 'Closed',
    value: 7,
  },
];

export const clientStatusArray = [
  {
    label: 'All',
    value: -1,
  },
  {
    label: 'Active',
    value: 1,
  },
  {
    label: 'Suspended',
    value: 2,
  },
  {
    label: 'Unregistered',
    value: 0,
  },
];
