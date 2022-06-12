/**
 * Work Experience Details Page
 *
 * This is the Work Experience Details page for the App, at the '/experience' route
 */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { reduxForm, change, Field, untouch, touch } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as formValidations from 'utils/formValidations';
import { renderField, renderFieldoptCheckbox, renderTextAreaForm } from 'utils/Fields';
import { VALIDATION } from 'utils/constants';
import { get } from 'lodash';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import AsyncSelects from 'components/AsyncSelects';
import { getSelectedFieldFromList, getUserDetails, storeApiSignupStep } from 'containers/Auth/utils';
import {
  toastMessages,
  employmentTypeList,
  trashIcon,
  editNoteIcon,
  plusSquareIcon,
  logoPlaceholder,
  countryData,
  TALENT_SIGNUP_PAGE_URL,
  API_URL,
  VERSION2,
  TALENT,
  WORK_EXPERIENCE_EDIT_API,
  CONFIG,
  COMPANY,
  SEARCH_BY_NAME,
} from 'containers/App/constants';
import { getPictureDropZone } from 'containers/Auth/PersonalDetails/pictureDropZone';
import ModalWrapper from 'components/ModalWrapper';
import request from 'utils/request';
import { H1, ToastifyMessage, P, UserInfoList, Button, DatePickers, Selects, FormLabel } from 'components';
import { redirectToPage } from 'containers/App/utils';
import containerMessage from 'containers/messages';
import { Row, Col, FormGroup } from 'reactstrap';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import componentMessage from 'components/UserProfileComponents/messages';
import { processDataWithCountry } from 'containers/Client/AddBrief/utils';
import { getLabel } from 'containers/MyProfilePage/components/utils';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { key } from './constants';
import WorkExperienceFooter from './workExperienceFooter';
import { propTypes } from './proptypes';

