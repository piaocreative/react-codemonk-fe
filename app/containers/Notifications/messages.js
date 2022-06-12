/*
 * Notifications Messages
 */
import { defineMessages } from 'react-intl';
export const scope = 'CodeMonk.containers.Notifications';

export default defineMessages({
  notificationsLabel: {
    id: `${scope}.notificationsLabel`,
    defaultMessage: 'Notifications',
  },
  markAllRead: {
    id: `${scope}.markAllRead`,
    defaultMessage: 'Mark all as read',
  },
  noNotification: {
    id: `${scope}.noNotification`,
    defaultMessage: 'There is no new notification which require your attention.',
  },
});
