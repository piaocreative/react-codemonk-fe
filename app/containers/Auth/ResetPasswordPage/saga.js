import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { push } from 'react-router-redux';
import { toast } from 'react-toastify';
import { sha256 } from 'js-sha256';
import request from 'utils/request';
import { getUserRoleFromURL } from 'utils/Helper';
import { VALIDATION } from 'utils/constants';

import { repoLoadingError, reset } from 'containers/App/actions';

import ToastifyMessage from 'components/ToastifyMessage';
import { API_URL, AUTH, RESET_PASSWORD_API } from 'containers/App/constants';

import { RESET_PASSWORD } from './constants';
import { makeSelectToken, makeSelectPassword } from './selectors';

export function* resetPassword() {
  const token = yield select(makeSelectToken());
  const password = yield select(makeSelectPassword());

  const body = { token, password: sha256(password) };

  const apiCallData = {
    method: 'POST',
    body,
  };

  const requestURL = `${API_URL}${AUTH}${RESET_PASSWORD_API}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      const pathname = `/${getUserRoleFromURL()}/password-reset-success`;
      yield put(push({ pathname }));
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

export default function* resetPasswordForm() {
  yield takeLatest(RESET_PASSWORD, resetPassword);
}
