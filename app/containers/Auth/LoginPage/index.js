/**
 * LoginPage
 * This is the Login page for the App, at the '/login' route
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { reduxForm, Field } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { FormGroup } from 'reactstrap';
import * as normalize from 'utils/normalize';
import * as formValidations from 'utils/formValidations';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import StorageService from 'utils/StorageService';
import { renderField, renderFieldPassword } from 'utils/Fields';
import { Button, OnboardingForm, OnBoardingFormBody, H1, FormLabel, A, P, ContainerMod, Card } from 'components';
import { loadRepos } from 'containers/App/actions';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import { forgotPasswordLink, signupLink } from 'containers/App/utils';
import containerMessage from 'containers/messages';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { propTypes } from './proptypes';
import { key } from './constants';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    const userType = StorageService.get('selectedRoleType');
    this.state = { passwordType: 'password', userType, isAgency: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname.split('/').includes('agency')) {
      StorageService.set('selectedRoleType', 'agency', { hash: true });
      this.setState({ isAgency: true });
    } else {
      StorageService.set('selectedRoleType', 'talent', { hash: true });
    }
  }

  onClickIcon = () => {
    this.setState(({ passwordType }) => ({
      passwordType: passwordType === 'text' ? 'password' : 'text',
    }));
  };

  render() {
    const {
      email,
      password,
      loading,
      onChangeEmail,
      onChangePassword,
      responseSuccess,
      responseError,
      invalid,
      handleSubmit,
      onSubmitLogin,
    } = this.props;
    const { passwordType, userType, isAgency } = this.state;
    return (
      <>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod className={!isAgency ? 'w-auto p-0' : ''}>
          <Card className={isAgency ? 'text-center' : 'p-0 bg-transparent'}>
            {isAgency && <H1 className="mb-3">Login to Codemonk</H1>}
            <form>
              <OnboardingForm>
                <OnBoardingFormBody>
                  {!isAgency && (
                    <>
                      <H1 className="mb-3">
                        {userType === 'admin' ? (
                          <FormattedMessage {...messages.headingAdminLogin} />
                        ) : (
                          <FormattedMessage {...messages.headingLogin} />
                        )}
                      </H1>
                      <P className="p16 mb-5" opacityVal="0.5">
                        Continue where you left off
                      </P>
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
                      onChange={onChangeEmail}
                      normalize={normalize.trimSpace}
                      validate={[formValidations.required, formValidations.email]}
                      wrapperClassName="no-icon"
                    />
                  </FormGroup>

                  <FormGroup>
                    <div className="d-flex justify-content-between">
                      <FormLabel>
                        <FormattedMessage {...messages.labelPassword} />
                      </FormLabel>
                      {userType !== 'admin' && !isAgency && (
                        <A href={forgotPasswordLink} className="sm">
                          <FormattedMessage {...messages.forgotPasswordText} />
                        </A>
                      )}
                    </div>
                    <Field
                      name="password"
                      type={passwordType}
                      component={renderFieldPassword}
                      placeholder={messages.labelPassword.defaultMessage}
                      value={password}
                      onChange={onChangePassword}
                      normalize={normalize.trimSpace}
                      validate={[formValidations.required]}
                      onClick={this.onClickIcon}
                    />
                  </FormGroup>
                  {isAgency && (
                    <div className="d-flex justify-content-end mt-4 mt-md-3">
                      <A href="/agency/forgot-password" className="sm">
                        <FormattedMessage {...messages.forgotPasswordText} />
                      </A>
                    </div>
                  )}
                  {!isAgency && (
                    <div className="mt-4">
                      <>
                        <Button
                          className={`${getBtnClass(loading, responseSuccess, responseError)} w-100`}
                          disabled={invalid}
                          onClick={handleSubmit(onSubmitLogin)}
                        >
                          <FormattedMessage {...messages.loginButtonText} />
                        </Button>
                        <P className="p16 mt-4">
                          <FormattedMessage {...messages.textBeforeSignupButton} />
                          <A href={signupLink} className="ms-1 text-decoration-underline">
                            <FormattedMessage {...messages.signupButtonText} />
                          </A>
                        </P>
                      </>

                      {userType === 'admin' && (
                        <Button
                          className={`${getBtnClass(loading, responseSuccess, responseError)} w-100`}
                          disabled={invalid}
                          onClick={handleSubmit(onSubmitLogin)}
                        >
                          <FormattedMessage {...messages.loginButtonText} />
                        </Button>
                      )}
                    </div>
                  )}
                </OnBoardingFormBody>
                {isAgency && (
                  <>
                    <hr />
                    <OnBoardingFormBody className="d-flex justify-content-between align-items-center flex-column flex-md-row">
                      <FormLabel className="order-2 order-md-1 mt-4 mt-md-0">
                        New to codemonk?
                        <A href="/agency/signup" className="ms-1">
                          Sign up
                        </A>
                      </FormLabel>
                      <Button
                        className={`${getBtnClass(loading, responseSuccess, responseError)} order-1 order-md-2`}
                        disabled={invalid}
                        onClick={handleSubmit(onSubmitLogin)}
                      >
                        <FormattedMessage {...messages.loginButtonText} />
                      </Button>
                    </OnBoardingFormBody>
                  </>
                )}
              </OnboardingForm>
            </form>
          </Card>
        </ContainerMod>
      </>
    );
  }
}

LoginPage.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  email: selectors.makeSelectEmail(),
  password: selectors.makeSelectPassword(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeEmail: event => dispatch(actions.changeEmail(event.target.value)),
    onChangePassword: event => dispatch(actions.changePassword(event.target.value)),

    onSubmitLogin: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.login());
    },
  };
}

const withConnect = connect(
  mapStateToProp,
  mapDispatchToProp,
);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(LoginPage);
