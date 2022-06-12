/*
 * ComingSoon Messages
 *
 * This contains all the text for the component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.ComingSoon';

export default defineMessages({
  emptyStateHeader: {
    id: `${scope}.emptyStateHeader`,
    defaultMessage: 'Coming soon',
  },
  emptyStateContent: {
    id: `${scope}.emptyStateContent`,
    defaultMessage:
      'We are prioritising our product features based on the features most in demand. Watch this space and subscribe to our newsletters for regular product updates.',
  },
  btnSubscribe: {
    id: `${scope}.btnSubscribe`,
    defaultMessage: 'Subscribe',
  },
  newsLetterText: {
    id: `${scope}.newsLetterText`,
    defaultMessage: 'I consent to receive marketing communications from CodeMonk.ai companies worldwide.',
  },
});
