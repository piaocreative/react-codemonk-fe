/*
 * applyQuote Messages
 *
 * This contains all the text for the applyQuote component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.applyQuote';

export default defineMessages({
  // modal messages
  modelSubmitQuoteHeader: {
    id: `${scope}.modelSubmitQuoteHeader`,
    defaultMessage: 'Submit Quote',
  },

  // 1st
  labelAssumptions: {
    id: `${scope}.labelAssumptions`,
    defaultMessage: 'Assumptions',
  },
  placeholderAssumptions: {
    id: `${scope}.placeholderAssumptions`,
    defaultMessage: 'Assumptions',
  },

  // 2nd
  labelOutOfScope: {
    id: `${scope}.labelOutOfScope`,
    defaultMessage: 'Out of scope',
  },
  placeholderOutOfScope: {
    id: `${scope}.placeholderOutOfScope`,
    defaultMessage: 'Out of scope',
  },

  // 3rd
  labelTeamStructure: {
    id: `${scope}.labelTeamStructure`,
    defaultMessage: 'Proposed team structure',
  },
  placeholderTeamStructure: {
    id: `${scope}.placeholderTeamStructure`,
    defaultMessage: 'Proposed team structure',
  },

  // 4th
  labelProjectPlan: {
    id: `${scope}.labelProjectPlan`,
    defaultMessage: 'Project Plan',
  },
  labelProjectPlanSmallText: {
    id: `${scope}.labelProjectPlanSmallText`,
    defaultMessage: '(PDF, DOCX, ZIP, RAR Only)',
  },
  placeholderProjectPlan: {
    id: `${scope}.placeholderProjectPlan`,
    defaultMessage: 'Project Plan',
  },

  // 5th
  labelEffortBreakdown: {
    id: `${scope}.labelEffortBreakdown`,
    defaultMessage: 'Effort Breakdown',
  },
  placeholderEffortBreakdown: {
    id: `${scope}.placeholderEffortBreakdown`,
    defaultMessage: 'Effort Breakdown',
  },

  // 6th
  labelTotalCost: {
    id: `${scope}.labelTotalCost`,
    defaultMessage: 'Total cost',
  },
  labelTotalCostSmallText: {
    id: `${scope}.labelTotalCostSmallText`,
    defaultMessage: '(in USD)',
  },
  placeholderTotalCost: {
    id: `${scope}.placeholderTotalCost`,
    defaultMessage: 'Total cost',
  },

  // 7th
  labelAdditionalInfo: {
    id: `${scope}.labelAdditionalInfo`,
    defaultMessage: 'Additional Info',
  },
  placeholderAdditionalInfo: {
    id: `${scope}.placeholderAdditionalInfo`,
    defaultMessage: 'Additional Info',
  },
});
