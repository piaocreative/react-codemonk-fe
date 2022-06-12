import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { sha256 } from 'js-sha256';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';

import { repoLoadingError, reset } from 'containers/App/actions';

import ToastifyMessage from 'components/ToastifyMessage';
import { API_URL, USER, PASSWORD_API } from 'containers/App/constants';

import { CHANGE_TALENT_PASSWORD } from './constants';
import { makeSelectOldPassword, makeSelectPassword } from './selectors';

export function* changeTalentPassword() {
  const oldPassword = yield select(makeSelectOldPassword());
  const newPassword = yield select(makeSelectPassword());

  const body = { oldPassword: sha256(oldPassword), newPassword: sha256(newPassword) };

  const apiCallData = {
    method: 'PUT',
    body,
  };

  const requestURL = `${API_URL}${USER}${PASSWORD_API}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
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

export default function* updatePasswordForm() {
  yield takeLatest(CHANGE_TALENT_PASSWORD, changeTalentPassword);
}
