import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';

const formSelector = formValueSelector(key);
const talentId = state => formSelector(state, 'talentId');
const firstName = state => formSelector(state, 'firstName');
const lastName = state => formSelector(state, 'lastName');
const emailAddress = state => formSelector(state, 'emailAddress');
const currency = state => formSelector(state, 'currency');
const ratePerHour = state => formSelector(state, 'ratePerHour');

export { talentId, firstName, lastName, emailAddress, currency, ratePerHour };
