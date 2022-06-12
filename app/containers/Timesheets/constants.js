import React from 'react';
import { TableSkeletonCol4 } from 'components/SkeletonLoader';

export const key = 'timesheetForm';

export const SUBMIT_ADD_TIMESHEET = 'CodeMonk/TalentTimesheets/SUBMIT_ADD_TIMESHEET';

export const talentTableColumns = [
  {
    name: 'Week started',
    selector: 'weekStart',
    sortable: true,
    minWidth: '160px',
    style: {
      paddingLeft: '20px',
    },
  },
  {
    name: 'Project',
    selector: 'project',
    sortable: true,
  },
  {
    name: 'Days',
    selector: 'days',
    minWidth: '375px',
  },
  {
    name: 'Logs',
    selector: 'hours',
    maxWidth: '160px',
    right: true,
  },
  {
    name: 'Earning',
    selector: 'earnings',
    maxWidth: '160px',
    right: true,
  },
  {
    name: 'Invoice',
    selector: 'invoice',
    minWidth: '200px',
  },
  {
    name: 'Status',
    selector: 'action',
    style: {
      paddingRight: '20px',
    },
  },
];

export const talentProjectDetailsTableColumns = [
  { ...talentTableColumns[0] },
  { ...talentTableColumns[2] },
  { ...talentTableColumns[3] },
  { ...talentTableColumns[4] },
  { ...talentTableColumns[5] },
  { ...talentTableColumns[6] },
];

export const agencyTalentProjectDetailsTableColumns = [
  { ...talentTableColumns[0] },
  { ...talentTableColumns[2] },
  { ...talentTableColumns[3] },
  { ...talentTableColumns[6] },
];

export const agencyTalentTimeSheetTableColumns = [
  { ...talentTableColumns[0] },
  { ...talentTableColumns[1] },
  { ...talentTableColumns[2] },
  { ...talentTableColumns[3] },
  { ...talentTableColumns[6] },
];

export const clientTableColumns = [
  {
    name: 'Talent',
    selector: 'talentShortName',
    sortable: true,
    style: {
      paddingLeft: '20px',
    },
  },
  {
    name: 'Week started',
    selector: 'weekStart',
    sortable: true,
    minWidth: '160px',
  },
  {
    name: 'Project',
    selector: 'project',
    sortable: true,
  },
  {
    name: 'Days',
    selector: 'days',
    minWidth: '375px',
  },
  {
    name: 'Hours',
    selector: 'hours',
    maxWidth: '130px',
    right: true,
  },
  {
    name: 'Cost',
    selector: 'cost',
    maxWidth: '120px',
    right: true,
  },
  {
    name: 'Action',
    selector: 'action',
    allowOverflow: true,
    style: {
      paddingRight: '20px',
    },
  },
];

export const clientDashboardTableColumns = [
  {
    name: 'Name',
    selector: 'talentShortName',
    sortable: true,
  },
  {
    name: 'Project',
    selector: 'project',
    sortable: true,
  },
  {
    name: 'Week started',
    selector: 'weekStart',
    sortable: true,
    minWidth: '200px',
  },
  {
    name: 'Days',
    selector: 'days',
    minWidth: '375px',
  },
  {
    name: 'Amount',
    selector: 'cost',
    maxWidth: '150px',
    right: true,
  },
  {
    name: 'Actions',
    selector: 'action',
    allowOverflow: true,
    style: {
      paddingRight: '40px',
    },
  },
];

export const clientProjectDetailsTableColumns = [
  { ...clientTableColumns[0], name: 'Name' },
  { ...clientTableColumns[1] },
  { ...clientTableColumns[3] },
  { ...clientTableColumns[4] },
  {
    name: 'Cost',
    selector: 'cost',
    right: true,
    maxWidth: '150px',
    style: {
      paddingRight: '20px',
    },
  },
  { ...clientTableColumns[6] },
];

