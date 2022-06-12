import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';

const formSelector = formValueSelector(key);
const oldEmailAddress = state => formSelector(state, 'oldEmailAddress');
const emailAddress = state => formSelector(state, 'emailAddress');
const password = state => formSelector(state, 'password');
const otp = state => formSelector(state, 'otp');

export { oldEmailAddress, emailAddress, otp, password };
