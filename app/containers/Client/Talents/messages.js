/*
 * ClientTalents Messages
 *
 * This contains all the text for the component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.ClientTalents';

const emptyStateContent1 = 'At CodeMonk you can build your digital team that meats your exact requirements ';
const emptyStateContent2 =
  '- technical skills, soft skills, experience, language, working patterns, rates, time zone, availability and more.';
export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Talents',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Talents',
  },
  headingTalents: {
    id: `${scope}.headingTalents`,
    defaultMessage: 'Talents',
  },
  noRecord: {
    id: `${scope}.noRecord`,
    defaultMessage: 'There is no record to display',
  },
  emptyStateHeader: {
    id: `${scope}.emptyStateHeader`,
    defaultMessage: 'Build your team in 3 easy steps',
  },
  emptyStateContent: {
    id: `${scope}.emptyStateContent`,
    defaultMessage: `${emptyStateContent1}${emptyStateContent2}`,
  },
  btnHireTalent: {
    id: `${scope}.btnHireTalent`,
    defaultMessage: 'Hire a talent',
  },
  instruction1: {
    id: `${scope}.instruction1`,
    defaultMessage: 'Simply search from our pool of talent that meet your requirements',
  },
  instruction2: {
    id: `${scope}.instruction2`,
    defaultMessage: 'Organise the interview as per your availability',
  },
  instruction3: {
    id: `${scope}.instruction3`,
    defaultMessage: 'Agree the arrangement and get started',
  },
  btnHireTalentTitle: {
    id: `${scope}.btnHireTalentTitle`,
    defaultMessage: 'Hire talent',
  },
});
