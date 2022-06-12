/*
 * BriefsDetail Messages
 *
 * This contains all the text for the BriefsDetail component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AdminBriefsDetail';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Brief Detail',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Brief Detail',
  },
  noTalent: {
    id: `${scope}.noTalent`,
    defaultMessage: 'There is currently no application on this brief',
  },
});
