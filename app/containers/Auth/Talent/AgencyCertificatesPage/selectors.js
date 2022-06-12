import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import { initialState } from './reducer';
import { key } from './constants';

const AgencyCertificationForm = state => state[key] || initialState;

const makeSelectCertificateDetails = () =>
  createSelector(
    AgencyCertificationForm,
    formState => formState.certificate,
  );

// field selectors
const formSelector = formValueSelector(key);
const linkedInUrl = state => formSelector(state, 'linkedInUrl');
const gitHubUrl = state => formSelector(state, 'gitHubUrl');
const dribbbleUrl = state => formSelector(state, 'dribbbleUrl');
const clutchUrl = state => formSelector(state, 'clutchUrl');
const goodfirmsUrl = state => formSelector(state, 'goodfirmsUrl');
const otherWebsiteUrl = state => formSelector(state, 'otherWebsiteUrl');

const temp = state => state;
export {
  AgencyCertificationForm,
  makeSelectCertificateDetails,
  linkedInUrl,
  gitHubUrl,
  dribbbleUrl,
  clutchUrl,
  goodfirmsUrl,
  otherWebsiteUrl,
  temp,
};
