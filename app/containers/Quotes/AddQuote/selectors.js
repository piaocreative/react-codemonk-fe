/**
 * selectors
 */
import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';

const formSelector = formValueSelector(key);

const project = state => formSelector(state, 'project');
const quoteTitle = state => formSelector(state, 'quoteTitle');
const quoteDescription = state => formSelector(state, 'quoteDescription');

export { project, quoteTitle, quoteDescription };
