import React from 'react';
import { FormattedMessage } from 'react-intl';
import containerMessage from 'containers/messages';
import { ToolTipUlWrapper } from './signup-styles';

export const passwordTooltip = password => (
  <ToolTipUlWrapper>
    <ul>
      <li className={/(?=.*[a-z])/.test(password) ? 'text-success' : ''}>
        <span>
          <FormattedMessage {...containerMessage.lowerCase} />
        </span>
      </li>
      <li className={/(?=.*[A-Z])/.test(password) ? 'text-success' : ''}>
        <span>
          <FormattedMessage {...containerMessage.upperCase} />
        </span>
      </li>
      <li className={/(?=.*[0-9])/.test(password) ? 'text-success' : ''}>
        <span>
          <FormattedMessage {...containerMessage.numbersInString} />
        </span>
      </li>
      <li className={/(?=.*[\^£$%&*()}{@;#~?><>,|=_+!-])/.test(password) ? 'text-success' : ''}>
        <span>
          <FormattedMessage {...containerMessage.specialCharacter} />
        </span>
      </li>
      <li className={password.length > 7 ? 'text-success' : ''}>
        <span>
          <FormattedMessage {...containerMessage.stringLength} />
        </span>
      </li>
    </ul>
  </ToolTipUlWrapper>
);
