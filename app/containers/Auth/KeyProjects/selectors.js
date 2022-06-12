import { createSelector } from 'reselect';
import { initialState } from './reducer';

const keyProjectForm = state => state.keyProjectForm || initialState;

const makeSelectProjects = () =>
  createSelector(
    keyProjectForm,
    formState => formState.projects,
  );

const makeSelectName = () =>
  createSelector(
    keyProjectForm,
    formState => formState.name,
  );
const makeSelectUrl = () =>
  createSelector(
    keyProjectForm,
    formState => formState.url,
  );
const makeSelectDescription = () =>
  createSelector(
    keyProjectForm,
    formState => formState.description,
  );
const makeSelectRole = () =>
  createSelector(
    keyProjectForm,
    formState => formState.role,
  );
const makeSelectEmployer = () =>
  createSelector(
    keyProjectForm,
    formState => formState.employer,
  );
const makeSelectIndustry = () =>
  createSelector(
    keyProjectForm,
    formState => formState.industry,
  );
const makeSelectEmploymentType = () =>
  createSelector(
    keyProjectForm,
    formState => formState.employmentType,
  );
const makeSelectSkills = () =>
  createSelector(
    keyProjectForm,
    formState => formState.skills,
  );

const makeSelectSkillsCount = () =>
  createSelector(
    keyProjectForm,
    formState => formState.skills,
  );

const makeSelectSkillsRating = () =>
  createSelector(
    keyProjectForm,
    formState => formState.skills,
  );

export {
  keyProjectForm,
  makeSelectProjects,
  makeSelectName,
  makeSelectUrl,
  makeSelectDescription,
  makeSelectRole,
  makeSelectEmployer,
  makeSelectIndustry,
  makeSelectEmploymentType,
  makeSelectSkills,
  makeSelectSkillsCount,
  makeSelectSkillsRating,
};
