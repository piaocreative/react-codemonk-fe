/*
 * AdminAgencies Constants
 */
import React from 'react';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';

export const key = 'AdminAgencies';
export const CHANGE_AGENCY_STATUS = 'CodeMonk/AdminAgencies/CHANGE_AGENCY_STATUS';
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

export const agencyActionStatusArray = [
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

export const LinearIndeterminate = () => (
  <div className="w-100 flex-column d-flex">
    <TableSkeletonCol6 cardCount={5} />
  </div>
);
