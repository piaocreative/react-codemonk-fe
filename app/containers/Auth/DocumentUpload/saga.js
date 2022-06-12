import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import request from 'utils/request';
import { push } from 'react-router-redux';
import { ToastifyMessage } from 'components';
import { repoLoadingError, reset } from 'containers/App/actions';
import { toastMessages, API_URL, TALENT, SAVE_LATER_API, TALENT_DASHBOARD } from 'containers/App/constants';
import { EXPERIENCE_SAVE_FOR_LATER } from './constants';

export function* saveForLater(data) {
  const submitType = data.payload;

  const apiCallData = {
    method: 'PUT',
    body: {},
  };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    apiCallData.body.step = 7;
    requestURL = `${API_URL}${TALENT}${SAVE_LATER_API}`;
  }

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      if (submitType === 'saveForLater') {
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, { className: 'Toast-success' });
        yield put(push({ pathname: TALENT_DASHBOARD }));
      }
    } else {
      yield put(reset());
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(repoLoadingError(get(log, 'message')));
    }
  } catch (err) {
    yield put(reset());
    toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}

export default function* WorkExperienceForm() {
  yield takeLatest(EXPERIENCE_SAVE_FOR_LATER, saveForLater);
}
