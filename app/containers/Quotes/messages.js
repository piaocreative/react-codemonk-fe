/*
 * Quotes Messages
 *
 * This contains all the text for the Quotes component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.Quotes';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Quotes',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Quotes',
  },
  quoteHeading: {
    id: `${scope}.quoteHeading`,
    defaultMessage: 'Quotes',
  },
});
