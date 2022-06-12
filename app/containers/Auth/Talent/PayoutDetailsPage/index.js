/** PayoutDetailsPage
 * This is the Signup page for the App, at the '/payout' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, change, Field } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import get from 'lodash/get';
import has from 'lodash/has';
import { API_URL, USER, DETAILS } from 'containers/App/constants';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import { ContainerMod, ProgressMod, Card, H1, H4, LinkButtonMod, FormWrapper, FormLabel, Button } from 'components';
import { loadRepos } from 'containers/App/actions';
import { handleBackButton } from 'containers/Auth/utils';
import { renderField } from 'utils/Fields';
import containerMessage from 'containers/messages';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { agencyStepSize, signupLink, agencyRedirectToPage } from 'containers/App/utils';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import ToastifyMessage from 'components/ToastifyMessage';
import { defaultProps, propTypes } from 'containers/proptypes';
import * as actions from './actions';
import { key } from './constants';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { formFields, getFieldValidator } from './fields';

export class PayoutDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loaderUserDetails();
  }

  loaderUserDetails = () => {
    const data = { method: 'GET' };
    const { history } = this.props;
    const requestURL = `${API_URL}${USER}${DETAILS}`;
    request(requestURL, data)
      .then(this.setPersonalDetails)
      .catch(() => {
        history.push(signupLink);
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setPersonalDetails = response => {
    const { dispatch, history, location } = this.props;
    if (get(response, 'status')) {
      const currentSignupStep = has(response, 'data.signupStep') === true ? get(response, 'data.signupStep') + 1 : 1;
      agencyRedirectToPage(history, location.redirection, currentSignupStep, 4);
      this.updateInitialStoreValue({ dispatch, response });
    } else {
      history.push(signupLink);
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleSaveForLater = e => {
    e.preventDefault();
    const { onSaveForLater } = this.props;
    onSaveForLater();
  };

  updateInitialStoreValue = ({ dispatch, response }) => {
    const { data } = response;
    dispatch(change(key, 'bankName', get(data, 'payDetails.bankName', '')));
    dispatch(change(key, 'bankAccountNumber', get(data, 'payDetails.accNumber', '')));
    dispatch(change(key, 'bankCode', get(data, 'payDetails.bankCode', '')));
    dispatch(actions.changeBankName(get(data, 'payDetails.bankName', '')));
    dispatch(actions.changeAccountNumber(get(data, 'payDetails.accNumber', '')));
    dispatch(actions.changeBankCode(get(data, 'payDetails.bankCode', '')));
  };

  render() {
    const {
      bankName,
      accNumber,
      bankCode,
      onChangeBankCode,
      onChangeBankName,
      onChangeAccountNumber,
      invalid,
      loading,
      responseSuccess,
      responseError,
      handleSubmit,
      onSubmitPayoutDetailsForm,
      history,
    } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod>
          <ProgressMod value={agencyStepSize(5)} className="onboarding-progress" />
          <Card>
            <H1 className="text-center">
              <FormattedMessage {...messages.headingPayoutDetails} />
            </H1>
            <FormWrapper>
              <H4>
                <FormattedMessage {...messages.subHeadingBankDetails} />
              </H4>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FormGroup>
                      <FormLabel>
                        <FormattedMessage {...messages.labelBankName} />
                      </FormLabel>
                      <Field
                        name="bankName"
                        type="text"
                        component={renderField}
                        placeholder={messages.placeholderBankName.defaultMessage}
                        value={bankName}
                        onChange={onChangeBankName}
                        validate={getFieldValidator('bankName', true)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <FormLabel>
                        <FormattedMessage {...containerMessage.labelAccountNo} />
                      </FormLabel>
                      <Field
                        name="bankAccountNumber"
                        type="text"
                        component={renderField}
                        placeholder={containerMessage.placeholderAccountNumber.defaultMessage}
                        value={accNumber}
                        onChange={onChangeAccountNumber}
                        validate={getFieldValidator('bankAccountNumber', true)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <FormLabel>
                        <FormattedMessage {...containerMessage.labelIFSC} />
                      </FormLabel>
                      <Field
                        name="bankCode"
                        type="text"
                        component={renderField}
                        placeholder={containerMessage.placeholderIFSCCode.defaultMessage}
                        value={bankCode}
                        onChange={onChangeBankCode}
                        validate={getFieldValidator('bankCode', true)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end">
                  <LinkButtonMod
                    className="left-arrow link me-auto"
                    color="link"
                    onClick={e => {
                      handleBackButton(e, history, '/agency/agency-certificate');
                    }}
                  >
                    <FormattedMessage {...containerMessage.backButton} />
                  </LinkButtonMod>

                  <LinkButtonMod
                    color="link"
                    onClick={e => {
                      this.handleSaveForLater(e);
                    }}
                  >
                    <FormattedMessage {...containerMessage.saveLaterButton} />
                  </LinkButtonMod>
                  <Button
                    type="submit"
                    className={`${getBtnClass(loading, responseSuccess, responseError)} btn-submit`}
                    disabled={invalid}
                    data-testid="submitBtn"
                    onClick={handleSubmit(e => {
                      onSubmitPayoutDetailsForm(e);
                    })}
                  >
                    <FormattedMessage {...containerMessage.continueButton} />
                  </Button>
                </div>
              </form>
            </FormWrapper>
          </Card>
        </ContainerMod>
      </React.Fragment>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    onChangeBankName: evt => dispatch(actions.changeBankName(evt.target.value)),
    onChangeAccountNumber: evt => dispatch(actions.changeAccountNumber(evt.target.value)),
    onChangeBankCode: evt => dispatch(actions.changeBankCode(evt.target.value)),
    onSaveForLater: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.submitPayoutDetailsForm('saveForLater'));
    },
    onSubmitPayoutDetailsForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitPayoutDetailsForm('continue'));
    },
  };
}
PayoutDetailsPage.defaultProps = defaultProps;
PayoutDetailsPage.propTypes = propTypes;
const mapStateToProps = createStructuredSelector({
  bankName: selectors.makeSelectBankName(),
  bankAccountNumber: selectors.makeSelectAccountNumber(),
  bankCode: selectors.makeSelectBankCode(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
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
    fields: formFields,
    touchOnChange: true,
  }),
)(PayoutDetailsPage);
