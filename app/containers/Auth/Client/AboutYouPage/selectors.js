/**
 * About you selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const aboutYouForm = state => state.aboutYou || initialState;

const makeSelectFirstName = () =>
  createSelector(
    aboutYouForm,
    aboutYouState => aboutYouState.firstName,
  );

const makeSelectLastName = () =>
  createSelector(
    aboutYouForm,
    aboutYouState => aboutYouState.lastName,
  );

const makeSelectCountryCode = () =>
  createSelector(
    aboutYouForm,
    aboutYouState => aboutYouState.countryCode,
  );

const makeSelectPhoneNumber = () =>
  createSelector(
    aboutYouForm,
    aboutYouState => aboutYouState.phoneNumber,
  );

const makeSelectJobTitle = () =>
  createSelector(
    aboutYouForm,
    aboutYouState => aboutYouState.jobTitle,
  );

const makeSelectJobRole = () =>
  createSelector(
    aboutYouForm,
    aboutYouState => aboutYouState.jobRole,
  );

export {
  aboutYouForm,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectCountryCode,
  makeSelectPhoneNumber,
  makeSelectJobTitle,
  makeSelectJobRole,
};