export const agencyTableColumns = [
  {
    name: 'Week started',
    selector: 'weekStart',
    sortable: true,
    minWidth: '160px',
    style: {
      paddingLeft: '20px',
    },
  },
  {
    name: 'Project',
    selector: 'project',
    sortable: true,
  },
  {
    name: 'Talent',
    selector: 'talentShortName',
    sortable: true,
  },
  {
    name: 'Days',
    selector: 'days',
    minWidth: '375px',
  },
  {
    name: 'Hours',
    selector: 'hours',
    right: true,
    maxWidth: '130px',
  },
  {
    name: 'Earning',
    selector: 'earnings',
    right: true,
    maxWidth: '130px',
  },
  {
    name: 'Invoice',
    selector: 'invoice',
    minWidth: '200px',
  },
  {
    name: 'Status',
    selector: 'action',
    style: {
      paddingRight: '20px',
    },
  },
];

export const agencyProjectDetailsTableColumns = [
  { ...agencyTableColumns[0] },
  { ...agencyTableColumns[2] },
  { ...agencyTableColumns[3] },
  { ...agencyTableColumns[4] },
  { ...agencyTableColumns[5] },
  { ...agencyTableColumns[6] },
  { ...agencyTableColumns[7] },
];

export const adminTableColumns = [
  {
    name: 'ID',
    selector: 'timesheetId',
    sortable: true,
    maxWidth: '170px',
    style: {
      paddingLeft: '20px',
    },
  },
  {
    name: 'Talent',
    selector: 'talentShortName',
    sortable: true,
  },
  {
    name: 'Week started',
    selector: 'weekStart',
    sortable: true,
    maxWidth: '160px',
  },
  {
    name: 'Approved on',
    selector: 'approvedOn',
    sortable: true,
    maxWidth: '160px',
  },
  {
    name: 'Project',
    selector: 'project',
    sortable: true,
  },
  {
    name: 'Client',
    selector: 'clientName',
    sortable: true,
  },
  {
    name: 'Days',
    selector: 'days',
    minWidth: '375px',
  },
  {
    name: 'Bill',
    selector: 'invoice',
    minWidth: '200px',
    center: true,
  },
  {
    name: 'Cost',
    selector: 'cost',
    maxWidth: '120px',
    right: true,
  },
  {
    name: 'Commission',
    selector: 'commission',
    maxWidth: '140px',
    right: true,
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

export const adminProjectDetailsTableColumns = [
  { ...adminTableColumns[0] },
  { ...adminTableColumns[1] },
  { ...adminTableColumns[2] },
  { ...adminTableColumns[5] },
  { ...adminTableColumns[6] },
  { ...adminTableColumns[7] },
  { ...adminTableColumns[8] },
  { ...adminTableColumns[9] },
];

export const ProgressComponent = () => (
  <div className="w-100 flex-column d-flex">
    <TableSkeletonCol4 cardCount={5} />
  </div>
);

export const timesheetStatus = [
  { label: 'Submitted', value: 0 },
  { label: 'Approved', value: 1 },
  { label: 'In review', value: 2 },
  { label: 'Draft', value: 3 },
  { label: 'Settled', value: 4 },
];

export const talentListingStatusFilter = [
  { label: 'All', value: -1 },
  { label: 'Approved', value: 1 },
  { label: 'Submitted', value: 0 },
  { label: 'Draft', value: 3 },
  { label: 'In review', value: 2 },
  { label: 'Settled', value: 4 },
];

export const clientListingStatusFilter = [
  { label: 'All', value: -1 },
  { label: 'Submitted', value: 0 },
  { label: 'Approved', value: 1 },
  { label: 'In review', value: 2 },
  { label: 'Settled', value: 4 },
];

export const agencyListingStatusFilter = [
  { label: 'All', value: -1 },
  { label: 'Draft', value: 3 },
  { label: 'Submitted', value: 0 },
  { label: 'Approved', value: 1 },
  { label: 'In review', value: 2 },
  { label: 'Settled', value: 4 },
];

export const adminListingStatusFilter = [
  { label: 'All', value: -1 },
  { label: 'Draft', value: 3 },
  { label: 'Submitted', value: 0 },
  { label: 'Approved', value: 1 },
  { label: 'In review', value: 2 },
  { label: 'Settled', value: 4 },
];

export const clientActions = [{ label: 'Approve', value: 1 }, { label: 'In Review', value: 2 }];

export const adminActions = [
  { label: 'Submitted', value: 0 },
  { label: 'Approved', value: 1 },
  { label: 'In review', value: 2 },
  { label: 'Settled', value: 4 },
];

export const filetype = 'pdf';
