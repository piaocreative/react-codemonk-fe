/**
 * Preferences selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPreferences = state => state.preferenceDetails || initialState;

const makeSelectIndustry = () =>
  createSelector(
    selectPreferences,
    personalDetailState => personalDetailState.industries,
  );
const makeSelectCompanyCultures = () =>
  createSelector(
    selectPreferences,
    personalDetailState => personalDetailState.companyCultures,
  );
const makeSelectCompanyType = () =>
  createSelector(
    selectPreferences,
    personalDetailState => personalDetailState.companyType,
  );
const makeSelectPreferredProject = () =>
  createSelector(
    selectPreferences,
    personalDetailState => personalDetailState.preferredProjectDuration,
  );
const makeSelectTeamPreference = () =>
  createSelector(
    selectPreferences,
    personalDetailState => personalDetailState.teamPreference,
  );

const makeSelectAssignments = () =>
  createSelector(
    selectPreferences,
    personalDetailState => personalDetailState.assignments,
  );

const makeSelectWorkPreference = () =>
  createSelector(
    selectPreferences,
    personalDetailState => personalDetailState.workPreference,
  );

const makeAvailablity = () =>
  createSelector(
    selectPreferences,
    personalDetailState => personalDetailState.availability,
  );

const makeUnavailablity = () =>
  createSelector(
    selectPreferences,
    personalDetailState => personalDetailState.unavailability,
  );

export {
  selectPreferences,
  makeSelectIndustry,
  makeSelectCompanyCultures,
  makeSelectCompanyType,
  makeSelectPreferredProject,
  makeSelectTeamPreference,
  makeSelectAssignments,
  makeSelectWorkPreference,
  makeAvailablity,
  makeUnavailablity,
};
