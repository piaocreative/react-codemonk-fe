import containerMessage from 'containers/messages';

export const timesheetColumns = [
  {
    name: 'Week started',
    selector: 'weekStart',
    sortable: true,
    minWidth: '200px',
    style: {
      paddingLeft: '20px',
    },
  },
  {
    name: 'Days',
    selector: 'days',
    minWidth: '375px',
  },
  {
    name: 'Status',
    selector: 'action',
    style: {
      paddingRight: '20px',
    },
  },
];

export const projectDetailsTabItems = [
  {
    name: containerMessage.tabTimesheet,
    tabIndex: '1',
  },
  {
    name: containerMessage.tabTeam,
    tabIndex: '2',
  },
  {
    name: containerMessage.tabOpenRoles,
    tabIndex: '3',
  },
  {
    name: containerMessage.tabOtherInfo,
    tabIndex: '4',
  },
];
