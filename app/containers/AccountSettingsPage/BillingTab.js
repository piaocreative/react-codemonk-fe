/** Billing Tab Page
 * This is the Billing Tab in account settings
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormGroup } from 'reactstrap';
import get from 'lodash/get';
import { H1, H4, FormWrapper } from 'components';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change, untouch } from 'redux-form/immutable';
import * as formValidations from 'utils/formValidations';
import { FormattedMessage } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from 'containers/App/actions';
import { RenderRadio } from 'utils/Fields';
import { makeSelectLoading } from 'containers/App/selectors';
import { PersonalIdComponent } from 'components/UserProfileComponents/PersonalIdComponent';
import * as actions from 'containers/Auth/PaymentAndBilling/actions';
import * as selectors from 'containers/Auth/PaymentAndBilling/selectors';
import saga from 'containers/Auth/PaymentAndBilling/saga';
import reducer from 'containers/Auth/PaymentAndBilling/reducer';
import { key } from 'containers/Auth/PaymentAndBilling/constants';
import { propTypes } from 'containers/proptypes';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import authMessages from 'containers/Auth/PaymentAndBilling/messages';
import { setDocName, setChange, accountSettingsTabFooter } from 'containers/Auth/utils';
import containerMessage from 'containers/messages';
import { Billing, checkIfFileSize } from 'containers/Auth/PaymentAndBilling/utils';
import { EditLink } from './styles';
import messages from './messages';

export class BillingTab extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      editFlag: false,
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
      idProof: setDocName(get(data, 'idProofUrl', '')),
      addressProof: setDocName(get(data, 'addressProofUrl', '')),
      companyIncorporationCertificateUrl: setDocName(get(data, 'billing.companyDocument.incorporationCertificateUrl', '')),
      companyVatRegistrationCertificateUrl: setDocName(get(data, 'billing.companyDocument.vatRegistrationCertificateUrl', '')),
      companyInsuranceDocumentUrl: setDocName(get(data, 'billing.companyDocument.insuranceDocumentUrl', '')),
      fileChanged: {},
    };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setBillingData(data);
  }

  setBillingData = data => {
    const { dispatch } = this.props;

    const idProof = setDocName(get(data, 'idProofUrl', ''));
    const addressProof = setDocName(get(data, 'addressProofUrl', ''));

    const companyCountryData = get(data, 'billing.companyDetails.country');

    const billingType = get(data, 'billing.type', '');
    const companyName = get(data, 'billing.companyDetails.name', '');
    const companyregisteredNumber = get(data, 'billing.companyDetails.registeredNumber', '');
    const companyPincode = get(data, 'billing.companyDetails.postcode', '');
    const companyCity = get(data, 'billing.companyDetails.city', '');
    const companyCountry = companyCountryData ? { label: companyCountryData, value: companyCountryData } : '';
    const companyAddressLineOne = get(data, 'billing.companyDetails.addressLineOne', '');
    const companyAddressLineTwo = get(data, 'billing.companyDetails.addressLineTwo', '');
    const website = get(data, 'billing.companyDetails.website', '');
    const vatNumber = get(data, 'billing.companyDetails.vatNumber', '');
    const companyProfessionInsuranceValue = get(data, 'billing.companyInsurance.professionInsuranceValue', '');
    const companyPublicInsurancesValue = get(data, 'billing.companyInsurance.publicInsurancesValue', '');
    const companyEmployerInsuranceValue = get(data, 'billing.companyInsurance.employerInsuranceValue', '');

    const companyIncorporationCertificateUrl = setDocName(get(data, 'billing.companyDocument.incorporationCertificateUrl', ''));
    const companyVatRegistrationCertificateUrl = setDocName(get(data, 'billing.companyDocument.vatRegistrationCertificateUrl', ''));
    const companyInsuranceDocumentUrl = setDocName(get(data, 'billing.companyDocument.insuranceDocumentUrl', ''));

    dispatch(actions.changeBillingType(billingType));
    dispatch(
      actions.changeCompanyDetails({
        companyName,
        companyregisteredNumber,
        companyPincode,
        companyCity,
        companyCountry,
        companyAddressLineOne,
        companyAddressLineTwo,
        website,
        vatNumber,
        companyProfessionInsuranceValue,
        companyPublicInsurancesValue,
        companyEmployerInsuranceValue,
      }),
    );

    const fields = {
      billingType,
      companyName,
      companyregisteredNumber,
      companyPincode,
      companyCity,
      companyCountry,
      companyAddressLineOne,
      companyAddressLineTwo,
      website,
      vatNumber,
      companyProfessionInsuranceValue,
      companyPublicInsurancesValue,
      companyEmployerInsuranceValue,
      idProof,
      addressProof,
      companyIncorporationCertificateUrl,
      companyVatRegistrationCertificateUrl,
      companyInsuranceDocumentUrl,
    };

    setChange(dispatch, key, fields);
  };

  handleEdit = editFlag => {
    this.setState({ editFlag: !editFlag });
  };

  handleCancelButton = editFlag => {
    this.setState({ editFlag: !editFlag });
  };

  handleSubmitButton = (invalid, editFlag) => {
    let output = true;
    if (!invalid && editFlag) {
      output = false;
    }
    return output;
  };

  onFileChange = e => {
    const { dispatch } = this.props;
    const { name, files } = e.target;
    this.validateDoc(name, files);
    dispatch(untouch(key, name));
  };

  validateDoc = (name, files) => {
    const { dispatch } = this.props;
    const { docError } = this.state;
    const { state } = this;
    const stateValue = state[name];
    if (files.length === 1) {
      const checkForError = checkIfFileSize(files[0]);
      if (!checkForError) {
        this.fileChanged(name, files);
      } else {
        docError[name] = checkForError;
        this.setState({ [name]: '', docError });
        dispatch(change(key, name, ''));
      }
    } else if (files.length >= 1) {
      dispatch(change(key, name, stateValue));
    } else {
      dispatch(untouch(key, name));
      dispatch(change(key, name, stateValue));
    }
  };

  fileChanged = (docName, files) => {
    const { fileChanged } = this.state;
    const fileName = files[0].name;
    const newFileChanged = fileChanged;
    newFileChanged[docName] = files;
    this.setState({ [docName]: fileName, fileChanged: newFileChanged });
  };

  onDeleteFile = docName => {
    const { dispatch } = this.props;
    const { docError } = this.state;
    docError[docName] = '';
    this.setState({ [docName]: '', docError });
    dispatch(change(key, docName, ''));
  };

  handleChangeCompanyDetails = e => {
    const { dispatch, onChangeCompanyDetails, companyDetails } = this.props;
    const { value, name } = e.target;
    const newcompanyDetails = companyDetails;
    newcompanyDetails[name] = value;
    dispatch(change(key, name, value));
    onChangeCompanyDetails(newcompanyDetails);
  };

  handleChangeBilling = e => {
    const { dispatch, onChangeBillingType } = this.props;
    const { value } = e.target;
    dispatch(change(key, 'billingType', value));
    onChangeBillingType(value);
  };

  handleBillingSubmit = e => {
    const { onSubmitBilling } = this.props;
    const { fileChanged: changedFiles } = this.state;
    onSubmitBilling(e, changedFiles, this.billingSubmitSuccess);
  };

  billingSubmitSuccess = () => {
    const { loadData } = this.props;
    this.setState({ editFlag: false });
    loadData();
  };

  render() {
    const { data, handleSubmit, loading, invalid, billingType, companyDetails } = this.props;
    const {
      editFlag,
      fileUploading,
      docError,
      idProof,
      addressProof,
      companyIncorporationCertificateUrl,
      companyVatRegistrationCertificateUrl,
      companyInsuranceDocumentUrl,
    } = this.state;
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
      <PaymentPageWrapper>
        <FormWrapper>
          <div className="d-flex align-items-center justify-content-between">
            <H1 className="text-start mb-0">
              <FormattedMessage {...messages.headingBilling} />
            </H1>
            {!editFlag && (
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
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <H4>
              <FormattedMessage {...authMessages.labelProof} />
            </H4>
            <PersonalIdComponent {...this.props} data={data} formKey={key} {...personalIdDoc} />

            {/*  Billing */}
            <H4>
              <FormattedMessage {...authMessages.labelBilling} />
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
            <hr className="mt-5" />
            {accountSettingsTabFooter(
              loading,
              invalid,
              handleSubmit,
              editFlag,
              this.handleCancelButton,
              this.handleSubmitButton,
              this.handleBillingSubmit,
            )}
          </form>
        </FormWrapper>
      </PaymentPageWrapper>
    );
  }
}

BillingTab.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  billingType: selectors.makeSelectBillingType(),
  companyDetails: selectors.makeSelectCompanyDetails(),
  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeBillingType: data => dispatch(actions.changeBillingType(data)),
    onChangeCompanyDetails: data => dispatch(actions.changeCompanyDetails(data)),
    onSubmitBilling: (evt, changedFiles, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.editBilling(changedFiles, onSuccess));
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
)(BillingTab);
