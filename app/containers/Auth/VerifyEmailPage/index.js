/**
 * VerifyEmailPage
 * This is the Login page for the App, at the '/login' route
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { defaultProps, propTypes } from 'containers/proptypes';
import { FormattedMessage } from 'react-intl';
import StorageService from 'utils/StorageService';
import { loginLink } from 'containers/App/utils';
import { OnboardingForm, P, H1, OnBoardingFormBody, ContainerMod, Card } from 'components';
import { LinkMod } from 'components/A';
import messages from './messages';

export class VerifyEmailPage extends Component {
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
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod className={!isAgency ? 'w-auto p-0' : ''}>
          <Card className={isAgency ? 'text-center' : 'p-0 bg-transparent'}>
            {isAgency && (
              <>
                <H1 className="mb-3">
                  <FormattedMessage {...messages.headingVerifyEmail} />
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
                    <H1 className="mb-3">
                      <FormattedMessage {...messages.headingVerifyEmail} />
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
      </React.Fragment>
    );
  }
}
VerifyEmailPage.defaultProps = defaultProps;
VerifyEmailPage.propTypes = propTypes;

export default VerifyEmailPage;
