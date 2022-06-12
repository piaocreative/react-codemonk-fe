import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';
import { initialState } from './reducer';

const addDirectos = state => state[key] || initialState;

const makeSelectDirectorsArray = () =>
  createSelector(
    addDirectos,
    formState => formState.directorsArray,
  );

const makeSelectTotalShares = () =>
  createSelector(
    addDirectos,
    formState => formState.totalShares,
  );

// field selectors

const formSelector = formValueSelector(key);
const firstName = state => formSelector(state, 'firstName');
const lastName = state => formSelector(state, 'lastName');
const dob = state => formSelector(state, 'dob');
const companyPincode = state => formSelector(state, 'companyPincode');
const companyCity = state => formSelector(state, 'companyCity');
const companyCountry = state => formSelector(state, 'companyCountry');
const companyAddressLineOne = state => formSelector(state, 'companyAddressLineOne');
const companyAddressLineTwo = state => formSelector(state, 'companyAddressLineTwo');
const shareholder = state => formSelector(state, 'shareholder');
const director = state => formSelector(state, 'director');
const ownership = state => formSelector(state, 'ownership');

export {
  addDirectos,
  makeSelectDirectorsArray,
  makeSelectTotalShares,
  firstName,
  lastName,
  dob,
  companyPincode,
  companyCity,
  companyCountry,
  companyAddressLineOne,
  companyAddressLineTwo,
  shareholder,
  director,
  ownership,
};
