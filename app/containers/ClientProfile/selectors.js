/**
 * clientProfilePage selectors
 */

import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';

const formSelector = formValueSelector(key);

const registrationType = state => formSelector(state, 'registrationType');

const individualfirstName = state => formSelector(state, 'individualfirstName');
const individuallastName = state => formSelector(state, 'individuallastName');
const individualjobTitle = state => formSelector(state, 'individualjobTitle');

const individualpostcode = state => formSelector(state, 'individualpostcode');
const individualtimeZone = state => formSelector(state, 'individualtimeZone');
const individualaddressLineOne = state => formSelector(state, 'individualaddressLineOne');
const individualaddressLineTwo = state => formSelector(state, 'individualaddressLineTwo');
const individualcity = state => formSelector(state, 'individualcity');
const individualcountry = state => formSelector(state, 'individualcountry');

const companyfirstName = state => formSelector(state, 'companyfirstName');
const companylastName = state => formSelector(state, 'companylastName');
const companyjobTitle = state => formSelector(state, 'companyjobTitle');

const companyPersonalpostcode = state => formSelector(state, 'companyPersonalpostcode');
const companyPersonaltimeZone = state => formSelector(state, 'companyPersonaltimeZone');
const companyPersonaladdressLineOne = state => formSelector(state, 'companyPersonaladdressLineOne');
const companyPersonaladdressLineTwo = state => formSelector(state, 'companyPersonaladdressLineTwo');
const companyPersonalcity = state => formSelector(state, 'companyPersonalcity');
const companyPersonalcountry = state => formSelector(state, 'companyPersonalcountry');

const companyName = state => formSelector(state, 'companyName');
const companyregisteredNumber = state => formSelector(state, 'companyregisteredNumber');

const companyPincode = state => formSelector(state, 'companyPincode');
const companyCity = state => formSelector(state, 'companyCity');
const companyCountry = state => formSelector(state, 'companyCountry');
const companyAddressLineOne = state => formSelector(state, 'companyAddressLineOne');
const companyAddressLineTwo = state => formSelector(state, 'companyAddressLineTwo');
const website = state => formSelector(state, 'website');
const vatNumber = state => formSelector(state, 'vatNumber');

const companyAuthorityPersonalDetailsCheckbox = state => formSelector(state, 'companyAuthorityPersonalDetailsCheckbox');

const companyAuthorityfirstName = state => formSelector(state, 'companyAuthorityfirstName');
const companyAuthoritylastName = state => formSelector(state, 'companyAuthoritylastName');
const companyAuthorityemail = state => formSelector(state, 'companyAuthorityemail');
const companyAuthoritycountryCode = state => formSelector(state, 'companyAuthoritycountryCode');
const companyAuthorityphoneNumber = state => formSelector(state, 'companyAuthorityphoneNumber');
const companyAuthorityjobTitle = state => formSelector(state, 'companyAuthorityjobTitle');

const companyAuthorityPersonalAddressCheckbox = state => formSelector(state, 'companyAuthorityPersonalAddressCheckbox');

const companyAuthoritypostcode = state => formSelector(state, 'companyAuthoritypostcode');
const companyAuthoritytimeZone = state => formSelector(state, 'companyAuthoritytimeZone');
const companyAuthorityaddressLineOne = state => formSelector(state, 'companyAuthorityaddressLineOne');
const companyAuthorityaddressLineTwo = state => formSelector(state, 'companyAuthorityaddressLineTwo');
const companyAuthoritycity = state => formSelector(state, 'companyAuthoritycity');
const companyAuthoritycountry = state => formSelector(state, 'companyAuthoritycountry');

const authorityPersonalEditFlag = state => formSelector(state, 'authorityPersonalEditFlag');
const authorityAddressEditFlag = state => formSelector(state, 'authorityAddressEditFlag');

export {
  formSelector,
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
  companyAuthorityaddressLineOne,
  companyAuthorityaddressLineTwo,
  companyAuthoritycity,
  companyAuthoritycountry,
  authorityPersonalEditFlag,
  authorityAddressEditFlag,
};
