import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import { initialState } from './reducer';
import { key } from './constants';

const AllocateTalentForm = state => state.AllocateTalentForm || initialState;
const makeSelectInterviewSlot = () =>
  createSelector(
    AllocateTalentForm,
    formState => formState.interviewSlotArray,
  );

// field selectors
const formSelector = formValueSelector(key);
const startDate = state => formSelector(state, 'startDate');
const endDate = state => formSelector(state, 'endDate');

export { AllocateTalentForm, makeSelectInterviewSlot, startDate, endDate };
