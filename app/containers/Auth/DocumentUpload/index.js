/**
 * Work Experience Details Page
 *
 * This is the Work Experience Details page for the App, at the '/experience' route
 */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import { VALIDATION } from 'utils/constants';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { toastMessages, API_URL, VERSION2, TALENT, UPLOAD_DOCS, USER_DOCUMENT_API, DOWNLOAD } from 'containers/App/constants';
import request from 'utils/request';
import { H1, ToastifyMessage, P, H4, FormLabel } from 'components';
import { redirectToPage } from 'containers/App/utils';
import { getUserDetails, storeApiSignupStep } from 'containers/Auth/utils';
import { FormGroup } from 'reactstrap';
import messages from './messages';
import saga from './saga';
import * as actions from './actions';
import { key, fieldNameArray } from './constants';
import DocumentUploadFooter from './documentUploadFooter';
import { getPictureAndFileDropZone } from './pictureAndFileDropZone';
import { getFileName, getFileSize, getFileNameFromUrl } from './utils';
import { propTypes } from './proptypes';

export class DocumentUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileInfo: [],
      employmentType: [],
      billingType: '',
    };
  }

  componentDidMount() {
    const { history } = this.props;
    getUserDetails(history)
      .then(response => {
        this.fetchFieldValues(response, true);
      })
      .catch(() => {
        history.push('/talent/signup');
        toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
      });
  }

  fetchFieldValues = (response, redirection) => {
    const { history, location, settingsPage } = this.props;
    if (get(response, 'status')) {
      storeApiSignupStep(get(response, 'data.signupStep'));
      if (redirection && !settingsPage) {
        const currentSignupStep = get(response, 'data.signupStep') + 1;
        redirectToPage(history, location.redirection, currentSignupStep, 7);
      }
      this.setState({
        employmentType: get(response, 'data.employmentType') || [],
        billingType: get(response, 'data.billing.type') || '',
      });
      this.setUploadURLsData(response.data);
    }
  };

  setUploadURLsData = resData => {
    const { uploadedFileInfo } = this.state;
    if (resData && resData.idProofUrl) {
      this.getFileInfoObject(fieldNameArray[0], resData.idProofUrl);
    }
    if (resData && resData.addressProofUrl) {
      this.getFileInfoObject(fieldNameArray[1], resData.addressProofUrl);
    }
    if (resData && resData.billing && resData.billing.companyDocument && resData.billing.companyDocument.incorporationCertificateUrl) {
      this.getFileInfoObject(fieldNameArray[2], resData.billing.companyDocument.incorporationCertificateUrl);
    }
    if (resData && resData.billing && resData.billing.companyDocument && resData.billing.companyDocument.vatRegistrationCertificateUrl) {
      this.getFileInfoObject(fieldNameArray[3], resData.billing.companyDocument.vatRegistrationCertificateUrl);
    }
    if (resData && resData.billing && resData.billing.companyDocument && resData.billing.companyDocument.insuranceDocumentUrl) {
      this.getFileInfoObject(fieldNameArray[4], resData.billing.companyDocument.insuranceDocumentUrl);
    }
    this.setState({ uploadedFileInfo });
  };

  getFileInfoObject = (fieldName, uploadedFileUrl) => {
    const { uploadedFileInfo } = this.state;
    const uploadedFileName = getFileNameFromUrl(uploadedFileUrl);
    const fileInfoObject = { fieldName, uploadedFileName, uploadedFileSize: '' };
    uploadedFileInfo.push(fileInfoObject);
  };

  handleSaveForLater = e => {
    const { onSaveForLater } = this.props;
    e.preventDefault();
    onSaveForLater();
  };

  /** onDrop callback
   * @param {*} acceptedFiles is array of accepted files
   * @param {*} rejectedFiles is array of accepted files
   * @author Innovify
   */
  onDrop = (acceptedFiles, rejectedFiles, type, fieldName) => {
    let errorFiles = '';
    rejectedFiles.forEach((file, index) => {
      errorFiles = `${errorFiles} (${index + 1}) ${file.name}`;
    });
    if (get(rejectedFiles, '[0].errors[0].code') === 'file-invalid-type') {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFileType} type="error" />, { className: 'Toast-error' });
    } else if (
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-large' ||
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-small'
    ) {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFile} type="error" />, { className: 'Toast-error' });
    } else if (rejectedFiles.length > 1) {
      toast.error(<ToastifyMessage message={VALIDATION.maxOneFileLength} type="error" />, { className: 'Toast-error' });
    } else {
      const reader = new FileReader();
      const selectedFile = acceptedFiles[0];
      this.checkCVType(fieldName, selectedFile, reader);
    }
  };

  checkCVType(fieldName, selectedFile, reader) {
    if (!selectedFile) {
      return;
    }
    const file = selectedFile;
    const { uploadedFileInfo } = this.state;
    const regex = new RegExp('(.*?).(png|jpg|jpeg|pdf)$');
    if (regex.test(file.path)) {
      reader.onloadend = () => {
        const fileInfoObject = { fieldName, uploadedFileName: file.path, uploadedFileSize: file.size };
        if (uploadedFileInfo.some(val => val.fieldName === fieldName)) {
          uploadedFileInfo.filter(obj => obj.fieldName !== fieldName);
        } else {
          uploadedFileInfo.push(fileInfoObject);
        }
        this.setState(
          {
            // eslint-disable-next-line react/no-unused-state
            csvImage: reader.result,
            uploadedFileInfo,
          },
          () => {
            this.handleSubmitDocument(fieldName, selectedFile);
          },
        );
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(<ToastifyMessage message={VALIDATION.invalidCVFileType} type="error" />, {
        className: 'Toast-error',
      });
    }
  }

  handleSubmitDocument = (fieldName, selectedFile) => {
    const { billingType } = this.state;
    let submitData = '';
    if (selectedFile) {
      const formData = new FormData();
      formData.append(fieldName, selectedFile);
      formData.append('billingType', billingType);
      submitData = formData;
    }
    const apiCallData = {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      data: submitData,
    };
    const requestURL = `${API_URL}${VERSION2}${TALENT}${UPLOAD_DOCS}`;
    request(requestURL, apiCallData)
      .then(this.setFileDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, {
          className: 'Toast-error',
        });
      });
  };

  setFileDetails = response => {
    if (response.status === 1) {
      storeApiSignupStep(get(response, 'data.signupStep'));
    } else {
      toast.error(<ToastifyMessage message={response.message} type="error" />, { className: 'Toast-error' });
    }
  };

  deleteFile = fieldName => {
    const { uploadedFileInfo } = this.state;
    const updateduploadedFileInfo = uploadedFileInfo.filter(i => i.fieldName !== fieldName);
    this.setState({ uploadedFileInfo: updateduploadedFileInfo });
  };

  downloadRecord = fieldName => {
    const data = {
      method: 'GET',
    };
    const requestURL = `${API_URL}${VERSION2}${TALENT}${DOWNLOAD}${USER_DOCUMENT_API}?type=${fieldName}`;
    request(requestURL, data).then(this.downloadDocument);
  };

  downloadDocument = response => {
    if (get(response, 'status')) {
      const url = get(response, 'data.pdfPath');
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  render() {
    const { uploadedFileInfo, employmentType, billingType } = this.state;
    const { settingsPage } = this.props;
    const isIdDocsUploaded =
      uploadedFileInfo.filter(obj => obj.fieldName.includes('idProof') || obj.fieldName.includes('addressProof')).length === 2;
    const isCompanyDocsUploaded = uploadedFileInfo.map(obj => obj.fieldName).includes('companyIncorporationCertificateUrl');
    const isRenderCompanyDocument = employmentType.includes('freelancer-consultant') && billingType === 'company';
    const formValid =
      (isIdDocsUploaded && !isRenderCompanyDocument) || (isIdDocsUploaded && isRenderCompanyDocument && isCompanyDocsUploaded) || false;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <>
          {!settingsPage && (
            <React.Fragment>
              <H1 className="mb-3">
                <FormattedMessage {...messages.headingDocumentUpload} />
              </H1>
              <P className="p16 mb-5" opacityVal="0.5">
                <FormattedMessage {...messages.documentUploadTagLine} />
              </P>
            </React.Fragment>
          )}
          <H4 className="newH4 mt-4 mb-3" opacityVal="0.5">
            <FormattedMessage {...messages.identityDocs} />
          </H4>
          <FormLabel className="mb-3">
            <FormattedMessage {...messages.proofOfIdentity} />
          </FormLabel>
          <FormGroup className="mt-1">
            <div id="dropZone">
              {getPictureAndFileDropZone(
                this,
                'photoAndFileUploader',
                true,
                getFileName(uploadedFileInfo, fieldNameArray[0]),
                getFileSize(uploadedFileInfo, fieldNameArray[0]),
                fieldNameArray[0],
              )}
            </div>
          </FormGroup>
          <FormLabel className="mb-3">
            <FormattedMessage {...messages.proofOfAddress} />
          </FormLabel>
          <FormGroup className="mt-1">
            <div id="dropZone">
              {getPictureAndFileDropZone(
                this,
                'photoAndFileUploader',
                true,
                getFileName(uploadedFileInfo, fieldNameArray[1]),
                getFileSize(uploadedFileInfo, fieldNameArray[1]),
                fieldNameArray[1],
              )}
            </div>
          </FormGroup>
          {isRenderCompanyDocument ? (
            <>
              <H4 className="newH4 mt-5 mb-3" opacityVal="0.5">
                <FormattedMessage {...messages.companyDocs} />
              </H4>
              <FormLabel className="mb-3">
                <FormattedMessage {...messages.companyRegisterCertificate} />
              </FormLabel>
              <FormGroup className="mt-1">
                <div id="dropZone">
                  {getPictureAndFileDropZone(
                    this,
                    'photoAndFileUploader',
                    true,
                    getFileName(uploadedFileInfo, fieldNameArray[2]),
                    getFileSize(uploadedFileInfo, fieldNameArray[2]),
                    fieldNameArray[2],
                  )}
                </div>
              </FormGroup>
              <FormLabel className="mb-3">
                <FormattedMessage {...messages.vatNumber} />
              </FormLabel>
              <FormGroup className="mt-1">
                <div id="dropZone">
                  {getPictureAndFileDropZone(
                    this,
                    'photoAndFileUploader',
                    true,
                    getFileName(uploadedFileInfo, fieldNameArray[3]),
                    getFileSize(uploadedFileInfo, fieldNameArray[3]),
                    fieldNameArray[3],
                  )}
                </div>
              </FormGroup>
              <FormLabel className="mb-3">
                <FormattedMessage {...messages.companyInsuranceCertificate} />
              </FormLabel>
              <FormGroup className="mt-1">
                <div id="dropZone">
                  {getPictureAndFileDropZone(
                    this,
                    'photoAndFileUploader',
                    true,
                    getFileName(uploadedFileInfo, fieldNameArray[4]),
                    getFileSize(uploadedFileInfo, fieldNameArray[4]),
                    fieldNameArray[4],
                  )}
                </div>
              </FormGroup>
            </>
          ) : (
            ''
          )}
          {!settingsPage && <DocumentUploadFooter {...this.props} formValid={formValid} handleSaveForLater={this.handleSaveForLater} />}
        </>
      </React.Fragment>
    );
  }
}

DocumentUpload.propTypes = propTypes;

export function mapDispatchToProp(dispatch) {
  return {
    onSaveForLater: () => dispatch(actions.saveForLater('saveForLater')),
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
)(DocumentUpload);
