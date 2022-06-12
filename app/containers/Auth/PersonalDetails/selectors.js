/**
 * PersonalDetails selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPersonalDetails = state => state.personalDetails || initialState;

const makeSelectFirstName = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.firstName,
  );

const makeSelectLastName = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.lastName,
  );

const makeSelectCountryCode = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.countryCode,
  );

const makeSelectPhoneNumber = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.phoneNumber,
  );

const makeSelectDob = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.dob,
  );

const makeSelectGender = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.gender,
  );

const makeSelectPostcode = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.postcode,
  );

const makeSelectAddressLineOne = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.addressLineOne,
  );

const makeSelectAddressLineTwo = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.addressLineTwo,
  );

const makeSelectCity = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.city,
  );

const makeSelectCountry = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.country,
  );

const makeSelectState = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.state,
  );

const makeSelectTimeZone = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.timeZone,
  );

const makeSelectLanguage = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.language,
  );

const makeSelectLanguageCount = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.language,
  );

const makeSelectLanguageRating = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.language,
  );

const makeSelectLinkedInProfile = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.linkedInUrl,
  );

const makeSelectGithubProfile = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.gitHubUrl,
  );

const makeSelectStackoverflowProfile = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.stackOverFlowUrl,
  );

const makeSelectDribbleProfile = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.dribbbleUrl,
  );

const makeSelectBehanceProfile = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.behanceUrl,
  );

const makeSelectPersonalProfile = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.portfolioUrl,
  );

const makeSelectPrimaryRole = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.primaryRole,
  );
const makeSelectExperience = () =>
  createSelector(
    selectPersonalDetails,
    personalDetailState => personalDetailState.yearsOfExperience,
  );

export {
  selectPersonalDetails,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectCountryCode,
  makeSelectPhoneNumber,
  makeSelectDob,
  makeSelectGender,
  makeSelectPostcode,
  makeSelectAddressLineOne,
  makeSelectAddressLineTwo,
  makeSelectCity,
  makeSelectCountry,
  makeSelectState,
  makeSelectTimeZone,
  makeSelectLanguage,
  makeSelectLanguageCount,
  makeSelectLanguageRating,
  makeSelectLinkedInProfile,
  makeSelectGithubProfile,
  makeSelectStackoverflowProfile,
  makeSelectDribbleProfile,
  makeSelectBehanceProfile,
  makeSelectPersonalProfile,
  makeSelectPrimaryRole,
  makeSelectExperience,
};
