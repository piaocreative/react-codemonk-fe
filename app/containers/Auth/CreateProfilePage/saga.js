/**
 * Gets the repositories of the user from Github
 */
import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import { VALIDATION } from 'utils/constants';
import StorageService from 'utils/StorageService';
import { repoLoadingError, reset } from 'containers/App/actions';
import { gtm } from 'utils/Helper';
import { API_URL, CLIENT, SAVE_LATER_API, PROFILE_DETAIL_API } from 'containers/App/constants';
import ToastifyMessage from 'components/ToastifyMessage';
import { clientRedirectPageURL } from 'containers/App/utils';
import request from 'utils/request';
import { SUBMIT_CREATE_PROFILE_FORM } from './constants';

/**
 * user Forget request/response handler
 */
export function* createProfile(data) {
  const submitType = data.payload;
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

    const authorityPhoneNumber = get(formData, 'companyAuthorityphoneNumber', '').replace(/ /g, '');
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

  let requestURL = '';
  if (submitType === 'saveForLater') {
    apiCallData.body.step = 2;
    requestURL = `${API_URL}${CLIENT}${SAVE_LATER_API}`;
  } else if (submitType === 'continue') {
    requestURL = `${API_URL}${CLIENT}${PROFILE_DETAIL_API}`;
  }

  try {
    // Call our request helper (see 'utils/request')
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      if (submitType === 'continue') {
        yield put(reset());
        const firstName = get(apiCallData, 'body.firstName');
        StorageService.set('firstName', firstName, { hash: true });
        StorageService.set('signupStep', 3, { hash: true });
        const pathname = clientRedirectPageURL(3);
        yield put(push({ pathname }));

        // GTM
        gtm({
          action: 'Button Click',
          event: 'custom_codemonk_event',
          label: 'registration_success',
          category: 'Client Portal',
          userType: registrationType,
          value: 1,
        });
      } else {
        yield put(reset());
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
          className: 'Toast-success',
        });
      }
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
export default function* clientCreateProfileForm() {
  yield takeLatest(SUBMIT_CREATE_PROFILE_FORM, createProfile);
}
