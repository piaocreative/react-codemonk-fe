import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import Emitter from 'utils/emitter';
import { VALIDATION } from 'utils/constants';
import { repoLoadingError, reset } from 'containers/App/actions';
import { API_URL, CLIENT, INTERVIEW } from 'containers/App/constants';
import request from 'utils/request';
import ToastifyMessage from 'components/ToastifyMessage';
import { SUBMIT_HIRE } from './constants';

export function* submitHire(data) {
  const { data: formData } = data;

  const body = formData;
  const requestURL = `${API_URL}${CLIENT}${INTERVIEW}`;
  const method = 'POST';

  const apiCallData = {
    method,
    body,
  };

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      Emitter.emit('hireTalentSaga', true);
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

/**
 * Root saga manages watcher lifecycle
 */
export default function* hireTalent() {
  yield takeLatest(SUBMIT_HIRE, submitHire);
}
