import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { repoLoadingError, reset } from 'containers/App/actions';
import request from 'utils/request';
import Emitter from 'utils/emitter';
import AuthTokenService from 'utils/AuthTokenService';
import StorageService from 'utils/StorageService';
import { VALIDATION } from 'utils/constants';
import { API_URL, AUTH, VERIFY_ACCOUNT } from 'containers/App/constants';
import ToastifyMessage from 'components/ToastifyMessage';
import { VERIFY_OTP } from './constants';

export function* otpVerify(data) {
  const { data: body, onSuccess } = data;

  const apiCallData = {
    method: 'POST',
    body,
  };

  const requestURL = `${API_URL}${AUTH}${VERIFY_ACCOUNT}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());

      // setValues
      AuthTokenService.storeToken(get(log, 'data.token'));
      StorageService.set('profilePicture', get(log, 'data.profilePicture', ''), { hash: true });
      Emitter.emit('profilePicture', get(log, 'data.profilePicture', ''));
      StorageService.set('firstName', get(log, 'data.firstName', ''), { hash: true });
      StorageService.set('userEmail', get(body, 'email'), { hash: true });

      const registerType = get(log, 'data.registerType');
      StorageService.set('userType', get(log, 'data.role', ''), { hash: true });
      StorageService.set('registerType', registerType, { hash: true });

      let signupStep = get(log, 'data.signupStep') === 0.1 ? 1 : get(log, 'data.signupStep', 0) + 1;
      if (registerType === 'agency') {
        signupStep = signupStep === 7 ? 8 : signupStep;
      }
      StorageService.set('signupStep', signupStep, { hash: true });

      const isPaymentSkipped = get(log, 'data.isPaymentSkipped', false);
      StorageService.set('isPaymentSkipped', isPaymentSkipped, { hash: true });

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

export default function* verificationEmail() {
  yield takeLatest(VERIFY_OTP, otpVerify);
}
