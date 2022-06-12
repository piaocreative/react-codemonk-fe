import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { VALIDATION } from 'utils/constants';
import Emitter from 'utils/emitter';
import { repoLoadingError, reset, popUpSagaAction } from 'containers/App/actions';
import ToastifyMessage from 'components/ToastifyMessage';
import { API_URL, PROJECT_API, TALENT, STATUS, QUOTE } from 'containers/App/constants';
import request from 'utils/request';
import { EDIT_PROJECT_DETAILS, ADD_TALENT, CHANGE_TALENT_STATUS, SAVE_QUOTE } from './constants';

/**
 * user Forget request/response handler
 */
export function* addTalent(data) {
  const { data: body } = data;

  const apiCallData = {
    method: 'PUT',
    body,
  };

  const requestURL = `${API_URL}${PROJECT_API}${TALENT}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      yield put(popUpSagaAction(false));
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

  const requestURL = `${API_URL}${PROJECT_API}${TALENT}${STATUS}`;

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

export function* editAdminProject(data) {
  const { data: body, onSuccess } = data;

  const apiCallData = {
    method: 'PUT',
    body,
  };

  const requestURL = `${API_URL}${PROJECT_API}`;

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

export function* saveQuote(data) {
  const { payload, data: quoteData, onSuccess } = data;
  const formData = new FormData();

  if (payload === 'add') {
    formData.append('projectId', get(quoteData, 'projectId'));
  } else if (payload === 'edit') {
    formData.append('id', get(quoteData, 'id'));
  }
  formData.append('name', get(quoteData, 'name'));
  formData.append('description', get(quoteData, 'description'));
  formData.append('quote', get(quoteData, 'quote'));

  const method = payload === 'add' ? 'POST' : 'PUT';
  const apiCallData = {
    method,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
  };

  const requestURL = `${API_URL}${QUOTE}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      Emitter.emit('quoteSubmit', true);
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
export default function* projectDetailsForm() {
  yield takeLatest(ADD_TALENT, addTalent);
  yield takeLatest(CHANGE_TALENT_STATUS, updateStatus);
  yield takeLatest(EDIT_PROJECT_DETAILS, editAdminProject);
  yield takeLatest(SAVE_QUOTE, saveQuote);
}
