/**
 * selectors
 */
import { formValueSelector } from 'redux-form/immutable';
import { key } from './constants';

const formSelector = formValueSelector(key);

// BriefPopup step 1
const briefTitle = state => formSelector(state, 'briefTitle');
const briefClientName = state => formSelector(state, 'briefClientName');
const briefRole = state => formSelector(state, 'briefRole');
const briefExpertiseLevel = state => formSelector(state, 'briefExpertiseLevel');
const briefDescription = state => formSelector(state, 'briefDescription');
const briefProjectName = state => formSelector(state, 'briefProjectName');
const briefTeamPreference = state => formSelector(state, 'briefTeamPreference');
const briefProjectDescription = state => formSelector(state, 'briefProjectDescription');

// BriefPopup step 2
const briefHardSkills = state => formSelector(state, 'briefHardSkills');
const briefSoftSkills = state => formSelector(state, 'briefSoftSkills');
const briefCertifications = state => formSelector(state, 'briefCertifications');
const briefLanguages = state => formSelector(state, 'briefLanguages');
const briefIndustry = state => formSelector(state, 'briefIndustry');
const briefDiscProfile = state => formSelector(state, 'briefDiscProfile');
const briefTeamWorking = state => formSelector(state, 'briefTeamWorking');

// BriefPopup step 3
const briefContractType = state => formSelector(state, 'briefContractType');
const briefWorkSchedule = state => formSelector(state, 'briefWorkSchedule');
const briefDuration = state => formSelector(state, 'briefDuration');
const briefAssignment = state => formSelector(state, 'briefAssignment');
const briefTimeZone = state => formSelector(state, 'briefTimeZone');
const briefCurrency = state => formSelector(state, 'briefCurrency');
const briefAnnualCurrency = state => formSelector(state, 'briefAnnualCurrency');
const briefRatePerHour = state => formSelector(state, 'briefRatePerHour');
const briefAnnualRate = state => formSelector(state, 'briefAnnualRate');

export {
  briefProjectName,
  briefProjectDescription,
  briefTitle,
  briefRole,
  briefDescription,
  briefExpertiseLevel,
  briefTeamPreference,
  briefAssignment,
  briefDuration,
  briefClientName,
  briefHardSkills,
  briefSoftSkills,
  briefCertifications,
  briefIndustry,
  briefTeamWorking,
  briefDiscProfile,
  briefTimeZone,
  briefRatePerHour,
  briefAnnualRate,
  briefCurrency,
  briefAnnualCurrency,
  briefLanguages,
  briefContractType,
  briefWorkSchedule,
};
