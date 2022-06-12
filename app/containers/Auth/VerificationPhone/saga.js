import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';

import { VALIDATION } from 'utils/constants';
import { repoLoadingError, reset } from 'containers/App/actions';
import { makeSelectLocation } from 'containers/App/selectors';
import request from 'utils/request';
import StorageService from 'utils/StorageService';

import { makeSelectOTP } from './selectors';
import { VERIFY_PHONE_OTP, API_URL, CLIENT, VERIFY_NUMBER_API, PHONE_NUMBER_API } from '../../App/constants';
import { resetOTP } from './actions';
import { RESEND_PHONE_CODE } from './constants';
import ToastifyMessage from '../../../components/ToastifyMessage';
/**
 * phone OTP verification
 */
export function* getVerification() {
  let otp = yield select(makeSelectOTP());
  otp = parseInt(otp, 10);

  const data = {
    method: 'PUT',
    body: {
      otp,
    },
  };

  const location = yield select(makeSelectLocation());
  const requestURL = `${API_URL}${CLIENT}${VERIFY_NUMBER_API}`;
  const pathname = `/client/create-profile`;

  try {
    const log = yield call(request, requestURL, data);
    if (get(log, 'status')) {
      yield put(reset());
      StorageService.set('signupStep', 2, { hash: true });
      yield put(push({ pathname, search: location.search }));
    } else {
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(reset());
      yield put(repoLoadingError(get(log, 'message')));
      yield put(resetOTP());
    }
  } catch (err) {
    toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
    yield put(reset());
    yield put(repoLoadingError(err));
    yield put(resetOTP());
  }
}

export function* resendOtp() {
  const countryCode = StorageService.get('userPhoneCountry');
  const phoneNumber = StorageService.get('userPhoneNumber');

  const apiCallData = {
    method: 'PUT',
    body: {
      countryCode,
      phoneNumber,
    },
  };
  const requestURL = `${API_URL}${CLIENT}${PHONE_NUMBER_API}`;

  try {
    const log = yield call(request, requestURL, apiCallData);

    if (get(log, 'status') === 1) {
      toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, { className: 'Toast-success' });
    } else {
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(repoLoadingError(get(log, 'response.statusText')));
    }
  } catch (err) {
    toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* verification() {
  yield takeLatest(VERIFY_PHONE_OTP, getVerification);
  yield takeLatest(RESEND_PHONE_CODE, resendOtp);
}
