import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import base from 'base-64';
import { Field, reduxForm, change } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl';
import { FormGroup } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { defaultProps, propTypes } from 'containers/proptypes';
import * as normalize from 'utils/normalize';
import * as formValidations from 'utils/formValidations';
import injectSaga from 'utils/injectSaga';
import { renderField } from 'utils/Fields';
import { H1, P, OnboardingForm, OnBoardingFormBody, FormLabel } from 'components';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import { loadRepos } from 'containers/App/actions';
import { TALENT_DASHBOARD } from 'containers/App/constants';
import { getWrapperClassName } from 'containers/Auth/utils';
import containerMessage from 'containers/messages';
import * as actions from './actions';

import * as selectors from './selectors';
import saga from './saga';
import messages from './messages';
import { key } from './constants';

export class TalentEmailVerification extends Component {
  constructor(props) {
    super(props);

    const userEmail = get(props, 'match.params.emailID', '');
    const email = base.decode(userEmail);
    this.state = {
      email,
    };
  }

  handleChangeOTP = e => {
    const { email } = this.state;
    const { dispatch, onSubmitOTP } = this.props;
    const otpValue = get(e, 'target.value');
    dispatch(change(key, 'otp', otpValue));
    if (otpValue.split('').length === 6) {
      const otp = Number(otpValue);
      const data = { email, otp };
      onSubmitOTP(e, data, this.otpSuccess);
    }
  };

  otpSuccess = () => {
    const { dispatch, history } = this.props;
    dispatch(change(key, 'otp', ''));
    history.replace(TALENT_DASHBOARD);
  };

  render() {
    const { email } = this.state;
    const { otp, loading, responseSuccess, responseError } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <>
          <OnboardingForm>
            <OnBoardingFormBody>
              <H1 className="mb-3">
                <FormattedMessage {...containerMessage.headingVerificationEmail} />
              </H1>
              <P className="p16" opacityVal="0.5">
                <FormattedMessage {...containerMessage.verificationMailTextIntro} /> <b>{email}</b>
              </P>
              <form>
                <FormGroup>
                  <FormLabel>
                    <FormattedMessage {...messages.labelVerificatonCode} />
                  </FormLabel>
                  <Field
                    name="otp"
                    component={renderField}
                    type="number"
                    className={loading ? 'loading' : ''}
                    value={otp}
                    placeholder={messages.placeholderVerificatonCode.defaultMessage}
                    onChange={this.handleChangeOTP}
                    normalize={normalize.trimSpace}
                    validate={[formValidations.required, formValidations.mailVerification]}
                    disabled={loading ? 'disabled' : ''}
                    wrapperClassName={getWrapperClassName(loading, responseSuccess, responseError)}
                  />
                </FormGroup>
              </form>
            </OnBoardingFormBody>
          </OnboardingForm>
        </>
      </React.Fragment>
    );
  }
}

TalentEmailVerification.defaultProps = defaultProps;
TalentEmailVerification.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  otp: selectors.otp,
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitOTP: (evt, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.verifyOTP(data, onSuccess));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key, saga });

export default compose(
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(TalentEmailVerification);
