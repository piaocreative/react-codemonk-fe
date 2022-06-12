/*
 * AgencyQuoteDetail Messages
 *
 * This contains all the text for the AgencyQuoteDetail component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AgencyQuoteDetail';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Quote Detail',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Quote Detail',
  },
  btnBackToQuotes: {
    id: `${scope}.btnBackToQuotes`,
    defaultMessage: 'Back to quotes',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description:',
  },
});
