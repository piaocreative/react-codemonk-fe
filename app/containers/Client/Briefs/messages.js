/*
 * ClientBriefs Messages
 *
 * This contains all the text for the ClientBriefs component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.ClientBriefs';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Job Briefs',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Job Briefs',
  },
  heading: {
    id: `${scope}.heading`,
    defaultMessage: 'Live Opportunities',
  },
  projectTitle: {
    id: `${scope}.projectTitle`,
    defaultMessage: 'Project Title:',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description:',
  },
  modelFiltersHeader: {
    id: `${scope}.modelFiltersHeader`,
    defaultMessage: 'Filters',
  },
});
