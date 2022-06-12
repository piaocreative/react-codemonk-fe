/**
 * selectors
 */
import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';

const formSelector = formValueSelector(key);

const assumptions = state => formSelector(state, 'assumptions');
const outOfScope = state => formSelector(state, 'outOfScope');
const teamStructure = state => formSelector(state, 'teamStructure');
const totalCost = state => formSelector(state, 'totalCost');
const additionalInfo = state => formSelector(state, 'additionalInfo');

const projectPlan = state => formSelector(state, 'projectPlan');
const effortsBreakdown = state => formSelector(state, 'effortsBreakdown');

export { assumptions, outOfScope, teamStructure, totalCost, additionalInfo, projectPlan, effortsBreakdown };
