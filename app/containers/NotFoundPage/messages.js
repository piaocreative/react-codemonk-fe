/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.NotFoundPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Page not found',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Page not found',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Page not found.',
  },
});
