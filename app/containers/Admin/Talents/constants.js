/*
 * AdminTalents Constants
 */
import React from 'react';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';

export const key = 'AdminTalents';
export const CHANGE_TALENT_STATUS = 'CodeMonk/AdminTalents/CHANGE_STATUS';
export const CHANGE_SWITCH_STATUS = 'CodeMonk/AdminTalents/CHANGE_SWITCH_STATUS';
export const minDateRateValue = 0;
export const maxDateRateValue = 500;
export const defaultDayRateValue = [minDateRateValue, maxDateRateValue];

export const FILTER_KEYS = [
  'status',
  'role',
  'yearsOfExperience',
  'type',
  'teamPreference',
  'workPreference',
  'assignment',
  'availability',
  'teamWorking',
  'location',
  'degreeLevel',
  'language',
  'skillsArray',
  'industry',
  'discProfile',
  'companyCultures',
  'certification',
  'dayRate',
];
export const DEFAULT_PAGE_NO = 1;

export const initialValues = {
  role: ['all'],
  yearsOfExperience: ['all'],
  status: 'all',
  type: 'all',
  teamPreference: ['all'],
  assignment: ['all'],
  workPreference: ['all'],
  availability: 'all',
  teamWorking: 'all',
  degreeLevel: ['all'],
  location: ['all'],
  language: ['all'],
  skillsArray: [],
  industry: [],
  discProfile: [],
  companyCultures: [],
  certification: [],
};

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
    name: 'Logs',
    selector: 'logs',
    maxWidth: '100px',
  },
  {
    name: 'Full name',
    selector: 'name',
  },
  {
    name: 'Email address',
    selector: 'email',
  },
  {
    name: 'Phone number',
    selector: 'phoneNumber',
  },
  {
    name: 'Type',
    selector: 'type',
  },
  {
    name: 'Status',
    selector: 'status',
    maxWidth: '185px',
    allowOverflow: true,
  },
  {
    name: '',
    selector: 'action',
    maxWidth: '185px',
    style: {
      paddingRight: '40px',
      justifyContent: 'center',
    },
  },
];

export const talentStatusArray = [
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

export const clientStatusArray = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Suspended',
    value: 'suspended',
  },
  {
    label: 'Unregistered',
    value: 'unregistered',
  },
];

export const talentTypeArray = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Freelancer',
    value: 'freelancer',
  },
  {
    label: 'Agency',
    value: 'agency',
  },
];

export const LinearIndeterminate = () => (
  <div className="w-100 flex-column d-flex">
    <TableSkeletonCol6 cardCount={5} />
  </div>
);
