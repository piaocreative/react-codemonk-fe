import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import Emitter from 'utils/emitter';
import { VALIDATION } from 'utils/constants';
import { repoLoadingError, reset } from 'containers/App/actions';
import { API_URL, PROJECT_API, TALENT } from 'containers/App/constants';
import request from 'utils/request';
import ToastifyMessage from 'components/ToastifyMessage';
import { SUBMIT_HIRE } from './constants';

export function* submitAllocate(data) {
  const { data: formData } = data;

  const body = formData;
  const requestURL = `${API_URL}${PROJECT_API}${TALENT}`;
  const method = 'PUT';

  const apiCallData = {
    method,
    body,
  };

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      Emitter.emit('allocateTalentSaga', true);
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
export default function* allocateTalent() {
  yield takeLatest(SUBMIT_HIRE, submitAllocate);
}
