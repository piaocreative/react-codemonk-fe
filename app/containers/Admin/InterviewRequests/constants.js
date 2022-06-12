/*
 * AdminInterviews Constants
 */

import React from 'react';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';

export const key = 'AdminInterviews';

export const CHANGE_PROJECTS_ARRAY = 'CodeMonk/AdminInterviews/CHANGE_PROJECTS_ARRAY';
export const CHANGE_INTERVIEW_STATUS = 'CodeMonk/AdminInterviews/CHANGE_INTERVIEW_STATUS';

export const DEFAULT_PAGE_NO = 1;
export const FILTER_KEYS = ['status'];

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
    label: 'In Progress',
    value: 1,
  },
  {
    label: 'Done',
    value: 2,
  },
];

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
    name: 'Date Requested',
    selector: 'dateRequested',
  },
  {
    name: 'Client Name',
    selector: 'clientName',
  },
  {
    name: 'Company Name',
    selector: 'companyName',
  },
  {
    name: 'Project Name',
    selector: 'name',
  },
  {
    name: 'Talent Name',
    selector: 'talentName',
  },
  {
    name: 'Status',
    selector: 'status',
    minWidth: '150px',
    allowOverflow: true,
  },
  {
    name: '',
    selector: 'action',
    maxWidth: '100px',
    style: {
      paddingRight: '40px',
    },
  },
];

export const LinearIndeterminate = () => (
  <div className="w-100 flex-column d-flex">
    <TableSkeletonCol6 cardCount={5} />
  </div>
);
