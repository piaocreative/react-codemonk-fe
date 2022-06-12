import React from 'react';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';

export const key = 'referralForm';

export const referralTableColumns = [
  {
    name: 'Referrer',
    selector: 'referrer',
    sortable: true,
    style: {
      paddingLeft: '20px',
    },
  },
  {
    name: 'Referral',
    selector: 'referral',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
  },
  {
    name: 'Date Referred',
    selector: 'referredOn',
    sortable: true,
  },
  {
    name: 'Activated',
    selector: 'daysOfRefereeActivated',
    sortable: true,
  },
  {
    name: 'Verified',
    selector: 'daysOfRefereeVerified',
    sortable: true,
  },
  {
    name: 'Hired',
    selector: 'daysOfRefereeHired',
    sortable: true,
  },
  {
    name: 'Status',
    selector: 'status',
    maxWidth: '150px',
    style: {
      paddingRight: '20px',
    },
  },
];

export const ProgressComponent = () => (
  <div className="w-100 flex-column d-flex">
    <TableSkeletonCol6 cardCount={5} />
  </div>
);

export const referralFilter = [
  { label: 'All', value: -1 },
  { label: 'Invited', value: 10 },
  { label: 'Registered', value: 20 },
  { label: 'Active', value: 30 },
  { label: 'Verified', value: 40 },
  { label: 'Hired', value: 50 },
];
