import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import { P } from 'components';
import {
  linkedinNewIcon,
  facebookIcon,
  dribbleIcon,
  TERMS_CONDITION_URL,
  PRIVACY_POLICY_URL,
  COOKIE_POLICY_URL,
  ACCEPTABLE_POLICY_URL,
  CM_LINKEDIN_URL,
  CM_DRIBBLE_URL,
  CM_FACEBOOK_URL,
} from 'containers/App/constants';
import { Footer, SocialLinks } from './footer-style';
import messages from './messages';

function FooterWrapper(props) {
  const { className } = props;
  return (
    <Footer className={className}>
      <P className="p16" opacityVal="0.5">
        <FormattedMessage {...messages.copyrights} />
      </P>
      <ul className="footer-links">
        <li>
          <a target="_blank" href={TERMS_CONDITION_URL}>
            <FormattedMessage {...messages.ourTermsPolicy} />
          </a>
        </li>
        <li>
          <a target="_blank" href={PRIVACY_POLICY_URL}>
            <FormattedMessage {...messages.privacyPolicy} />
          </a>
        </li>
        <li>
          <a target="_blank" href={COOKIE_POLICY_URL}>
            <FormattedMessage {...messages.cookiePolicy} />
          </a>
        </li>
        <li>
          <a target="_blank" href={ACCEPTABLE_POLICY_URL}>
            <FormattedMessage {...messages.acceptablePolicy} />
          </a>
        </li>
      </ul>
      <SocialLinks>
        <li>
          <a target="_blank" href={CM_LINKEDIN_URL}>
            <SVG src={linkedinNewIcon} />
          </a>
        </li>
        <li>
          <a target="_blank" href={CM_DRIBBLE_URL}>
            <SVG src={dribbleIcon} />
          </a>
        </li>
        <li>
          <a target="_blank" href={CM_FACEBOOK_URL}>
            <SVG src={facebookIcon} />
          </a>
        </li>
      </SocialLinks>
    </Footer>
  );
}

FooterWrapper.defaultProps = {
  className: '',
};
FooterWrapper.propTypes = {
  className: PropTypes.string,
};

export default FooterWrapper;
