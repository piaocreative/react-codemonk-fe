import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import request from 'utils/request';
import { push } from 'react-router-redux';
import StorageService from 'utils/StorageService';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { ToastifyMessage } from 'components';
import { storeApiSignupStep } from 'containers/Auth/utils';
import { repoLoadingError, reset, popUpSagaAction } from 'containers/App/actions';
import {
  toastMessages,
  API_URL,
  TALENT,
  SAVE_LATER_API,
  WORK_EXPERIENCE,
  WORK_EXPERIENCE_EDIT_API,
  TALENT_DASHBOARD,
  VERSION2,
} from 'containers/App/constants';
import { EXPERIENCE_SAVE_FOR_LATER, EDIT_EXPERIENCE, ADD_EXPERIENCE } from './constants';
import { makeSelectExperiences } from './selectors';

export function* saveForLater(data) {
  const submitType = data.payload;

  const apiCallData = {
    method: 'PUT',
    body: {},
  };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    apiCallData.body.step = 3;
    requestURL = `${API_URL}${TALENT}${SAVE_LATER_API}`;
  } else if (submitType === 'editWorkExperience') {
    requestURL = `${API_URL}${TALENT}${WORK_EXPERIENCE}`;
  }
  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      if (submitType === 'saveForLater') {
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

export function* editExperience(data) {
  const { payload: submitType, dataIndex } = data;

  const experience = yield select(makeSelectExperiences());
  const { endDate: tempEndDate, currentlyWork } = experience[dataIndex];
  let endDate = moment(tempEndDate).format('DD/MM/YYYY');
  const employmentTypeLabel = experience[dataIndex].employmentType;

  if (currentlyWork) {
    endDate = moment().format('DD/MM/YYYY');
  }
  const newExperience = {
    // eslint-disable-next-line no-underscore-dangle
    _id: experience[dataIndex]._id,
    jobTitle: experience[dataIndex].jobTitle,
    employmentType: get(employmentTypeLabel, 'value', ''),
    employer: experience[dataIndex].employer,
    country: experience[dataIndex].country.value,
    startDate: moment(experience[dataIndex].startDate).format('DD/MM/YYYY'),
    endDate,
    isPresent: currentlyWork,
    shortDescription: draftToHtml(convertToRaw(experience[dataIndex].shortDescription.getCurrentContent())),
  };

  const apiCallData = {
    method: 'PUT',
    body: newExperience,
  };

  let requestURL = '';
  if (submitType === 'editExperience') {
    requestURL = `${API_URL}${TALENT}${WORK_EXPERIENCE_EDIT_API}`;
  } else if (submitType === 'addExperience') {
    apiCallData.method = 'POST';
    // eslint-disable-next-line no-underscore-dangle
    delete apiCallData.body._id;
    requestURL = `${API_URL}${TALENT}${WORK_EXPERIENCE_EDIT_API}`;
  } else if (submitType === 'deleteExperience') {
    apiCallData.method = 'DELETE';
    // eslint-disable-next-line no-underscore-dangle
    apiCallData.body = { _id: experience[dataIndex]._id };
    requestURL = `${API_URL}${TALENT}${WORK_EXPERIENCE_EDIT_API}`;
  }

  const userType = StorageService.get('userType');
  if (userType === '3') apiCallData.body.talentId = StorageService.get('talentId');

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

export function* addExperience(data) {
  const { payload: submitType, data: body, onSuccess } = data;

  let method = 'POST';
  if (submitType === 'add') {
    method = 'POST';
  } else if (submitType === 'edit') {
    method = 'PUT';
  }

  const formData = new FormData();
  formData.append('jobTitle', body.jobTitle);
  formData.append('employmentType', body.employmentType);
  formData.append('employer', body.employer);
  formData.append('country', body.country);
  formData.append('startDate', body.startDate);
  formData.append('endDate', body.endDate);
  formData.append('shortDescription', body.shortDescription);
  formData.append('companyLogo', body.companyLogo);
  formData.append('isPresent', body.isPresent);

  if (submitType === 'edit') {
    // eslint-disable-next-line no-underscore-dangle
    formData.append('_id', body._id);
  }

  const apiCallData = {
    method,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
  };

  const requestURL = `${API_URL}${VERSION2}${TALENT}${WORK_EXPERIENCE_EDIT_API}`;
  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      storeApiSignupStep(get(log, 'data.signupStep'));
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
    toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}

export default function* WorkExperienceForm() {
  yield takeLatest(EXPERIENCE_SAVE_FOR_LATER, saveForLater);
  yield takeLatest(EDIT_EXPERIENCE, editExperience);
  yield takeLatest(ADD_EXPERIENCE, addExperience);
}
