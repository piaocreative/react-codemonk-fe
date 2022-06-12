/*
 * AdminTalents Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AdminTalents';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Talents',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Talents',
  },
  titleStatus: {
    id: `${scope}.titleStatus`,
    defaultMessage: 'Status',
  },
  headerTalents: {
    id: `${scope}.headerTalents`,
    defaultMessage: 'Talents',
  },
  btnView: {
    id: `${scope}.btnView`,
    defaultMessage: 'View',
  },
  noRecord: {
    id: `${scope}.noRecord`,
    defaultMessage: 'There is no record to display',
  },
});
