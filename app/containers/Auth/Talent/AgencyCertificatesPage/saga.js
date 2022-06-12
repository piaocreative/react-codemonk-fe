import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import { VALIDATION } from 'utils/constants';
import StorageService from 'utils/StorageService';
import Emitter from 'utils/emitter';
import { repoLoadingError, reset } from 'containers/App/actions';
import { API_URL, AGENCY, SAVE_LATER_API, CERTIFICATE_DETAILS, CERTIFICATES, CREDENTIALS } from 'containers/App/constants';
import { agencyRedirectPageURL } from 'containers/App/utils';
import request from 'utils/request';
import ToastifyMessage from 'components/ToastifyMessage';
import { SUBMIT_ADD_CERTIFICATE } from './constants';

export function* submitAddCetificate(data) {
  const submitType = data.payload;
  const formData = data.data;

  const body = formData;

  const apiCallData = {
    method: 'PUT',
    body,
  };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    apiCallData.body.step = 3;
    requestURL = `${API_URL}${AGENCY}${SAVE_LATER_API}`;
  } else if (submitType === 'continue') {
    requestURL = `${API_URL}${AGENCY}${CERTIFICATE_DETAILS}`;
  } else if (submitType === 'editCertificate') {
    requestURL = `${API_URL}${AGENCY}${CERTIFICATES}`;
  } else if (submitType === 'editCredentials') {
    requestURL = `${API_URL}${AGENCY}${CREDENTIALS}`;
  }

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      if (submitType === 'continue') {
        yield put(reset());
        StorageService.set('signupStep', 4, { hash: true });
        const pathname = agencyRedirectPageURL(4);
        yield put(push({ pathname }));
      } else if (submitType === 'editCertificate') {
        yield put(reset());
        Emitter.emit('agencyCertificateSaga', true);
      } else if (submitType === 'editCredentials') {
        yield put(reset());
        Emitter.emit('agencyCredentialsSaga', true);
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
export default function* addCertificate() {
  yield takeLatest(SUBMIT_ADD_CERTIFICATE, submitAddCetificate);
}
