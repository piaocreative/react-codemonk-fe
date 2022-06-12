/**
 * ResetPasswordPage
 * This is the ResetPassword Page for the App, at the '/reset-password' route
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { reduxForm, Field } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Tooltip } from 'reactstrap';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import request from 'utils/request';
import { API_URL, AUTH, VERIFY_TOKEN_API } from 'containers/App/constants';
import * as normalize from 'utils/normalize';
import * as formValidations from 'utils/formValidations';
import StorageService from 'utils/StorageService';
import { VALIDATION } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { renderFieldPassword } from 'utils/Fields';
import { Button, OnboardingForm, OnBoardingFormBody, H1, FormLabel, ToastifyMessage, P, ContainerMod, Card } from 'components';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import { propTypes } from 'containers/proptypes';
import { passwordTooltip } from 'containers/Auth/SignUp/utils';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { key } from './constants';
import { PasswordFieldWrapper } from '../SignUp/signup-styles';

export class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const resetToken = get(params, 'resetToken', '');
    this.state = {
      resetToken,
      tokenChecking: true,
      validToken: '',
      tooltipOpen: false,
      passwordType: 'password',
      confirmPasswordType: 'password',
      isAgency: false,
    };
  }

  componentDidMount() {
    const { resetToken } = this.state;
    const body = { token: resetToken };
    const data = {
      method: 'POST',
      body,
    };
    const requestURL = `${API_URL}${AUTH}${VERIFY_TOKEN_API}`;
    request(requestURL, data)
      .then(response => {
        this.checkForValidToken(response);
      })
      .catch(() => {
        this.setState({ validToken: false, tokenChecking: false });
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname.split('/').includes('agency')) {
      StorageService.set('selectedRoleType', 'agency', { hash: true });
      this.setState({ isAgency: true });
    } else {
      StorageService.set('selectedRoleType', 'talent', { hash: true });
    }
  }

  checkForValidToken = response => {
    if (get(response, 'status')) {
      const { resetToken } = this.state;
      const { onChangeToken } = this.props;
      this.setState({ validToken: true, tokenChecking: false });
      onChangeToken(resetToken);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      this.setState({ validToken: false, tokenChecking: false });
    }
  };

  onClickIcon = type => {
    if (type === 'passwordType') {
      this.setState(({ passwordType }) => ({
        passwordType: passwordType === 'text' ? 'password' : 'text',
      }));
    } else if (type === 'confirmPasswordType') {
      this.setState(({ confirmPasswordType }) => ({
        confirmPasswordType: confirmPasswordType === 'text' ? 'password' : 'text',
      }));
    }
  };

  setToolTipOpen = value => {
    this.setState({ tooltipOpen: value });
  };

  renderResetPassword = () => {
    const {
      password,
      confirmPassword,
      loading,
      onChangePassword,
      onChangeConfirmPassword,
      responseSuccess,
      responseError,
      invalid,
      handleSubmit,
      onSubmitResetPassword,
    } = this.props;
    const { tokenChecking, validToken, tooltipOpen, passwordType, confirmPasswordType, isAgency } = this.state;
    let output = '';

    if (!tokenChecking && validToken) {
      output = (
        <ContainerMod className={!isAgency ? 'w-auto p-0' : ''}>
          <Card className={isAgency ? 'text-center' : 'p-0 bg-transparent'}>
            {isAgency && (
              <H1 className="mb-3">
                <FormattedMessage {...messages.headingResetPassword} />
              </H1>
            )}
            <form>
              <OnboardingForm>
                <OnBoardingFormBody>
                  {!isAgency && (
                    <>
                      <H1 className="mb-3">
                        <FormattedMessage {...messages.headingResetPassword} />
                      </H1>
                      <P className="p16" opacityVal="0.5">
                        Create a new password for your account
                      </P>
                    </>
                  )}
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelNewPassword} />
                    </FormLabel>
                    <PasswordFieldWrapper>
                      <div className="w-100">
                        <Field
                          name="password"
                          type={passwordType}
                          component={renderFieldPassword}
                          placeholder={messages.placeHolderNewPassword.defaultMessage}
                          value={password}
                          onChange={onChangePassword}
                          normalize={normalize.trimSpace}
                          validate={[formValidations.required, formValidations.password]}
                          onClick={() => {
                            this.onClickIcon('passwordType');
                          }}
                          onFocus={() => this.setToolTipOpen(true)}
                          onBlur={() => this.setToolTipOpen(false)}
                          id="tooltipPassword"
                          errorMessageToShow={!tooltipOpen}
                        />
                      </div>
                      <div className="tooltip-wrapper">
                        <span id="tooltipPassword" />
                        <Tooltip placement="right" className="d-none d-md-block" isOpen={tooltipOpen} target="tooltipPassword">
                          {passwordTooltip(password)}
                        </Tooltip>
                      </div>
                    </PasswordFieldWrapper>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelConfirmPassword} />
                    </FormLabel>
                    <Field
                      name="confirmPassword"
                      type={confirmPasswordType}
                      component={renderFieldPassword}
                      placeholder={messages.placeHolderRepeatPassword.defaultMessage}
                      value={confirmPassword}
                      onChange={onChangeConfirmPassword}
                      normalize={normalize.trimSpace}
                      validate={[formValidations.required, formValidations.passwordsMustMatch]}
                      onClick={() => {
                        this.onClickIcon('confirmPasswordType');
                      }}
                    />
                  </FormGroup>
                  {!isAgency && (
                    <div className="mt-4">
                      <Button
                        className={`${getBtnClass(loading, responseSuccess, responseError)} w-100`}
                        disabled={invalid}
                        onClick={handleSubmit(onSubmitResetPassword)}
                      >
                        <FormattedMessage {...messages.resetPasswordButton} />
                      </Button>
                    </div>
                  )}
                </OnBoardingFormBody>
                {isAgency && (
                  <>
                    <hr />
                    <OnBoardingFormBody className="d-flex justify-content-center">
                      <Button
                        className={`${getBtnClass(loading, responseSuccess, responseError)}`}
                        disabled={invalid}
                        onClick={handleSubmit(onSubmitResetPassword)}
                      >
                        <FormattedMessage {...messages.resetPasswordButton} />
                      </Button>
                    </OnBoardingFormBody>
                  </>
                )}
              </OnboardingForm>
            </form>
          </Card>
        </ContainerMod>
      );
    } else if (!tokenChecking) {
      output = (
        <H1 className=" mb-3">
          <FormattedMessage {...messages.invalidLink} />
        </H1>
      );
    }
    return output;
  };

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        {this.renderResetPassword()}
      </React.Fragment>
    );
  }
}

ResetPasswordPage.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  token: selectors.makeSelectToken(),
  password: selectors.makeSelectPassword(),
  confirmPassword: selectors.makeSelectConfirmPassword(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeToken: value => dispatch(actions.changeToken(value)),
    onChangePassword: event => dispatch(actions.changePassword(event.target.value)),
    onChangeConfirmPassword: event => dispatch(actions.changeConfirmPassword(event.target.value)),

    onSubmitResetPassword: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.submitResetPassword());
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
)(ResetPasswordPage);
