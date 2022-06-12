import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import { VALIDATION } from 'utils/constants';
import StorageService from 'utils/StorageService';
import { gtm } from 'utils/Helper';
import { repoLoadingError, reset } from 'containers/App/actions';
import { API_URL, TALENT, CV } from 'containers/App/constants';
import request from 'utils/request';
import ToastifyMessage from 'components/ToastifyMessage';
import { SUBMIT_UPLOAD_CV } from './constants';

export function* submitUploadCV(data) {
  const { data: cvFile } = data;

  let submitData = '';
  if (cvFile) {
    const formData = new FormData();
    formData.append('talentCV', cvFile);
    submitData = formData;
  }

  const apiCallData = {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: submitData,
  };

  const requestURL = `${API_URL}${TALENT}${CV}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      // GTM
      gtm({
        action: 'Button Click',
        event: 'custom_codemonk_event',
        label: 'upload_cv',
        category: 'Talent Portal',
        value: 1,
      });

      yield put(reset());

      const signupStep = 1;
      StorageService.set('signupStep', signupStep, { hash: true });

      const pathname = '/talent/about-you';
      yield put(push({ pathname }));
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
export default function* uploadCVForm() {
  yield takeLatest(SUBMIT_UPLOAD_CV, submitUploadCV);
}
