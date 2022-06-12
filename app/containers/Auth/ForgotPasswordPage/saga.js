/**
 * Gets the repositories of the user from Github
 */

import React from 'react';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import { repoLoadingError, reset } from 'containers/App/actions';
import { makeSelectLocation } from 'containers/App/selectors';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import { toastMessages, API_URL, AUTH, FORGOT_PASSWORD_API } from 'containers/App/constants';
import { verifyEmailLink } from 'containers/App/utils';
import ToastifyMessage from 'components/ToastifyMessage';
import { FORGOT_PASSWORD_SUBMIT } from './constants';
import { makeSelectEmail } from './selectors';
/**
 * user Forget request/response handler
 */
export function* forgotPasswordSubmit() {
  const email = yield select(makeSelectEmail());
  const data = {
    method: 'POST',
    body: {
      email,
    },
  };
  const location = yield select(makeSelectLocation());
  const requestURL = `${API_URL}${AUTH}${FORGOT_PASSWORD_API}`;
  try {
    const log = yield call(request, requestURL, data);
    if (get(log, 'status')) {
      yield put(reset());
      const pathname = StorageService.get('selectedRoleType') === 'agency' ? '/agency/verifyemail' : verifyEmailLink;
      yield put(push({ pathname, search: location.search }));
    } else {
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(repoLoadingError(log.message));
    }
  } catch (err) {
    toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* forgotPassword() {
  yield takeLatest(FORGOT_PASSWORD_SUBMIT, forgotPasswordSubmit);
}
