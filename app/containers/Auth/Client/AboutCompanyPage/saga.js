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
import { clientRedirectPageURL } from 'containers/App/utils';
import { repoLoadingError, isLoading, reset } from 'containers/App/actions';
import { API_URL, CLIENT, SAVE_LATER_API, ABOUT_COMPANY_API } from 'containers/App/constants';
import request from 'utils/request';
import { storeApiSignupStep } from 'containers/Auth/utils';
import { SUBMIT_ABOUT_COMPANY_FORM } from './constants';

/**
 * user Forget request/response handler
 */
export function* getAboutCompanyDetails(data) {
  const { payload: submitType, data: body } = data;

  const formData = new FormData();
  formData.append('logo', body.logo);
  formData.append('name', body.name);
  formData.append('brand', body.brand);
  formData.append('registeredNumber', body.registeredNumber);
  formData.append('vatNumber', body.vatNumber);
  formData.append('industry', body.industry);
  formData.append('companyType', body.companyType);
  formData.append('cultures', body.cultures);
  formData.append('linkedInUrl', body.linkedInUrl);
  formData.append('gitHubUrl', body.gitHubUrl);
  formData.append('stackOverFlowUrl', body.stackOverFlowUrl);
  formData.append('dribbbleUrl', body.dribbbleUrl);
  formData.append('behanceUrl', body.behanceUrl);
  formData.append('portfolioUrl', body.portfolioUrl);
  formData.append('step', '2');

  const apiCallData = {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
  };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    requestURL = `${API_URL}${CLIENT}${SAVE_LATER_API}`;
  } else if (submitType === 'continue') {
    requestURL = `${API_URL}${CLIENT}${ABOUT_COMPANY_API}`;
  }

  try {
    // Call our request helper (see 'utils/request')
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      yield put(isLoading(false));
      if (submitType === 'continue') {
        storeApiSignupStep(get(log, 'data.signupStep'));
        const signupStep = 2;
        StorageService.set('signupStep', signupStep, { hash: true });
        const pathname = clientRedirectPageURL(3);
        yield put(push({ pathname }));
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

export default function* aboutCompanyForm() {
  yield takeLatest(SUBMIT_ABOUT_COMPANY_FORM, getAboutCompanyDetails);
}
