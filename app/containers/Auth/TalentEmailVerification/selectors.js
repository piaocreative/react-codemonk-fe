/**
 * selectors
 */
import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';

const formSelector = formValueSelector(key);
const otp = state => formSelector(state, 'otp');
export { otp };
