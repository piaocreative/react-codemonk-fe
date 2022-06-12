/* eslint-disable prettier/prettier */
/**
 * selectors
 */
import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';

const formSelector = formValueSelector(key);

const notesOfMotivation = state => formSelector(state, 'notesOfMotivation');
const availableJoiningDate = state => formSelector(state, 'availableJoiningDate');

export { notesOfMotivation, availableJoiningDate };
