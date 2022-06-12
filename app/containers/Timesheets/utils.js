import React from 'react';
import TalentNameButton from 'components/TalentNameButton';

import {
  talentTableColumns,
  clientTableColumns,
  clientDashboardTableColumns,
  agencyTalentTimeSheetTableColumns,
  agencyTalentProjectDetailsTableColumns,
  talentProjectDetailsTableColumns,
  clientProjectDetailsTableColumns,
  talentListingStatusFilter,
  clientListingStatusFilter,
  agencyTableColumns,
  agencyProjectDetailsTableColumns,
  agencyListingStatusFilter,
  adminTableColumns,
  adminProjectDetailsTableColumns,
  adminListingStatusFilter,
} from './constants';

export const getDayWorkClass = howMuchWorked => {
  let output = '';
  if (howMuchWorked === 0.25) output = 'semi-quarter-circle';
  else if (howMuchWorked === 0.5) output = 'half-circle';
  else if (howMuchWorked === 0.75) output = 'quarter-circle';
  else if (howMuchWorked === 1) output = 'active';

  return output;
};

export const sortUrl = sort => {
  const { column, sortDirection } = sort;
  let url = '';
  let val = '';
  const sortValue = sortDirection === 'asc' ? 1 : -1;

  if (column === 'weekStart') {
    val = { dateStart: sortValue, _id: sortValue };
  } else if (column === 'project') {
    val = { projectName: sortValue, _id: sortValue };
  } else if (column === 'timesheetId') {
    val = { _id: sortValue };
  } else if (column === 'talentShortName') {
    val = { talentShortName: sortValue, _id: sortValue };
  } else if (column === 'clientName') {
    val = { clientName: sortValue, _id: sortValue };
  }

  url = column ? `&sort=${encodeURIComponent(JSON.stringify(val))}` : '';
  return url;
};

export const timesheetPageFilter = (userType, registerType) => {
  const output = { filter: [], tableColumns: [] };
  switch (userType) {
    case '1':
      output.filter = talentListingStatusFilter;
      output.tableColumns = registerType === 'agency' ? agencyTalentTimeSheetTableColumns : talentTableColumns;
      break;
    case '2':
      output.filter = clientListingStatusFilter;
      output.tableColumns = clientTableColumns;
      break;
    case '3':
      output.filter = agencyListingStatusFilter;
      output.tableColumns = agencyTableColumns;
      break;
    case '4':
      output.filter = adminListingStatusFilter;
      output.tableColumns = adminTableColumns;
      break;
    default:
  }
  return output;
};

export const timesheetDashFilter = () => {
  const output = { tableColumns: [] };
  output.tableColumns = clientDashboardTableColumns;
  return output;
};

export const projectDetailsPageFilters = (userType, registerType) => {
  const output = { filter: [], tableColumns: [] };

  switch (userType) {
    case '1':
      output.filter = [];
      output.tableColumns = registerType === 'agency' ? agencyTalentProjectDetailsTableColumns : talentProjectDetailsTableColumns;
      break;
    case '2':
      output.filter = [];
      output.tableColumns = clientProjectDetailsTableColumns;
      break;
    case '3':
      output.filter = [];
      output.tableColumns = agencyProjectDetailsTableColumns;
      break;
    case '4':
      output.filter = [];
      output.tableColumns = adminProjectDetailsTableColumns;
      break;
    default:
  }
  return output;
};

export const timesheetFilter = (userType, projectDetailsPage = false, registerType, dashboard = false) => {
  if (dashboard) {
    return timesheetDashFilter();
  }
  return projectDetailsPage ? projectDetailsPageFilters(userType, registerType) : timesheetPageFilter(userType, registerType);
};

export const getShortName = (projectDetailsPage, user, projectID, talentId, talentShortName, profilePicture = '') => {
  let output = '';

  let redirectTo = '';
  let userType = '';

  if (user === '2') {
    redirectTo = '/client/talent-profile/';
    userType = 'client';
  } else if (user === '3') {
    redirectTo = '/agency/talent-profile/';
    userType = 'agency';
  } else if (user === '4') {
    redirectTo = '/admin/talent-profile/';
    userType = 'admin';
  }

  if (projectDetailsPage) {
    const extra = { projectId: projectID, tab: '1' };
    const props = { redirectTo, talentId, redirectType: `${userType}ProjectDetails`, talentName: talentShortName, extra, profilePicture };
    output = <TalentNameButton {...props} />;
  } else {
    const extra = {};
    const props = { redirectTo, talentId, redirectType: `${userType}Timesheets`, talentName: talentShortName, extra, profilePicture };
    output = <TalentNameButton {...props} />;
  }
  return output;
};
