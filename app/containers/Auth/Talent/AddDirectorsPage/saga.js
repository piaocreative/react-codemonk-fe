import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import { VALIDATION } from 'utils/constants';
import StorageService from 'utils/StorageService';
import { repoLoadingError, reset } from 'containers/App/actions';
import { API_URL, AGENCY, SAVE_LATER_API, DIRECTORS } from 'containers/App/constants';
import { agencyRedirectPageURL } from 'containers/App/utils';
import request from 'utils/request';
import ToastifyMessage from 'components/ToastifyMessage';
import { SUBMIT_ADD_DIRECTORS } from './constants';

export function* submitAddDirectors(data) {
  const submitType = data.payload;
  const formData = data.data;

  const body = { directors: formData };

  const apiCallData = {
    method: 'PUT',
    body,
  };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    apiCallData.body.step = 5;
    requestURL = `${API_URL}${AGENCY}${SAVE_LATER_API}`;
  } else if (submitType === 'continue') {
    requestURL = `${API_URL}${AGENCY}${DIRECTORS}`;
  }

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      if (submitType === 'continue') {
        yield put(reset());
        StorageService.set('signupStep', 6, { hash: true });
        const pathname = agencyRedirectPageURL(6);
        yield put(push({ pathname }));
      } else {
        yield put(reset());
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
          className: 'Toast-success',
        });
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
export default function* addDirectors() {
  yield takeLatest(SUBMIT_ADD_DIRECTORS, submitAddDirectors);
}
