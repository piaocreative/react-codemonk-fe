import PropTypes from 'prop-types';

export const propTypes = {
  dispatch: PropTypes.any,
  handleSubmit: PropTypes.func,

  rate: PropTypes.object,
  billingType: PropTypes.string,
  companyDetails: PropTypes.object,
  payType: PropTypes.string,
  bankPayDetails: PropTypes.object,
  payPalEmail: PropTypes.string,

  invalid: PropTypes.any,
  loading: PropTypes.bool,
  responseSuccess: PropTypes.bool,
  responseError: PropTypes.bool,
  onReset: PropTypes.func,
  history: PropTypes.object,

  onChangeRate: PropTypes.func,
  onChangeBillingType: PropTypes.func,
  onChangeCompanyDetails: PropTypes.func,
  onChangePayType: PropTypes.func,
  onChangeBankPayDetails: PropTypes.func,
  onChangePayPalDetails: PropTypes.func,

  onSaveForLater: PropTypes.func,
  onSubmitPaymentForm: PropTypes.func,
};
