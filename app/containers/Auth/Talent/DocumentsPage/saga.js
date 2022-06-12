import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import request from 'utils/request';
import { push } from 'react-router-redux';
import { gtm } from 'utils/Helper';
import StorageService from 'utils/StorageService';
import { agencyRedirectPageURL } from 'containers/App/utils';
import { VALIDATION } from 'utils/constants';
import { repoLoadingError, reset } from 'containers/App/actions';
import { API_URL, AGENCY, TALENTS_INVITE_API } from 'containers/App/constants';
import { ToastifyMessage } from 'components';
import { SAVE_FOR_LATER } from './constants';

export function* saveForLater(data) {
  const { payload: submitType } = data;

  const apiCallData = {
    method: 'POST',
  };

  let requestURL = '';

  requestURL = `${API_URL}${AGENCY}${TALENTS_INVITE_API}`;
  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      if (submitType === 'submitForm') {
        yield put(reset());
        StorageService.set('signupStep', 7, { hash: true });
        const pathname = agencyRedirectPageURL(7);
        yield put(push({ pathname }));

        // GTM
        gtm({
          action: 'Button Click',
          event: 'custom_codemonk_event',
          label: 'registration_success',
          category: 'Talent Portal',
          userType: 'agency',
          value: 1,
        });
      }
    } else {
      yield put(reset());
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, {
        className: 'Toast-error',
      });
      yield put(repoLoadingError(get(log, 'message')));
    }
  } catch (err) {
    yield put(reset());
    toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, {
      className: 'Toast-error',
    });
    yield put(repoLoadingError(err));
  }
}

export default function* keyProjectForm() {
  yield takeLatest(SAVE_FOR_LATER, saveForLater);
}
