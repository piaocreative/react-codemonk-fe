import PropTypes from 'prop-types';

export const defaultProps = {
  dispatch: '',
  invalid: '',
  loading: false,
  responseSuccess: false,
  responseError: false,
  history: {},
  handleSearchChange: undefined,
};

export const propTypes = {
  dispatch: PropTypes.any,
  handleSubmit: PropTypes.func,

  token: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,

  experiences: PropTypes.array,
  educationDetails: PropTypes.array,
  certificateDetails: PropTypes.array,

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
  history: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  popUpSaga: PropTypes.bool,

  email: PropTypes.string,
  privacyCheck: PropTypes.bool,

  onChangeToken: PropTypes.func,
  onChangeConfirmPassword: PropTypes.func,
  onSubmitResetPassword: PropTypes.func,

  onSaveForLater: PropTypes.func,
  onSubmitPersonalDetailsForm: PropTypes.func,

  onChangeEducationDetails: PropTypes.func,
  onChangeCertificateDetails: PropTypes.func,

  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onPrivacyPolicyCheck: PropTypes.func,
  onSubmitForm: PropTypes.func,

  onSubmitEducationForm: PropTypes.func,

  onAddEducationForm: PropTypes.func,
  onAddCertificateForm: PropTypes.func,
  onDeleteEducationForm: PropTypes.func,
  onDeleteCertificateForm: PropTypes.func,

  onChangeRate: PropTypes.func,
  onChangeBillingType: PropTypes.func,
  onChangeCompanyDetails: PropTypes.func,
  onChangePayType: PropTypes.func,
  onChangeBankPayDetails: PropTypes.func,
  onChangePayPalDetails: PropTypes.func,
  onSubmitPaymentForm: PropTypes.func,

  handleSearchChange: PropTypes.func,

  loadUserDetails: PropTypes.func,
  role: PropTypes.string,
  currentModal: PropTypes.string,
  modalClose: PropTypes.func,
  modalOpen: PropTypes.func,

  value: PropTypes.number,
  dragging: PropTypes.bool,
  index: PropTypes.number,
};
