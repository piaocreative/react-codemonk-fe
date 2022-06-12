export const key = 'AgencyMyTeamForm';

export const CHANGE_TALENT = 'CodeMonk/AgencyMyTeam/CHANGE_TALENT';
export const SUBMIT_ADD_TALENTS = 'CodeMonk/AgencyMyTeam/SUBMIT_ADD_TALENTS';

export const tableColumns = [
  {
    name: 'Name',
    selector: 'name',
    style: {
      paddingLeft: '40px',
    },
  },
  {
    name: 'Email',
    selector: 'email',
  },
  {
    name: 'Rate',
    selector: 'rate',
  },
  {
    name: 'Availability this week',
    selector: 'availability',
    minWidth: '370px',
  },
  {
    name: 'Status',
    selector: 'status',
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

export const daysArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
