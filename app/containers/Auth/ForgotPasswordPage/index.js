/**
 * ForgotPassword Page
 * This is the ForgotPassword page for the App, at the '/forgot-password' route
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { FormGroup } from 'reactstrap';
import { renderField } from 'utils/Fields';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { defaultProps, propTypes } from 'containers/proptypes';
import * as formValidations from 'utils/formValidations';
import * as normalize from 'utils/normalize';
import containerMessage from 'containers/messages';
import StorageService from 'utils/StorageService';
import { FormLabel, Button, H1, P, A, OnboardingForm, OnBoardingFormBody, ContainerMod, Card } from 'components';
import { loadRepos } from 'containers/App/actions';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import { loginLink } from 'containers/App/utils';
import { key } from './constants';
import messages from './messages';
import { changeEmail, submitForgotPassword } from './actions';
import { makeSelectEmail } from './selectors';
import reducer, { initialState } from './reducer';
import saga from './saga';

export class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAgency: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname.split('/').includes('agency')) {
      StorageService.set('selectedRoleType', 'agency', { hash: true });
      this.setState({ isAgency: true });
    } else {
      StorageService.set('selectedRoleType', 'talent', { hash: true });
    }
  }

  render() {
    const { handleSubmit, onSubmitForm, email, loading, responseSuccess, responseError, onChangeEmail, invalid } = this.props;
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
                <H1 className="mb-3">
                  <FormattedMessage {...messages.headingForgotPassword} />
                </H1>
                <P className="p-large onboarding-intro">
                  <FormattedMessage {...messages.textIntro} />
                </P>
              </>
            )}
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <OnboardingForm>
                <OnBoardingFormBody>
                  {!isAgency && (
                    <>
                      <H1 className="mb-3">
                        <FormattedMessage {...messages.headingForgotPassword} />
                      </H1>
                      <P className="p16 mb-5" opacityVal="0.5">
                        <FormattedMessage {...messages.textIntro} />
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
                    />
                  </FormGroup>
                  {!isAgency && (
                    <div className="mt-4">
                      <Button className={`${getBtnClass(loading, responseSuccess, responseError)} w-100`} disabled={invalid}>
                        <FormattedMessage {...messages.buttonResetLink} />
                      </Button>
                      <P className="p16 mt-5">
                        <FormattedMessage {...messages.textBackTo} />
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
                        <FormattedMessage {...messages.textBackTo} />
                        <A href="/agency/login" className="ms-1">
                          <FormattedMessage {...messages.loginLink} />
                        </A>
                      </FormLabel>
                      <Button className={`${getBtnClass(loading, responseSuccess, responseError)}  order-1 order-md-2`} disabled={invalid}>
                        <FormattedMessage {...messages.buttonResetLink} />
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
ForgotPasswordPage.defaultProps = defaultProps;
ForgotPasswordPage.propTypes = propTypes;

export function mapDispatchToProp(dispatch) {
  return {
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),

    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();

      dispatch(loadRepos());
      dispatch(submitForgotPassword());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
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
    initialValues: initialState,
    touchOnChange: true,
  }),
)(ForgotPasswordPage);
