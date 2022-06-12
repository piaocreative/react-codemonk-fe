/**
 * CreateProfilePage selectors
 */

import { formValueSelector } from 'redux-form/immutable';

const formSelector = formValueSelector('createProfile');

const registrationType = state => formSelector(state, 'registrationType');

const individualpostcode = state => formSelector(state, 'individualpostcode');
const individualtimeZone = state => formSelector(state, 'individualtimeZone');

const individualfirstName = state => formSelector(state, 'individualfirstName');
const individuallastName = state => formSelector(state, 'individuallastName');
const individualjobTitle = state => formSelector(state, 'individualjobTitle');

const individualaddressLineOne = state => formSelector(state, 'individualaddressLineOne');
const individualaddressLineTwo = state => formSelector(state, 'individualaddressLineTwo');
const individualcity = state => formSelector(state, 'individualcity');
const individualcountry = state => formSelector(state, 'individualcountry');

const companyPersonaltimeZone = state => formSelector(state, 'companyPersonaltimeZone');
const companyPersonalpostcode = state => formSelector(state, 'companyPersonalpostcode');
const companyPersonaladdressLineOne = state => formSelector(state, 'companyPersonaladdressLineOne');
const companyPersonaladdressLineTwo = state => formSelector(state, 'companyPersonaladdressLineTwo');
const companyPersonalcountry = state => formSelector(state, 'companyPersonalcountry');
const companyPersonalcity = state => formSelector(state, 'companyPersonalcity');

const companyfirstName = state => formSelector(state, 'companyfirstName');
const companylastName = state => formSelector(state, 'companylastName');
const companyjobTitle = state => formSelector(state, 'companyjobTitle');

const companyregisteredNumber = state => formSelector(state, 'companyregisteredNumber');
const companyName = state => formSelector(state, 'companyName');

const companyCity = state => formSelector(state, 'companyCity');
const companyPincode = state => formSelector(state, 'companyPincode');
const companyCountry = state => formSelector(state, 'companyCountry');
const companyAddressLineOne = state => formSelector(state, 'companyAddressLineOne');
const companyAddressLineTwo = state => formSelector(state, 'companyAddressLineTwo');
const website = state => formSelector(state, 'website');
const vatNumber = state => formSelector(state, 'vatNumber');

const companyAuthorityfirstName = state => formSelector(state, 'companyAuthorityfirstName');
const companyAuthoritylastName = state => formSelector(state, 'companyAuthoritylastName');
const companyAuthorityemail = state => formSelector(state, 'companyAuthorityemail');
const companyAuthoritycountryCode = state => formSelector(state, 'companyAuthoritycountryCode');
const companyAuthorityphoneNumber = state => formSelector(state, 'companyAuthorityphoneNumber');
const companyAuthorityjobTitle = state => formSelector(state, 'companyAuthorityjobTitle');

const companyAuthorityPersonalDetailsCheckbox = state => formSelector(state, 'companyAuthorityPersonalDetailsCheckbox');

const companyAuthorityPersonalAddressCheckbox = state => formSelector(state, 'companyAuthorityPersonalAddressCheckbox');

const companyAuthorityaddressLineOne = state => formSelector(state, 'companyAuthorityaddressLineOne');
const companyAuthorityaddressLineTwo = state => formSelector(state, 'companyAuthorityaddressLineTwo');
const companyAuthoritypostcode = state => formSelector(state, 'companyAuthoritypostcode');
const companyAuthoritytimeZone = state => formSelector(state, 'companyAuthoritytimeZone');
const companyAuthoritycity = state => formSelector(state, 'companyAuthoritycity');
const companyAuthoritycountry = state => formSelector(state, 'companyAuthoritycountry');

const authorityAddressEditFlag = state => formSelector(state, 'authorityAddressEditFlag');
const authorityPersonalEditFlag = state => formSelector(state, 'authorityPersonalEditFlag');

export {
  registrationType,
  individualfirstName,
  individuallastName,
  individualjobTitle,
  individualpostcode,
  individualtimeZone,
  individualaddressLineOne,
  individualaddressLineTwo,
  individualcity,
  individualcountry,
  companyfirstName,
  companylastName,
  companyjobTitle,
  companyPersonalpostcode,
  companyPersonaltimeZone,
  companyPersonaladdressLineOne,
  companyPersonaladdressLineTwo,
  companyPersonalcity,
  companyPersonalcountry,
  companyName,
  companyregisteredNumber,
  companyPincode,
  companyCity,
  companyCountry,
  companyAddressLineOne,
  companyAddressLineTwo,
  website,
  vatNumber,
  companyAuthorityPersonalDetailsCheckbox,
  companyAuthorityfirstName,
  companyAuthoritylastName,
  companyAuthorityemail,
  companyAuthoritycountryCode,
  companyAuthorityphoneNumber,
  companyAuthorityjobTitle,
  companyAuthorityPersonalAddressCheckbox,
  companyAuthoritypostcode,
  companyAuthoritytimeZone,
  companyAuthorityaddressLineTwo,
  companyAuthorityaddressLineOne,
  companyAuthoritycountry,
  companyAuthoritycity,
  authorityAddressEditFlag,
  authorityPersonalEditFlag,
};
