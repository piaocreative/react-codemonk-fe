import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import { repoLoadingError, reset } from 'containers/App/actions';
import ToastifyMessage from 'components/ToastifyMessage';
import { API_URL, USER, EMAIL, RESEND_OTP_API, CHANGE } from 'containers/App/constants';
import { SEND_CODE, VERIFY_CODE } from './constants';

export function* sendCode(data) {
  const { payload, data: formData, onSuccess } = data;

  const body = payload === 'resendCode' ? '' : formData;

  const apiCallData = {
    method: 'PUT',
    body,
  };

  let requestURL = '';
  requestURL = payload === 'resendCode' ? `${API_URL}${USER}${EMAIL}${RESEND_OTP_API}` : `${API_URL}${USER}${EMAIL}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, { className: 'Toast-success' });
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

export function* verifyCode(data) {
  const { data: body, onSuccess } = data;

  const apiCallData = {
    method: 'PUT',
    body,
  };

  const requestURL = `${API_URL}${USER}${EMAIL}${CHANGE}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, { className: 'Toast-success' });
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

export default function* chaneEmailAddressForm() {
  yield takeLatest(SEND_CODE, sendCode);
  yield takeLatest(VERIFY_CODE, verifyCode);
}
