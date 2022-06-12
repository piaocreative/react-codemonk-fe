import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import request from 'utils/request';
import { push } from 'react-router-redux';
import StorageService from 'utils/StorageService';
import ToastifyMessage from 'components/ToastifyMessage';
import { storeApiSignupStep } from 'containers/Auth/utils';
import { repoLoadingError, reset, popUpSagaAction } from 'containers/App/actions';
import {
  toastMessages,
  API_URL,
  TALENT,
  SAVE_LATER_API,
  EDUCATION_EDIT_API,
  CERTIFICATE_EDIT_API,
  VERSION2,
  TALENT_DASHBOARD,
} from 'containers/App/constants';

import { SAVE_FOR_LATER, EDIT_EDUCATION, EDIT_CERTIFICATE, ADD_CERTIFICATE, ADD_EDUCATION } from './constants';
import { makeSelectEducationDetails, makeSelectCertificateDetails } from './selectors';

export function* saveForLater(data) {
  const submitType = data.payload;
  const body = {};
  const apiCallData = {
    method: 'PUT',
    body,
  };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    apiCallData.body.step = 2;
    requestURL = `${API_URL}${TALENT}${SAVE_LATER_API}`;
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

export function* editEducation(data) {
  const { payload: submitType, dataIndex } = data;

  const educationDetails = yield select(makeSelectEducationDetails());

  const degreeLevelLabel = get(educationDetails[dataIndex], 'degreeLevel', '');

  const startYear = get(educationDetails[dataIndex], 'startYear', '');
  const endYear = get(educationDetails[dataIndex], 'endYear', '');
  const newEducationDetail = {
    _id: get(educationDetails[dataIndex], '_id', ''),
    degreeLevel: get(degreeLevelLabel, 'value', ''),
    degreeTitle: get(educationDetails[dataIndex], 'degreeTitle', ''),
    collegeName: get(educationDetails[dataIndex], 'collegeName', ''),
    country: get(educationDetails[dataIndex], 'country.value', ''),
    startYear: Number(moment(startYear).format('YYYY')),
    endYear: Number(moment(endYear).format('YYYY')),
  };

  const apiCallData = {
    method: 'PUT',
    body: newEducationDetail,
  };

  let requestURL = '';
  if (submitType === 'editEducation') {
    requestURL = `${API_URL}${TALENT}${EDUCATION_EDIT_API}`;
  } else if (submitType === 'addEducation') {
    apiCallData.method = 'POST';
    // eslint-disable-next-line no-underscore-dangle
    delete apiCallData.body._id;
    requestURL = `${API_URL}${TALENT}${EDUCATION_EDIT_API}`;
  } else if (submitType === 'deleteEducation') {
    apiCallData.method = 'DELETE';
    // eslint-disable-next-line no-underscore-dangle
    apiCallData.body = { _id: educationDetails[dataIndex]._id };
    requestURL = `${API_URL}${TALENT}${EDUCATION_EDIT_API}`;
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

export function* editCertificate(data) {
  const { payload: submitType, dataIndex } = data;

  const certificateDetails = yield select(makeSelectCertificateDetails());

  const dateObtained = get(certificateDetails[dataIndex], 'dateObtained', '');

  const newCertificateDetail = {
    _id: get(certificateDetails[dataIndex], '_id', ''),
    name: get(certificateDetails[dataIndex], 'name', ''),
    dateObtained: moment(dateObtained).format('DD/MM/YYYY'),
    issuedBy: get(certificateDetails[dataIndex], 'issuedBy', ''),
    certificateId: get(certificateDetails[dataIndex], 'certificateId', ''),
  };

  const apiCallData = {
    method: 'PUT',
    body: newCertificateDetail,
  };

  let requestURL = '';
  if (submitType === 'editCertificate') {
    requestURL = `${API_URL}${TALENT}${CERTIFICATE_EDIT_API}`;
  } else if (submitType === 'addCertificate') {
    apiCallData.method = 'POST';
    // eslint-disable-next-line no-underscore-dangle
    delete apiCallData.body._id;
    requestURL = `${API_URL}${TALENT}${CERTIFICATE_EDIT_API}`;
  } else if (submitType === 'deleteCertificate') {
    apiCallData.method = 'DELETE';
    // eslint-disable-next-line no-underscore-dangle
    apiCallData.body = { _id: certificateDetails[dataIndex]._id };
    requestURL = `${API_URL}${TALENT}${CERTIFICATE_EDIT_API}`;
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

export function* addEducation(data) {
  const { payload: submitType, data: body, onSuccess } = data;

  let method = 'POST';
  if (submitType === 'add') {
    method = 'POST';
  } else if (submitType === 'edit') {
    method = 'PUT';
  }

  const formData = new FormData();
  formData.append('collegeName', body.collegeName);
  formData.append('country', body.country);
  formData.append('startYear', body.startYear);
  formData.append('endYear', body.endYear);
  formData.append('degreeTitle', body.degreeTitle);
  formData.append('degreeLevel', body.degreeLevel);
  formData.append('companyLogo', body.companyLogo);

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

  const requestURL = `${API_URL}${VERSION2}${TALENT}${EDUCATION_EDIT_API}`;
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
export function* addCertificate(data) {
  const { payload: submitType, data: body, onSuccess } = data;

  let method = 'POST';
  if (submitType === 'add') {
    method = 'POST';
  } else if (submitType === 'edit') {
    method = 'PUT';
  }

  const formData = new FormData();
  formData.append('certificate', body.certificate);
  formData.append('name', body.name);
  formData.append('issuedBy', body.issuedBy);
  formData.append('dateObtained', body.dateObtained);
  formData.append('certificateId', body.certificateId);

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

  const requestURL = `${API_URL}${VERSION2}${TALENT}${CERTIFICATE_EDIT_API}`;
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

export default function* educationDetailsForm() {
  yield takeLatest(SAVE_FOR_LATER, saveForLater);
  yield takeLatest(EDIT_EDUCATION, editEducation);
  yield takeLatest(EDIT_CERTIFICATE, editCertificate);
  yield takeLatest(ADD_EDUCATION, addEducation);
  yield takeLatest(ADD_CERTIFICATE, addCertificate);
}
