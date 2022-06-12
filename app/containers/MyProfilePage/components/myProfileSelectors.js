/**
 * selectors
 */
import { formValueSelector } from 'redux-form/immutable';

const formSelector = formValueSelector('personalDetails');

const firstName = state => formSelector(state, 'firstName');
const lastName = state => formSelector(state, 'lastName');
const countryCode = state => formSelector(state, 'countryCode');
const phoneNumber = state => formSelector(state, 'phoneNumber');
const dob = state => formSelector(state, 'dob');
const gender = state => formSelector(state, 'gender');
const postcode = state => formSelector(state, 'postcode');
const addressLineOne = state => formSelector(state, 'addressLineOne');
const addressLineTwo = state => formSelector(state, 'addressLineTwo');
const city = state => formSelector(state, 'city');
const country = state => formSelector(state, 'country');
const timeZone = state => formSelector(state, 'timeZone');
const primaryRole = state => formSelector(state, 'primaryRole');
const yearsOfExperience = state => formSelector(state, 'yearsOfExperience');

export {
  firstName,
  lastName,
  countryCode,
  phoneNumber,
  dob,
  gender,
  postcode,
  addressLineOne,
  addressLineTwo,
  city,
  country,
  timeZone,
  primaryRole,
  yearsOfExperience,
};
