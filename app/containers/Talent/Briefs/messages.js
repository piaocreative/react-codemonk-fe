/*
 * TalentBriefs Messages
 *
 * This contains all the text for the TalentBriefs component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.TalentBriefs';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Job Briefs',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Job Briefs',
  },
  modelFiltersHeader: {
    id: `${scope}.modelFiltersHeader`,
    defaultMessage: 'Filters',
  },
  heading: {
    id: `${scope}.heading`,
    defaultMessage: 'Live Opportunities',
  },
  emptyTalentStateHeader: {
    id: `${scope}.emptyTalentStateHeader`,
    defaultMessage: 'There are no current opportunity that match your preferences!',
  },
  emptyTalentStateContent: {
    id: `${scope}.emptyTalentStateContent`,
    defaultMessage: `Please ensure your profile is up-to-date and define your work preferences for us to match you better with new opportunities.`,
  },
  emptyClientStateHeader: {
    id: `${scope}.emptyClientStateHeader`,
    defaultMessage: 'Create a job brief to get a match',
  },
  emptyClientStateContent: {
    id: `${scope}.emptyClientStateContent`,
    defaultMessage: `Simply create a job brief to get of 7 most suitable candidates ready to start now.`,
  },
});
