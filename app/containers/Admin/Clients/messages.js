/*
 * AdminClients Messages
 *
 * This contains all the text for the AdminClients component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AdminClients';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Clients',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Clients',
  },
  headerManageClient: {
    id: `${scope}.headerManageClient`,
    defaultMessage: 'Clients',
  },
});
