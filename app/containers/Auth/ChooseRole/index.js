/**
 * ChooseRole Page
 *
 * This is the Signup page for the App, at the '/' route
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'reactstrap';
import SVG from 'react-inlinesvg';
import isEmpty from 'lodash/isEmpty';
import StorageService from 'utils/StorageService';
import { clientsIcon, userIcon, builidingIcon } from 'containers/App/constants';
import { ContainerMod, Card, H1, H4, A, OnboardingForm, FormLabel, Button, FormWrapper } from 'components';
import { defaultProps, propTypes } from 'containers/proptypes';
import { RoleCard } from './styles';
import messages from './messages';

export class ChooseRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: '',
    };
  }

  selectRoleType = type => {
    this.setState({ selectedType: type });
  };

  redirectToSignup = () => {
    const { selectedType } = this.state;
    const { history } = this.props;
    let selectedTypeValue;
    if (selectedType === 'agency') {
      selectedTypeValue = 'talent';
    } else {
      selectedTypeValue = selectedType;
    }
    StorageService.set('selectedRoleType', selectedTypeValue, { hash: true });
    history.push({
      pathname: '/signup',
      redirection: true,
    });
  };

  render() {
    const { selectedType } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod className="p-md-0">
          <Card>
            <H1 className="text-center">
              <FormattedMessage {...messages.pageTitle} />
            </H1>
            <FormWrapper>
              <OnboardingForm>
                <Row>
                  <Col lg={4} className="flex-column d-flex">
                    <RoleCard
                      className={`${selectedType === 'client' ? 'active' : ''} flex-1`}
                      data-testid="roleClient"
                      onClick={() => this.selectRoleType('client')}
                    >
                      <div className="role-card-header">
                        <SVG src={userIcon} />
                        <H4 className="m-0">Client</H4>
                      </div>
                      <ul>
                        <li>
                          <FormattedMessage {...messages.clientFeature1} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.clientFeature2} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.clientFeature3} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.clientFeature4} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.clientFeature5} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.clientFeature6} />
                        </li>
                      </ul>
                    </RoleCard>
                  </Col>
                  <Col lg={4} className="flex-column d-flex">
                    <RoleCard
                      className={`${selectedType === 'talent' ? 'active' : ''} flex-1`}
                      data-testid="roleTalent"
                      onClick={() => this.selectRoleType('talent')}
                    >
                      <div className="role-card-header">
                        <SVG src={clientsIcon} />
                        <H4 className="m-0">Talent</H4>
                      </div>
                      <ul>
                        <li>
                          <FormattedMessage {...messages.talentFeature1} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.talentFeature2} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.talentFeature3} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.talentFeature4} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.talentFeature5} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.talentFeature6} />
                        </li>
                      </ul>
                    </RoleCard>
                  </Col>
                  <Col lg={4} className="flex-column d-flex">
                    <RoleCard
                      className={`${selectedType === 'agency' ? 'active' : ''} flex-1`}
                      data-testid="roleAgency"
                      onClick={() => this.selectRoleType('agency')}
                    >
                      <div className="role-card-header">
                        <SVG src={builidingIcon} />
                        <H4 className="m-0">Agency</H4>
                      </div>
                      <ul>
                        <li>
                          <FormattedMessage {...messages.agencyFeature1} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.agencyFeature2} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.agencyFeature3} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.agencyFeature4} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.agencyFeature5} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.agencyFeature6} />
                        </li>
                      </ul>
                    </RoleCard>
                  </Col>
                </Row>
                <hr />
                <div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
                  <FormLabel className="order-2 order-md-1 mt-4 mt-md-0">
                    <FormattedMessage {...messages.textHaveAccount} />
                    <A href="/login" className="ms-1">
                      <FormattedMessage {...messages.loginLink} />
                    </A>
                  </FormLabel>

                  <Button
                    className="btn-primary order-1 order-md-2 btn-submit"
                    disabled={isEmpty(selectedType) && true}
                    data-testid="signupBtn"
                    onClick={() => this.redirectToSignup()}
                  >
                    <FormattedMessage {...messages.signupButton} />
                  </Button>
                </div>
              </OnboardingForm>
            </FormWrapper>
          </Card>
        </ContainerMod>
      </React.Fragment>
    );
  }
}

ChooseRole.defaultProps = defaultProps;
ChooseRole.propTypes = propTypes;

export default ChooseRole;
