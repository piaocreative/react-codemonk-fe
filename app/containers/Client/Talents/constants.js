import React from 'react';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';
export const DEFAULT_PAGE_NO = 1;
export const DEFAULT_PAGE_SIZE = 20;

export const CHANGE_TALENT_STATUS = 'CodeMonk/ClientTalents/CHANGE_TALENT_STATUS';
export const key = 'ChangeTalentStatus';

export const columns = [
  {
    name: 'Name',
    selector: 'name',
    style: {
      paddingLeft: '40px',
    },
  },
  {
    name: 'Role',
    selector: 'role',
  },
  {
    name: 'Project',
    selector: 'project',
  },
  {
    name: 'Rate',
    selector: 'rate',
  },
  {
    name: 'Allocation till',
    selector: 'allocation',
  },
  {
    name: 'Status',
    selector: 'status',
    minWidth: '170px',
    allowOverflow: true,
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
