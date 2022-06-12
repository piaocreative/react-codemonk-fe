/**
 * selectors
 */
import { formValueSelector } from 'redux-form/immutable';
import { createSelector } from 'reselect';
import { key } from './constants';
import { initialState } from './reducer';

const talentDetails = state => state.AdminTalents || initialState;

const makeSelectTalentStatus = () =>
  createSelector(
    talentDetails,
    formState => formState.status,
  );

const formSelector = formValueSelector(key);

const projectName = state => formSelector(state, 'projectName');
const projectDescription = state => formSelector(state, 'projectDescription');
const clientName = state => formSelector(state, 'clientName');

const talentName = state => formSelector(state, 'talentName');
const startDate = state => formSelector(state, 'startDate');
const endDate = state => formSelector(state, 'endDate');

// QuotePopup
const quoteTitle = state => formSelector(state, 'quoteTitle');
const quoteDescription = state => formSelector(state, 'quoteDescription');

export {
  makeSelectTalentStatus,
  projectName,
  projectDescription,
  talentName,
  startDate,
  endDate,
  quoteTitle,
  quoteDescription,
  clientName,
};
