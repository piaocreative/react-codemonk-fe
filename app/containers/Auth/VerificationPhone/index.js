import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Field, reduxForm, change } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { FormGroup } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import * as normalize from 'utils/normalize';
import * as formValidations from 'utils/formValidations';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { renderField } from 'utils/Fields';
import { ContainerMod, ProgressMod, Card, H1, LinkButtonMod, P, OnboardingForm, OnBoardingFormBody, FormLabel } from 'components';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import StorageService from 'utils/StorageService';
import { verificationPhoneOTP, reset } from 'containers/App/actions';
import { defaultProps, propTypes } from 'containers/proptypes';
import { getWrapperClassName } from 'containers/Auth/utils';
import containerMessage from 'containers/messages';
import * as actions from './actions';
import { makeSelectOTP } from './selectors';
import reducer, { initialState } from './reducer';
import saga from './saga';
import { key } from './constants';
import messages from './messages';

export class VerificationPhonePage extends Component {
  constructor(props) {
    super(props);
    const userPhone = StorageService.get('userPhone');
    this.state = { userPhone };
  }

  componentDidUpdate(prevProps) {
    const { dispatch, otp } = this.props;
    if (prevProps.otp !== otp && otp === '') {
      dispatch(change('verificationForm', 'otp', ''));
    }
  }

  redirectToNewPhone = history => {
    const { onReset } = this.props;
    StorageService.set('userPhone', '');
    onReset();
    history.replace('/client/enter-phone');
  };

  renderVerificationPart2 = () => {
    const { onResendOtp, history } = this.props;
    return (
      <FormGroup>
        <div>
          <div className="d-flex align-items-center">
            <FormattedMessage {...messages.textResendCode} />
            <LinkButtonMod color="link" className="ms-1" onClick={() => onResendOtp()}>
              <FormattedMessage {...messages.linkResendCode} />
            </LinkButtonMod>
          </div>
          <div className="mt-1">
            <LinkButtonMod color="link" onClick={() => this.redirectToNewPhone(history)}>
              <FormattedMessage {...messages.linkDifferentPhone} />
            </LinkButtonMod>
          </div>
        </div>
      </FormGroup>
    );
  };

  render() {
    const { userPhone } = this.state;
    const { handleSubmit, onSubmitForm, otp, loading, responseSuccess, responseError, onChangeOtp } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod>
          <ProgressMod value="28" className="onboarding-progress" />
          <Card className="text-center">
            <H1>
              <FormattedMessage {...messages.headingVerification} />
            </H1>
            <P className="p-large onboarding-intro">
              <FormattedMessage {...containerMessage.verificationPhoneTextIntro} />
              <br />
              <b>{userPhone}</b>
            </P>
            <OnboardingForm>
              <OnBoardingFormBody>
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
                      placeholder={messages.placeholderPhoneOTP.defaultMessage}
                      onChange={onChangeOtp}
                      normalize={normalize.trimSpace}
                      validate={[formValidations.required, formValidations.otp]}
                      disabled={loading ? 'disabled' : ''}
                      wrapperClassName={getWrapperClassName(loading, responseSuccess, responseError)}
                    />
                  </FormGroup>
                  {this.renderVerificationPart2()}
                </form>
              </OnBoardingFormBody>
            </OnboardingForm>
          </Card>
        </ContainerMod>
      </React.Fragment>
    );
  }
}

VerificationPhonePage.defaultProps = defaultProps;
VerificationPhonePage.propTypes = propTypes;

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
      dispatch(actions.changeOTP(code));
      if (code.split('').length === 6) {
        dispatch(actions.verifyOTP(code));
        dispatch(verificationPhoneOTP());
      }
    },
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(verificationPhoneOTP());
    },
    onResendOtp: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.resendPhoneCode());
    },
    onReset: () => dispatch(reset()),
  };
}

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
    enableReinitialize: true,
    fields: ['otp'],
    touchOnChange: true,
  }),
)(VerificationPhonePage);
