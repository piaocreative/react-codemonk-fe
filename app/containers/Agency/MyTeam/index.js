/** MyTeam
 * This is the MyTeam page for the agency, at the '/talent/my-team' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import DataTable from 'react-data-table-component';
import { FormGroup, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import ReactModal from 'react-modal';
import StorageService from 'utils/StorageService';
import { VALIDATION } from 'utils/constants';
import request from 'utils/request';
import debounce from 'lodash/debounce';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import Content from 'components/Content';
import Emitter from 'utils/emitter';
import * as formValidations from 'utils/formValidations';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import {
  API_URL,
  AGENCY,
  TALENT,
  TALENTS,
  LIST,
  currencyData,
  editIcon,
  deleteIcon,
  customStyles,
  plusIcon,
  filesIcon,
  closeIcon,
} from 'containers/App/constants';
import { H4, Selects, FormLabel, Button, Card, ToastifyMessage } from 'components';
import { renderField } from 'utils/Fields';
import injectSaga from 'utils/injectSaga';
import { getDropZone } from 'containers/Auth/PersonalDetails/dropZone';
import { getCurrencySymbol } from 'containers/MyProfilePage/components/utils';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import { UserNameFields } from 'components/UserProfileComponents/UserNameFields';
import authMessages from 'containers/Auth/Talent/AddTalentsPage/messages';
import { getSelectedFieldFromList } from 'containers/Auth/PersonalDetails/utils';
import { CountryCode } from 'containers/Auth/PersonalDetails/style';
import { paginationComponent } from 'containers/App/utils';
import { loadRepos, reset } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import { defaultProps, propTypes } from 'containers/proptypes';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from 'containers/constants';
import { RateDetailList, ActionIcon } from 'containers/MyProfilePage/styles';
import SearchComponent from 'components/SearchComponent';
import containerMessage from 'containers/messages';
import TalentNameButton from 'components/TalentNameButton';
import { ProgressComponent, getAvailability } from './utils';
import messages from './messages';
import { key, tableColumns } from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import saga from './saga';
import { Count } from './styles';
import 'rc-pagination/assets/index.css';

export class MyTeam extends React.Component {
  constructor(props) {
    super(props);
    const getMyTeamPageNo = StorageService.get('agencyMyTeamPageNumber');
    const agencyMyTeamPageNo = JSON.parse(getMyTeamPageNo) || DEFAULT_PAGE_NO;
    this.state = {
      pageNum: agencyMyTeamPageNo,
      totalDocs: 0,
      talentsArray: [],
      showTalentModal: false,
      showDeleteModal: false,
      modalType: '',
      talentIndex: '',
      showUploadTalentModal: false,
      uploaderType: 'csvUploader',
      fileName: '',
      search: '',
      updatedRate: 0,
      updatedCurrency: 'USD',
    };
  }

  componentDidMount() {
    const { pageNum } = this.state;

    Emitter.on('addTalentSaga', addTalentSaga => {
      if (addTalentSaga) {
        this.loadAgencyTeam(1);
        this.setState({ showTalentModal: false, modalType: '', talentIndex: '' });
      }
    });

    Emitter.on('editTalentSaga', editTalentSaga => {
      if (editTalentSaga) {
        this.loadAgencyTeam(pageNum);
        this.setState({ showTalentModal: false, modalType: '', talentIndex: '' });
      }
    });

    Emitter.on('deleteTalentSaga', deleteTalentSaga => {
      if (deleteTalentSaga) {
        this.loadAgencyTeam(1);
        this.setState({ showDeleteModal: false, modalType: '', talentIndex: '' });
      }
    });

    this.loadAgencyTeam(pageNum);
  }

  componentWillUnmount() {
    Emitter.off('addTalentSaga');
    Emitter.off('editTalentSaga');
    Emitter.off('deleteTalentSaga');
  }

  handleSearchChange = value => {
    this.setState({ search: value });
    this.loadAgencyTeam(1);
  };

  debounceFn = debounce(value => this.handleSearchChange(value), 500);

  loadAgencyTeam = pageNum => {
    StorageService.set('agencyMyTeamPageNumber', JSON.stringify(pageNum));
    this.setState({ isListLoading: true, pageNum });
    const { search } = this.state;
    const data = { method: 'GET' };

    const requestURL = `${API_URL}${AGENCY}${TALENT}${LIST}?page=${pageNum}&limit=${DEFAULT_PAGE_SIZE}&q=${search}`;

    request(requestURL, data)
      .then(this.setAgencyTeam)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setAgencyTeam = response => {
    if (get(response, 'status')) {
      const { data } = response;
      const totalDocs = get(data, 'totalDocs');
      const array = [];

      get(data, 'docs', []).forEach((talent, index) => {
        const id = get(talent, '_id');
        const talentId = get(talent, 'talentId');

        const talentName = `${get(talent, 'firstName')} ${get(talent, 'lastName')}`;
        const profilePicture = get(talent, 'profilePicture', '');
        const btnProps = {
          redirectTo: '/agency/talent-profile/',
          talentId,
          redirectType: 'agencyMyTeam',
          talentName,
          extra: {},
          profilePicture,
        };
        const name = <TalentNameButton {...btnProps} />;
        const currencySymbol = getCurrencySymbol(currencyData, 'code', get(talent, 'currency'));
        const email = get(talent, 'email');
        const rate = `${currencySymbol || ''}${get(talent, 'rate')}`;
        const availability = getAvailability(get(talent, 'weekylyAvailability'));
        const status = get(talent, 'status', '');
        const action = (
          <div className="action-items">
            <ActionIcon type="button" className="me-2" onClick={() => this.deleteTalentOpenModal(index)}>
              <SVG src={deleteIcon} />
            </ActionIcon>
            <ActionIcon type="button" onClick={() => this.handleOpenModal('edit', index)}>
              <SVG src={editIcon} />
            </ActionIcon>
          </div>
        );
        array.push({ id, talentId, name, email, rate, availability, status, action });
      });

      this.setState({
        totalDocs,
        teamList: array,
        isListLoading: false,
        paginationData: get(response, 'data', {}),
        talentsArray: get(response, 'data.docs', []),
      });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleCloseModal = () => {
    this.setState({ showTalentModal: false, modalType: '', talentIndex: '' });
  };

  handleOpenModal = (modalType, index) => {
    const { dispatch } = this.props;
    if (modalType === 'add') {
      const data = { firstName: '', lastName: '', emailAddress: '', currency: '', ratePerHour: '' };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
    } else if (modalType === 'edit') {
      const { talentsArray } = this.state;
      const { [index]: rowData } = talentsArray;
      const currencyObj = getSelectedFieldFromList(currencyData, 'value', get(rowData, 'currency', ''));
      const currency = { label: currencyObj.label, value: currencyObj.value };

      this.setState({
        updatedCurrency: currency.value,
        updatedRate: get(rowData, 'rate', 0),
        hasActiveProject: get(rowData, 'hasActiveProject', ''),
      });
      const data = {
        talentId: get(rowData, '_id', ''),
        firstName: get(rowData, 'firstName', ''),
        lastName: get(rowData, 'lastName', ''),
        emailAddress: get(rowData, 'email', ''),
        currency,
        ratePerHour: get(rowData, 'rate', ''),
      };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
    }
    this.setState({ showTalentModal: true, modalType, talentIndex: index });
  };

  modalSubmit = modalType => {
    const { talentId, firstName, lastName, emailAddress, currency, ratePerHour, onChangeTalent } = this.props;
    const talentObj = {
      talentId,
      firstName,
      lastName,
      email: emailAddress,
      currency: get(currency, 'value', ''),
      rate: Number(ratePerHour),
    };
    if (modalType === 'add') {
      onChangeTalent('add', talentObj);
    } else if (modalType === 'edit') {
      onChangeTalent('edit', talentObj);
    }
  };

  // deleteModalfunctions
  deleteTalentOpenModal = index => this.setState({ showDeleteModal: true, talentIndex: index });

  deleteTalentCloseModal = () => this.setState({ showDeleteModal: false, modalType: '', talentIndex: '' });

  submitDelete = () => {
    const { onChangeTalent } = this.props;
    const { talentsArray, talentIndex } = this.state;

    const talent = talentsArray[talentIndex];
    const talentObj = { email: get(talent, 'email', '') };
    onChangeTalent('delete', talentObj);
  };

  // csvModal functions
  handleClosUploadTalenteModal = () => this.setState({ showUploadTalentModal: false });

  handleOpenUploadTalentModal = () => this.setState({ showUploadTalentModal: true });

  onDrop = (acceptedFiles, rejectedFiles) => {
    let errorFiles = '';
    rejectedFiles.forEach((file, index) => {
      errorFiles = `${errorFiles} (${index + 1}) ${file.name}`;
    });
    if (rejectedFiles.length > 1) {
      toast.error(<ToastifyMessage message={VALIDATION.maxOneFileLength} type="error" />, { className: 'Toast-error' });
    } else if (
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-large' ||
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-small'
    ) {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFile} type="error" />, { className: 'Toast-error' });
    } else if (get(rejectedFiles, '[0].errors[0].code') === 'file-invalid-type') {
      toast.error(<ToastifyMessage message={VALIDATION.invalidCSVFileType} type="error" />, { className: 'Toast-error' });
    } else {
      const reader = new FileReader();
      const selectedFile = acceptedFiles[0];
      this.checkAgencyFileType(selectedFile, reader);
    }
  };

  checkAgencyFileType(selectedFile, reader) {
    if (!selectedFile) {
      return;
    }
    const file = selectedFile;
    const regex = new RegExp('(.*?).(csv|xls|xlsx)$');
    if (regex.test(file.path)) {
      reader.onloadend = () => {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          image: reader.result,
          fileName: file.path,
          selectedFile,
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(<ToastifyMessage message={VALIDATION.invalidCSVFileType} type="error" />, {
        className: 'Toast-error',
      });
    }
  }

  submitAddTalentFile = () => {
    const { dispatch } = this.props;
    const { selectedFile } = this.state;
    dispatch(loadRepos());

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
      .then(this.handleUploadFile)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, {
          className: 'Toast-error',
        });
      });
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

  handleUploadFile = response => {
    const { dispatch } = this.props;
    const { status, message } = response;
    dispatch(reset());
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
      this.loadAgencyTeam(1);
    } else {
      toast.error(<ToastifyMessage message={message} type="error" />, { className: 'Toast-error' });
    }
  };

  // eslint-disable-next-line react/no-unused-state
  deleteFile = () => this.setState({ image: '', someErrorInFile: '', fileName: '' });

  // render functions
  renderFileModal = () => {
    const { loading, handleSubmit } = this.props;
    const { showUploadTalentModal, uploaderType, fileName } = this.state;
    return (
      <PopupWrapper
        loading={loading}
        disabled={!fileName}
        isOpen={showUploadTalentModal}
        modalType="add"
        modalName="csvUploaderModal"
        onDiscard={this.handleClosUploadTalenteModal}
        onHandleSubmit={handleSubmit(this.submitAddTalentFile)}
        title={messages.btnAddTalents.defaultMessage}
      >
        <div id="dropZone" className="d-flex flex-column flex-1">
          {getDropZone(this, uploaderType, true, fileName, 'csvUploaderModal')}
        </div>
      </PopupWrapper>
    );
  };

  renderTalentModal = () => {
    const { invalid, loading, handleSubmit, currency } = this.props;
    const { showTalentModal, modalType, updatedRate, updatedCurrency, hasActiveProject } = this.state;
    const isLoginViaAdmin = StorageService.get('isLoginViaAdmin') || '';
    let isDisable = false;
    if (isLoginViaAdmin) {
      isDisable = false;
    } else if (hasActiveProject === true) {
      isDisable = true;
    }
    return (
      <PopupWrapper
        loading={loading}
        disabled={invalid}
        isOpen={showTalentModal}
        modalType={modalType}
        onDiscard={this.handleCloseModal}
        onHandleSubmit={handleSubmit(() => {
          this.modalSubmit(modalType);
        })}
        title={modalType === 'add' ? authMessages.modalAddTalentHeader.defaultMessage : authMessages.modalEditTalentHeader.defaultMessage}
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
                  wrapperClassName="input-disabled"
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
                      disable={isDisable}
                      validate={[formValidations.requiredSelect]}
                      onChange={data => this.handleRateChange({ target: { name: 'currency', value: data } })}
                    />
                  </CountryCode>
                  <div className="w-100 mw-100 labelSpacing ms-2">
                    <Field
                      name="ratePerHour"
                      type="number"
                      component={renderField}
                      disabled={isDisable}
                      placeholder={authMessages.placeHolderlabelRating.defaultMessage}
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
    );
  };

  renderDeleteTalentModal = () => {
    const { loading } = this.props;
    const { showDeleteModal } = this.state;
    return (
      <ReactModal
        isOpen={showDeleteModal}
        contentLabel={messages.deleteModalTitle.defaultMessage}
        onRequestClose={this.deleteTalentCloseModal}
        className="modal-dialog confirmation-modal"
        style={{ overlay: { zIndex: 12 } }}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
        ariaModal
      >
        <div className="modal-content">
          <div className="modal-header">
            <H4 className="modal-title newH4 d-flex align-items-center my-0">
              <FormattedMessage {...messages.deleteModalTitle} />
            </H4>
            <button type="button" className="modal-dismiss" onClick={this.deleteTalentCloseModal}>
              <img src={closeIcon} alt="close" />
              <span className="visually-hidden">Close</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              <FormattedMessage {...messages.modalContent} />
            </p>
          </div>
          <div className="modal-footer justify-content-end">
            <Button className="btn btn-link me-3" onClick={this.deleteTalentCloseModal}>
              <FormattedMessage {...messages.btnCancel} />
            </Button>
            <Button type="button" className={`${loading ? 'loading' : ''} btn-primary btn-sm`} onClick={this.submitDelete}>
              <FormattedMessage {...messages.btnDelete} />
            </Button>
          </div>
        </div>
      </ReactModal>
    );
  };

  render() {
    const { totalDocs, isListLoading, teamList, paginationData } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <Card className="d-flex align-items-xl-center justify-content-between table-header flex-column flex-xl-row">
            <div className="d-flex align-items-md-center flex-column flex-md-row">
              <div className="d-flex align-items-center me-3">
                <H4 className="text-start my-0">
                  <FormattedMessage {...messages.headingMyTeam} />
                </H4>
                <Count>{totalDocs}</Count>
              </div>
              <div className="d-flex mt-4 mt-md-0">
                <Button className="btn btn-sm btn-outline btn-plus ms-md-3 top-0" onClick={() => this.handleOpenModal('add')}>
                  <SVG className="me-2" src={plusIcon} />
                  <span>
                    <FormattedMessage {...messages.btnAddTalent} />
                  </span>
                </Button>
                <Button className="btn btn-sm btn-link ms-3 text-underline text-medium" onClick={this.handleOpenUploadTalentModal}>
                  <FormattedMessage {...messages.btnUploadFile} />
                </Button>
              </div>
            </div>
            <div className="input-sm input-sm me-auto me-md-0 ms-md-auto mt-4 mt-xl-0">
              <SearchComponent handleSearchChange={this.debounceFn} placeholder={containerMessage.searchPlaceholder.defaultMessage} />
            </div>
          </Card>
          <hr className="m-0" />
          {isListLoading || totalDocs > 0 ? (
            <React.Fragment>
              <Card className="p-0">
                <DataTable
                  noHeader
                  columns={tableColumns}
                  customStyles={customStyles}
                  className="hide-action-items"
                  data={teamList}
                  totalRows={0}
                  direction="ltr"
                  progressPending={isListLoading}
                  progressComponent={<ProgressComponent />}
                  paginationComponentOptions={{ noRowsPerPage: true }}
                  noDataComponent={
                    <p className="p-4 m-0 text-muted">
                      <small>{containerMessage.noRecord.defaultMessage}</small>
                    </p>
                  }
                />
              </Card>
              {paginationComponent(paginationData, DEFAULT_PAGE_SIZE, this.loadAgencyTeam)}
            </React.Fragment>
          ) : (
            <ComingSoonBlock>
              <div className="inner-content">
                <SVG src={filesIcon} />
                <p className="sm my-0">{containerMessage.noRecord.defaultMessage}</p>
              </div>
            </ComingSoonBlock>
          )}
        </Content>

        {this.renderFileModal()}
        {this.renderTalentModal()}
        {this.renderDeleteTalentModal()}
      </React.Fragment>
    );
  }
}

MyTeam.defaultProps = defaultProps;
MyTeam.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  talentId: selectors.talentId,
  firstName: selectors.firstName,
  lastName: selectors.lastName,
  emailAddress: selectors.emailAddress,
  currency: selectors.currency,
  ratePerHour: selectors.ratePerHour,

  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeTalent: (type, data) => {
      dispatch(loadRepos());
      dispatch(actions.changeTalent(type, data));
    },
  };
}

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
)(MyTeam);
