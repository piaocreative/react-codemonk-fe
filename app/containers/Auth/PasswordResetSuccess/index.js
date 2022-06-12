/**
 * PasswordResetSuccess
 * This is the PasswordResetSuccess for the App, at the '/password-reset-success' route
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import StorageService from 'utils/StorageService';
import { defaultProps, propTypes } from 'containers/proptypes';
import { OnboardingForm, P, H1, OnBoardingFormBody, ContainerMod, Card } from 'components';
import { loginLink } from 'containers/App/utils';
import { LinkMod } from 'components/A';
import { circleTickIcon } from 'containers/App/constants';
import messages from './messages';
import { TickIcon } from './styles';

export class PasswordResetSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAgency: false,
    };
  }

  componentDidMount() {
    this.setSelectedRole();
  }

  setSelectedRole = () => {
    const { location } = this.props;
    if (location.pathname.split('/').includes('agency')) {
      StorageService.set('selectedRoleType', 'agency', { hash: true });
      this.setState({ isAgency: true });
    } else {
      StorageService.set('selectedRoleType', 'talent', { hash: true });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname.split('/').includes('agency')) {
      StorageService.set('selectedRoleType', 'agency', { hash: true });
      this.setState({ isAgency: true });
    } else {
      StorageService.set('selectedRoleType', 'talent', { hash: true });
    }
  }

  render() {
    const { isAgency } = this.state;

    return (
      <>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod className={!isAgency ? 'w-auto p-0' : ''}>
          <Card className={isAgency ? 'text-center' : 'p-0 bg-transparent'}>
            {isAgency && (
              <>
                <TickIcon className="mb-4 mb-md-5 w-1" src={circleTickIcon} />
                <H1 className="mb-3">
                  <FormattedMessage {...messages.headingPasswordChanged} />
                </H1>
                <P>
                  <FormattedMessage {...messages.textIntro} />
                </P>
              </>
            )}
            <OnboardingForm>
              <OnBoardingFormBody>
                {!isAgency && (
                  <>
                    <TickIcon className="mb-4 mb-md-5 w-1" src={circleTickIcon} />
                    <H1 className="mb-3">
                      <FormattedMessage {...messages.headingPasswordChanged} />
                    </H1>
                    <P className="p16" opacityVal="0.5">
                      <FormattedMessage {...messages.textIntro} />
                    </P>
                  </>
                )}
                {!isAgency && (
                  <LinkMod to={loginLink} className="btn-primary w-100 mt-3">
                    <FormattedMessage {...messages.signInButtonText} />
                  </LinkMod>
                )}
              </OnBoardingFormBody>
              {isAgency && (
                <>
                  <hr />
                  <OnBoardingFormBody className="d-flex justify-content-center">
                    <LinkMod to="/agency/login" className="btn-primary">
                      <FormattedMessage {...messages.signInButtonText} />
                    </LinkMod>
                  </OnBoardingFormBody>
                </>
              )}
            </OnboardingForm>
          </Card>
        </ContainerMod>
      </>
    );
  }
}

PasswordResetSuccess.defaultProps = defaultProps;
PasswordResetSuccess.propTypes = propTypes;

export default PasswordResetSuccess;
