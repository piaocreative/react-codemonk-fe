/**
 * Gets the repositories of the user from Github
 */

import React from 'react';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import has from 'lodash/has';
import { push } from 'react-router-redux';
import { repoLoadingError, reset } from 'containers/App/actions';
import { makeSelectLocation } from 'containers/App/selectors';
import request from 'utils/request';
import Emitter from 'utils/emitter';
import { storeApiSignupStep } from 'containers/Auth/utils';
import AuthTokenService from 'utils/AuthTokenService';
import StorageService from 'utils/StorageService';
import { gtm } from 'utils/Helper';
import { ToastifyMessage } from 'components';
import { redirectPageURL, agencyRedirectPageURL, clientRedirectPageURL } from 'containers/App/utils';
import { toastMessages, API_URL, VERSION2, AUTH, CLIENT, SIGN_UP_API, AGENCY, TALENT } from 'containers/App/constants';
import { makeSelectEmail, makeSelectPassword, makeSelectReferralVal } from './selectors';

import { SIGN_UP } from './constants';
/**
 * user Forget request/response handler
 */
export function* getSignup(data) {
  const { agencyTalent, talentToken } = data;

  let email = yield select(makeSelectEmail());
  email = email ? email.replace(/ /g, '') : '';
  const password = yield select(makeSelectPassword());
  const referral = yield select(makeSelectReferralVal());

  const apiCallData = {
    method: 'POST',
    body: {
      email,
      password,
    },
  };

  let requestURL = '';
  const selectedRoleType = StorageService.get('selectedRoleType');
  if (selectedRoleType === 'client') {
    requestURL = `${API_URL}${AUTH}${CLIENT}${SIGN_UP_API}`;
  }
  if (selectedRoleType === 'agency') {
    requestURL = `${API_URL}${AUTH}${SIGN_UP_API}`;
  }
  if (selectedRoleType === 'talent') {
    apiCallData.body.referral = referral;
    requestURL = `${API_URL}${VERSION2}${AUTH}${TALENT}${SIGN_UP_API}`;
  }
  if (agencyTalent) {
    apiCallData.body.token = talentToken;
    requestURL = `${API_URL}${AUTH}${AGENCY}${TALENT}${SIGN_UP_API}`;
  }
  const location = yield select(makeSelectLocation());
  function redirectRespectivePage(userType, log, registerType, pathname) {
    if (userType === 1) {
      storeApiSignupStep(get(log, 'data.signupStep'));
      let signupStep = get(log, 'data.signupStep') === 0.1 ? 1 : get(log, 'data.signupStep', 0) + 1;
      if (registerType === 'agency') {
        signupStep = signupStep === 7 ? 8 : signupStep;
      }
      StorageService.set('signupStep', signupStep, { hash: true });
      pathname = redirectPageURL(signupStep);
    } else if (userType === 3) {
      const signupStep = get(log, 'data.signupStep') === 0.1 ? 1 : get(log, 'data.signupStep', 0) + 1;
      StorageService.set('signupStep', signupStep, { hash: true });
      StorageService.set('agencyLogo', get(log, 'data.trading.logo', ''), { hash: true });
      pathname = agencyRedirectPageURL(signupStep);
    } else if (userType === 2) {
      if (get(log, 'data.phoneOtp') === 0) {
        StorageService.set('signupStep', 1, { hash: true });
        pathname = '/client/enter-phone';
      } else {
        const currentSignupStep = has(log, 'data.signupStep') === true ? get(log, 'data.signupStep') + 1 : 1;
        const signupStep = currentSignupStep >= 3 ? 3 : currentSignupStep;
        StorageService.set('signupStep', signupStep, { hash: true });
        pathname = clientRedirectPageURL(signupStep);
      }
    } else if (userType === 4) {
      pathname = '/admin/';
    }
    return pathname;
  }

  try {
    StorageService.set('userEmail', get(apiCallData, 'body.email'), { hash: true });
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      // GTM
      gtm({
        action: 'Button Click',
        label: 'sign_up',
        category: `${StorageService.get('selectedRoleType')} Portal`,
        directGA: true,
      });

      StorageService.set('userVersion', get(log, 'data.version'), { hash: true });
      StorageService.set('NotificationType', 'success');
      StorageService.set('Notification', "We've just sent you an email to reset your password.");

      let pathname = '';
      if (agencyTalent) {
        const userType = 1;
        const registerType = get(log, 'data.registerType');
        AuthTokenService.storeToken(get(log, 'data.token'));
        StorageService.set('signupStep', 1, { hash: true });
        StorageService.set('userType', userType, { hash: true });
        StorageService.set('registerType', registerType, { hash: true });
        Emitter.emit('userTypeSelected', true);
        pathname = '/talent/about-you';
      } else if (get(log, 'data.token')) {
        const userType = get(log, 'data.role', '');
        const registerType = get(log, 'data.registerType');
        AuthTokenService.storeToken(get(log, 'data.token'));
        StorageService.set('userType', userType, { hash: true });
        StorageService.set('registerType', registerType, { hash: true });
        StorageService.set('profilePicture', get(log, 'data.profilePicture'), { hash: true });
        pathname = redirectRespectivePage(userType, log, registerType, pathname);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (StorageService.get('selectedRoleType') === 'client') {
          pathname = '/client/verification';
        } else if (StorageService.get('selectedRoleType') === 'talent') {
          pathname = '/talent/verification';
        } else if (StorageService.get('selectedRoleType') === 'agency') {
          pathname = '/agency/verification';
        }
      }

      yield put(reset());
      yield put(push({ pathname, search: location.search }));
    } else {
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(repoLoadingError(log.message));
    }
  } catch (err) {
    toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* signup() {
  yield takeLatest(SIGN_UP, getSignup);
}
