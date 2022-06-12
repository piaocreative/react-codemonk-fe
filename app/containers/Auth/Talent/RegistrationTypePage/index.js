/** RegistrationTypePage
 * This is the Signup page for the App, at the '/talent/registration-type' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import injectSaga from 'utils/injectSaga';
import { FormGroup } from 'reactstrap';
import get from 'lodash/get';
import { API_URL, USER, DETAILS } from 'containers/App/constants';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import { RadioButton } from 'utils/Fields';
import * as formValidations from 'utils/formValidations';
import { stepSize, agencyStepSize, signupLink, redirectToPage, agencyRedirectToPage } from 'containers/App/utils';
import { ContainerMod, ProgressMod, Card, H1, H4, LinkButtonMod, FormWrapper, Button, ToastifyMessage } from 'components';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import * as selectors from './selectors';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import { key, registrationTypes } from './constants';
import 'cropperjs/dist/cropper.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class RegistrationTypePage extends React.Component {
  componentDidMount() {
    this.loaderUserDetails();
  }

  loaderUserDetails = () => {
    const data = { method: 'GET' };
    const { history } = this.props;
    const requestURL = `${API_URL}${USER}${DETAILS}`;
    request(requestURL, data)
      .then(this.setUserDetails)
      .catch(() => {
        history.push(signupLink);
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setUserDetails = response => {
    const { dispatch, history, location } = this.props;
    if (get(response, 'status')) {
      const currentSignupStep = get(response, 'data.signupStep') === 0.1 ? 1 : get(response, 'data.signupStep', 0);
      const role = get(response, 'data.role');
      let userType = '';
      if (role === 1) {
        userType = 'freelancer';
        redirectToPage(history, location.redirection, currentSignupStep, 0);
      } else if (role === 3) {
        userType = 'agency';
        agencyRedirectToPage(history, location.redirection, currentSignupStep, 0);
      }
      dispatch(change(key, 'registrationType', userType));
    } else {
      history.push(signupLink);
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  progressBarValue = registrationType => {
    let output = 100;
    if (registrationType === 'freelancer') {
      output = stepSize(1);
    } else if (registrationType === 'agency') {
      output = agencyStepSize(1);
    }
    return output;
  };

  handleChangeRegistrationType = value => {
    const { dispatch } = this.props;
    dispatch(change(key, 'registrationType', value));
  };

  handleSaveForLater = (e, submitType) => {
    const { registrationType, onSaveForLater, onSubmitRegistrationType } = this.props;
    const data = { registrationType };

    if (submitType === 'saveForLater') {
      onSaveForLater(e, data);
    } else if (submitType === 'continue') {
      onSubmitRegistrationType(e, data);
    }
  };

  render() {
    const { registrationType, invalid, loading, responseSuccess, responseError, handleSubmit } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod>
          <ProgressMod value={this.progressBarValue(registrationType)} className="onboarding-progress" />
          <Card>
            <H1 className="text-center">
              <FormattedMessage {...messages.headingRegistrationTypeProfile} />
            </H1>
            <PaymentPageWrapper>
              <FormWrapper>
                <form>
                  <H4>
                    <FormattedMessage {...messages.subHeadingRegistrationType} />
                  </H4>
                  <FormGroup>
                    {registrationTypes.map(item => (
                      <Field
                        name={item.groupName}
                        component={RadioButton}
                        groupName={item.groupName}
                        label={item.label}
                        className="radioButton-block"
                        checked={registrationType === item.value}
                        validate={[formValidations.required]}
                        onChangeRadio={() => this.handleChangeRegistrationType(item.value)}
                      />
                    ))}
                  </FormGroup>
                  <hr />
                  <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end">
                    <LinkButtonMod
                      color="link"
                      onClick={e => {
                        this.handleSaveForLater(e, 'saveForLater');
                      }}
                    >
                      <FormattedMessage {...messages.saveLaterButton} />
                    </LinkButtonMod>
                    <Button
                      type="submit"
                      className={`${getBtnClass(loading, responseSuccess, responseError)} btn-submit`}
                      disabled={invalid}
                      onClick={handleSubmit(e => {
                        this.handleSaveForLater(e, 'continue');
                      })}
                    >
                      <FormattedMessage {...messages.continueButton} />
                    </Button>
                  </div>
                </form>
              </FormWrapper>
            </PaymentPageWrapper>
          </Card>
        </ContainerMod>
      </React.Fragment>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSaveForLater: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.submitRegistrationType('saveForLater', data));
    },
    onSubmitRegistrationType: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitRegistrationType('continue', data));
    },
  };
}

RegistrationTypePage.defaultProps = defaultProps;
RegistrationTypePage.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  registrationType: selectors.registrationType,
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
});
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
)(RegistrationTypePage);
