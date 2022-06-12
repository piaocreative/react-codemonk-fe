/**
 * About you selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const companyLocationForm = state => state.companyLocation || initialState;

const makeSelectLocationName = () =>
  createSelector(
    companyLocationForm,
    companyLocationState => companyLocationState.locationName,
  );

const makeSelectPostcode = () =>
  createSelector(
    companyLocationForm,
    companyLocationState => companyLocationState.postcode,
  );

const makeSelectAddressLineOne = () =>
  createSelector(
    companyLocationForm,
    companyLocationState => companyLocationState.addressLineOne,
  );

const makeSelectAddressLineTwo = () =>
  createSelector(
    companyLocationForm,
    companyLocationState => companyLocationState.addressLineTwo,
  );

const makeSelectCity = () =>
  createSelector(
    companyLocationForm,
    companyLocationState => companyLocationState.city,
  );

const makeSelectCountry = () =>
  createSelector(
    companyLocationForm,
    companyLocationState => companyLocationState.country,
  );

const makeSelectState = () =>
  createSelector(
    companyLocationForm,
    companyLocationState => companyLocationState.state,
  );

const makeSelectTimeZone = () =>
  createSelector(
    companyLocationForm,
    companyLocationState => companyLocationState.timezone,
  );

export {
  companyLocationForm,
  makeSelectLocationName,
  makeSelectPostcode,
  makeSelectAddressLineOne,
  makeSelectAddressLineTwo,
  makeSelectCity,
  makeSelectCountry,
  makeSelectState,
  makeSelectTimeZone,
};
