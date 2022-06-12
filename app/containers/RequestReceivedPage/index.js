/**
 * RequestReceivedPage
 *
 * This is the Signup page for the App, at the '/request-received' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { H1, PrivateGrid } from 'components';
import { LinkMod } from 'components/A';
import Content from 'components/Content';
import { circleTickIcon } from 'containers/App/constants';
import { HR, IntroText, StepCard } from 'containers/StartProjectPage/styles';
import { TickIcon } from 'containers/Auth/PasswordResetSuccess/styles';
import messages from './messages';

export const RequestReceivedPage = () => (
  <React.Fragment>
    <Helmet>
      <title>{messages.title.defaultMessage}</title>
      <meta name="description" content={messages.metaTitle.defaultMessage} />
    </Helmet>
    <Content>
      <PrivateGrid>
        <StepCard>
          <div className="text-center">
            <TickIcon className="mb-4 mb-md-5 w-1" src={circleTickIcon} />
            <H1 className="mt-md-2">
              <FormattedMessage {...messages.headingRequestReceived} />
            </H1>
            <IntroText>
              <p className="opacity-100">
                <FormattedMessage {...messages.textIntro} />
              </p>
            </IntroText>
            <HR />
            <LinkMod to="/client/talent-listing" className="btn-primary">
              <FormattedMessage {...messages.buttonExploreTalent} />
            </LinkMod>
          </div>
        </StepCard>
      </PrivateGrid>
    </Content>
  </React.Fragment>
);
export default RequestReceivedPage;
