/**
 * Gets the repositories of the user from Github
 */
import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import ToastifyMessage from 'components/ToastifyMessage';
import { repoLoadingError, isLoading, reset } from 'containers/App/actions';
import { API_URL, CLIENT, SAVE_LATER_API, COMPANY_LOCATION_API } from 'containers/App/constants';
import request from 'utils/request';
import { storeApiSignupStep } from 'containers/Auth/utils';
import { SUBMIT_COMPANY_LOCATION_FORM } from './constants';

/**
 * user Forget request/response handler
 */
export function* getCompanyLocations(data) {
  const { payload: submitType, data: body, onSuccess } = data;

  let method = 'PUT';
  let requestURL = '';

  if (submitType === 'add') {
    method = 'POST';
  } else if (submitType === 'edit') {
    method = 'PUT';
  }

  const apiCallData = { method, body };

  if (submitType === 'saveForLater') {
    apiCallData.body.step = '3';
    requestURL = `${API_URL}${CLIENT}${SAVE_LATER_API}`;
  } else if (submitType === 'add' || submitType === 'edit') {
    requestURL = `${API_URL}${CLIENT}${COMPANY_LOCATION_API}`;
  }

  try {
    // Call our request helper (see 'utils/request')
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      yield put(isLoading(false));
      if (submitType === 'add' || submitType === 'edit') {
        yield put(reset());
        storeApiSignupStep(get(log, 'data.signupStep'));
        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      } else if (submitType === 'saveForLater') {
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
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

export default function* companyLocationForm() {
  yield takeLatest(SUBMIT_COMPANY_LOCATION_FORM, getCompanyLocations);
}
