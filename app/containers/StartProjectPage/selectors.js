/**
 * StartProjectPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProjectDetails = state => state.projectDetails || initialState;

const makeSelectProjectName = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.name,
  );

const makeSelectProjectDescription = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.description,
  );

const makeSelectWorkProgress = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.buildStatus,
  );

const makeSelectProjectURL = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.projectUrl,
  );

const makeSelectUXDesign = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.lookingForDesign,
  );

const makeSelectSoftwareDevelopment = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.lookingForSoftwareDevelopment,
  );

const makeSelectDevelopmentTeam = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.lookingForDevelopmentTeam,
  );

const makeSelectDataAiMi = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.lookingForDataAiMl,
  );

const makeSelectGrowthHacking = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.lookingForGrowthHacking,
  );

const makeSelectAgileCoach = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.lookingForAgileCoach,
  );

const makeSelectOther = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.lookingForOther,
  );

const makeSelectBudget = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.budget,
  );

const makeSelectMessage = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.messageToPreSales,
  );

const makeSelectProjectSpeed = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.speed,
  );

const makeSelectManageTeam = () =>
  createSelector(
    selectProjectDetails,
    projectDetailState => projectDetailState.teamManageType,
  );

export {
  selectProjectDetails,
  makeSelectProjectName,
  makeSelectProjectDescription,
  makeSelectWorkProgress,
  makeSelectProjectURL,
  makeSelectUXDesign,
  makeSelectSoftwareDevelopment,
  makeSelectDevelopmentTeam,
  makeSelectDataAiMi,
  makeSelectGrowthHacking,
  makeSelectAgileCoach,
  makeSelectOther,
  makeSelectBudget,
  makeSelectMessage,
  makeSelectProjectSpeed,
  makeSelectManageTeam,
};
