/**
 * UpdatePasswordTab
 * This is the Change Password Tab for Account Settings
 */
import React, { Component } from 'react';
import { reduxForm, Field, touch } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Tooltip, Row, Col } from 'reactstrap';
import * as normalize from 'utils/normalize';
import * as formValidations from 'utils/formValidations';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { renderFieldPassword } from 'utils/Fields';
import { Button, H4, FormLabel } from 'components';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import { PasswordFieldWrapper } from 'containers/Auth/SignUp/signup-styles';
import authMessages from 'containers/Auth/ResetPasswordPage/messages';
import { passwordTooltip } from 'containers/Auth/SignUp/utils';
import { propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { key } from './constants';

export class UpdatePasswordTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editFlag: true,
      tooltipOpen: false,
      oldPasswordType: 'password',
      passwordType: 'password',
      confirmPasswordType: 'password',
    };
  }

  onClickIcon = type => {
    if (type === 'passwordType') {
      this.setState(({ passwordType }) => ({
        passwordType: passwordType === 'text' ? 'password' : 'text',
      }));
    } else if (type === 'confirmPasswordType') {
      this.setState(({ confirmPasswordType }) => ({
        confirmPasswordType: confirmPasswordType === 'text' ? 'password' : 'text',
      }));
    } else if (type === 'oldPasswordType') {
      this.setState(({ oldPasswordType }) => ({
        oldPasswordType: oldPasswordType === 'text' ? 'password' : 'text',
      }));
    }
  };

  setToolTipOpen = value => {
    this.setState({ tooltipOpen: value });
  };

  handleSubmitButton = (invalid, editFlag) => {
    let output = true;

    if (!invalid && editFlag) {
      output = false;
    }
    return output;
  };

  render() {
    const {
      dispatch,
      invalid,
      handleSubmit,
      oldPassword,
      password,
      confirmPassword,
      onChangeOldPassword,
      onChangePassword,
      onChangeConfirmPassword,
      onSubmitTalentPassword,
      settingsPage,
    } = this.props;
    const { editFlag, tooltipOpen, oldPasswordType, passwordType, confirmPasswordType } = this.state;
    return (
      <React.Fragment>
        <H4 className="newH4 mt-4 mb-3" opacityVal="0.5">
          <FormattedMessage {...containerMessage.changePassword} />
        </H4>

        <form>
          <Row>
            <Col className={`${settingsPage ? 'col-lg-7 col-md-12' : 'col-md-6'}`}>
              <FormGroup>
                <FormLabel>
                  <FormattedMessage {...containerMessage.labelOldPassword} />
                </FormLabel>
                <Field
                  name="oldPassword"
                  type={oldPasswordType}
                  component={renderFieldPassword}
                  disabled={!editFlag}
                  placeholder={containerMessage.placeHolderOldPassword.defaultMessage}
                  value={oldPassword}
                  onChange={onChangeOldPassword}
                  normalize={normalize.trimSpace}
                  validate={[formValidations.required]}
                  onClick={() => {
                    this.onClickIcon('oldPasswordType');
                  }}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  <FormattedMessage {...authMessages.labelNewPassword} />
                </FormLabel>
                <PasswordFieldWrapper>
                  <div className="w-100">
                    <Field
                      name="password"
                      type={passwordType}
                      component={renderFieldPassword}
                      disabled={!editFlag}
                      placeholder={authMessages.placeHolderNewPassword.defaultMessage}
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
                  <FormattedMessage {...authMessages.labelConfirmPassword} />
                </FormLabel>
                <Field
                  name="confirmPassword"
                  type={confirmPasswordType}
                  component={renderFieldPassword}
                  disabled={!editFlag}
                  placeholder={authMessages.placeHolderRepeatPassword.defaultMessage}
                  value={confirmPassword}
                  onChange={e => {
                    dispatch(touch(key, 'confirmPassword'));
                    onChangeConfirmPassword(e);
                  }}
                  normalize={normalize.trimSpace}
                  validate={[formValidations.required, formValidations.passwordsMustMatch]}
                  onClick={() => {
                    this.onClickIcon('confirmPasswordType');
                  }}
                />
              </FormGroup>
            </Col>
          </Row>

          <Button
            className="mt-3 btn-primary btn-submit"
            disabled={this.handleSubmitButton(invalid, editFlag)}
            onClick={handleSubmit(e => onSubmitTalentPassword(e))}
          >
            <FormattedMessage {...authMessages.changePassword} />
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

UpdatePasswordTab.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  oldPassword: selectors.makeSelectOldPassword(),
  password: selectors.makeSelectPassword(),
  confirmPassword: selectors.makeSelectConfirmPassword(),
  loading: makeSelectLoading(),
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeOldPassword: event => dispatch(actions.changeOldPassword(event.target.value)),
    onChangePassword: event => dispatch(actions.changePassword(event.target.value)),
    onChangeConfirmPassword: event => dispatch(actions.changeConfirmPassword(event.target.value)),

    onSubmitTalentPassword: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.submitTalentPassword());
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
)(UpdatePasswordTab);
