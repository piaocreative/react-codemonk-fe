import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { VALIDATION } from 'utils/constants';
import { repoLoadingError, reset, popUpSagaAction } from 'containers/App/actions';
import ToastifyMessage from 'components/ToastifyMessage';
import { API_URL, PROJECT_API, ADMIN, STATUS } from 'containers/App/constants';
import request from 'utils/request';
import { ADD_PROJECT, CHANGE_PROJECT_STATUS } from './constants';

/**
 * user Forget request/response handler
 */
export function* addProject(data) {
  const { data: body } = data;

  const apiCallData = {
    method: 'POST',
    body,
  };

  const requestURL = `${API_URL}${PROJECT_API}${ADMIN}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      yield put(popUpSagaAction(false));
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

export function* updateStatus(data) {
  const { data: body, onSuccess } = data;

  const apiCallData = {
    method: 'PUT',
    body,
  };

  const requestURL = `${API_URL}${PROJECT_API}${STATUS}`;

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
export default function* personalDetailsForm() {
  yield takeLatest(ADD_PROJECT, addProject);
  yield takeLatest(CHANGE_PROJECT_STATUS, updateStatus);
}
