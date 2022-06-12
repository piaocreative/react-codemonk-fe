/**
 * UpdateEmailIdTab
 * This is the Update Email ID Tab for Account Settings
 */
import React, { Component } from 'react';
import { reduxForm, Field, change } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { sha256 } from 'js-sha256';
import { FormGroup, Row, Col } from 'reactstrap';
import get from 'lodash/get';
import * as formValidations from 'utils/formValidations';
import * as normalize from 'utils/normalize';
import injectSaga from 'utils/injectSaga';
import { renderField, renderFieldPassword } from 'utils/Fields';
import { Button, H4, FormLabel, LinkButtonMod } from 'components';
import { loadRepos } from 'containers/App/actions';
import { setChangeAndUntouch } from 'containers/Auth/utils';
import { makeSelectLoading } from 'containers/App/selectors';
import { propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import { EditLink, ResendBtn } from 'containers/ClientAccountSettingsPage/styles';
import messages from './messages';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { key } from './constants';

export class UpdateEmailIdTab extends Component {
  constructor(props) {
    super(props);
    const { settingsPage } = this.props;
    this.state = {
      editFlag: !!settingsPage,
      otpSent: false,
      passwordType: 'password',
    };
  }

  componentDidMount() {
    const { dispatch, data } = this.props;
    const oldEmailAddress = get(data, 'email', '');
    dispatch(change(key, 'oldEmailAddress', oldEmailAddress));
  }

  handleEdit = editFlag => {
    this.setState({ editFlag: !editFlag });
  };

  handleCancelButton = () => {
    const { dispatch, settingsPage } = this.props;
    const values = { oldEmailAddress: '', emailAddress: '', otp: '', password: '' };
    setChangeAndUntouch(dispatch, key, values);
    this.setState({ editFlag: false || !!settingsPage, otpSent: false });
  };

  handleSendCode = type => {
    const { oldEmailAddress, emailAddress, password, onSendEmailCode, onResendEmailCode } = this.props;
    const data = { oldEmail: oldEmailAddress, email: emailAddress, oldPassword: sha256(password) };
    if (type === 'sendCode') {
      onSendEmailCode(type, data, this.codeSent);
    } else {
      onResendEmailCode(type, data, this.codeSent);
    }
  };

  codeSent = () => {
    this.setState({ otpSent: true });
  };

  emailChangedSuccess = () => {
    const { loadUserDetails } = this.props;
    this.setState({ otpSent: false });
    loadUserDetails();
    this.handleCancelButton();
  };

  handleVerifyCode = () => {
    const { onVerifyCode, otp: value } = this.props;
    const otp = parseInt(value, 10);
    const data = { otp };
    onVerifyCode(data, this.emailChangedSuccess);
  };

  onClickIcon = type => {
    if (type === 'passwordType') {
      this.setState(({ passwordType }) => ({
        passwordType: passwordType === 'text' ? 'password' : 'text',
      }));
    }
  };

  renderCodeFields = () => {
    const { loading } = this.props;
    return (
      <React.Fragment>
        <div className="row-spacing mt-4 mb-4">
          <small className="p-0">{`${containerMessage.verificationMailTextIntro.defaultMessage} ${get(
            this.props,
            'emailAddress',
            ' ',
          )}.`}</small>
        </div>
        <FormGroup>
          <FormLabel>
            <FormattedMessage {...messages.labelEnterEmailOTPCode} />
          </FormLabel>
          <Field
            component={renderField}
            name="otp"
            id="otp"
            type="number"
            className={loading ? 'loading' : ''}
            placeholder={messages.emailOtpPlaceholder.defaultMessage}
            validate={[formValidations.required, formValidations.otp]}
            disabled={loading ? 'disabled' : ''}
          />
          <ResendBtn color="link" onClick={() => this.handleSendCode('resendCode')}>
            <FormattedMessage {...messages.resendCodeCTA} />
          </ResendBtn>
        </FormGroup>
      </React.Fragment>
    );
  };

  render() {
    const { invalid, handleSubmit, settingsPage, onChangePassword, data = {} } = this.props;
    const { editFlag, otpSent, passwordType } = this.state;
    return (
      <React.Fragment>
        <H4 className="newH4 mt-4 mb-3" opacityVal="0.5">
          <FormattedMessage {...containerMessage.editEmailAddress} />
        </H4>

        {!editFlag && !settingsPage && (
          <React.Fragment>
            <div className="d-flex align-items-center justify-content-between">
              <span>{data.email}</span>
              <EditLink
                color="link"
                onClick={() => {
                  this.handleEdit(editFlag);
                }}
              >
                <small className="opacity-100">
                  <FormattedMessage {...containerMessage.headingEditCTA} />
                </small>
              </EditLink>
            </div>
            <hr />
          </React.Fragment>
        )}

        {editFlag && (
          <form>
            <Row>
              <Col className={`${settingsPage ? 'col-lg-7 col-md-12' : 'col-md-6'}`}>
                <FormGroup>
                  <FormLabel>
                    <FormattedMessage {...containerMessage.labelOldEmail} />
                  </FormLabel>
                  <Field
                    name="oldEmailAddress"
                    type="text"
                    component={renderField}
                    placeholder={containerMessage.placeholderEmailAddress.defaultMessage}
                    {...(otpSent ? { disabled: true } : { disabled: false })}
                    validate={[formValidations.required, formValidations.email]}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>
                    <FormattedMessage {...containerMessage.labelnewEmail} />
                  </FormLabel>
                  <Field
                    name="emailAddress"
                    type="text"
                    component={renderField}
                    placeholder={containerMessage.placeholderEmailAddress.defaultMessage}
                    {...(otpSent ? { disabled: true } : { disabled: false })}
                    validate={[formValidations.required, formValidations.email]}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>
                    <FormattedMessage {...containerMessage.labelPasswordConfirm} />
                  </FormLabel>
                  <Field
                    name="password"
                    type={passwordType}
                    component={renderFieldPassword}
                    onChange={onChangePassword}
                    placeholder={containerMessage.placeholderPasswordAddress.defaultMessage}
                    {...(otpSent ? { disabled: true } : { disabled: false })}
                    normalize={normalize.trimSpace}
                    validate={[formValidations.required]}
                    onClick={() => {
                      this.onClickIcon('passwordType');
                    }}
                  />
                </FormGroup>
                {otpSent && this.renderCodeFields()}
              </Col>
            </Row>

            {!otpSent && (
              <Button
                className="mt-3 btn-primary btn-submit"
                disabled={invalid}
                onClick={handleSubmit(() => this.handleSendCode('sendCode'))}
              >
                <FormattedMessage {...messages.btnSendCode} />
              </Button>
            )}
            {otpSent && (
              <Button className="mt-3 btn-primary btn-submit" disabled={invalid} onClick={handleSubmit(this.handleVerifyCode)}>
                <FormattedMessage {...messages.btnVerifyCode} />
              </Button>
            )}
            {!settingsPage && (
              <LinkButtonMod className="ms-4 ms-md-5" color="link" onClick={this.handleCancelButton}>
                <FormattedMessage {...containerMessage.btnCancel} />
              </LinkButtonMod>
            )}
          </form>
        )}
      </React.Fragment>
    );
  }
}

UpdateEmailIdTab.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  oldEmailAddress: selectors.oldEmailAddress,
  emailAddress: selectors.emailAddress,
  password: selectors.password,
  otp: selectors.otp,
  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangePassword: event => dispatch(actions.changePassword(event.target.value)),
    onSendEmailCode: (type, data, onSuccess) => {
      dispatch(loadRepos());
      dispatch(actions.sendEmailCode(type, data, onSuccess));
    },
    onResendEmailCode: (type, data, onSuccess) => {
      dispatch(actions.sendEmailCode(type, data, onSuccess));
    },
    onVerifyCode: (data, onSuccess) => {
      dispatch(loadRepos());
      dispatch(actions.verifyCode(data, onSuccess));
    },
  };
}

const withConnect = connect(
  mapStateToProp,
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
)(UpdateEmailIdTab);
