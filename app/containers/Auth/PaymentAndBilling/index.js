/**
 * Payment And Billing Details Page
 *
 * This is the Payment And Billing Details page for the App, at the '/payment' route
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Field, reduxForm, change } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { FormGroup } from 'reactstrap';
import * as formValidations from 'utils/formValidations';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import { RenderRadio } from 'utils/Fields';
import confirmbox from 'components/confirmBox';
import { RateComponents } from 'components/UserProfileComponents/Rate';
import { PersonalIdComponent } from 'components/UserProfileComponents/PersonalIdComponent';
import { makeSelectLoading } from 'containers/App/selectors';
import AuthTokenService from 'utils/AuthTokenService';
import { stepSize, redirectToPage } from 'containers/App/utils';
import { loadRepos } from 'containers/App/actions';
import { API_URL, USER, DETAILS, USER_DOCUMENTS_API, onBoardingSteps, toastMessages } from 'containers/App/constants';
import { H1, H4, ContainerMod, ProgressMod, Card, FormWrapper, ToastifyMessage, Button } from 'components';
import { propTypes } from 'containers/proptypes';
import { setDocName } from 'containers/Auth/utils';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectRate,
  makeSelectBillingType,
  makeSelectCompanyDetails,
  makeSelectPayType,
  makeSelectBankPayDetails,
  makeSelectPayPalEmail,
} from './selectors';
import {
  changeRate,
  changeBillingType,
  changeCompanyDetails,
  changePayType,
  changeBankPayDetails,
  changePayPalDetails,
  saveForLater,
} from './actions';
import { Billing, Payment, setInitialValues, setChange, checkForValidation, checkIfFileSize } from './utils';

import { PaymentPageWrapper, LinkNeedThis } from './payment-styles';
import PaymentFooter from './paymentFooter';
import { key } from './constants';

export class PaymentAndBilling extends Component {
  constructor(props) {
    super(props);

    const registerType = StorageService.get('registerType');
    if (registerType === 'agency') {
      props.history.replace('/talent/');
    }
    this.state = {
      editFlag: true,
      fileUploading: {
        idProof: '',
        addressProof: '',
        companyIncorporationCertificateUrl: '',
        companyVatRegistrationCertificateUrl: '',
        companyInsuranceDocumentUrl: '',
      },
      docError: {
        idProof: '',
        addressProof: '',
        companyIncorporationCertificateUrl: '',
        companyVatRegistrationCertificateUrl: '',
        companyInsuranceDocumentUrl: '',
      },
      idProof: '',
      addressProof: '',
      companyIncorporationCertificateUrl: '',
      companyVatRegistrationCertificateUrl: '',
      companyInsuranceDocumentUrl: '',
    };
  }

  componentDidMount() {
    this.callFetchAPI();
  }

  /**
   * call on delete
   * @author Innovify
   */
  idProofInfo = () => {
    confirmbox('Proof of ID & Address', {
      displayHeader: true,
      subTitle: `${messages.content1.defaultMessage}`,
      moreContent: `${messages.content2.defaultMessage}`,
      className: 'info-modal',
      buttons: { ok: '', discard: `${messages.btnUnderstand.defaultMessage}` },
    }).then(this.handleIdProofCloseModal);
  };

  callFetchAPI = () => {
    const data = {
      method: 'GET',
    };
    const requestURL = `${API_URL}${USER}${DETAILS}`;
    request(requestURL, data).then(response => {
      this.fetchFieldValues(response);
    });
  };

  fetchFieldValues = response => {
    const { history, location } = this.props;
    if (get(response, 'status')) {
      const currentSignupStep = get(response, 'data.signupStep') === 0.1 ? 1 : get(response, 'data.signupStep', 0) + 1;
      redirectToPage(history, location.redirection, currentSignupStep, 7);

      this.setPaymentData(get(response, 'data'));
    }
  };

  setPaymentData = data => {
    const { dispatch } = this.props;

    const idProof = setDocName(get(data, 'idProofUrl', ''));
    const addressProof = setDocName(get(data, 'addressProofUrl', ''));
    const companyIncorporationCertificateUrl = setDocName(get(data, 'billing.companyDocument.incorporationCertificateUrl', ''));
    const companyVatRegistrationCertificateUrl = setDocName(get(data, 'billing.companyDocument.vatRegistrationCertificateUrl', ''));
    const companyInsuranceDocumentUrl = setDocName(get(data, 'billing.companyDocument.insuranceDocumentUrl', ''));

    const companyCountryData = get(data, 'billing.companyDetails.country', '');

    const setData = {
      currency: get(data, 'currency') ? this.setSelectValue('currency', data) : { label: 'USD', value: 'USD' },
      ratePerHour: get(data, 'ratePerHour', ''),
      billingType: get(data, 'billing.type', ''),
      companyName: get(data, 'billing.companyDetails.name', ''),
      companyregisteredNumber: get(data, 'billing.companyDetails.registeredNumber', ''),
      companyPincode: get(data, 'billing.companyDetails.postcode', ''),
      companyCity: get(data, 'billing.companyDetails.city', ''),
      companyCountry: companyCountryData ? this.setSelectValue('billing.companyDetails.country', data) : '',
      companyAddressLineOne: get(data, 'billing.companyDetails.addressLineOne', ''),
      companyAddressLineTwo: get(data, 'billing.companyDetails.addressLineTwo', ''),
      website: get(data, 'billing.companyDetails.website', ''),
      vatNumber: get(data, 'billing.companyDetails.vatNumber', ''),
      companyProfessionInsuranceValue: get(data, 'billing.companyInsurance.professionInsuranceValue', ''),
      companyPublicInsurancesValue: get(data, 'billing.companyInsurance.publicInsurancesValue', ''),
      companyEmployerInsuranceValue: get(data, 'billing.companyInsurance.employerInsuranceValue', ''),

      payType: get(data, 'pay.type', ''),
      payPalEmail: get(data, 'pay.payPalEmail', ''),
      bankName: get(data, 'pay.bankDetails.name', ''),
      bankAccountNumber: get(data, 'pay.bankDetails.accNumber', ''),
      bankCode: get(data, 'pay.bankDetails.bankCode', ''),
      idProof,
      addressProof,
      companyIncorporationCertificateUrl,
      companyVatRegistrationCertificateUrl,
      companyInsuranceDocumentUrl,
    };
    setInitialValues(dispatch, setData);
    setChange(dispatch, setData);

    this.setState({
      idProof,
      addressProof,
      companyIncorporationCertificateUrl,
      companyVatRegistrationCertificateUrl,
      companyInsuranceDocumentUrl,
      data,
    });
  };

  setSelectValue = (field, data) => {
    let output = {};
    if (field === 'currency' && get(data, 'currency')) {
      output = { label: get(data, 'currency', ''), value: get(data, 'currency', '') };
    } else if (field === 'billing.companyDetails.country' && get(data, 'billing.companyDetails.country')) {
      output = { label: get(data, field, ''), value: get(data, field, '') };
    }
    return output;
  };

  onFileChange = e => {
    const { name, files } = e.target;
    this.validateDoc(name, files);
  };

  validateDoc = (name, files) => {
    const { dispatch } = this.props;
    const { docError } = this.state;
    const { state } = this;
    const stateValue = state[name];
    if (files.length === 1) {
      const checkForError = checkIfFileSize(files[0]);
      if (!checkForError) {
        this.fileUpload(name, files);
      } else {
        docError[name] = checkForError;
        this.setState({ docError });
      }
    } else if (files.length >= 1) {
      dispatch(change(key, name, stateValue));
    } else {
      dispatch(change(key, name, stateValue));
    }
  };

  fileUpload = (docName, files) => {
    const fileName = files[0].name;
    const formData = new FormData();
    formData.append(docName, files[0]);
    formData.append('step', '7');
    const dataImg = {
      method: 'PUT',
      headers: {
        Authorization: AuthTokenService.get(),
      },
      data: formData,
    };
    const { fileUploading, docError } = this.state;
    fileUploading[docName] = ' loading';
    this.setState({ fileUploading });
    const requestURL = `${API_URL}${USER}${USER_DOCUMENTS_API}`;
    request(requestURL, dataImg)
      .then(response => {
        if (get(response, 'status')) {
          this.onFileSaveSuccess(docName, fileName);
        } else {
          toast.error(<ToastifyMessage message={get(response.message)} type="error" />, {
            className: 'Toast-error',
          });
          fileUploading[docName] = '';
          docError[docName] = '';
          this.setState({ [docName]: '', fileUploading, docError });
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
        fileUploading[docName] = '';
        docError[docName] = '';
        this.setState({ [docName]: '', fileUploading, docError });
      });
  };

  onFileSaveSuccess = (docName, fileName) => {
    const { dispatch } = this.props;
    const { fileUploading, docError } = this.state;

    dispatch(change(key, docName, fileName));
    fileUploading[docName] = '';
    docError[docName] = '';
    this.setState({ [docName]: fileName, fileUploading, docError });
  };

  onDeleteFile = docName => {
    const { docError } = this.state;
    const formData = new URLSearchParams();
    formData.append('document', docName);
    formData.append('step', onBoardingSteps.payment);
    const dataImg = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData,
    };
    const requestURL = `${API_URL}${USER}${USER_DOCUMENTS_API}`;
    request(requestURL, dataImg).then(() => {
      docError[docName] = '';
      this.setState({ [docName]: '', docError });
    });
  };

  handleChangeBilling = e => {
    const { dispatch, onChangeBillingType } = this.props;
    const { value } = e.target;
    dispatch(change(key, 'billingType', value));
    onChangeBillingType(value);
  };

  handleChangePayType = e => {
    const { dispatch, onChangePayType } = this.props;
    const { value } = e.target;
    dispatch(change(key, 'payType', value));
    onChangePayType(value);
  };

  handleChangeCompanyDetails = e => {
    const { dispatch, onChangeCompanyDetails, companyDetails } = this.props;
    const { value, name } = e.target;
    const newcompanyDetails = companyDetails;
    newcompanyDetails[name] = value;
    dispatch(change(key, name, value));
    onChangeCompanyDetails(newcompanyDetails);
  };

  handleChangeBankPayDetails = e => {
    const { dispatch, onChangeBankPayDetails, bankPayDetails } = this.props;
    const { value, name } = e.target;
    const newbankPayDetails = bankPayDetails;
    newbankPayDetails[name] = value;
    dispatch(change(key, name, value));
    onChangeBankPayDetails(newbankPayDetails);
  };

  handleChangePayPalDetails = e => {
    const { dispatch, onChangePayPalDetails } = this.props;
    const { value } = e.target;
    dispatch(change(key, 'payPalEmail', value));
    onChangePayPalDetails(value);
  };

  handleSaveForLater = e => {
    e.preventDefault();
    const { rate, billingType, companyDetails, payType, bankPayDetails, payPalEmail, onSaveForLater } = this.props;
    const validationData = checkForValidation(rate, billingType, companyDetails, payType, bankPayDetails, payPalEmail, onSaveForLater);
    onSaveForLater(validationData);
  };

  render() {
    const {
      fileUploading,
      docError,
      editFlag,
      idProof,
      addressProof,
      companyIncorporationCertificateUrl,
      companyVatRegistrationCertificateUrl,
      companyInsuranceDocumentUrl,
      data,
    } = this.state;
    const { billingType, companyDetails, bankPayDetails, payType, payPalEmail, handleSubmit } = this.props;
    const personalIdDoc = {
      editFlag,
      idProof,
      addressProof,
      fileUploading,
      docError,
      onFileChange: e => this.onFileChange(e),
      onDeleteFile: docName => this.onDeleteFile(docName),
    };
    const companyDoc = {
      companyIncorporationCertificateUrl,
      companyVatRegistrationCertificateUrl,
      companyInsuranceDocumentUrl,
      fileUploading,
      docError,
      onFileChange: e => this.onFileChange(e),
      onDeleteFile: docName => this.onDeleteFile(docName),
    };
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <PaymentPageWrapper>
          <ContainerMod>
            <ProgressMod value={stepSize(9)} className="onboarding-progress" />
            <Card>
              <H1 className="text-center mb-0">
                <FormattedMessage {...messages.headingPaymentAndBilling} />
              </H1>
              <form onSubmit={handleSubmit}>
                <FormWrapper>
                  <H4>
                    <FormattedMessage {...messages.labelRate} />
                  </H4>
                  <RateComponents {...this.props} formKey={key} />
                  <H4>
                    <FormattedMessage {...messages.labelProof} />
                    <LinkNeedThis className="ms-3">
                      <Button type="button" className="btn btn-link" onClick={() => this.idProofInfo()}>
                        <FormattedMessage {...messages.btnNeedThis} />
                      </Button>
                    </LinkNeedThis>
                  </H4>
                  <PersonalIdComponent {...this.props} formKey={key} data={data} onBoarding {...personalIdDoc} />

                  {/* part-2 */}
                  <H4>
                    <FormattedMessage {...messages.labelBilling} />
                  </H4>

                  <FormGroup>
                    <Field
                      name="billingType"
                      component={RenderRadio}
                      data={Billing(billingType, companyDetails, this.handleChangeCompanyDetails, companyDoc, editFlag, this.props)}
                      groupName="billing"
                      onChangeRadio={e => this.handleChangeBilling(e)}
                      selectedRadio={billingType}
                      validate={[formValidations.required]}
                      editFlag={!editFlag}
                    />
                  </FormGroup>

                  <H4>
                    <FormattedMessage {...messages.labelPayment} />
                  </H4>

                  <FormGroup>
                    <Field
                      name="payType"
                      component={RenderRadio}
                      data={Payment(
                        payType,
                        bankPayDetails,
                        this.handleChangeBankPayDetails,
                        payPalEmail,
                        this.handleChangePayPalDetails,
                        true,
                      )}
                      groupName="payment"
                      onChangeRadio={e => this.handleChangePayType(e)}
                      selectedRadio={payType}
                      validate={[formValidations.required]}
                      editFlag={false}
                    />
                  </FormGroup>

                  <hr />
                  <PaymentFooter {...this.props} handleSaveForLater={this.handleSaveForLater} />
                </FormWrapper>
              </form>
            </Card>
          </ContainerMod>
        </PaymentPageWrapper>
      </React.Fragment>
    );
  }
}

PaymentAndBilling.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  rate: makeSelectRate(),
  billingType: makeSelectBillingType(),
  companyDetails: makeSelectCompanyDetails(),
  payType: makeSelectPayType(),
  bankPayDetails: makeSelectBankPayDetails(),
  payPalEmail: makeSelectPayPalEmail(),
  loading: makeSelectLoading(),
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeRate: data => dispatch(changeRate(data)),
    onChangeBillingType: data => dispatch(changeBillingType(data)),
    onChangeCompanyDetails: data => dispatch(changeCompanyDetails(data)),
    onChangePayType: data => dispatch(changePayType(data)),
    onChangeBankPayDetails: data => dispatch(changeBankPayDetails(data)),
    onChangePayPalDetails: data => dispatch(changePayPalDetails(data)),

    onSaveForLater: validationData => dispatch(saveForLater('saveForLater', validationData)),
    onSubmitPaymentForm: (evt, validationData) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(saveForLater('submitForm', validationData));
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
)(PaymentAndBilling);
