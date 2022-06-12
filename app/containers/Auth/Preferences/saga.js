/**
 * Gets the repositories of the user from Github
 */
import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import { repoLoadingError, isLoading, popUpSagaAction } from 'containers/App/actions';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import { redirectPageURL } from 'containers/App/utils';
import { storeApiSignupStep } from 'containers/Auth/utils';
import ToastifyMessage from 'components/ToastifyMessage';
import {
  API_URL,
  PREFERENCES_DETAILS_API,
  TALENT,
  SAVE_LATER_API,
  PREFERENCES,
  AVAILABILITY,
  VERSION2,
  TALENT_DASHBOARD,
} from 'containers/App/constants';
import { SUBMIT_PREFERENCE_DETAILS_FORM } from './constants';

/**
 * user Forget request/response handler
 */
export function* getPreference(data) {
  const { payload: submitType, data: body } = data;

  const apiCallData = {
    method: 'PUT',
    body,
  };

  let requestURL = '';
  const userType = Number(StorageService.get('userType'));
  if (submitType === 'saveForLater') {
    requestURL = `${API_URL}${VERSION2}${TALENT}${SAVE_LATER_API}`;
    apiCallData.body.step = 5;
  } else if (submitType === 'continue') {
    requestURL = `${API_URL}${VERSION2}${TALENT}${PREFERENCES_DETAILS_API}`;
  } else if (submitType === 'editPreference') {
    delete apiCallData.body.availability;
    delete apiCallData.body.unavailability;

    if (userType === 3) apiCallData.body.talentId = StorageService.get('talentId');

    requestURL = `${API_URL}${TALENT}${PREFERENCES}`;
  } else if (submitType === 'editAvailability') {
    delete apiCallData.body.industries;
    delete apiCallData.body.companyCultures;
    delete apiCallData.body.companyType;
    delete apiCallData.body.preferredProjectDuration;
    delete apiCallData.body.teamPreference;
    delete apiCallData.body.assignments;
    delete apiCallData.body.workPreference;

    if (userType === 3) apiCallData.body.talentId = StorageService.get('talentId');

    requestURL = `${API_URL}${TALENT}${AVAILABILITY}`;
  }

  try {
    // Call our request helper (see 'utils/request')
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(isLoading(false));
      if (submitType === 'continue') {
        storeApiSignupStep(get(log, 'data.signupStep'));
        const registerType = StorageService.get('registerType');
        const isUserAgencyTalent = registerType === 'agency' && userType === 1;
        const signupStep = 6;
        StorageService.set('signupStep', signupStep, { hash: true });
        let pathname = '';
        if (isUserAgencyTalent) {
          pathname = TALENT_DASHBOARD;
        } else {
          pathname = redirectPageURL(signupStep);
        }
        yield put(push({ pathname }));
      } else if (submitType === 'editPreference') {
        yield put(popUpSagaAction(false));
      } else if (submitType === 'editAvailability') {
        yield put(popUpSagaAction(false));
      } else if (submitType === 'saveForLater') {
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, { className: 'Toast-success' });
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

/**
 * Root saga manages watcher lifecycle
 */
export default function* preferenceForm() {
  yield takeLatest(SUBMIT_PREFERENCE_DETAILS_FORM, getPreference);
}
