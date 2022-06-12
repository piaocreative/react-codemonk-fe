import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { VALIDATION } from 'utils/constants';
import { repoLoadingError, reset } from 'containers/App/actions';
import { API_URL, VERSION2, TIMESHEET } from 'containers/App/constants';
import request from 'utils/request';
import ToastifyMessage from 'components/ToastifyMessage';
import { SUBMIT_ADD_TIMESHEET } from './constants';

export function* submitTimesheet(data) {
  const { payload, data: body, onSuccess } = data;

  const method = payload === 'add' ? 'POST' : 'PUT';
  const apiCallData = {
    method,
    body,
  };

  const requestURL = payload === 'add' ? `${API_URL}${VERSION2}${TIMESHEET}` : `${API_URL}${VERSION2}${TIMESHEET}/${body.id}`;

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

export default function* addTimesheetForm() {
  yield takeLatest(SUBMIT_ADD_TIMESHEET, submitTimesheet);
}
