/** PersonalId Page
 * This is the PersonalId page for the App, at the '/my-profile' route
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormGroup, Row, Col } from 'reactstrap';
import get from 'lodash/get';
import { H4, LinkButtonMod, Button, FormWrapper, FormLabel, P } from 'components';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form/immutable';
import * as formValidations from 'utils/formValidations';
import * as normalize from 'utils/normalize';
import { FormattedMessage } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from 'containers/App/actions';
import { RenderRadio, renderFieldPassword } from 'utils/Fields';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import * as actions from 'containers/Auth/PaymentAndBilling/actions';
import * as selectors from 'containers/Auth/PaymentAndBilling/selectors';
import saga from 'containers/Auth/PaymentAndBilling/saga';
import reducer from 'containers/Auth/PaymentAndBilling/reducer';
import { key } from 'containers/Auth/PaymentAndBilling/constants';
import { propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import authMessages from 'containers/Auth/PaymentAndBilling/messages';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import { Payment } from 'containers/Auth/PaymentAndBilling/utils';

export class PaymentTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordType: 'password',
    };
  }

  componentDidMount() {
    this.initilizeData();
  }

  initilizeData = () => {
    const { dispatch, data } = this.props;
    const payType = get(data, 'pay.type', '');

    const bankName = get(data, 'pay.bankDetails.name', '');
    const bankAccountNumber = get(data, 'pay.bankDetails.accNumber', '');
    const bankCode = get(data, 'pay.bankDetails.bankCode', '');
    const bankPayDetails = {
      bankAccountNumber,
      bankCode,
      bankName,
    };
    const payPalEmail = get(data, 'pay.payPalEmail', '');

    dispatch(change(key, 'payType', payType));
    dispatch(change(key, 'bankName', bankName));
    dispatch(change(key, 'bankAccountNumber', bankAccountNumber));
    dispatch(change(key, 'bankCode', bankCode));
    dispatch(change(key, 'password', ''));
    dispatch(change(key, 'payPalEmail', payPalEmail));

    dispatch(actions.changePayType(payType));
    dispatch(actions.changeBankPayDetails(bankPayDetails));
    dispatch(actions.changePayPalDetails(payPalEmail));
  };

  handleChangePayType = e => {
    const { dispatch, onChangePayType } = this.props;
    const { value } = e.target;
    dispatch(change(key, 'payType', value));
    onChangePayType(value);
  };

  handleChangeBankPayDetails = e => {
    const { dispatch, onChangeBankPayDetails, bankPayDetails } = this.props;
    const { value, name } = e.target;
    dispatch(change(key, name, value));
    const newbankPayDetails = bankPayDetails;
    newbankPayDetails[name] = value;
    onChangeBankPayDetails(newbankPayDetails);
  };

  handleChangePayPalDetails = e => {
    const { value } = e.target;
    const { dispatch, onChangePayPalDetails } = this.props;
    dispatch(change(key, 'payPalEmail', value));
    onChangePayPalDetails(value);
  };

  handleSubmitButton = invalid => {
    let output = true;
    if (!invalid) {
      output = false;
    }
    return output;
  };

  onClickIcon = type => {
    if (type === 'passwordType') {
      this.setState(({ passwordType }) => ({
        passwordType: passwordType === 'text' ? 'password' : 'text',
      }));
    }
  };

  handlePaymentSubmit = e => {
    const { onSubmitPayment } = this.props;
    onSubmitPayment(e, this.paymentSubmitSuccess);
  };

  paymentSubmitSuccess = () => {
    const { loadData } = this.props;
    loadData();
  };

  render() {
    const { handleSubmit, loading, invalid, payType, bankPayDetails, payPalEmail, onChangePassword } = this.props;
    const { passwordType } = this.state;

    return (
      <PaymentPageWrapper>
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <H4 className="newH4 mt-4" opacityVal="0.5">
              <FormattedMessage {...authMessages.labelPayment} />
            </H4>

            <FormGroup>
              <Field
                name="payType"
                component={RenderRadio}
                data={Payment(payType, bankPayDetails, this.handleChangeBankPayDetails, payPalEmail, this.handleChangePayPalDetails)}
                groupName="payment"
                onChangeRadio={e => this.handleChangePayType(e)}
                selectedRadio={payType}
                validate={[formValidations.required]}
                editFlag={false}
              />
            </FormGroup>
            <Row>
              <Col md={6} sm={12}>
                <H4 className="newH4 mb-3  mt-5" opacityVal="0.5">
                  <FormattedMessage {...containerMessage.confirmChanges} />
                </H4>
                <P className="p16 mb-3" opacityVal="0.5">
                  <FormattedMessage {...containerMessage.passwordDescription} />
                </P>
                <FormGroup>
                  <FormLabel>
                    <FormattedMessage {...containerMessage.tabPassword} />
                  </FormLabel>
                  <Field
                    name="password"
                    type={passwordType}
                    component={renderFieldPassword}
                    onChange={onChangePassword}
                    placeholder={containerMessage.placeholderPasswordAddress.defaultMessage}
                    normalize={normalize.trimSpace}
                    validate={[formValidations.required]}
                    onClick={() => {
                      this.onClickIcon('passwordType');
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="d-flex align-items-center flex-wrap justify-content-between justify-content-md-start mt-5">
              <Button
                className={`${loading ? 'loading' : ''} btn-primary me-0 mt-0 mr-3`}
                disabled={this.handleSubmitButton(invalid)}
                onClick={handleSubmit(e => this.handlePaymentSubmit(e))}
              >
                <FormattedMessage {...containerMessage.btnUpdate} />
              </Button>
              <LinkButtonMod color="link" className="me-3 ms-md-3" onClick={this.initilizeData}>
                <FormattedMessage {...containerMessage.btnCancel} />
              </LinkButtonMod>
            </div>
          </form>
        </FormWrapper>
      </PaymentPageWrapper>
    );
  }
}

PaymentTab.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  payType: selectors.makeSelectPayType(),
  bankPayDetails: selectors.makeSelectBankPayDetails(),
  payPalEmail: selectors.makeSelectPayPalEmail(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  password: selectors.makeSelectPassword(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangePayType: data => dispatch(actions.changePayType(data)),
    onChangeBankPayDetails: data => dispatch(actions.changeBankPayDetails(data)),
    onChangePayPalDetails: data => dispatch(actions.changePayPalDetails(data)),
    onChangePassword: event => dispatch(actions.passwordAction(event.target.value)),
    onSubmitPayment: (evt, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.editPayment(onSuccess));
    },
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
    touchOnChange: true,
  }),
)(PaymentTab);
