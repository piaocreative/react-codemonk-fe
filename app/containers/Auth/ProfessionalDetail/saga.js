import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import request from 'utils/request';
import { push } from 'react-router-redux';
import StorageService from 'utils/StorageService';
import { redirectPageURL } from 'containers/App/utils';
import { repoLoadingError, reset, popUpSagaAction } from 'containers/App/actions';

import {
  toastMessages,
  API_URL,
  TALENT,
  SAVE_LATER_API,
  PROFESSIONAL_DETAILS,
  PROFESSIONAL_URL_API,
  TALENT_DASHBOARD,
} from 'containers/App/constants';

import ToastifyMessage from 'components/ToastifyMessage';
import { resetProfessionalDetails } from './actions';
import { SAVE_FOR_LATER, EDIT_PROFESSIONAL_URL } from './constants';
import {
  makeSelectLinkedInProfile,
  makeSelectGithubProfile,
  makeSelectStackoverflowProfile,
  makeSelectDribbleProfile,
  makeSelectBehanceProfile,
  makeSelectPersonalProfile,
} from './selectors';

export function* saveForLater(data) {
  const { payload: submitType, data: formData } = data;

  const {
    linkedInProfile: linkedInUrl,
    githubProfile: gitHubUrl,
    stackoverflowProfile: stackOverFlowUrl,
    dribbbleProfile: dribbbleUrl,
    behanceProfile: behanceUrl,
    personalProfile: portfolioUrl,
    primaryRole,
    yearsOfExperience,
  } = formData;
  const body = {
    linkedInUrl,
    gitHubUrl,
    stackOverFlowUrl,
    dribbbleUrl,
    behanceUrl,
    portfolioUrl,
    primaryRole,
    yearsOfExperience,
  };

  const apiCallData = {
    method: 'PUT',
    body,
  };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    apiCallData.body.step = 2;
    requestURL = `${API_URL}${TALENT}${SAVE_LATER_API}`;
  } else if (submitType === 'submitForm') {
    requestURL = `${API_URL}${TALENT}${PROFESSIONAL_DETAILS}`;
  }

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      if (submitType === 'submitForm') {
        yield put(resetProfessionalDetails());

        const signupStep = 3;
        StorageService.set('signupStep', signupStep, { hash: true });
        const pathname = redirectPageURL(signupStep);

        yield put(push({ pathname }));
      } else if (submitType === 'saveForLater') {
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, { className: 'Toast-success' });
        yield put(push({ pathname: TALENT_DASHBOARD }));
      }
    } else {
      yield put(reset());
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(repoLoadingError(get(log, 'message')));
    }
  } catch (err) {
    yield put(reset());
    toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}

export function* editProfessionURL() {
  const body = {};

  const linkedInUrl = yield select(makeSelectLinkedInProfile());
  const gitHubUrl = yield select(makeSelectGithubProfile());
  const stackOverFlowUrl = yield select(makeSelectStackoverflowProfile());
  const dribbbleUrl = yield select(makeSelectDribbleProfile());
  const behanceUrl = yield select(makeSelectBehanceProfile());
  const portfolioUrl = yield select(makeSelectPersonalProfile());

  body.linkedInUrl = linkedInUrl;
  body.gitHubUrl = gitHubUrl;
  body.stackOverFlowUrl = stackOverFlowUrl;
  body.dribbbleUrl = dribbbleUrl;
  body.behanceUrl = behanceUrl;
  body.portfolioUrl = portfolioUrl;

  const userType = StorageService.get('userType');
  if (userType === '3') body.talentId = StorageService.get('talentId');

  const apiCallData = {
    method: 'PUT',
    body,
  };

  let requestURL = '';
  requestURL = `${API_URL}${TALENT}${PROFESSIONAL_URL_API}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      yield put(popUpSagaAction(false));
    } else {
      yield put(reset());
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(repoLoadingError(get(log, 'message')));
    }
  } catch (err) {
    yield put(reset());
    toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}

export default function* professionalForm() {
  yield takeLatest(SAVE_FOR_LATER, saveForLater);
  yield takeLatest(EDIT_PROFESSIONAL_URL, editProfessionURL);
}
