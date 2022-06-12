import { createSelector } from 'reselect';
import { initialState } from './reducer';

const EducationDetailsForm = state => state.EducationDetailsForm || initialState;

const makeSelectEducationDetails = () =>
  createSelector(
    EducationDetailsForm,
    formState => formState.educationDetails,
  );

const makeSelectCertificateDetails = () =>
  createSelector(
    EducationDetailsForm,
    formState => formState.certificateDetails,
  );

const makeSelectCollegeName = () =>
  createSelector(
    EducationDetailsForm,
    formState => formState.collegeName,
  );
const makeSelectCountry = () =>
  createSelector(
    EducationDetailsForm,
    formState => formState.country,
  );
const makeSelectStartYear = () =>
  createSelector(
    EducationDetailsForm,
    formState => formState.startYear,
  );
const makeSelectEndYear = () =>
  createSelector(
    EducationDetailsForm,
    formState => formState.endYear,
  );
const makeSelectDegreeTitle = () =>
  createSelector(
    EducationDetailsForm,
    formState => formState.degreeTitle,
  );
const makeSelectDegreeLevel = () =>
  createSelector(
    EducationDetailsForm,
    formState => formState.degreeLevel,
  );
const makeSelectName = () =>
  createSelector(
    EducationDetailsForm,
    formState => formState.name,
  );
const makeSelectIssuedBy = () =>
  createSelector(
    EducationDetailsForm,
    formState => formState.issuedBy,
  );
const makeSelectDateObtained = () =>
  createSelector(
    EducationDetailsForm,
    formState => formState.dateObtained,
  );
const makeSelectCertificateId = () =>
  createSelector(
    EducationDetailsForm,
    formState => formState.certificateId,
  );

export {
  EducationDetailsForm,
  makeSelectEducationDetails,
  makeSelectCertificateDetails,
  makeSelectCollegeName,
  makeSelectCountry,
  makeSelectStartYear,
  makeSelectEndYear,
  makeSelectDegreeTitle,
  makeSelectDegreeLevel,
  makeSelectName,
  makeSelectIssuedBy,
  makeSelectDateObtained,
  makeSelectCertificateId,
};
