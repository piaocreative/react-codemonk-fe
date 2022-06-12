/**
 * DocumentsPage
 *
 * This is the DocumentsPage for the App, at the '/documents' route
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { reduxForm, change } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';
import has from 'lodash/has';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import request from 'utils/request';
import { PersonalIdComponent } from 'components/UserProfileComponents/PersonalIdComponent';
import { CompanyDocuments } from 'components/UserProfileComponents/CompanyDocuments';
import { H1, ContainerMod, ProgressMod, Card, FormWrapper, H4 } from 'components';
import ToastifyMessage from 'components/ToastifyMessage';
import { loadRepos } from 'containers/App/actions';
import AuthTokenService from 'utils/AuthTokenService';
import { agencyStepSize, agencyRedirectToPage } from 'containers/App/utils';
import { setDocName } from 'containers/Auth/utils';
import { API_URL, AGENCY, USER, DETAILS, USER_DOCUMENTS_API, onBoardingSteps, toastMessages } from 'containers/App/constants';
import messages from './messages';
import saga from './saga';
import { saveForLater } from './actions';
import { propTypes } from './proptypes';
import { PaymentPageWrapper } from './payment-styles';
import PaymentFooter from './paymentFooter';
import { key } from './constants';
import { setChange, checkIfFileSize, countDirectors } from './utils';

export class DocumentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editFlag: true,
      fileUploading: {
        idProof: '',
        addressProof: '',
        companyIncorporationCertificateUrl: '',
        companyTaxRegistrationCertificateUrl: '',
        utilityBillDocumentUrl: '',
      },
      docError: {
        idProof: '',
        addressProof: '',
        companyIncorporationCertificateUrl: '',
        companyTaxRegistrationCertificateUrl: '',
        utilityBillDocumentUrl: '',
      },
      idProof: '',
      addressProof: '',
      companyIncorporationCertificateUrl: '',
      companyTaxRegistrationCertificateUrl: '',
      utilityBillDocumentUrl: '',
      directorCount: 1,
    };
  }

  componentDidMount() {
    this.callFetchAPI();
  }

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
      const currentSignupStep = has(response, 'data.signupStep') === true ? get(response, 'data.signupStep') + 1 : 1;
      agencyRedirectToPage(history, location.redirection, currentSignupStep, 6);
      this.setPaymentData(get(response, 'data'));
    }
  };

  setPaymentData = data => {
    const { dispatch } = this.props;

    const directorDocument = {};
    Object.keys(get(data, 'directorDocuments', [])).forEach((k, i) => {
      const tempIdProof = data.directorDocuments[k].idProofUrl.split('/');
      const tempaddressProof = data.directorDocuments[k].addressProofUrl.split('/');
      directorDocument[`idProof${i}`] = tempIdProof[tempIdProof.length - 1];
      directorDocument[`addressProof${i}`] = tempaddressProof[tempaddressProof.length - 1];
    });

    const directorCount = countDirectors(get(data, 'directors', []));
    this.setState({ directorCount: directorCount > 1 ? 2 : 1, ...directorDocument });

    const companyIncorporationCertificateUrl = setDocName(get(data, 'incorporationCertificateUrl', ''));
    const companyTaxRegistrationCertificateUrl = setDocName(get(data, 'taxRegistrationCertificateUrl', ''));
    const utilityBillDocumentUrl = setDocName(get(data, 'utilityBillDocumentUrl', ''));

    const setData = {
      billingType: get(data, 'billing.type', ''),
      companyIncorporationCertificateUrl,
      companyTaxRegistrationCertificateUrl,
      utilityBillDocumentUrl,
    };
    setChange(dispatch, setData);
    this.setState({
      companyIncorporationCertificateUrl,
      companyTaxRegistrationCertificateUrl,
      utilityBillDocumentUrl,
      data,
    });
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
    formData.append('step', '6');
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
    const requestURL = `${API_URL}${AGENCY}${USER_DOCUMENTS_API}`;
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
    const requestURL = `${API_URL}${AGENCY}${USER_DOCUMENTS_API}`;
    request(requestURL, dataImg).then(() => {
      docError[docName] = '';
      this.setState({ [docName]: '', docError });
    });
  };

  render() {
    const {
      fileUploading,
      docError,
      editFlag,
      idProof,
      addressProof,
      companyIncorporationCertificateUrl,
      companyTaxRegistrationCertificateUrl,
      utilityBillDocumentUrl,
      data,
      directorCount,
    } = this.state;
    const { handleSubmit } = this.props;
    const personalIdDoc = {
      editFlag,
      idProof,
      addressProof,
      companyIncorporationCertificateUrl,
      companyTaxRegistrationCertificateUrl,
      utilityBillDocumentUrl,
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
            <ProgressMod value={agencyStepSize(7)} className="onboarding-progress" />
            <Card>
              <H1 className="text-center mb-0">
                <FormattedMessage {...messages.headingDocuments} />
              </H1>
              <form onSubmit={handleSubmit}>
                <FormWrapper>
                  <CompanyDocuments {...this.props} formKey={key} data={data} onBoarding {...personalIdDoc} />
                  <H4>
                    <FormattedMessage {...messages.titleAddressProof} />
                  </H4>
                  <PersonalIdComponent
                    {...this.props}
                    state={this.state}
                    directorCount={directorCount}
                    multi
                    formKey={key}
                    data={data}
                    onBoarding
                    {...personalIdDoc}
                  />
                  <hr />
                  <PaymentFooter {...this.props} />
                </FormWrapper>
              </form>
            </Card>
          </ContainerMod>
        </PaymentPageWrapper>
      </React.Fragment>
    );
  }
}

DocumentsPage.propTypes = propTypes;
export function mapDispatchToProp(dispatch) {
  return {
    onSubmitPaymentForm: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(saveForLater('submitForm'));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProp,
);
const withSaga = injectSaga({ key, saga });

export default compose(
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(DocumentsPage);
