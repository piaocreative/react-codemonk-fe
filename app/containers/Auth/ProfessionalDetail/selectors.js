import { createSelector } from 'reselect';
import { initialState } from './reducer';

const professionalForm = state => state.professionalForm || initialState;

const makeSelectLinkedInProfile = () =>
  createSelector(
    professionalForm,
    formState => formState.linkedInProfile,
  );

const makeSelectGithubProfile = () =>
  createSelector(
    professionalForm,
    formState => formState.githubProfile,
  );

const makeSelectStackoverflowProfile = () =>
  createSelector(
    professionalForm,
    formState => formState.stackoverflowProfile,
  );

const makeSelectDribbleProfile = () =>
  createSelector(
    professionalForm,
    formState => formState.dribbbleProfile,
  );

const makeSelectBehanceProfile = () =>
  createSelector(
    professionalForm,
    formState => formState.behanceProfile,
  );

const makeSelectPersonalProfile = () =>
  createSelector(
    professionalForm,
    formState => formState.personalProfile,
  );

const makeSelectPrimaryRole = () =>
  createSelector(
    professionalForm,
    formState => formState.primaryRole,
  );
const makeSelectExperience = () =>
  createSelector(
    professionalForm,
    formState => formState.yearsOfExperience,
  );

export {
  professionalForm,
  makeSelectLinkedInProfile,
  makeSelectGithubProfile,
  makeSelectStackoverflowProfile,
  makeSelectDribbleProfile,
  makeSelectBehanceProfile,
  makeSelectPersonalProfile,
  makeSelectPrimaryRole,
  makeSelectExperience,
};
