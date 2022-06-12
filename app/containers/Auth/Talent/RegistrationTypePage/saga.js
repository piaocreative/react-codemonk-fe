/**
 * Gets the repositories of the user from Github
 */
import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import { VALIDATION } from 'utils/constants';
import StorageService from 'utils/StorageService';
import Emitter from 'utils/emitter';
import { repoLoadingError, reset } from 'containers/App/actions';
import { gtm } from 'utils/Helper';
import { API_URL, TALENT, REGISTER_TYPE_API } from 'containers/App/constants';
import { agencyRedirectPageURL } from 'containers/App/utils';
import request from 'utils/request';
import ToastifyMessage from 'components/ToastifyMessage';
import { SUBMIT_REGISTRATION_TYPE } from './constants';

export function* submitRegistrationType(data) {
  const submitType = data.payload;
  const formData = data.data;

  const { registrationType } = formData;

  const body = {};
  body.registerType = registrationType;

  const apiCallData = {
    method: 'PUT',
    body,
  };

  const requestURL = `${API_URL}${TALENT}${REGISTER_TYPE_API}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      if (submitType === 'continue') {
        // GTM
        gtm({
          action: 'Button Click',
          event: 'custom_codemonk_event',
          label: 'start_registration',
          category: 'Talent Portal',
          userType: `${registrationType}`,
          value: 1,
        });

        yield put(reset());
        const signupStep = 1;
        const userType = registrationType === 'freelancer' ? 1 : 3;
        const registerType = userType === 1 ? 'freelancer' : 'agency';
        StorageService.set('signupStep', signupStep, { hash: true });
        StorageService.set('userType', userType, { hash: true });
        StorageService.set('registerType', registerType, { hash: true });
        let pathname = '';
        if (userType === 1) {
          pathname = '/talent/upload-cv';
        } else if (userType === 3) {
          pathname = agencyRedirectPageURL(1);
        }
        yield put(push({ pathname }));
        Emitter.emit('userTypeSelected', true);
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
export default function* talentRegistrationType() {
  yield takeLatest(SUBMIT_REGISTRATION_TYPE, submitRegistrationType);
}
