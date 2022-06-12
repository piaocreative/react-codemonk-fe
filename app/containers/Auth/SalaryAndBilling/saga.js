/**
 * Gets the repositories of the user from Github
 */
import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import StorageService from 'utils/StorageService';
import ToastifyMessage from 'components/ToastifyMessage';
import { redirectPageURL } from 'containers/App/utils';
import { storeApiSignupStep } from 'containers/Auth/utils';
import { repoLoadingError, isLoading, reset } from 'containers/App/actions';
import { API_URL, TALENT, SAVE_LATER_API, VERSION2, PAY_DETAILS_API, TALENT_DASHBOARD } from 'containers/App/constants';
import request from 'utils/request';
import { SUBMIT_SALARYBILL_FORM, SAVE_FOR_LATER, UPDATE_SUCCESS_MESSAGE } from './constants';

/**
 * user Forget request/response handler
 */
export function* submitSalaryBillForm(data) {
  const { payload: submitType, userData: body } = data;

  const formData = new FormData();
  const dataKeys = Object.keys(body);
  dataKeys.forEach(fields => {
    formData.append(fields, body[fields]);
  });

  const requestURL = `${API_URL}${VERSION2}${TALENT}${PAY_DETAILS_API}`;
  const apiCallData = {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
  };

  try {
    // Call our request helper (see 'utils/request')
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      yield put(isLoading(false));
      if (submitType === 'continue') {
        storeApiSignupStep(get(log, 'data.signupStep'));
        const signupStep = 7;
        StorageService.set('signupStep', signupStep, { hash: true });
        const pathname = redirectPageURL(signupStep);

        yield put(push({ pathname }));
      } else if (submitType === 'saveForLater') {
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
          className: 'Toast-success',
        });
        yield put(push({ pathname: TALENT_DASHBOARD }));
      }
    } else {
      toast.error(log.message, { className: 'Toast-error' });
      yield put(repoLoadingError(log.response.statusText));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* submitSalaryBillLater(data) {
  const { payload: submitType, userData } = data;

  const apiCallData = {
    method: 'PUT',
    body: {},
  };

  const requestURL = `${API_URL}${VERSION2}${TALENT}${SAVE_LATER_API}`;
  apiCallData.body = userData;
  apiCallData.body.step = 6;

  try {
    // Call our request helper (see 'utils/request')
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      yield put(isLoading(false));
      if (submitType === 'continue') {
        const signupStep = 7;
        StorageService.set('signupStep', signupStep, { hash: true });
        const pathname = redirectPageURL(signupStep);

        yield put(push({ pathname }));
      } else if (submitType === 'saveForLater') {
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
          className: 'Toast-success',
        });
        yield put(push({ pathname: TALENT_DASHBOARD }));
      } else if (submitType === 'update') {
        toast.success(<ToastifyMessage message={UPDATE_SUCCESS_MESSAGE} type="success" />, {
          className: 'Toast-success',
        });
      }
    } else {
      toast.error(log.message, { className: 'Toast-error' });
      yield put(repoLoadingError(log.response.statusText));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export default function* salaryBillSubmitForm() {
  yield takeLatest(SUBMIT_SALARYBILL_FORM, submitSalaryBillForm);
  yield takeLatest(SAVE_FOR_LATER, submitSalaryBillLater);
}
