/**
 * selectors
 */
import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';

const formSelector = formValueSelector(key);

const talent = state => formSelector(state, 'talent');
const weekStarting = state => formSelector(state, 'weekStarting');
const project = state => formSelector(state, 'project');
const privacyPolicy = state => formSelector(state, 'privacyPolicy');

export { talent, weekStarting, project, privacyPolicy };
