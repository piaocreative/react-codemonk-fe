/**
 * Gets the repositories of the user from Github
 */
import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { VALIDATION } from 'utils/constants';
import Emitter from 'utils/emitter';
import { repoLoadingError, reset } from 'containers/App/actions';
import { API_URL, CLIENT, PROFILE_DETAIL_API } from 'containers/App/constants';
import ToastifyMessage from 'components/ToastifyMessage';
import request from 'utils/request';
import { EDIT_CREATE_PROFILE_FORM } from './constants';

export function* editProfile(data) {
  const formData = data.data;

  const { registrationType } = formData;

  const body = {};
  body.type = registrationType;

  if (registrationType === 'individual') {
    const {
      individualfirstName,
      individuallastName,
      individualjobTitle,
      individualpostcode,
      individualtimeZone,
      individualaddressLineOne,
      individualaddressLineTwo,
      individualcity,
      individualcountry,
    } = formData;

    body.firstName = individualfirstName;
    body.lastName = individuallastName;
    body.jobTitle = individualjobTitle;
    body.postcode = individualpostcode;
    body.timeZone = individualtimeZone;
    body.addressLineOne = individualaddressLineOne;
    body.addressLineTwo = individualaddressLineTwo;
    body.city = individualcity;
    body.country = individualcountry;
  } else if (registrationType === 'company') {
    const {
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

      companyAuthorityfirstName,
      companyAuthoritylastName,
      companyAuthorityemail,
      companyAuthoritycountryCode,
      companyAuthorityphoneNumber,
      companyAuthorityjobTitle,

      companyAuthoritypostcode,
      companyAuthoritytimeZone,
      companyAuthorityaddressLineOne,
      companyAuthorityaddressLineTwo,
      companyAuthoritycity,
      companyAuthoritycountry,
    } = formData;

    body.firstName = companyfirstName;
    body.lastName = companylastName;
    body.jobTitle = companyjobTitle;

    body.postcode = companyPersonalpostcode;
    body.timeZone = companyPersonaltimeZone;
    body.addressLineOne = companyPersonaladdressLineOne;
    body.addressLineTwo = companyPersonaladdressLineTwo;
    body.city = companyPersonalcity;
    body.country = companyPersonalcountry;

    body.companyName = companyName;
    body.companyregisteredNumber = companyregisteredNumber;

    body.companyPincode = companyPincode;
    body.companyCity = companyCity;
    body.companyCountry = companyCountry;
    body.companyAddressLineOne = companyAddressLineOne;
    body.companyAddressLineTwo = companyAddressLineTwo;
    body.website = website;
    body.vatNumber = vatNumber;

    body.authorityFirstName = companyAuthorityfirstName;
    body.authorityLastName = companyAuthoritylastName;
    body.authorityEmail = companyAuthorityemail;
    body.authorityCountryCode = companyAuthoritycountryCode;

    const authorityPhoneNumber = companyAuthorityphoneNumber.replace(/ /g, '');
    body.authorityPhoneNumber = authorityPhoneNumber.replace(/^0+/, '');
    body.authorityJobTitle = companyAuthorityjobTitle;

    body.authorityPostcode = companyAuthoritypostcode;
    body.authorityTimeZone = companyAuthoritytimeZone;
    body.authorityAddressLineOne = companyAuthorityaddressLineOne;
    body.authorityAddressLineTwo = companyAuthorityaddressLineTwo;
    body.authorityCity = companyAuthoritycity;
    body.authorityCountry = companyAuthoritycountry;
  }

  const apiCallData = {
    method: 'PUT',
    body,
  };

  const requestURL = `${API_URL}${CLIENT}${PROFILE_DETAIL_API}`;

  try {
    // Call our request helper (see 'utils/request')
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      Emitter.emit('clientProfileEdit', true);
      toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
        className: 'Toast-success',
      });
    } else {
      yield put(reset());
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(repoLoadingError(get(log, 'message')));
    }
  } catch (err) {
    yield put(reset());
    toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* clientProfileEditForm() {
  yield takeLatest(EDIT_CREATE_PROFILE_FORM, editProfile);
}
