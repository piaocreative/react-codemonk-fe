/**
 * Signup Page
 *
 * This is the Signup page for the App, at the '/signup' route
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { sha256 } from 'js-sha256';
import get from 'lodash/get';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Tooltip } from 'reactstrap';
import { toast } from 'react-toastify';
import { VALIDATION } from 'utils/constants';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import SVG from 'react-inlinesvg';
import { API_URL, AUTH, AGENCY, TALENT, EMAIL, TERMS_CONDITION_URL, circleTickIcon } from 'containers/App/constants';
import { renderField, renderFieldoptCheckbox } from 'utils/Fields';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as formValidations from 'utils/formValidations';
import * as normalize from 'utils/normalize';
import { getUserRoleFromURL } from 'utils/Helper';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import { loginLink } from 'containers/App/utils';
import {
  H1,
  P,
  A,
  OnboardingForm,
  OnBoardingFormBody,
  FormLabel,
  Button,
  ToastifyMessage,
  ContainerMod,
  Card,
  ProgressMod,
} from 'components';
import { defaultProps, propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import messages from './messages';
import { signUpEmail, signUpPassword, changePrivacyPolicy, signUp, signUpReferral } from './actions';
import { makeSelectEmail, makeSelectPassword, makeSelectPrivacyCheck, makeSelectReferralVal } from './selectors';
import reducer, { initialState } from './reducer';
import saga from './saga';
import { passwordTooltip } from './utils';
import { key } from './constants';
import { PasswordFieldWrapper, UserTypeButtonGroup, UserBulletPointList } from './signup-styles';

export class SignUpPage extends Component {
  constructor(props) {
    super(props);
    const talentToken = get(props, 'match.params.talentToken', '');
    const params = get(props, 'location.params', {});
    const referralId = params.userId ? params.userId : '';
    this.state = {
      agencyTalent: false,
      talentToken,
      disableEmail: false,
      statePassword: '',
      tooltipOpen: false,
      talentActive: true,
      isAgency: false,
      referral: referralId,
    };
  }

  componentDidMount() {
    const { talentToken, referral } = this.state;
    const { onChangeReferral } = this.props;
    onChangeReferral(referral);
    StorageService.set('selectedRoleType', 'talent', { hash: true });
    if (talentToken) {
      this.getTalentDetails(talentToken);
    }
  }

  componentWillReceiveProps(nextProps) {
    const selectedRole = nextProps.location.hash.split('#')[1];
    if (selectedRole === 'company') {
      StorageService.set('selectedRoleType', selectedRole, { hash: true });
      this.setState({ talentActive: false });
    }
    if (selectedRole === 'talent') {
      StorageService.set('selectedRoleType', selectedRole, { hash: true });
      this.setState({ talentActive: true });
    }
    if (nextProps.location.pathname.split('/').includes('agency')) {
      StorageService.set('selectedRoleType', 'agency', { hash: true });
      this.setState({ isAgency: true });
    }
  }

  getTalentDetails = talentToken => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${AUTH}${AGENCY}${TALENT}${EMAIL}?token=${talentToken}`;
    request(requestURL, data)
      .then(this.setUserDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setUserDetails = response => {
    const { dispatch, onChangeEmail } = this.props;
    if (get(response, 'status')) {
      const { data } = response;
      const email = data;
      this.setState({ disableEmail: true, agencyTalent: true });
      dispatch(change(key, 'email', email));
      onChangeEmail(email);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message', '')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleChangePassword = data => {
    this.setState({ statePassword: data });
  };

  setToolTipOpen = data => {
    this.setState({ tooltipOpen: data });
  };

  textIntro =
    getUserRoleFromURL() === 'talent' ? <FormattedMessage {...messages.textIntro} /> : <FormattedMessage {...messages.textIntroClient} />;

  privacyPolicyButton = (
    <React.Fragment>
      {messages.privacyPolicy1.defaultMessage}
      <A href={TERMS_CONDITION_URL} target="_blank" className="ms-1 me-1 text-decoration-underline">
        <FormattedMessage {...messages.privacyPolicy12} />
      </A>
    </React.Fragment>
  );

  userToggleSwitch = () => {
    this.setState(
      prevState => ({ talentActive: !prevState.talentActive }),
      () => {
        const { talentActive } = this.state;
        StorageService.set('selectedRoleType', talentActive ? 'talent' : 'client', { hash: true });
      },
    );
  };

  render() {
    const {
      handleSubmit,
      onSubmitForm,
      email,
      password,
      loading,
      responseSuccess,
      responseError,
      onChangeEmail,
      onChangePassword,
      invalid,
      privacyCheck,
      onPrivacyPolicyCheck,
    } = this.props;
    const { disableEmail, agencyTalent, talentToken, statePassword, tooltipOpen, talentActive, isAgency } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod className={!isAgency ? 'w-auto p-0' : ''}>
          {isAgency && <ProgressMod value="14" className="onboarding-progress" />}
          <Card className={isAgency ? 'text-center' : 'p-0 bg-transparent'}>
            {isAgency && (
              <>
                <H1 className="mb-3">Join Us</H1>
                <P className="p-large onboarding-intro">
                  Be a part of world-class community of like minded people carefully vetted by its members and hire them for your projects
                </P>
              </>
            )}
            <form onSubmit={handleSubmit(e => onSubmitForm(e, agencyTalent, talentToken))}>
              <OnboardingForm>
                <OnBoardingFormBody className={!isAgency ? 'm-0' : ''}>
                  {!isAgency && (
                    <>
                      <H1 className="mb-3">
                        <FormattedMessage {...messages.headingSignup} />
                      </H1>
                      <P className="p16 mb-5" opacityVal="0.5">
                        Create your free account
                      </P>
                      <P className="p20">Select your account type</P>
                      <UserTypeButtonGroup>
                        <button type="button" className={talentActive ? 'active' : ''} onClick={this.userToggleSwitch}>
                          Talent
                        </button>
                        <button type="button" className={!talentActive ? 'active' : ''} onClick={this.userToggleSwitch}>
                          Employer
                        </button>
                      </UserTypeButtonGroup>
                      {talentActive ? this.talentBullets() : this.employerBullets()}
                    </>
                  )}
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...containerMessage.labelEmailAddress} />
                    </FormLabel>
                    <Field
                      name="email"
                      type="text"
                      component={renderField}
                      placeholder={containerMessage.placeholderEmailAddress.defaultMessage}
                      value={email}
                      disabled={disableEmail}
                      onChange={e => onChangeEmail(e.target.value)}
                      normalize={normalize.trimSpace}
                      validate={[formValidations.required, formValidations.email]}
                      wrapperClassName="no-icon"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelPassword} />
                    </FormLabel>
                    <PasswordFieldWrapper>
                      <div className="w-100">
                        <Field
                          name="password"
                          type="password"
                          component={renderField}
                          placeholder={messages.placeholderPassword.defaultMessage}
                          value={password}
                          onChange={e => {
                            onChangePassword(e);
                            this.handleChangePassword(e.target.value);
                          }}
                          normalize={normalize.trimSpace}
                          validate={[formValidations.required, formValidations.password]}
                          onFocus={() => this.setToolTipOpen(true)}
                          onclick={() => this.setToolTipOpen(true)}
                          onBlur={() => this.setToolTipOpen(false)}
                          id="tooltipPassword"
                          errorMessageToShow={!tooltipOpen}
                          wrapperClassName="no-icon"
                        />
                      </div>
                      <div className="tooltip-wrapper">
                        <span id="tooltipPassword" />
                        <Tooltip placement="right" className="d-none d-md-block" isOpen={tooltipOpen} target="tooltipPassword">
                          {passwordTooltip(statePassword)}
                        </Tooltip>
                      </div>
                    </PasswordFieldWrapper>
                  </FormGroup>
                  <P className="mt-4 text-start">
                    <small>
                      <Field
                        name="privacyPolicy"
                        type="checkbox"
                        component={renderFieldoptCheckbox}
                        value={privacyCheck}
                        onChange={onPrivacyPolicyCheck}
                        message={this.privacyPolicyButton}
                        validate={[formValidations.checked]}
                      />
                    </small>
                  </P>
                  {!isAgency && (
                    <div className="mt-4">
                      <Button className={`${getBtnClass(loading, responseSuccess, responseError)} w-100`} disabled={invalid}>
                        <FormattedMessage {...messages.signupButton} />
                      </Button>
                      <P className="p16 mt-4">
                        <FormattedMessage {...messages.textHaveAccount} />
                        <A href={loginLink} className="ms-1 text-decoration-underline">
                          <FormattedMessage {...messages.loginLink} />
                        </A>
                      </P>
                    </div>
                  )}
                </OnBoardingFormBody>
                {isAgency && (
                  <>
                    <hr />
                    <OnBoardingFormBody className="d-flex justify-content-between align-items-center flex-column flex-md-row">
                      <FormLabel className="order-2 order-md-1 mt-4 mt-md-0">
                        Have an account?
                        <A href="/agency/login" className="ms-1">
                          Login
                        </A>
                      </FormLabel>
                      <Button className={`${getBtnClass(loading, responseSuccess, responseError)} order-1 order-md-2`} disabled={invalid}>
                        <FormattedMessage {...messages.signupButton} />
                      </Button>
                    </OnBoardingFormBody>
                  </>
                )}
              </OnboardingForm>
            </form>
          </Card>
        </ContainerMod>
      </React.Fragment>
    );
  }

  talentBullets() {
    return (
      <>
        <P className="p16 mt-4">
          <FormattedMessage {...messages.talentBulletsText} />
        </P>
        <UserBulletPointList className="mb-5">
          <li>
            <SVG src={circleTickIcon} />
            <P className="p16" opacityVal="0.5">
              <FormattedMessage {...messages.talentBullets1} />
            </P>
          </li>
          <li>
            <SVG src={circleTickIcon} />
            <P className="p16" opacityVal="0.5">
              <FormattedMessage {...messages.talentBullets2} />
            </P>
          </li>
          <li>
            <SVG src={circleTickIcon} />
            <P className="p16" opacityVal="0.5">
              <FormattedMessage {...messages.talentBullets3} />
            </P>
          </li>
        </UserBulletPointList>
      </>
    );
  }

  employerBullets() {
    return (
      <>
        <P className="p16 mt-4">
          <FormattedMessage {...messages.employerBulletText} />
        </P>
        <UserBulletPointList className="mb-5">
          <li>
            <SVG src={circleTickIcon} />
            <P className="p16" opacityVal="0.5">
              <FormattedMessage {...messages.employerBullets1} />
            </P>
          </li>
          <li>
            <SVG src={circleTickIcon} />
            <P className="p16" opacityVal="0.5">
              <FormattedMessage {...messages.employerBullets2} />
            </P>
          </li>
          <li>
            <SVG src={circleTickIcon} />
            <P className="p16" opacityVal="0.5">
              <FormattedMessage {...messages.employerBullets3} />
            </P>
          </li>
        </UserBulletPointList>
      </>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: value => dispatch(signUpEmail(value)),
    onChangeReferral: value => dispatch(signUpReferral(value)),
    onChangePassword: evt => {
      const passwordHashed = sha256(evt.target.value);
      dispatch(signUpPassword(passwordHashed));
    },
    onPrivacyPolicyCheck: evt => {
      const check = evt.target.value;
      if (!check) dispatch(changePrivacyPolicy(false));
      else dispatch(changePrivacyPolicy(true));
    },
    onSubmitForm: (evt, agencyTalent, talentToken) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(signUp(agencyTalent, talentToken));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  privacyCheck: makeSelectPrivacyCheck(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  referral: makeSelectReferralVal(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    initialValues: initialState,
    touchOnChange: true,
  }),
)(SignUpPage);
