/**
 * Education and Certification Details Page
 *
 * This is the Education and Certification Details page for the App, at the '/education' route
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { reduxForm, change, Field, untouch, touch } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';
import { createStructuredSelector } from 'reselect';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Row, Col, FormGroup } from 'reactstrap';
import debounce from 'lodash/debounce';
import request from 'utils/request';
import { renderField } from 'utils/Fields';
import { VALIDATION } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { redirectToPage } from 'containers/App/utils';
import AsyncSelects from 'components/AsyncSelects';
import { loadRepos } from 'containers/App/actions';
import * as formValidations from 'utils/formValidations';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import { getSelectedFieldFromList, getUserDetails, storeApiSignupStep } from 'containers/Auth/utils';
import {
  educationDegree,
  TALENT_SIGNUP_PAGE_URL,
  trashIcon,
  editNoteIcon,
  plusSquareIcon,
  logoPlaceholder,
  countryData,
  API_URL,
  CERTIFICATE_EDIT_API,
  EDUCATION_EDIT_API,
  VERSION2,
  CONFIG,
  COMPANY,
  SEARCH_BY_NAME,
  CERTIFICATION,
  TALENT,
} from 'containers/App/constants';
import { getPictureDropZone } from 'containers/Auth/PersonalDetails/pictureDropZone';
import ModalWrapper from 'components/ModalWrapper';
import containerMessage from 'containers/messages';
import { H1, H4, ToastifyMessage, P, Button, UserInfoList, FormLabel, Selects, DatePickers } from 'components';
import { propTypes } from 'containers/proptypes';
import { processData } from 'containers/Client/AddBrief/utils';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { key } from './constants';
import messages from './messages';
import EducationFooter from './EducationFooter';

export class EducationCertification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddEducationModal: false,
      showAddCertificateModal: false,
      image: '',
      certificateList: [],
      educationList: [],
      certificateModalType: '',
      educationModalType: '',
      companyOptions: [],
      companiesData: [],
      certificatesData: [],
      certificateOptions: [],
    };
    this.debouncedGetCompanyOptions = debounce(this.getCompanyOptions, 500);
    this.debouncedGetCertificateOptions = debounce(this.getCertificateOptions, 500);
  }

  loadCompanyOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedGetCompanyOptions(inputValue, callback);
    }
  };

  // client Name fetch
  fetchCompaniesData = async value => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${VERSION2}${CONFIG}${COMPANY}${SEARCH_BY_NAME}?q=${value}`;
    return request(requestURL, data);
  };

  getCompanyOptions = (inputValue, cb) => {
    const companiesData = this.fetchCompaniesData(inputValue);
    companiesData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const companyOptions = processData(data);
          this.setState({ companyOptions, companiesData: data });
          cb(companyOptions);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  handleCompanyChange = option => {
    const { dispatch, onChangeCollege } = this.props;
    const { companiesData } = this.state;
    const selectedCompanyData = (!!option && companiesData.find(obj => obj.name === option.label)) || {};
    if (!isEmpty(selectedCompanyData)) {
      const selectedCountry = { label: selectedCompanyData.country, value: selectedCompanyData.country };
      dispatch(change(key, 'country', selectedCountry));
      dispatch(actions.changeCountry(selectedCountry));
      const selectedLogo = selectedCompanyData.logo ? `${selectedCompanyData.logo}?_t=${new Date().getTime()}` : '';
      this.setState({ image: selectedLogo });
    } else {
      const data = { collegeName: '', country: '' };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
      dispatch(actions.changeCollege(data.collegeName));
      dispatch(actions.changeCountry(data.country));
      this.setState({ image: '' });
    }
    onChangeCollege(option);
    dispatch(change(key, 'collegeName', option));
  };

  handleEducationOpenModal = (type, id) => {
    const { dispatch } = this.props;
    if (type === 'add') {
      const data = { collegeName: '', country: '', startYear: '', endYear: '', degreeTitle: '', degreeLevel: '' };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
      dispatch(actions.changeCollege(data.collegeName));
      dispatch(actions.changeCountry(data.country));
      dispatch(actions.changeDegreeLevel(data.degreeLevel));
      this.setState({ image: '' });
    }
    if (type === 'edit') {
      const { educationList } = this.state;
      // eslint-disable-next-line no-underscore-dangle
      const educationData = educationList.find(obj => obj._id === id);

      const degreeLevelLabel = getSelectedFieldFromList(educationDegree, 'value', educationData.degreeLevel);
      const degreeLevelData = educationData.degreeLevel ? { label: degreeLevelLabel.name, value: degreeLevelLabel.value } : '';

      const dataObj = {
        collegeName: { label: educationData.collegeName, value: educationData.collegeName },
        country: { label: educationData.country, value: educationData.country },
        startYear: educationData.startYear ? new Date(educationData.startYear, 0, 1) : '',
        endYear: educationData.endYear ? new Date(educationData.endYear, 0, 1) : '',
        degreeTitle: educationData.degreeTitle,
        degreeLevel: degreeLevelData,
      };

      Object.keys(dataObj).forEach(fieldKey => {
        dispatch(change(key, fieldKey, dataObj[fieldKey]));
        dispatch(untouch(key, fieldKey));
        dispatch(touch(key, fieldKey));
      });
      dispatch(actions.changeCollege(dataObj.collegeName));
      dispatch(actions.changeCountry(dataObj.country));
      dispatch(actions.changeStartYear(dataObj.startYear));
      dispatch(actions.changeEndYear(dataObj.endYear));
      dispatch(actions.changeDegreeTitle(dataObj.degreeTitle));
      dispatch(actions.changeDegreeLevel(dataObj.degreeLevel));

      this.setState({ image: educationData.logo });
    }
    this.setState({ showAddEducationModal: true, educationModalType: type, selectedEducationID: id });
  };

  handleEducationCloseModal = () => {
    this.setState({ showAddEducationModal: false });
  };

  handleSubmitEducationForm = e => {
    const { collegeName, country, startYear, endYear, degreeTitle, degreeLevel, onSubmitAddEducationForm, history } = this.props;
    const { selectedFile, educationModalType, selectedEducationID, image } = this.state;

    const data = {
      collegeName: collegeName.label,
      country: country.value,
      startYear: moment(startYear).format('YYYY'),
      endYear: moment(endYear).format('YYYY'),
      degreeTitle,
      degreeLevel: degreeLevel.value,
      companyLogo: !selectedFile ? image : selectedFile,
    };

    if (educationModalType === 'edit') {
      // eslint-disable-next-line no-underscore-dangle
      data._id = selectedEducationID;
    }

    onSubmitAddEducationForm(e, educationModalType, data, () => {
      getUserDetails(history)
        .then(res => {
          this.setState({ showAddEducationModal: false });
          this.fetchFieldValues(res, false);
        })
        .catch(() => {
          history.push(TALENT_SIGNUP_PAGE_URL);
          toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
        });
    });
  };

  loadCertificateOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedGetCertificateOptions(inputValue, callback);
    }
  };

  // Certificate Name fetch
  fetchCertificatesData = async value => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${VERSION2}${CONFIG}${CERTIFICATION}${SEARCH_BY_NAME}?q=${value}`;
    return request(requestURL, data);
  };

  getCertificateOptions = (inputValue, cb) => {
    const certificatesData = this.fetchCertificatesData(inputValue);
    certificatesData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const certificateOptions = processData(data);
          this.setState({ certificateOptions, certificatesData: data });
          cb(certificateOptions);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  handleCertificateChange = option => {
    const { dispatch, onChangeCertificateName } = this.props;
    const { certificatesData } = this.state;
    const selectedCertificateData = (!!option && certificatesData.find(obj => obj.name === option.label)) || {};
    if (!isEmpty(selectedCertificateData)) {
      dispatch(change(key, 'issuedBy', selectedCertificateData.issuedBy));
      dispatch(actions.changeOrganisation(selectedCertificateData.issuedBy));
      const selectedLogo = selectedCertificateData.logo ? `${selectedCertificateData.logo}?_t=${new Date().getTime()}` : '';
      this.setState({ image: selectedLogo });
    } else {
      const data = { name: '', issuedBy: '' };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
      dispatch(actions.changeCertificateName(data.name));
      this.setState({ image: '' });
    }
    onChangeCertificateName(option);
    dispatch(change(key, 'name', option));
  };

  handleCertificateOpenModal = (type, id) => {
    const { dispatch } = this.props;
    if (type === 'add') {
      const data = {
        name: '',
        issuedBy: '',
        dateObtained: '',
        certificateId: '',
      };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
      dispatch(actions.changeCertificateName(data.name));
      this.setState({ image: '' });
    }
    if (type === 'edit') {
      const { certificateList } = this.state;
      // eslint-disable-next-line no-underscore-dangle
      const certificateData = certificateList.find(obj => obj._id === id);
      const dataObj = {
        name: { label: certificateData.name, value: certificateData.name },
        issuedBy: certificateData.issuedBy,
        dateObtained: moment(certificateData.dateObtained),
        certificateId: certificateData.certificateId,
      };
      Object.keys(dataObj).forEach(fieldKey => {
        dispatch(change(key, fieldKey, dataObj[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
      dispatch(actions.changeCertificateName(dataObj.name));
      dispatch(actions.changeOrganisation(dataObj.issuedBy));
      dispatch(actions.changeDateObtained(dataObj.dateObtained));
      dispatch(actions.changeCertificateURL(dataObj.certificateId));
      this.setState({ image: certificateData.logo });
    }
    this.setState({ showAddCertificateModal: true, certificateModalType: type, selectedCertificateID: id });
  };

  handleCertificateCloseModal = () => {
    this.setState({ showAddCertificateModal: false });
  };

  handleSubmitCertificateForm = e => {
    const { name, issuedBy, dateObtained, certificateId, onSubmitAddCertificateForm, history } = this.props;
    const { selectedFile, certificateModalType, selectedCertificateID, image } = this.state;

    const data = {
      name: name.label,
      issuedBy,
      dateObtained: moment(dateObtained).format('DD/MM/YYYY'),
      certificateId,
      certificate: !selectedFile ? image : selectedFile,
    };

    if (certificateModalType === 'edit') {
      // eslint-disable-next-line no-underscore-dangle
      data._id = selectedCertificateID;
    }

    onSubmitAddCertificateForm(e, certificateModalType, data, () => {
      getUserDetails(history)
        .then(res => {
          this.setState({ showAddCertificateModal: false });
          this.fetchFieldValues(res, false);
        })
        .catch(() => {
          history.push(TALENT_SIGNUP_PAGE_URL);
          toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
        });
    });
  };

  componentDidMount() {
    const { history } = this.props;
    getUserDetails(history)
      .then(response => {
        if (history.location && history.location.state && history.location.state.fromMyProfile) {
          this.fetchFieldValues(response, false);
        } else {
          this.fetchFieldValues(response, true);
        }
      })
      .catch(() => {
        history.push(TALENT_SIGNUP_PAGE_URL);
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  }

  fetchFieldValues = (response, redirection) => {
    const { history, location } = this.props;
    if (get(response, 'status')) {
      storeApiSignupStep(get(response, 'data.signupStep'));
      const isTalentOnboardingCompleted = get(response, 'data.registerType') === 'freelancer' && get(response, 'data.signupStep') === 7;
      const isTalentAgencyOnboardingCompleted = get(response, 'data.registerType') === 'agency' && get(response, 'data.signupStep') === 5;
      if (redirection && !(isTalentOnboardingCompleted || isTalentAgencyOnboardingCompleted)) {
        const currentSignupStep = get(response, 'data.signupStep') + 1;
        redirectToPage(history, location.redirection, currentSignupStep, 2);
      }
      this.setState({
        certificateList: get(response, 'data.certificateDetails', []),
        educationList: get(response, 'data.educationDetails', []),
        image: '',
      });
    }
  };

  handleSaveForLater = e => {
    const { onSaveForLater } = this.props;
    e.preventDefault();

    onSaveForLater();
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
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
      this.checkFileType(selectedFile, reader);
    }
  };

  checkFileType(selectedFile, reader) {
    if (!selectedFile) {
      return;
    }
    const file = selectedFile;
    const regex = new RegExp('(.*?).(png|jpg|jpeg)$');
    if (regex.test(file.type)) {
      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          this.setState({
            image: reader.result,
            selectedFile,
          });
        };
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFileType} type="error" />, {
        className: 'Toast-error',
      });
    }
  }

  deletePhoto = () => {
    this.setState({ image: '' });
  };

  deleteRecord = (type, id) => {
    const { history } = this.props;
    const data = {
      method: 'DELETE',
      body: { _id: id },
    };
    let requestURL;
    if (type === 'education') requestURL = `${API_URL}${VERSION2}${TALENT}${EDUCATION_EDIT_API}`;
    else if (type === 'certificate') requestURL = `${API_URL}${VERSION2}${TALENT}${CERTIFICATE_EDIT_API}`;
    request(requestURL, data).then(response => {
      if (get(response, 'status')) {
        getUserDetails(history)
          .then(res => {
            this.fetchFieldValues(res, false);
          })
          .catch(() => {
            history.push(TALENT_SIGNUP_PAGE_URL);
            toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
          });
      } else {
        toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      }
    });
  };

  render() {
    const {
      handleSubmit,
      loading,
      responseSuccess,
      responseError,
      invalid,
      collegeName,
      country,
      startYear,
      endYear,
      degreeTitle,
      degreeLevel,
      name,
      issuedBy,
      dateObtained,
      certificateId,
      onChangeCountry,
      onChangeStartYear,
      onChangeEndYear,
      onChangeDegreeTitle,
      onChangeDegreeLevel,
      onChangeOrganisation,
      onChangeDateObtained,
      onChangeCertificateURL,
    } = this.props;
    const {
      showAddEducationModal,
      showAddCertificateModal,
      image,
      certificateList,
      educationList,
      certificateModalType,
      educationModalType,
      companyOptions,
      certificateOptions,
    } = this.state;
    const formValid = educationList.length > 0;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <>
          <H1 className="mb-3">
            <FormattedMessage {...messages.headingQualifications} />
          </H1>
          <P className="p16 mb-5" opacityVal="0.5">
            <FormattedMessage {...messages.qualificationsTagLine} />
          </P>
          <H4 className="newH4 mt-0 mb-3 d-inline-flex align-items-center" opacityVal="0.5">
            <FormattedMessage {...messages.labelEducation} />
            <P className="p14 ms-1 mb-0" opacityVal="0.5">
              (At least one is required)
            </P>
          </H4>
          <UserInfoList>
            {educationList.map(item => (
              <li>
                <div>
                  <div className="list-outer-block">
                    {item.logo ? (
                      <div className="icon-container">
                        <img src={`${item.logo}?_t=${new Date().getTime()}`} className="img-fluid" alt={item.collegeName} />
                      </div>
                    ) : (
                      <SVG src={logoPlaceholder} className="list-icon" />
                    )}
                    <div className="list-content">
                      <div>
                        <P className="p14 mb-1" opacityVal="0.5">
                          {item.startYear} {item.endYear && <>- {item.endYear}</>}
                        </P>
                        <P className="p16 mb-2">
                          {item.degreeLevel} in {item.degreeTitle}
                        </P>
                        <P className="p14 mb-0" opacityVal="0.5">
                          {item.collegeName} {item.country && <>, {item.country} </>}
                        </P>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-action">
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  <Button className="btn-icon btn-link ms-auto" onClick={() => this.deleteRecord('education', item._id)}>
                    <SVG src={trashIcon} className="me-1" />
                    Delete
                  </Button>
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  <Button className="btn-icon btn-link ms-auto" onClick={() => this.handleEducationOpenModal('edit', item._id)}>
                    <SVG src={editNoteIcon} className="me-1" />
                    Edit
                  </Button>
                </div>
              </li>
            ))}
            <li>
              <Button className="btn-icon text-primary btn-link ms-auto" onClick={() => this.handleEducationOpenModal('add')}>
                <SVG src={plusSquareIcon} className="me-1" />
                {messages.labelAddDegree.defaultMessage}
              </Button>
            </li>
          </UserInfoList>

          <H4 className="newH4 mt-5 mb-3 d-inline-flex align-items-center" opacityVal="0.5">
            <FormattedMessage {...containerMessage.labelCertification} />
            <P className="p14 ms-1 mb-0" opacityVal="0.5">
              <FormattedMessage {...containerMessage.optionalText} />
            </P>
          </H4>
          <UserInfoList>
            {certificateList.map(item => (
              <li>
                <div>
                  <div className="list-outer-block">
                    {item.logo ? (
                      <div className="icon-container">
                        <img src={`${item.logo}?_t=${new Date().getTime()}`} className="img-fluid" alt={item.collegeName} />
                      </div>
                    ) : (
                      <SVG src={logoPlaceholder} className="list-icon" />
                    )}
                    <div className="list-content">
                      <div>
                        <P className="p14 mb-1" opacityVal="0.5">
                          {moment(item.dateObtained).format('DD/MM/YYYY')}
                        </P>
                        <P className="p16 mb-2">{item.name}</P>
                        <P className="p14 mb-0" opacityVal="0.5">
                          {item.issuedBy}
                        </P>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-action">
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  <Button className="btn-icon btn-link ms-auto" onClick={() => this.deleteRecord('certificate', item._id)}>
                    <SVG src={trashIcon} className="me-1" />
                    Delete
                  </Button>
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  <Button className="btn-icon btn-link ms-auto" onClick={() => this.handleCertificateOpenModal('edit', item._id)}>
                    <SVG src={editNoteIcon} className="me-1" />
                    Edit
                  </Button>
                </div>
              </li>
            ))}
            <li>
              <Button className="btn-icon text-primary btn-link ms-auto" onClick={() => this.handleCertificateOpenModal('add')}>
                <SVG src={plusSquareIcon} className="me-1" />
                {messages.labelAddCertificate.defaultMessage}
              </Button>
            </li>
          </UserInfoList>
          <EducationFooter {...this.props} formValid={formValid} handleSaveForLater={this.handleSaveForLater} />
          <ModalWrapper
            loading={loading}
            responseSuccess={responseSuccess}
            responseError={responseError}
            disabled={invalid || !image}
            isOpen={showAddEducationModal}
            onDiscard={this.handleEducationCloseModal}
            onHandleSubmit={handleSubmit(this.handleSubmitEducationForm)}
            title={`${educationModalType === 'add' ? 'Add' : 'Edit'} education`}
            primaryBtnText="Save"
          >
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelCollege} />
                    </FormLabel>
                    <Field
                      name="collegeName"
                      type="text"
                      component={AsyncSelects}
                      defaultValue={collegeName}
                      cacheOptions={false}
                      loadOptions={this.loadCompanyOptions}
                      defaultOptions={companyOptions}
                      handleChange={this.handleCompanyChange}
                      placeHolder={messages.placeholderCollege.defaultMessage}
                      validate={[formValidations.requiredSelect]}
                      creatable
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelCountry} />
                    </FormLabel>
                    <Field
                      name="country"
                      component={Selects}
                      placeHolder={messages.placeholderCountry.defaultMessage}
                      options={countryData.map(c => ({
                        label: c.name,
                        value: c.name,
                      }))}
                      defaultValue={country}
                      onChange={onChangeCountry}
                      validate={[formValidations.requiredSelect]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormLabel>
                <FormattedMessage {...messages.labelCollege} /> logo
              </FormLabel>
              <FormGroup>
                <div id="dropZone">{getPictureDropZone(this, 'logoUploader', true)}</div>
              </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelStartYear} />
                    </FormLabel>
                    <Field
                      name="startYear"
                      component={DatePickers}
                      showYearPicker
                      placeholder={messages.placeholderYear.defaultMessage}
                      maxDate={new Date()}
                      selected={startYear}
                      defaultValue={startYear}
                      placement="bottom-start"
                      withIcon
                      onChange={onChangeStartYear}
                      dateFormat="yyyy"
                      validate={[formValidations.requiredDate]}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelEndYear} />
                    </FormLabel>
                    <Field
                      name="endYear"
                      component={DatePickers}
                      showYearPicker
                      placeholder={messages.placeholderYear.defaultMessage}
                      minDate={moment(startYear).toDate()}
                      selected={endYear}
                      defaultValue={endYear}
                      placement="bottom-start"
                      withIcon
                      onChange={onChangeEndYear}
                      dateFormat="yyyy"
                      validate={[formValidations.requiredDate]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelDegreeTitle} />
                    </FormLabel>
                    <Field
                      name="degreeTitle"
                      type="text"
                      component={renderField}
                      placeholder={messages.placeholderDegreeTitle.defaultMessage}
                      defaultValue={degreeTitle}
                      onChange={onChangeDegreeTitle}
                      validate={[formValidations.requiredField, formValidations.minLength2, formValidations.maxLength50]}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelDegreeLevel} />
                    </FormLabel>
                    <Field
                      name="degreeLevel"
                      component={Selects}
                      defaultValue={degreeLevel}
                      searchable
                      options={educationDegree.map(item => ({
                        label: `${item.name}`,
                        value: item.value,
                      }))}
                      placeHolder={messages.placeholderDegreeLevel.defaultMessage}
                      onChange={onChangeDegreeLevel}
                      validate={[formValidations.requiredSelect]}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </ModalWrapper>
          <ModalWrapper
            loading={loading}
            responseSuccess={responseSuccess}
            responseError={responseError}
            disabled={invalid || !image}
            isOpen={showAddCertificateModal}
            onDiscard={this.handleCertificateCloseModal}
            onHandleSubmit={handleSubmit(this.handleSubmitCertificateForm)}
            title={`${certificateModalType === 'add' ? 'Add' : 'Edit'} certification`}
            primaryBtnText="Save"
          >
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelCertiName} />
                    </FormLabel>
                    <Field
                      name="name"
                      type="text"
                      component={AsyncSelects}
                      defaultValue={name}
                      cacheOptions={false}
                      loadOptions={this.loadCertificateOptions}
                      defaultOptions={certificateOptions}
                      handleChange={this.handleCertificateChange}
                      placeHolder={messages.placeholderCertiName.defaultMessage}
                      validate={[formValidations.requiredSelect, formValidations.minLength2, formValidations.maxLength50]}
                      creatable
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelIssuingOrg} />
                    </FormLabel>
                    <Field
                      name="issuedBy"
                      type="text"
                      component={renderField}
                      placeholder={messages.placeholderIssuingOrg.defaultMessage}
                      defaultValue={issuedBy}
                      onChange={onChangeOrganisation}
                      validate={[formValidations.required, formValidations.minLength2, formValidations.maxLength50]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormLabel>Certification logo</FormLabel>
              <FormGroup>
                <div id="dropZone">{getPictureDropZone(this, 'logoUploader')}</div>
              </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelDateObtained} />
                    </FormLabel>
                    <Field
                      name="dateObtained"
                      component={DatePickers}
                      dateFormat="dd/MM/yyyy"
                      showYearDropDown
                      placeholder={containerMessage.placeholderDate.defaultMessage}
                      maxDate={new Date()}
                      onChange={onChangeDateObtained}
                      defaultValue={dateObtained}
                      selected={dateObtained}
                      yearDropdownItemNumber={20}
                      scrollableYearDropdown
                      placement="bottom-start"
                      validate={[formValidations.requiredDate]}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelCertiId} />
                    </FormLabel>
                    <Field
                      name="certificateId"
                      type="text"
                      component={renderField}
                      placeholder={messages.placeholderCertiId.defaultMessage}
                      defaultValue={certificateId}
                      onChange={onChangeCertificateURL}
                      validate={[formValidations.required, formValidations.minLength2]}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </ModalWrapper>
        </>
      </React.Fragment>
    );
  }
}

EducationCertification.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  education: selectors.makeSelectEducationDetails(),
  certificate: selectors.makeSelectCertificateDetails(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  collegeName: selectors.makeSelectCollegeName(),
  country: selectors.makeSelectCountry(),
  startYear: selectors.makeSelectStartYear(),
  endYear: selectors.makeSelectEndYear(),
  degreeTitle: selectors.makeSelectDegreeTitle(),
  degreeLevel: selectors.makeSelectDegreeLevel(),
  name: selectors.makeSelectName(),
  issuedBy: selectors.makeSelectIssuedBy(),
  dateObtained: selectors.makeSelectDateObtained(),
  certificateId: selectors.makeSelectCertificateId(),
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeEducation: data => dispatch(actions.changeEducationDetails(data)),
    onChangeCertificate: data => dispatch(actions.changeCertificateDetails(data)),
    onSaveForLater: () => dispatch(actions.saveForLater('saveForLater')),
    onChangeCollege: evt => dispatch(actions.changeCollege(evt)),
    onChangeCountry: evt => dispatch(actions.changeCountry(evt)),
    onChangeStartYear: value => dispatch(actions.changeStartYear(value)),
    onChangeEndYear: value => dispatch(actions.changeEndYear(value)),
    onChangeDegreeTitle: evt => dispatch(actions.changeDegreeTitle(evt.target.value)),
    onChangeDegreeLevel: evt => dispatch(actions.changeDegreeLevel(evt)),
    onChangeCertificateName: evt => dispatch(actions.changeCertificateName(evt)),
    onChangeOrganisation: evt => dispatch(actions.changeOrganisation(evt.target.value)),
    onChangeDateObtained: value => dispatch(actions.changeDateObtained(value)),
    onChangeCertificateURL: evt => dispatch(actions.changeCertificateURL(evt.target.value)),
    onSubmitAddEducationForm: (evt, type, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.addEducation(type, data, onSuccess));
    },
    onSubmitAddCertificateForm: (evt, type, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.addCertificate(type, data, onSuccess));
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
)(EducationCertification);
