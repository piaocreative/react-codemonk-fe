import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { VALIDATION } from 'utils/constants';
import { repoLoadingError, reset } from 'containers/App/actions';
import ToastifyMessage from 'components/ToastifyMessage';
import { API_URL, AGENCY, STATUS } from 'containers/App/constants';
import request from 'utils/request';
import { CHANGE_AGENCY_STATUS } from './constants';

export function* updateAgencyStatus(data) {
  const { data: body, onSuccess } = data;

  const apiCallData = {
    method: 'PUT',
    body,
  };

  const requestURL = `${API_URL}${AGENCY}${STATUS}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      if (typeof onSuccess === 'function') {
        onSuccess();
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
export default function* adminAgencyForm() {
  yield takeLatest(CHANGE_AGENCY_STATUS, updateAgencyStatus);
}
