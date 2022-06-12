import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import { initialState } from './reducer';
import { key } from './constants';

const HireTalentForm = state => state.HireTalentForm || initialState;
const makeSelectInterviewSlot = () =>
  createSelector(
    HireTalentForm,
    formState => formState.interviewSlotArray,
  );

// field selectors
const formSelector = formValueSelector(key);
const projectName = state => formSelector(state, 'projectName');
const projectSummary = state => formSelector(state, 'projectSummary');

export { HireTalentForm, makeSelectInterviewSlot, projectName, projectSummary };
