/**
 * Gets the repositories of the user from Github
 */
import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get, split } from 'lodash';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import StorageService from 'utils/StorageService';
import ToastifyMessage from 'components/ToastifyMessage';
import { redirectPageURL } from 'containers/App/utils';
import { repoLoadingError, isLoading, reset, popUpSagaAction } from 'containers/App/actions';
import {
  API_URL,
  TALENT,
  SAVE_LATER_API,
  VERSION2,
  ABOUT_YOU_API,
  PROFILE,
  LANGUAGE_SKILLS_API,
  TALENT_DASHBOARD,
} from 'containers/App/constants';
import request from 'utils/request';
import moment from 'moment';
import Emitter from 'utils/emitter';
import { storeApiSignupStep } from 'containers/Auth/utils';
import { SUBMIT_PERSONAL_DETAILS_FORM, EDIT_PERSONAL_DETAILS_FORM } from './constants';
import {
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectCountryCode,
  makeSelectPhoneNumber,
  makeSelectDob,
  makeSelectGender,
  makeSelectPostcode,
  makeSelectAddressLineOne,
  makeSelectAddressLineTwo,
  makeSelectCity,
  makeSelectCountry,
  makeSelectState,
  makeSelectTimeZone,
  makeSelectLanguage,
  makeSelectPrimaryRole,
  makeSelectExperience,
  makeSelectLinkedInProfile,
  makeSelectGithubProfile,
  makeSelectStackoverflowProfile,
  makeSelectDribbleProfile,
  makeSelectBehanceProfile,
  makeSelectPersonalProfile,
} from './selectors';

/**
 * user Forget request/response handler
 */
export function* getPersonalDetails(data) {
  const { payload: submitType, userData } = data;

  const countryCodeLabel = yield select(makeSelectCountryCode());
  const [, countryCode] = split(get(countryCodeLabel, 'label', ''), '+', 2);
  const timeZoneLabel = yield select(makeSelectTimeZone());
  const timeZone = timeZoneLabel.value;
  let country = yield select(makeSelectCountry());
  country = country.value;
  const selectedDOB = yield select(makeSelectDob());
  const firstName = yield select(makeSelectFirstName());
  const lastName = yield select(makeSelectLastName());
  const talentPhoneNumber = yield select(makeSelectPhoneNumber());

  let phoneNumber = talentPhoneNumber ? talentPhoneNumber.replace(/ /g, '') : '';
  phoneNumber = phoneNumber.replace(/^0+/, '');

  const dob = selectedDOB ? moment(selectedDOB).format('DD/MM/YYYY') : '';
  const genderLabel = yield select(makeSelectGender());
  const gender = get(genderLabel, 'value', '');
  const postcode = yield select(makeSelectPostcode());
  const addressLineOne = yield select(makeSelectAddressLineOne());
  const addressLineTwo = yield select(makeSelectAddressLineTwo());
  const city = yield select(makeSelectCity());
  const state = yield select(makeSelectState());
  const language = yield select(makeSelectLanguage());

  const linkedInUrl = yield select(makeSelectLinkedInProfile());
  const gitHubUrl = yield select(makeSelectGithubProfile());
  const stackOverFlowUrl = yield select(makeSelectStackoverflowProfile());
  const dribbbleUrl = yield select(makeSelectDribbleProfile());
  const behanceUrl = yield select(makeSelectBehanceProfile());
  const portfolioUrl = yield select(makeSelectPersonalProfile());

  const primaryRoleLabel = yield select(makeSelectPrimaryRole());
  const primaryRole = get(primaryRoleLabel, 'value', '');
  const yearsOfExperienceLabel = yield select(makeSelectExperience());
  const yearsOfExperience = get(yearsOfExperienceLabel, 'value', '');

  const formattedLanguages = [];
  for (let i = 0; i < language.length; i++) {
    const languaes = {
      name: language[i].value,
      rate: language[i].rating,
    };
    formattedLanguages.push(languaes);
  }

  const apiCallData = {
    method: 'PUT',
    body: {
      firstName,
      lastName,
      countryCode,
      phoneNumber,
      dob,
      gender,
      postcode,
      addressLineOne,
      addressLineTwo,
      city,
      country,
      state,
      timeZone,
      language: formattedLanguages,
      linkedInUrl,
      gitHubUrl,
      stackOverFlowUrl,
      dribbbleUrl,
      behanceUrl,
      portfolioUrl,
      primaryRole,
      yearsOfExperience,
    },
  };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    apiCallData.body = userData;
    apiCallData.body.step = 1;
    requestURL = `${API_URL}${VERSION2}${TALENT}${SAVE_LATER_API}`;
  } else if (submitType === 'continue') {
    requestURL = `${API_URL}${VERSION2}${TALENT}${ABOUT_YOU_API}`;
  } else if (submitType === 'editIntro') {
    delete apiCallData.body.language;
    apiCallData.body.primaryRole = primaryRole;
    apiCallData.body.yearsOfExperience = yearsOfExperience;

    const userType = StorageService.get('userType');
    if (userType === '3') apiCallData.body.talentId = StorageService.get('talentId');

    requestURL = `${API_URL}${TALENT}${PROFILE}`;
  } else if (submitType === 'editLanguageRating') {
    const languages = formattedLanguages;
    apiCallData.body = { languages };

    const userType = StorageService.get('userType');
    if (userType === '3') apiCallData.body.talentId = StorageService.get('talentId');

    requestURL = `${API_URL}${TALENT}${LANGUAGE_SKILLS_API}`;
  }

  try {
    // Call our request helper (see 'utils/request')
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      yield put(isLoading(false));
      if (submitType === 'continue') {
        storeApiSignupStep(get(log, 'data.signupStep') === 0.1 ? 1 : get(log, 'data.signupStep'));
        const signupStep = 2;
        StorageService.set('signupStep', signupStep, { hash: true });
        const pathname = redirectPageURL(signupStep);

        yield put(push({ pathname }));
      } else if (submitType === 'editIntro') {
        Emitter.emit('editIntro', log);
      } else if (submitType === 'editLanguageRating') {
        yield put(reset());
        yield put(popUpSagaAction(false));
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

export function* editPersonalDetails(data) {
  const { data: body } = data;

  const apiCallData = {
    method: 'PUT',
    body,
  };

  const requestURL = `${API_URL}${TALENT}${PROFILE}`;
  const userType = StorageService.get('userType');
  if (userType === '3') apiCallData.body.talentId = StorageService.get('talentId');

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      yield put(isLoading(false));

      Emitter.emit('editIntro', log);
    } else {
      toast.error(log.message, { className: 'Toast-error' });
      yield put(repoLoadingError(log.response.statusText));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export default function* personalDetailsForm() {
  yield takeLatest(SUBMIT_PERSONAL_DETAILS_FORM, getPersonalDetails);
  yield takeLatest(EDIT_PERSONAL_DETAILS_FORM, editPersonalDetails);
}
