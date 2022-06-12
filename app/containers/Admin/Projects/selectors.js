/**
 * selectors
 */
import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';
import { initialState } from './reducer';

const AdminProjects = state => state.personalDetails || initialState;

const formSelector = formValueSelector(key);

const clientName = state => formSelector(state, 'clientName');
const companyName = state => formSelector(state, 'companyName');
const projectName = state => formSelector(state, 'projectName');
const projectSummary = state => formSelector(state, 'projectSummary');
const startDate = state => formSelector(state, 'startDate');
const endDate = state => formSelector(state, 'endDate');
const status = state => formSelector(state, 'status');
const teamPreference = state => formSelector(state, 'teamPreference');

const makeSelectProjectStatus = () =>
  createSelector(
    AdminProjects,
    formState => formState.status,
  );

export {
  AdminProjects,
  clientName,
  companyName,
  projectName,
  projectSummary,
  startDate,
  endDate,
  status,
  makeSelectProjectStatus,
  teamPreference,
};
