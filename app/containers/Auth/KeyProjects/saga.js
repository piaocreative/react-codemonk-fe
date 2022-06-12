import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import request from 'utils/request';
import { push } from 'react-router-redux';
import StorageService from 'utils/StorageService';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { storeApiSignupStep } from 'containers/Auth/utils';
import { repoLoadingError, reset, popUpSagaAction } from 'containers/App/actions';
import { VERSION2, toastMessages, API_URL, TALENT, SAVE_LATER_API, PROJECT_API, TALENT_DASHBOARD } from 'containers/App/constants';
import ToastifyMessage from 'components/ToastifyMessage';
import { PROJECT_SAVE_FOR_LATER, EDIT_PROJECT, ADD_PROJECT } from './constants';
import { makeSelectProjects } from './selectors';

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

export function* editProject(data) {
  const { payload: submitType, dataIndex } = data;
  const projects = yield select(makeSelectProjects());
  const roleLabel = projects[dataIndex].role;
  const primaryEmployerLabel = projects[dataIndex].employer;
  const primaryIndustryLabel = projects[dataIndex].industry;
  const newProject = {
    // eslint-disable-next-line no-underscore-dangle
    _id: projects[dataIndex]._id,
    name: projects[dataIndex].name,
    url: projects[dataIndex].url,
    role: get(roleLabel, 'value', ''),
    employer: get(primaryEmployerLabel, 'value', ''),
    industry: get(primaryIndustryLabel, 'value', ''),
    skills: projects[dataIndex].skillsRating.map(s => ({
      name: s.label,
      rate: s.rating,
    })),
  };
  if (typeof projects[dataIndex].description.getCurrentContent === 'function') {
    newProject.description =
      draftToHtml(convertToRaw(projects[dataIndex].description.getCurrentContent())) || projects[dataIndex].rawDescription;
  } else {
    newProject.description = projects[dataIndex].rawDescription;
  }

  const apiCallData = {
    method: 'PUT',
    body: newProject,
  };

  let requestURL = '';
  if (submitType === 'editProject') {
    apiCallData.method = 'PUT';
    requestURL = `${API_URL}${TALENT}${PROJECT_API}`;
  } else if (submitType === 'deleteProject') {
    apiCallData.method = 'DELETE';
    // eslint-disable-next-line no-underscore-dangle
    apiCallData.body = { _id: projects[dataIndex]._id };
    requestURL = `${API_URL}${TALENT}${PROJECT_API}`;
  } else if (submitType === 'addProject') {
    apiCallData.method = 'POST';
    // eslint-disable-next-line no-underscore-dangle
    delete apiCallData.body._id;
    requestURL = `${API_URL}${TALENT}${PROJECT_API}`;
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

export function* addProject(data) {
  const { payload: submitType, data: body, onSuccess } = data;

  let method = 'POST';
  if (submitType === 'add') {
    method = 'POST';
  } else if (submitType === 'edit') {
    method = 'PUT';
  }

  const formData = new FormData();
  formData.append('name', body.name);
  formData.append('url', body.url);
  formData.append('description', body.description);
  formData.append('role', body.role);
  formData.append('employer', body.employer);
  formData.append('industry', body.industry);
  formData.append('employmentType', body.employmentType);
  formData.append('skills', JSON.stringify(body.skills));
  if (body.projectImages.length > 0) {
    body.projectImages.map(img => formData.append('projectImages', img));
  }
  formData.append('images', JSON.stringify(body.images));

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

  const requestURL = `${API_URL}${VERSION2}${TALENT}${PROJECT_API}`;
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

export default function* keyProjectForm() {
  yield takeLatest(PROJECT_SAVE_FOR_LATER, saveForLater);
  yield takeLatest(EDIT_PROJECT, editProject);
  yield takeLatest(ADD_PROJECT, addProject);
}
