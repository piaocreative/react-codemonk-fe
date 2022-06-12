import React from 'react';
import { FormattedMessage } from 'react-intl';
import { H1 } from 'components';
import { gtm } from 'utils/Helper';
import { LinkMod } from 'components/A';
import containerMessage from 'containers/messages';
import { RequirementList, IntroStepBlock, HR } from './styles';
import messages from './messages';

export const IntroStep = () => (
  <IntroStepBlock>
    <H1>
      <FormattedMessage {...containerMessage.textGetQuote} />
    </H1>
    <p>
      <FormattedMessage {...messages.IntroContent1} />
    </p>
    <RequirementList>
      <li>
        <FormattedMessage {...messages.RequirementOpt1} />
      </li>
      <li>
        <FormattedMessage {...messages.RequirementOpt2} />
      </li>
      <li>
        <FormattedMessage {...messages.RequirementOpt3} />
      </li>
      <li>
        <FormattedMessage {...messages.RequirementOpt4} />
      </li>
      <li>
        <FormattedMessage {...messages.RequirementOpt5} />
      </li>
      <li>
        <FormattedMessage {...messages.RequirementOpt6} />
      </li>
    </RequirementList>
    <p className="mb-0">
      <FormattedMessage {...messages.IntroContent2} />
    </p>
    <HR />
    <LinkMod
      to="#step1"
      className="btn-primary"
      onClick={() => gtm({ action: 'Button Click', label: 'start_project', category: 'Client Portal', directGA: true, value: 1 })}
    >
      <FormattedMessage {...messages.buttonLetsStart} />
    </LinkMod>
  </IntroStepBlock>
);
export default IntroStep;
