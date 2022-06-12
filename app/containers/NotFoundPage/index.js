/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import H1 from 'components/H1';
import messages from './messages';

export default function NotFound() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{messages.title.defaultMessage}</title>
        <meta name="description" content={messages.metaTitle.defaultMessage} />
      </Helmet>
      <H1 className="text-center">
        <FormattedMessage {...messages.header} />
      </H1>
    </React.Fragment>
  );
}
