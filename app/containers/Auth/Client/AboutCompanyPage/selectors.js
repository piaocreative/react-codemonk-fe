/**
 * About you selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const aboutCompanyForm = state => state.aboutCompany || initialState;

const makeSelectName = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.name,
  );
const makeSelectBrand = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.brand,
  );
const makeSelectRegisteredNumber = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.registeredNumber,
  );
const makeSelectVatNumber = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.vatNumber,
  );
const makeSelectIndustry = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.industry,
  );
const makeSelectCompanyType = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.companyType,
  );
const makeSelectCompanyCultures = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.cultures,
  );

const makeSelectLinkedInProfile = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.linkedInUrl,
  );

const makeSelectGithubProfile = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.gitHubUrl,
  );

const makeSelectStackoverflowProfile = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.stackOverFlowUrl,
  );

const makeSelectDribbleProfile = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.dribbbleUrl,
  );

const makeSelectBehanceProfile = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.behanceUrl,
  );

const makeSelectPersonalProfile = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.portfolioUrl,
  );

export {
  makeSelectName,
  makeSelectBrand,
  makeSelectRegisteredNumber,
  makeSelectVatNumber,
  makeSelectIndustry,
  makeSelectCompanyType,
  aboutCompanyForm,
  makeSelectCompanyCultures,
  makeSelectLinkedInProfile,
  makeSelectGithubProfile,
  makeSelectStackoverflowProfile,
  makeSelectDribbleProfile,
  makeSelectBehanceProfile,
  makeSelectPersonalProfile,
};
