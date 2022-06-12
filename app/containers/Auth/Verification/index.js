import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Field, reduxForm, change } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { FormGroup } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as normalize from 'utils/normalize';
import * as formValidations from 'utils/formValidations';
import { renderField } from 'utils/Fields';
import StorageService from 'utils/StorageService';
import { H1, LinkButtonMod, P, ProgressMod, OnboardingForm, OnBoardingFormBody, FormLabel, A, ContainerMod, Card } from 'components';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import { signupLink } from 'containers/App/utils';
import { verification, resendCode, reset } from 'containers/App/actions';
import { getWrapperClassName } from 'containers/Auth/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import { changeOTP, verifyOTP } from './actions';
import { makeSelectOTP } from './selectors';
import reducer, { initialState } from './reducer';
import saga from './saga';
import messages from './messages';

export class VerificationPage extends Component {
  constructor(props) {
    super(props);
    const userEmail = StorageService.get('userEmail');
    this.state = { userEmail, isAgency: false };
  }

  componentDidUpdate(prevProps) {
    const { dispatch, otp } = this.props;
    if (prevProps.otp !== otp && otp === '') {
      dispatch(change('verificationForm', 'otp', ''));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname.split('/').includes('agency')) {
      StorageService.set('selectedRoleType', 'agency', { hash: true });
      this.setState({ isAgency: true });
    } else {
      StorageService.set('selectedRoleType', 'talent', { hash: true });
    }
  }

  renderVerificationPart2 = () => {
    const { onResendOtp } = this.props;
    const { isAgency } = this.state;
    return (
      <FormGroup>
        {!isAgency && (
          <>
            <P className="p16">
              <FormattedMessage {...messages.textResendCode} />
            </P>
            <P className="p16">
              <FormattedMessage {...messages.textCheckSpam} />
              <LinkButtonMod color="link" className="ms-1 text-decoration-underline" onClick={() => onResendOtp()}>
                <FormattedMessage {...messages.linkResendCode} />
              </LinkButtonMod>
            </P>
            <hr className="my-4" />
            <P className="p16">
              Alternatively,
              <A href={signupLink} className="ms-1 text-decoration-underline">
                Sign-up using a different email
              </A>
            </P>
          </>
        )}
        {isAgency && (
          <>
            <div>
              <FormattedMessage {...messages.textResendCode} />
              <LinkButtonMod color="link" className="ms-1" onClick={() => onResendOtp()}>
                <FormattedMessage {...messages.linkResendCode} />
              </LinkButtonMod>
            </div>
          </>
        )}
      </FormGroup>
    );
  };

  render() {
    const { userEmail, isAgency } = this.state;
    const { handleSubmit, onSubmitForm, otp, loading, responseSuccess, responseError, onChangeOtp } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod className={!isAgency ? 'w-auto p-0' : ''}>
          {isAgency && <ProgressMod value="28" className="onboarding-progress" />}
          <Card className={isAgency ? 'text-center' : 'p-0 bg-transparent'}>
            {isAgency && (
              <>
                <H1 className="mb-3">
                  <FormattedMessage {...containerMessage.headingVerificationEmail} />
                </H1>
                <P>
                  <FormattedMessage {...containerMessage.verificationMailTextIntro} /> <b>{userEmail}</b>
                </P>
              </>
            )}
            <OnboardingForm>
              <OnBoardingFormBody>
                {!isAgency && (
                  <>
                    <H1 className="mb-3">
                      <FormattedMessage {...containerMessage.headingVerificationEmail} />
                    </H1>
                    <P className="p16" opacityVal="0.5">
                      <FormattedMessage {...containerMessage.verificationMailTextIntro} /> <b>{userEmail}</b>
                    </P>
                  </>
                )}
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelVerificatonCode} />
                    </FormLabel>
                    <Field
                      component={renderField}
                      name="otp"
                      id="otp"
                      type="number"
                      className={loading ? 'loading' : ''}
                      value={otp}
                      placeholder={messages.placeholderVerificatonCode.defaultMessage}
                      onChange={onChangeOtp}
                      normalize={normalize.trimSpace}
                      validate={[formValidations.required, formValidations.mailVerification]}
                      disabled={loading ? 'disabled' : ''}
                      wrapperClassName={getWrapperClassName(loading, responseSuccess, responseError)}
                    />
                  </FormGroup>
                  {this.renderVerificationPart2(isAgency)}
                </form>
              </OnBoardingFormBody>
            </OnboardingForm>
          </Card>
        </ContainerMod>
      </React.Fragment>
    );
  }
}

VerificationPage.defaultProps = defaultProps;
VerificationPage.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  otp: makeSelectOTP(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeOtp: evt => {
      const code = evt.target.value;
      dispatch(changeOTP(code));
      if (code.split('').length === 6) {
        dispatch(verifyOTP(code));
        dispatch(verification());
      }
    },
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(verification());
    },
    onResendOtp: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(resendCode());
    },
    onReset: () => dispatch(reset()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'verificationForm', reducer });
const withSaga = injectSaga({ key: 'verificationForm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: 'verificationForm',
    initialValues: initialState,
    enableReinitialize: true,
    fields: ['otp'],
    touchOnChange: true,
  }),
)(VerificationPage);
