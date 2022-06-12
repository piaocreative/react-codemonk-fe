/** AddTalentsPage
 * This is the add-talents page for the App, at the '/add-talents' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import SVG from 'react-inlinesvg';
import {
  API_URL,
  USER,
  DETAILS,
  AGENCY,
  TALENTS,
  currencyData,
  editIcon,
  deleteIcon,
  closeIcon,
  sampleFile,
  instructionFile,
} from 'containers/App/constants';
import { ContainerMod, ProgressMod, Card, H1, H4, LinkButtonMod, FormWrapper, Button, FormLabel, P, ValidationMessage } from 'components';
import request from 'utils/request';
import { FormGroup, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import has from 'lodash/has';
import { v4 as uuidv4 } from 'uuid';
import ReactModal from 'react-modal';
import Selects from 'components/Selects';
import { loadRepos } from 'containers/App/actions';
import { getCurrencySymbol } from 'containers/MyProfilePage/components/utils';
import { makeSelectLoading } from 'containers/App/selectors';
import { agencyStepSize, signupLink, agencyRedirectToPage } from 'containers/App/utils';
import { VALIDATION } from 'utils/constants';
import { renderField } from 'utils/Fields';
import * as formValidations from 'utils/formValidations';
import * as normalize from 'utils/normalize';
import Emitter from 'utils/emitter';
import { handleBackButton, setChangeAndUntouch } from 'containers/Auth/utils';
import { getBtnClass, getSelectedFieldFromList } from 'containers/Auth/PersonalDetails/utils';
import { UserNameFields } from 'components/UserProfileComponents/UserNameFields';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import { getDropZone } from 'containers/Auth/PersonalDetails/dropZone';
import ToastifyMessage from 'components/ToastifyMessage';
import { CountryCode } from 'containers/Auth/PersonalDetails/style';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import UserList from 'components/UserList';
import StorageService from 'utils/StorageService';
import containerMessage from 'containers/messages';
import { defaultProps, propTypes } from 'containers/proptypes';
import { RateDetailList } from 'containers/MyProfilePage/styles';
import * as actions from 'containers/Agency/MyTeam/actions';
import * as selectors from 'containers/Agency/MyTeam/selectors';
import saga from 'containers/Agency/MyTeam/saga';
import { key } from 'containers/Agency/MyTeam/constants';
import authMessage from 'containers/Agency/MyTeam/messages';
import messages from './messages';
import { addTalentEmptyData } from './constants';
import { DownloadLink, UploadTitle, TableTitle } from './styles';

export class AddTalentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddTalentModal: false,
      showDeleteModal: false,
      modalType: '',
      talentIndex: '',
      uploaderType: 'csvUploader',
      someErrorInFile: '',
      fileName: '',
      talentsArray: [],
      updatedRate: 0,
      updatedCurrency: 'USD',
    };
  }

  componentDidMount() {
    Emitter.on('addTalentSaga', addTalentSaga => {
      if (addTalentSaga) {
        this.loaderUserDetails();
        this.setState({ showAddTalentModal: false, modalType: '', talentIndex: '' });
      }
    });

    Emitter.on('editTalentSaga', editTalentSaga => {
      if (editTalentSaga) {
        this.loaderUserDetails();
        this.setState({ showAddTalentModal: false, modalType: '', talentIndex: '' });
      }
    });

    Emitter.on('deleteTalentSaga', deleteTalentSaga => {
      if (deleteTalentSaga) {
        this.loaderUserDetails();
        this.setState({ showDeleteModal: false, modalType: '', talentIndex: '' });
      }
    });
    this.loaderUserDetails();
  }

  componentWillUnmount() {
    Emitter.off('addTalentSaga');
    Emitter.off('editTalentSaga');
    Emitter.off('deleteTalentSaga');
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
    const { history, location } = this.props;
    if (get(response, 'status')) {
      const { data } = response;
      const currentSignupStep = has(response, 'data.signupStep') === true ? get(response, 'data.signupStep') + 1 : 1;
      agencyRedirectToPage(history, location.redirection, currentSignupStep, 2);
      StorageService.set('agencyLogo', get(data, 'trading.logo', ''), { hash: true });
      Emitter.emit('agencyLogo', get(data, 'trading.logo'));
      this.setState({ talentsArray: get(data, 'talents', []) });
    } else {
      history.push(signupLink);
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleAddTalentCloseModal = () => {
    this.setState({ showAddTalentModal: false });
  };

  handleAddTalentOpenModal = (modalType, index) => {
    const { dispatch } = this.props;
    if (modalType === 'add') {
      setChangeAndUntouch(dispatch, key, addTalentEmptyData);
    } else if (modalType === 'edit') {
      const { talentsArray } = this.state;
      const { [index]: rowData } = talentsArray;
      const currencyObj = getSelectedFieldFromList(currencyData, 'value', rowData.currency);
      const currency = { label: currencyObj.label, value: currencyObj.value };
      const data = {
        firstName: rowData.firstName,
        lastName: rowData.lastName,
        emailAddress: rowData.email,
        currency,
        ratePerHour: rowData.rate,
      };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
    }
    this.setState({ showAddTalentModal: true, modalType, talentIndex: index });
  };

  popupSubmit = modalType => {
    const { firstName, lastName, emailAddress, currency, ratePerHour, onChangeTalent } = this.props;

    if (modalType === 'add') {
      const newTalent = {
        firstName,
        lastName,
        email: emailAddress,
        currency: get(currency, 'value', ''),
        rate: Number(ratePerHour),
      };
      onChangeTalent('add', newTalent);
    } else if (modalType === 'edit') {
      const editedTalent = {
        firstName,
        lastName,
        email: emailAddress,
        currency: get(currency, 'value', ''),
        rate: Number(ratePerHour),
      };

      onChangeTalent('edit', editedTalent);
    }
  };

  // deleteModalfunctions
  handleDeleteTalentOpenModal = index => this.setState({ showDeleteModal: true, talentIndex: index });

  handleDeleteTalentCloseModal = () => this.setState({ showDeleteModal: false, modalType: '', talentIndex: '' });

  submitDelete = () => {
    const { onChangeTalent } = this.props;
    const { talentsArray, talentIndex } = this.state;

    const talent = talentsArray[talentIndex];
    const talentObj = { email: get(talent, 'email', '') };
    onChangeTalent('delete', talentObj);
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    let errorFiles = '';
    rejectedFiles.forEach((file, index) => {
      errorFiles = `${errorFiles} (${index + 1}) ${file.name}`;
    });
    if (get(rejectedFiles, '[0].errors[0].code') === 'file-invalid-type') {
      toast.error(<ToastifyMessage message={VALIDATION.invalidCSVFileType} type="error" />, { className: 'Toast-error' });
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
      this.checkFileType(selectedFile, reader);
    }
  };

  checkFileType(selectedFile, reader) {
    if (!selectedFile) {
      return;
    }
    const file = selectedFile;
    const regex = new RegExp('(.*?).(csv|xls|xlsx)$');
    if (regex.test(file.path)) {
      reader.onloadend = () => {
        this.setState(
          {
            // eslint-disable-next-line react/no-unused-state
            image: reader.result,
            fileName: file.path,
            selectedFile,
          },
          () => this.uploadTalentsFile(),
        );
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(<ToastifyMessage message={VALIDATION.invalidCSVFileType} type="error" />, {
        className: 'Toast-error',
      });
    }
  }

  uploadTalentsFile = () => {
    const { selectedFile } = this.state;

    const requestURL = `${API_URL}${AGENCY}${TALENTS}`;
    const formData = new FormData();
    formData.append('agency-talents', selectedFile);
    const dataImg = {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      data: formData,
    };
    request(requestURL, dataImg)
      .then(this.handleTalentUploadFile)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, {
          className: 'Toast-error',
        });
      });
  };

  handleTalentUploadFile = response => {
    const { status, message } = response;
    if (status === 1) {
      // check for uploadRow Count
      const totalCount = get(response, 'data.totalCount', 0);
      const addedCount = get(response, 'data.addedCount', 0);

      if (totalCount !== addedCount) {
        const fileErrorMessage = `Added ${addedCount} of ${totalCount} talent to your team. Please try again ensuring all talent have unique and valid email addresses.`;
        toast.error(<ToastifyMessage message={fileErrorMessage} type="error" />, { className: 'Toast-error' });
      }
      // eslint-disable-next-line react/no-unused-state
      this.setState({ image: '', someErrorInFile: '', fileName: '', showUploadTalentModal: false });
      this.loaderUserDetails();
    } else {
      toast.error(<ToastifyMessage message={message} type="error" />, { className: 'Toast-error' });
    }
  };

  deleteFile = () => this.setState({ image: '', someErrorInFile: '', fileName: '' });

  handleSaveForLater = (e, submitType) => {
    if (submitType !== 'continue') {
      e.preventDefault();
    }
    this.setSaveForLater(e, submitType);
  };

  setSaveForLater = (e, submitType) => {
    const { onSaveForLater, onSubmitAddTalents } = this.props;
    const { talentsArray } = this.state;
    if (submitType === 'saveForLater') {
      onSaveForLater(e, talentsArray);
    } else if (submitType === 'continue') {
      onSubmitAddTalents(e, talentsArray);
    }
  };

  handleRateChange = e => {
    const { value, name } = e.target;

    if (name === 'currency') {
      this.setState({ updatedCurrency: value.value });
    }
    if (name === 'ratePerHour') {
      this.setState({ updatedRate: value });
    }
  };

  renderDeleteTalentModal = () => {
    const { loading } = this.props;
    const { showDeleteModal } = this.state;
    return (
      <ReactModal
        isOpen={showDeleteModal}
        contentLabel={authMessage.deleteModalTitle.defaultMessage}
        onRequestClose={this.handleDeleteTalentCloseModal}
        className="modal-dialog confirmation-modal"
        style={{ overlay: { zIndex: 12 } }}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
        ariaModal
      >
        <div className="modal-content">
          <div className="modal-header">
            <H4 className="modal-title newH4 d-flex align-items-center my-0">
              <FormattedMessage {...authMessage.deleteModalTitle} />
            </H4>
            <button type="button" className="modal-dismiss" onClick={this.handleDeleteTalentCloseModal}>
              <img src={closeIcon} alt="close" />
              <span className="visually-hidden">Close</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              <FormattedMessage {...authMessage.modalContent} />
            </p>
          </div>
          <div className="modal-footer justify-content-end">
            <Button className="btn btn-link me-3" onClick={this.handleDeleteTalentCloseModal}>
              <FormattedMessage {...authMessage.btnCancel} />
            </Button>
            <Button type="button" className={`${loading ? 'loading' : ''} btn-primary btn-sm`} onClick={this.submitDelete}>
              <FormattedMessage {...authMessage.btnDelete} />
            </Button>
          </div>
        </div>
      </ReactModal>
    );
  };

  render() {
    const { invalid, loading, history, responseSuccess, responseError, handleSubmit, currency } = this.props;
    const {
      uploaderType,
      showAddTalentModal,
      modalType,
      someErrorInFile,
      fileName,
      talentsArray,
      updatedRate,
      updatedCurrency,
    } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod>
          <ProgressMod value={agencyStepSize(3)} className="onboarding-progress" />
          <Card>
            <H1 className="text-center">
              <FormattedMessage {...messages.headingAddTalent} />
            </H1>
            <PaymentPageWrapper>
              <FormWrapper>
                <form>
                  <TableTitle className="d-flex justify-content-between mb-3">
                    <H4 className="m-0">
                      <FormattedMessage {...messages.titleListTalents} />
                    </H4>
                    <Button
                      type="button"
                      className="btn btn-primary btn-link text-underline text-medium"
                      onClick={() => this.handleAddTalentOpenModal('add')}
                    >
                      <FormattedMessage {...messages.btnAddTalent} />
                    </Button>
                  </TableTitle>
                  <hr className="m-0" />
                  <UserList className="with-scroll">
                    {get(this.state, 'talentsArray', []).length > 0 &&
                      talentsArray.map((talent, index) => {
                        const currencySymbol = getSelectedFieldFromList(currencyData, 'value', get(talent, 'currency', ''));
                        return (
                          <li key={uuidv4()}>
                            <div>
                              <span>{`${get(talent, 'firstName')} ${get(talent, 'lastName')}`}</span>
                              <span>{`${get(talent, 'email', '')}`}</span>
                              <span>{`${currencySymbol.symbol}${get(talent, 'rate')}`}</span>
                            </div>
                            <div>
                              <Button type="button" onClick={() => this.handleDeleteTalentOpenModal(index)}>
                                <SVG src={deleteIcon} />
                              </Button>
                              <Button type="button" onClick={() => this.handleAddTalentOpenModal('edit', index)}>
                                <SVG src={editIcon} />
                              </Button>
                            </div>
                          </li>
                        );
                      })}
                  </UserList>
                  {someErrorInFile && (
                    <div className="position-relative">
                      <ValidationMessage>{someErrorInFile}</ValidationMessage>
                    </div>
                  )}
                  <UploadTitle className="d-flex">
                    <H4 className="m-0">
                      <FormattedMessage {...messages.titleUploadFile} />
                    </H4>
                    <DownloadLink href={sampleFile} className="btn-link ms-3" download="upload_talent_data_sample">
                      {messages.linkSampleFile.defaultMessage}
                    </DownloadLink>
                  </UploadTitle>
                  <FormGroup>
                    <div id="dropZone">{getDropZone(this, uploaderType, true, fileName)}</div>
                  </FormGroup>
                  <P className="text-center p-sm">
                    {messages.textIntructions.defaultMessage}
                    <DownloadLink href={instructionFile} className="btn-link ms-1" download="step_to_create_upload_multiple_talents">
                      {messages.linkHere.defaultMessage}
                    </DownloadLink>
                  </P>
                  <hr />
                  <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end">
                    <LinkButtonMod
                      className="left-arrow link me-auto"
                      color="link"
                      onClick={e => {
                        handleBackButton(e, history, '/agency/create-profile');
                      }}
                    >
                      <FormattedMessage {...containerMessage.backButton} />
                    </LinkButtonMod>
                    <LinkButtonMod
                      color="link"
                      onClick={e => {
                        this.handleSaveForLater(e, 'saveForLater');
                      }}
                    >
                      <FormattedMessage {...containerMessage.saveLaterButton} />
                    </LinkButtonMod>
                    <Button
                      type="submit"
                      className={`${getBtnClass(loading, responseSuccess, responseError)} btn-submit`}
                      disabled={invalid}
                      onClick={handleSubmit(e => {
                        this.handleSaveForLater(e, 'continue');
                      })}
                    >
                      <FormattedMessage {...containerMessage.continueButton} />
                    </Button>
                  </div>
                </form>
              </FormWrapper>
            </PaymentPageWrapper>
          </Card>
          <PopupWrapper
            loading={loading}
            responseSuccess={responseSuccess}
            responseError={responseError}
            disabled={invalid}
            isOpen={showAddTalentModal}
            modalType={modalType}
            onDiscard={this.handleAddTalentCloseModal}
            onHandleSubmit={handleSubmit(() => {
              this.popupSubmit(modalType);
            })}
            title={modalType === 'add' ? messages.modalAddTalentHeader.defaultMessage : messages.modalEditTalentHeader.defaultMessage}
          >
            <form onSubmit={handleSubmit}>
              <UserNameFields formKey={key} {...this.props} size="sm" />
              <Row>
                <Col md="6">
                  <FormGroup className="input-sm">
                    <FormLabel>
                      <FormattedMessage {...containerMessage.labelEmailAddress} />
                    </FormLabel>
                    <Field
                      name="emailAddress"
                      type="text"
                      component={renderField}
                      placeholder={containerMessage.placeholderEmailAddress.defaultMessage}
                      validate={[formValidations.required, formValidations.email]}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="input-sm">
                    <FormLabel>
                      <FormattedMessage {...containerMessage.labelHourlyRates} />
                    </FormLabel>
                    <div className="d-flex">
                      <CountryCode>
                        <Field
                          name="currency"
                          component={Selects}
                          defaultValue={currency}
                          options={currencyData.map(c => ({
                            label: c.label,
                            value: c.value,
                          }))}
                          validate={[formValidations.requiredSelect]}
                          onChange={data => this.handleRateChange({ target: { name: 'currency', value: data } })}
                        />
                      </CountryCode>
                      <div className="w-100 mw-100 labelSpacing ms-2">
                        <Field
                          name="ratePerHour"
                          type="number"
                          component={renderField}
                          placeholder={messages.placeHolderlabelRating.defaultMessage}
                          normalize={normalize.trimSpace}
                          validate={[formValidations.requiredField, formValidations.rateValidation]}
                          onChange={e => this.handleRateChange(e)}
                        />
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <RateDetailList>
                <p>
                  You will be Invoicing at <span>(excluding taxes)</span>
                </p>
                <ul>
                  <li>
                    {getCurrencySymbol(currencyData, 'code', updatedCurrency)}
                    {updatedRate * 1} per hour
                  </li>
                  <li>
                    {getCurrencySymbol(currencyData, 'code', updatedCurrency)}
                    {updatedRate * 7.5} per day
                  </li>
                  <li>
                    {getCurrencySymbol(currencyData, 'code', updatedCurrency)}
                    {updatedRate * 157.5} per month
                  </li>
                </ul>
              </RateDetailList>
            </form>
          </PopupWrapper>
          {this.renderDeleteTalentModal()}
        </ContainerMod>
      </React.Fragment>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeTalent: (type, data) => {
      dispatch(loadRepos());
      dispatch(actions.changeTalent(type, data));
    },
    onSaveForLater: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.submitAddTalents('saveForLater', data));
    },
    onSubmitAddTalents: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitAddTalents('continue', data));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  firstName: selectors.firstName,
  lastName: selectors.lastName,
  emailAddress: selectors.emailAddress,
  currency: selectors.currency,
  ratePerHour: selectors.ratePerHour,

  loading: makeSelectLoading(),
});

AddTalentsPage.defaultProps = defaultProps;
AddTalentsPage.propTypes = propTypes;

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
)(AddTalentsPage);