export class WorkExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddExperienceModal: false,
      image: '',
      experienceList: [],
      experienceModalType: '',
      currentlyWork: false,
      companyOptions: [],
      companiesData: [],
    };
    this.debouncedGetCompanyOptions = debounce(this.getCompanyOptions, 500);
  }

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
        history.push('/talent/signup');
        toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
      });
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
          const companyOptions = processDataWithCountry(data);
          this.setState({ companyOptions, companiesData: data });
          cb(companyOptions);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  handleCompanyChange = option => {
    const { dispatch, onChangeEmployer } = this.props;
    const { companiesData } = this.state;
    const selectedCompanyLabel = option.label.split(',')[0];
    const selectedCompanyCountry = option.label.split(',')[1].trim();
    const selectedCompanyData =
      (!!option && companiesData.find(obj => obj.name === selectedCompanyLabel && obj.country === selectedCompanyCountry)) || {};
    if (!isEmpty(selectedCompanyData)) {
      const selectedCountry = { label: selectedCompanyData.country, value: selectedCompanyData.country };
      dispatch(change(key, 'country', selectedCountry));
      dispatch(actions.changeCountry(selectedCountry));
      const selectedLogo = selectedCompanyData.logo ? `${selectedCompanyData.logo}?_t=${new Date().getTime()}` : '';
      this.setState({ image: selectedLogo });
    } else {
      const data = { employer: '', country: '' };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
      dispatch(actions.changeEmployer(data.employer));
      dispatch(actions.changeCountry(data.country));
      this.setState({ image: '', currentlyWork: false });
    }
    onChangeEmployer(option);
    dispatch(change(key, 'employer', option));
  };

  handleExperienceOpenModal = (type, id) => {
    const { dispatch } = this.props;
    if (type === 'add') {
      const data = {
        jobTitle: '',
        employmentType: '',
        employer: '',
        country: '',
        startDate: '',
        endDate: '',
        shortDescription: '',
        currentlyWork: false,
      };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
      dispatch(actions.changeEmployer(data.employer));
      dispatch(actions.changeCountry(data.country));
      dispatch(actions.changeEmploymentType(data.employmentType));
      this.setState({ image: '', currentlyWork: false });
    }
    if (type === 'edit') {
      const { experienceList } = this.state;
      // eslint-disable-next-line no-underscore-dangle
      const experienceData = experienceList.find(obj => obj._id === id);

      const employmentTypeLabel = getSelectedFieldFromList(employmentTypeList, 'value', experienceData.employmentType);
      const employmentTypeData = experienceData.employmentType ? { label: employmentTypeLabel.name, value: employmentTypeLabel.value } : '';

      const dataObj = {
        jobTitle: experienceData.jobTitle,
        employmentType: employmentTypeData,
        employer: { label: experienceData.employer, value: experienceData.employer },
        country: { label: experienceData.country, value: experienceData.country },
        startDate: experienceData.startDate ? moment(experienceData.startDate) : moment(new Date()),
        endDate: experienceData.endDate ? moment(experienceData.endDate) : moment(new Date()),
        shortDescription: experienceData.shortDescription,
        isPresent: experienceData.isPresent,
      };

      Object.keys(dataObj).forEach(fieldKey => {
        dispatch(change(key, fieldKey, dataObj[fieldKey]));
        dispatch(untouch(key, fieldKey));
        dispatch(touch(key, fieldKey));
      });
      dispatch(actions.changeRole(dataObj.jobTitle));
      dispatch(actions.changeEmploymentType(dataObj.employmentType));
      dispatch(actions.changeEmployer(dataObj.employer));
      dispatch(actions.changeCountry(dataObj.country));
      dispatch(actions.changeStartDate(dataObj.startDate));
      dispatch(actions.changeEndDate(dataObj.endDate));
      dispatch(actions.changeShortDescription(dataObj.shortDescription));

      this.setState({ image: experienceData.logo });
    }
    this.setState({ showAddExperienceModal: true, experienceModalType: type, selectedExperienceID: id });
  };

  handleExperienceCloseModal = () => {
    this.setState({ showAddExperienceModal: false });
  };

  handleSubmitExperienceForm = e => {
    const {
      jobTitle,
      employmentType,
      employer,
      country,
      startDate,
      endDate,
      shortDescription,
      onSubmitAddExperienceForm,
      history,
    } = this.props;
    const { selectedFile, experienceModalType, selectedExperienceID, currentlyWork, image } = this.state;

    const data = {
      jobTitle,
      employmentType: employmentType.value,
      employer: employer.label.split(',')[0],
      country: country.value,
      startDate: moment(startDate).format('DD/MM/YYYY'),
      endDate: currentlyWork ? moment(new Date()).format('DD/MM/YYYY') : moment(endDate).format('DD/MM/YYYY'),
      shortDescription,
      companyLogo: !selectedFile ? image : selectedFile,
      isPresent: currentlyWork,
    };

    if (experienceModalType === 'edit') {
      // eslint-disable-next-line no-underscore-dangle
      data._id = selectedExperienceID;
    }

    onSubmitAddExperienceForm(e, experienceModalType, data, () => {
      getUserDetails(history)
        .then(res => {
          this.setState({ showAddExperienceModal: false });
          this.fetchFieldValues(res, false);
        })
        .catch(() => {
          history.push(TALENT_SIGNUP_PAGE_URL);
          toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
        });
    });
  };

  fetchFieldValues = (response, redirection) => {
    const { history, location } = this.props;
    if (get(response, 'status')) {
      storeApiSignupStep(get(response, 'data.signupStep'));
      if (redirection) {
        const currentSignupStep = get(response, 'data.signupStep') + 1;
        redirectToPage(history, location.redirection, currentSignupStep, 3);
      }
      this.setState({ experienceList: get(response, 'data.workExperience', []), image: '' });
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

  deleteRecord = id => {
    const { history } = this.props;
    const data = {
      method: 'DELETE',
      body: { _id: id },
    };
    const requestURL = `${API_URL}${VERSION2}${TALENT}${WORK_EXPERIENCE_EDIT_API}`;
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

  handleCurrentEndDate = event => {
    this.setState({ currentlyWork: event.target.checked });
  };

  render() {
    const {
      handleSubmit,
      loading,
      responseSuccess,
      responseError,
      invalid,
      jobTitle,
      employmentType,
      employer,
      country,
      startDate,
      endDate,
      shortDescription,
      onChangeStartDate,
      onChangeEndDate,
      onChangeCountry,
      onChangeRole,
      onChangeEmploymentType,
      onChangeShortDescription,
    } = this.props;
    const { companyOptions, showAddExperienceModal, image, experienceList, experienceModalType, currentlyWork } = this.state;
    const formValid = experienceList.length > 0;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <>
          <H1 className="mb-3">
            <FormattedMessage {...messages.headingExperience} />
          </H1>
          <P className="p16 mb-5" opacityVal="0.5">
            <FormattedMessage {...messages.experienceTagLine} />
          </P>
          <UserInfoList>
            {experienceList.map(item => (
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
                          {moment(item.startDate).format('DD/MM/YYYY')} - {moment(item.endDate).format('DD/MM/YYYY')}
                        </P>
                        <P className="p16 mb-2">
                          {item.jobTitle} {item.employmentType && <> - {getLabel(item.employmentType, employmentTypeList, 'name')} </>}
                        </P>
                        <P className="p14 mb-3" opacityVal="0.5">
                          {item.employer} {item.country && <>, {item.country} </>}
                        </P>
                        <P className="p14 mb-0 description-text" opacityVal="0.5" lineHeight="22">
                          {item.shortDescription}
                        </P>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-action">
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  <Button className="btn-icon btn-link ms-auto" onClick={() => this.deleteRecord(item._id)}>
                    <SVG src={trashIcon} className="me-1" />
                    Delete
                  </Button>
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  <Button className="btn-icon btn-link ms-auto" onClick={() => this.handleExperienceOpenModal('edit', item._id)}>
                    <SVG src={editNoteIcon} className="me-1" />
                    Edit
                  </Button>
                </div>
              </li>
            ))}
            <li>
              <Button className="btn-icon text-primary btn-link ms-auto" onClick={() => this.handleExperienceOpenModal('add')}>
                <SVG src={plusSquareIcon} className="me-1" />
                {messages.labelAdd.defaultMessage}
              </Button>
            </li>
          </UserInfoList>
          <WorkExperienceFooter {...this.props} formValid={formValid} handleSaveForLater={this.handleSaveForLater} />
          <ModalWrapper
            loading={loading}
            responseSuccess={responseSuccess}
            responseError={responseError}
            disabled={invalid || !image}
            isOpen={showAddExperienceModal}
            onDiscard={this.handleExperienceCloseModal}
            onHandleSubmit={handleSubmit(this.handleSubmitExperienceForm)}
            title={`${experienceModalType === 'add' ? 'Add' : 'Edit'} experience`}
            primaryBtnText="Save"
          >
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...componentMessage.labelStartDate} />
                    </FormLabel>
                    <Field
                      name="startDate"
                      component={DatePickers}
                      showYearDropDown
                      yearDropdownItemNumber={5}
                      scrollableYearDropdown
                      placeholder={containerMessage.placeholderDate.defaultMessage}
                      maxDate={new Date()}
                      selected={startDate}
                      defaultValue={startDate}
                      onChange={onChangeStartDate}
                      placement="bottom-start"
                      withIcon
                      validate={[formValidations.requiredDate]}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...componentMessage.labelEndDate} />
                    </FormLabel>
                    {!currentlyWork && (
                      <Field
                        name="endDate"
                        component={DatePickers}
                        showYearDropDown
                        yearDropdownItemNumber={5}
                        scrollableYearDropdown
                        placeholder={containerMessage.placeholderDate.defaultMessage}
                        maxDate={new Date()}
                        minDate={moment(startDate).toDate()}
                        selected={endDate}
                        defaultValue={endDate}
                        onChange={onChangeEndDate}
                        placement="bottom-start"
                        withIcon
                        validate={[formValidations.requiredDate]}
                      />
                    )}
                    {currentlyWork && (
                      <P className="p16 mb-0 present-text d-flex align-items-center">
                        {componentMessage.endDateCurrentWork.defaultMessage}
                      </P>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Field
                      name="currentlyWork"
                      type="checkbox"
                      component={renderFieldoptCheckbox}
                      message={componentMessage.workExperienceCurrentWork.defaultMessage}
                      value={currentlyWork}
                      onChange={e => this.handleCurrentEndDate(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...componentMessage.labelEmployer} />
                    </FormLabel>
                    <Field
                      name="employer"
                      type="text"
                      component={AsyncSelects}
                      defaultValue={employer}
                      cacheOptions={false}
                      loadOptions={this.loadCompanyOptions}
                      defaultOptions={companyOptions}
                      handleChange={this.handleCompanyChange}
                      placeHolder={componentMessage.placeholderEmployer.defaultMessage}
                      validate={[formValidations.requiredSelect]}
                      creatable
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...componentMessage.labelCountry} />
                    </FormLabel>
                    <Field
                      name="country"
                      component={Selects}
                      placeholder={componentMessage.placeholderCountry.defaultMessage}
                      defaultValue={country}
                      onChange={onChangeCountry}
                      options={countryData.map(c => ({
                        label: c.name,
                        value: c.name,
                      }))}
                      validate={[formValidations.requiredSelect]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormLabel>Employer logo</FormLabel>
              <FormGroup>
                <div id="dropZone">{getPictureDropZone(this, 'logoUploader')}</div>
              </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...componentMessage.labelJobTitle} />
                    </FormLabel>
                    <Field
                      name="jobTitle"
                      component={renderField}
                      type="text"
                      defaultValue={jobTitle}
                      placeholder={componentMessage.placeholderJobTitle.defaultMessage}
                      onChange={onChangeRole}
                      validate={[formValidations.required, formValidations.minLength2, formValidations.maxLength30]}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...componentMessage.labelEmpType} />
                    </FormLabel>
                    <Field
                      name="employmentType"
                      type="text"
                      component={Selects}
                      defaultValue={employmentType}
                      searchable={false}
                      options={employmentTypeList.map(item => ({
                        label: item.name,
                        value: item.value,
                      }))}
                      onChange={onChangeEmploymentType}
                      placeHolder={componentMessage.placeholderEmpType.defaultMessage}
                      validate={[formValidations.requiredSelect]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <FormLabel>
                  <FormattedMessage {...componentMessage.labelShortDesc} />
                </FormLabel>
                <Field
                  name="shortDescription"
                  defaultValue={shortDescription}
                  component={renderTextAreaForm}
                  rows={3}
                  placeholder="Description"
                  validate={[formValidations.required, formValidations.minLength2, formValidations.maxLength1000]}
                  onChange={onChangeShortDescription}
                />
              </FormGroup>
            </form>
          </ModalWrapper>
        </>
      </React.Fragment>
    );
  }
}

WorkExperience.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  experiences: selectors.makeSelectExperiences(),
  loading: makeSelectLoading(),
  jobTitle: selectors.makeSelectJobTitle(),
  employmentType: selectors.makeSelectEmploymentType(),
  employer: selectors.makeSelectEmployer(),
  country: selectors.makeSelectCountry(),
  startDate: selectors.makeSelectStartDate(),
  endDate: selectors.makeSelectEndDate(),
  shortDescription: selectors.makeSelectShortDescription(),
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeExperience: data => dispatch(actions.changeExperience(data)),
    onSaveForLater: () => dispatch(actions.saveForLater('saveForLater')),

    onChangeStartDate: value => dispatch(actions.changeStartDate(value)),
    onChangeEndDate: value => dispatch(actions.changeEndDate(value)),
    onChangeEmployer: evt => dispatch(actions.changeEmployer(evt)),
    onChangeCountry: evt => dispatch(actions.changeCountry(evt)),
    onChangeRole: evt => dispatch(actions.changeRole(evt.target.value)),
    onChangeEmploymentType: evt => dispatch(actions.changeEmploymentType(evt)),
    onChangeShortDescription: evt => dispatch(actions.changeShortDescription(evt.target.value)),

    onSubmitAddExperienceForm: (evt, type, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.addExperience(type, data, onSuccess));
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
)(WorkExperience);
