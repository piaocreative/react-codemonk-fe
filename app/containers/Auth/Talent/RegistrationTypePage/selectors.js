/**
 * RegistrationTypePage selectors
 */

import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';

const formSelector = formValueSelector(key);
const registrationType = state => formSelector(state, 'registrationType');

export { registrationType };
