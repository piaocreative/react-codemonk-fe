/**
 * Dashboard selectors
 */

import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import { initialState } from './reducer';

const homepageInviteForm = state => state.homepageInviteForm || initialState;

const makeSelectInviteMails = () =>
  createSelector(
    homepageInviteForm,
    formState => formState.inviteMails,
  );

const formSelector = formValueSelector('homepageInviteForm');
const firstName = state => formSelector(state, 'firstName');
const lastName = state => formSelector(state, 'lastName');
const email = state => formSelector(state, 'email');
const currency = state => formSelector(state, 'currency');
const rate = state => formSelector(state, 'rate');

export { homepageInviteForm, makeSelectInviteMails, firstName, lastName, email, currency, rate };
