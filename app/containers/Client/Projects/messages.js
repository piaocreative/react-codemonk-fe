/*
 * Projects Messages
 *
 * This contains all the text for the component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.Projects';

const emptyStateContent1 =
  'With CodeMonk you have the flexibility to have your project delivered either on self-managed or fully managed basis.';
const emptyStateContent2 = ' You can simply hire a talent as per your needs and self manage them to deliver the project.';
const emptyStateContent3 = 'Or if you prefer, you can request a quote from us to deliver the project on fully managed basis.';
export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Projects',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Projects',
  },
  headingProject: {
    id: `${scope}.headingProject`,
    defaultMessage: 'Projects',
  },
  btnView: {
    id: `${scope}.btnView`,
    defaultMessage: 'View',
  },
  noRecord: {
    id: `${scope}.noRecord`,
    defaultMessage: 'There is no record to display',
  },
  emptyStateHeader: {
    id: `${scope}.emptyStateHeader`,
    defaultMessage: 'Your projects delivered your way',
  },
  emptyStateContent: {
    id: `${scope}.emptyStateContent`,
    defaultMessage: `${emptyStateContent1}${emptyStateContent2}${emptyStateContent3}`,
  },
  team: {
    id: `${scope}.team`,
    defaultMessage: 'Team',
  },
});
