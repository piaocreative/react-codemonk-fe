/**
 * enterPhonePageForm selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const enterPhonePageForm = state => state.enterPhonePageForm || initialState;

const makeSelectCountryCode = () =>
  createSelector(
    enterPhonePageForm,
    enterPhonePageFormState => enterPhonePageFormState.countryCode,
  );

const makeSelectPhoneNumber = () =>
  createSelector(
    enterPhonePageForm,
    enterPhonePageFormState => enterPhonePageFormState.phoneNumber,
  );

export { enterPhonePageForm, makeSelectCountryCode, makeSelectPhoneNumber };
