import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';

const formSelector = formValueSelector(key);

const firstName = state => formSelector(state, 'firstName');
const lastName = state => formSelector(state, 'lastName');
const designation = state => formSelector(state, 'designation');
const countryCode = state => formSelector(state, 'countryCode');
const phoneNumber = state => formSelector(state, 'phoneNumber');

const companyName = state => formSelector(state, 'companyName');
const companyregisteredNumber = state => formSelector(state, 'companyregisteredNumber');

const companyPincode = state => formSelector(state, 'companyPincode');
const companyCity = state => formSelector(state, 'companyCity');
const companyCountry = state => formSelector(state, 'companyCountry');
const companyAddressLineOne = state => formSelector(state, 'companyAddressLineOne');
const companyAddressLineTwo = state => formSelector(state, 'companyAddressLineTwo');
const duns = state => formSelector(state, 'duns');
const vatNumber = state => formSelector(state, 'vatNumber');

const tradingName = state => formSelector(state, 'tradingName');
const tradingWebsite = state => formSelector(state, 'tradingWebsite');
const tradingSummary = state => formSelector(state, 'tradingSummary');

const tradingLogo = state => formSelector(state, 'tradingLogo');

const tradingPostCode = state => formSelector(state, 'tradingPostCode');
const tradingCity = state => formSelector(state, 'tradingCity');
const tradingCountry = state => formSelector(state, 'tradingCountry');
const tradingAddressLineOne = state => formSelector(state, 'tradingAddressLineOne');
const tradingAddressLineTwo = state => formSelector(state, 'tradingAddressLineTwo');

const tradingOfficeAddressCheckbox = state => formSelector(state, 'tradingOfficeAddressCheckbox');
const tradingAddressEditFlag = state => formSelector(state, 'tradingAddressEditFlag');

export {
  firstName,
  lastName,
  designation,
  countryCode,
  phoneNumber,
  // company Details
  companyName,
  companyregisteredNumber,
  companyPincode,
  companyCity,
  companyCountry,
  companyAddressLineOne,
  companyAddressLineTwo,
  duns,
  vatNumber,
  // trading details
  tradingName,
  tradingWebsite,
  tradingSummary,
  tradingLogo,
  tradingPostCode,
  tradingCity,
  tradingCountry,
  tradingAddressLineOne,
  tradingAddressLineTwo,
  tradingOfficeAddressCheckbox,
  tradingAddressEditFlag,
};
