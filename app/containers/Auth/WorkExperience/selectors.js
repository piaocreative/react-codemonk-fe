import { createSelector } from 'reselect';
import { initialState } from './reducer';

const WorkExperienceForm = state => state.WorkExperienceForm || initialState;

const makeSelectExperiences = () =>
  createSelector(
    WorkExperienceForm,
    formState => formState.experiences,
  );

const makeSelectJobTitle = () =>
  createSelector(
    WorkExperienceForm,
    formState => formState.jobTitle,
  );
const makeSelectEmploymentType = () =>
  createSelector(
    WorkExperienceForm,
    formState => formState.employmentType,
  );
const makeSelectEmployer = () =>
  createSelector(
    WorkExperienceForm,
    formState => formState.employer,
  );
const makeSelectCountry = () =>
  createSelector(
    WorkExperienceForm,
    formState => formState.country,
  );
const makeSelectStartDate = () =>
  createSelector(
    WorkExperienceForm,
    formState => formState.startDate,
  );
const makeSelectEndDate = () =>
  createSelector(
    WorkExperienceForm,
    formState => formState.endDate,
  );
const makeSelectShortDescription = () =>
  createSelector(
    WorkExperienceForm,
    formState => formState.shortDescription,
  );

export {
  WorkExperienceForm,
  makeSelectExperiences,
  makeSelectJobTitle,
  makeSelectEmploymentType,
  makeSelectEmployer,
  makeSelectCountry,
  makeSelectStartDate,
  makeSelectEndDate,
  makeSelectShortDescription,
};
