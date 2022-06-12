/**
 * selectors
 */
import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';

const formSelector = formValueSelector(key);

const status = state => formSelector(state, 'status');
export { status };
