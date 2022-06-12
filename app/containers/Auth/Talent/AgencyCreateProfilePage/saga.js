import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import { VALIDATION } from 'utils/constants';
import StorageService from 'utils/StorageService';
import Emitter from 'utils/emitter';
import { repoLoadingError, reset } from 'containers/App/actions';
import { API_URL, AGENCY, SAVE_LATER_API, PROFILE_DETAIL_API } from 'containers/App/constants';
import { agencyRedirectPageURL } from 'containers/App/utils';
import request from 'utils/request';
import ToastifyMessage from 'components/ToastifyMessage';
import { SUBMIT_CREATE_PROFILE_FORM } from './constants';

export function* createProfile(data) {
  const submitType = data.payload;
  const formData = data.data;

  const body = new FormData();

  const {
    firstName,
    lastName,
    designation,
    countryCode,

    companyName: agencyName,
    companyregisteredNumber: registeredNumber,
    companyPincode: agencyPostCode,
    companyCity: agencyCity,
    companyCountry: agencyCountry,
    companyAddressLineOne: agencyAddressLineOne,
    companyAddressLineTwo: agencyAddressLineTwo,
    duns,
    vatNumber: agencyVatNumber,

    tradingName,
    tradingWebsite,
    tradingSummary,
    tradingLogo,
    tradingPostCode,
    tradingCity,
    tradingCountry,
    tradingAddressLineOne,
    tradingAddressLineTwo,
  } = formData;

  let phoneNumber = get(formData, 'phoneNumber', '').replace(/ /g, '');
  phoneNumber = phoneNumber.replace(/^0+/, '');

  const userFormData = {
    firstName,
    lastName,
    designation,
    countryCode,
    phoneNumber,

    agencyName,
    registeredNumber,
    agencyPostCode,
    agencyCity,
    agencyCountry,
    agencyAddressLineOne,
    agencyAddressLineTwo,
    duns,
    agencyVatNumber,

    tradingName,
    tradingWebsite,
    tradingSummary,
    tradingLogo,
    tradingPostCode,
    tradingCity,
    tradingCountry,
    tradingAddressLineOne,
    tradingAddressLineTwo,
  };

  if (submitType === 'editProfile') {
    delete userFormData.countryCode;
    delete userFormData.phoneNumber;
  }

  Object.keys(userFormData).forEach(fieldKey => {
    body.append(fieldKey, userFormData[fieldKey]);
  });

  if (submitType === 'saveForLater') {
    body.append('step', 1);
  }

  const apiCallData = {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: body,
  };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    requestURL = `${API_URL}${AGENCY}${SAVE_LATER_API}`;
  } else if (submitType === 'continue' || submitType === 'editProfile') {
    requestURL = `${API_URL}${AGENCY}${PROFILE_DETAIL_API}`;
  }

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      if (submitType === 'continue') {
        yield put(reset());
        StorageService.set('signupStep', 2, { hash: true });
        const pathname = agencyRedirectPageURL(2);
        yield put(push({ pathname }));
      } else if (submitType === 'editProfile') {
        yield put(reset());
        StorageService.set('agencyLogo', get(log, 'data'), { hash: true });
        Emitter.emit('agencyLogo', get(log, 'data'));
        Emitter.emit('agencyPersonalSaga', true);
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
export default function* agencyCreateProfile() {
  yield takeLatest(SUBMIT_CREATE_PROFILE_FORM, createProfile);
}
