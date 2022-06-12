/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormGroup, Row, Col } from 'reactstrap';
import ReactModal from 'react-modal';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import SVG from 'react-inlinesvg';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import { toast } from 'react-toastify';
import { VALIDATION } from 'utils/constants';
import history from 'utils/history';
import request from 'utils/request';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from 'containers/App/actions';
import StorageService from 'utils/StorageService';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import { A, FormLabel, H2, ToastifyMessage, Button, P } from 'components';
import ToolTip from 'components/ToolTip';
import AsyncSelects from 'components/AsyncSelects';
import * as formValidations from 'utils/formValidations';
import * as normalize from 'utils/normalize';
import {
  newTabIcon,
  tickIcon,
  API_URL,
  CLIENT,
  PROJECT_API,
  LIST,
  plusSquareIcon,
  plusIcon,
  editNoteIcon,
  SEARCH_BY_NAME,
  roles,
  teamPreferenceArray,
  assignmentArray,
  employmentTypeArray,
  workPreferenceArray,
  yearsOfExperienceArray,
  closeIcon,
  timeXZone,
  languageData,
  currencyData,
  discProfileArray,
  teamWorkingArray,
  DISC_PROFILE_URL,
} from 'containers/App/constants';
import { getSkills, getCertificationsList, getIndustryList } from 'containers/Auth/utils';
import { CombinedFields } from 'containers/Auth/PersonalDetails/style';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { renderField, renderSelectTags, renderTextAreaForm } from 'utils/Fields';
import Selects from 'components/Selects';
import containerMessage from 'containers/messages';
import { propTypes } from 'containers/proptypes';
import adminMessages from 'containers/Client/ProjectDetailPage/messages';
import { ActionIcon } from 'containers/MyProfilePage/styles';
import { processData, getStepperClass } from './utils';
import * as selectors from './selectors';
import saga from './saga';
import * as actions from './actions';
import messages from './messages';
import { key, JobPostSteps } from './constants';
import { Stepper } from './styles';

export class AddBrief extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBriefModal: false,
      briefID: '',
      projectOptions: [],
      projectsData: [],
      clientOptions: [],
      skillsList: [],
      certificationsList: [],
      industryList: [],
      addBriefFilters: {
        teamPrefArray: [],
        workPrefArray: [],
        assignmentsArray: [],
      },
      currentStep: 1,
    };
    this.debouncedGetOptions = debounce(this.getProjectOptions, 500);
    this.debouncedGetClientOptions = debounce(this.getClientOptions, 500);
  }

  setSkills = response => {
    if (get(response, 'status')) {
      this.setState({ skillsList: response.data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  setCertifications = (response, cb) => {
    if (get(response, 'status')) {
      this.setState({ certificationsList: response.data }, cb);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      cb();
    }
  };

  setIndustries = (response, cb) => {
    if (get(response, 'status')) {
      this.setState({ industryList: response.data }, cb);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      cb();
    }
  };

  handleCheckboxFilterChange = (name, checked, type) => {
    const {
      addBriefFilters,
      addBriefFilters: { [type]: filterType },
    } = this.state;

    let newFilter = filterType;
    if (checked) {
      newFilter.push(name);
      newFilter = newFilter.filter(value => value !== 'all');
    } else {
      newFilter = newFilter.filter(value => value !== name);
    }
    const newFilters = addBriefFilters;
    newFilters[type] = newFilter;

    this.setState({ addBriefFilters });
  };

  // project Name fetch
  fetchProject = async value => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${CLIENT}${PROJECT_API}${LIST}?q=${value}`;
    return request(requestURL, data);
  };

  // client Name fetch
  fetchClients = async value => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${CLIENT}${SEARCH_BY_NAME}?q=${value}`;
    return request(requestURL, data);
  };

  getProjectOptions = (inputValue, cb) => {
    const clientProjectData = this.fetchProject(inputValue);
    clientProjectData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const projectOptions = processData(data);
          this.setState({ projectOptions, projectsData: data });
          cb(projectOptions);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  getClientOptions = (inputValue, cb) => {
    const clientsData = this.fetchClients(inputValue);
    clientsData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const clientOptions = processData(data);
          this.setState({ clientOptions });
          cb(clientOptions);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  loadProjectOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedGetOptions(inputValue, callback);
    }
  };

  loadClientOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedGetClientOptions(inputValue, callback);
    }
  };

  handleProjectNameChange = option => {
    const { dispatch } = this.props;
    const { projectOptions = [], projectsData } = this.state;

    const projectIdValue = option.value;
    const projectIndex = projectOptions.findIndex(item => item.value === projectIdValue);
    const projectData = projectsData[projectIndex];
    const richTextSummary = get(projectData, 'description', '');

    dispatch(change(key, 'briefProjectName', option));
    dispatch(change(key, 'briefProjectDescription', richTextSummary));
  };

  handleClientChange = option => {
    const { dispatch } = this.props;
    dispatch(change(key, 'briefClientName', option));
  };

  renderFetchClient = briefClientName => {
    const { clientOptions } = this.state;
    return (
      <FormGroup>
        <FormLabel>
          <FormattedMessage {...containerMessage.labelClientNamePlaceHolder} />
        </FormLabel>
        <Field
          name="briefClientName"
          type="text"
          component={AsyncSelects}
          defaultValue={briefClientName}
          cacheOptions
          loadOptions={this.loadClientOptions}
          defaultOptions={clientOptions}
          handleChange={this.handleClientChange}
          placeHolder={containerMessage.labelClientNamePlaceHolder.defaultMessage}
          validate={[formValidations.requiredSelect]}
          creatable
        />
      </FormGroup>
    );
  };

  renderProjectName = briefProjectName => {
    const { projectOptions } = this.state;
    return (
      <Col md="6">
        <FormGroup>
          <FormLabel>
            <FormattedMessage {...containerMessage.labelProjectName} />
          </FormLabel>
          <Field
            name="briefProjectName"
            type="text"
            component={AsyncSelects}
            defaultValue={briefProjectName}
            cacheOptions
            loadOptions={this.loadProjectOptions}
            defaultOptions={projectOptions}
            handleChange={this.handleProjectNameChange}
            placeHolder={containerMessage.placeholderProjectName.defaultMessage}
            validate={[formValidations.requiredSelect]}
            creatable
          />
        </FormGroup>
      </Col>
    );
  };

  renderTeamSize = briefTeamPreference => (
    <Col md="6">
      <FormGroup>
        <FormLabel>
          <FormattedMessage {...containerMessage.subHeadingTeam} />
        </FormLabel>
        <Field
          name="briefTeamPreference"
          component={Selects}
          defaultValue={briefTeamPreference}
          searchable={false}
          options={teamPreferenceArray.map(item => ({
            label: item.label,
            value: item.value,
          }))}
          placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
          validate={[formValidations.requiredSelect]}
        />
      </FormGroup>
    </Col>
  );

  renderProjectDesciption = briefProjectDescription => (
    <>
      <FormGroup>
        <FormLabel>
          <FormattedMessage {...containerMessage.placeholderProjectSummary} />
        </FormLabel>
        <Field
          name="briefProjectDescription"
          defaultValue={briefProjectDescription}
          component={renderTextAreaForm}
          rows={3}
          placeholder="Short description about your project"
          validate={[formValidations.required, formValidations.minLength100, formValidations.maxLength1500]}
        />
      </FormGroup>
    </>
  );

  renderJobTitle = briefTitle => (
    <>
      <FormGroup>
        <FormLabel>
          <FormattedMessage {...containerMessage.labelJobTitle} />
        </FormLabel>
        <Field
          name="briefTitle"
          type="text"
          component={renderField}
          placeholder={containerMessage.labelJobTitle.defaultMessage}
          value={briefTitle}
          validate={[formValidations.requiredField, formValidations.minLength2, formValidations.maxLength70]}
        />
      </FormGroup>
    </>
  );

  renderRoleForm = () => {
    const {
      isAdmin,
      type,
      briefProjectName,
      briefProjectDescription,
      briefTitle,
      briefRole,
      briefDescription,
      briefExpertiseLevel,
      briefClientName,
      briefTeamPreference,
      isProjectDetails = false,
    } = this.props;

    return (
      <React.Fragment>
        {this.renderJobTitle(briefTitle)}
        {isAdmin && type === 'add' && !isProjectDetails && this.renderFetchClient(briefClientName)}
        <Row>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.subProjectRolesBrief} />
              </FormLabel>
              <Field
                name="briefRole"
                type="text"
                component={Selects}
                defaultValue={briefRole}
                searchable={false}
                options={roles.map(item => ({
                  label: `${item.name}`,
                  value: item.value,
                }))}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                validate={[formValidations.requiredSelect]}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...adminMessages.labelExperienceLevel} />
              </FormLabel>
              <Field
                name="briefExpertiseLevel"
                component={Selects}
                defaultValue={briefExpertiseLevel}
                searchable={false}
                options={yearsOfExperienceArray.map(item => ({
                  label: `${item.name}`,
                  value: item.value,
                }))}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                validate={[formValidations.requiredSelect]}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <FormLabel>
            <FormattedMessage {...containerMessage.labelJobDescription} />
          </FormLabel>
          <Field
            name="briefDescription"
            defaultValue={briefDescription}
            component={renderTextAreaForm}
            rows={3}
            placeholder="Short description about your job"
            validate={[formValidations.required, formValidations.minLength2, formValidations.maxLength5000]}
          />
        </FormGroup>
        <Row>
          {type === 'add' && !isProjectDetails && this.renderProjectName(briefProjectName)}
          {this.renderTeamSize(briefTeamPreference)}
        </Row>
        {type === 'add' && !isProjectDetails && this.renderProjectDesciption(briefProjectDescription)}
      </React.Fragment>
    );
  };

  renderPreferredCandidateForm = () => {
    const {
      briefHardSkills,
      briefSoftSkills,
      briefCertifications,
      briefIndustry,
      briefTeamWorking,
      briefDiscProfile,
      briefLanguages,
    } = this.props;
    const { skillsList, certificationsList, industryList } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel className="d-inline-flex align-items-center">
                <FormattedMessage {...messages.labelHardSkills} />
                <P className="p14 ms-1 mb-0" opacityVal="0.5">
                  <FormattedMessage {...messages.selectUpto7} />
                </P>
              </FormLabel>
              <Field
                name="briefHardSkills"
                optionLimit="7"
                component={renderSelectTags}
                value={briefHardSkills}
                options={skillsList.map((v, i) => ({ label: skillsList[i], value: skillsList[i] }))}
                isMulti
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                validate={[formValidations.ratingCount]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel className="d-inline-flex align-items-center">
                <FormattedMessage {...messages.labelSoftSkills} />
                <P className="p14 ms-1 mb-0" opacityVal="0.5">
                  <FormattedMessage {...messages.selectUpto3} />
                </P>
              </FormLabel>
              <Field
                name="briefSoftSkills"
                optionLimit="3"
                component={renderSelectTags}
                value={briefSoftSkills}
                options={skillsList.map((v, i) => ({ label: skillsList[i], value: skillsList[i] }))}
                isMulti
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                validate={[formValidations.ratingCount]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel className="d-inline-flex align-items-center">
                <FormattedMessage {...containerMessage.labelCertifications} />
                <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                  <FormattedMessage {...containerMessage.optionalText} />
                </P>
              </FormLabel>
              <Field
                name="briefCertifications"
                component={renderSelectTags}
                value={briefCertifications}
                options={certificationsList.map((v, i) => ({ label: certificationsList[i], value: certificationsList[i] }))}
                isMulti
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelSpokenLanguages} />
              </FormLabel>
              <Field
                name="briefLanguages"
                component={renderSelectTags}
                value={briefLanguages}
                onChange={this.handleSelectChangeTags}
                options={languageData.map(l => ({
                  label: l.language,
                  value: l.code,
                }))}
                isMulti
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelIndustryBG} />
              </FormLabel>
              <Field
                name="briefIndustry"
                component={Selects}
                defaultValue={briefIndustry}
                searchable
                options={industryList.map(item => ({
                  label: item,
                  value: item,
                }))}
                validate={[formValidations.requiredSelect]}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <FormLabel className="d-inline-flex align-items-center">
                <FormattedMessage {...containerMessage.labelDISCProfile} />
                <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                  <FormattedMessage {...containerMessage.optionalText} />
                </P>
                <A className="target-link ms-2" href={DISC_PROFILE_URL} target="_blank">
                  <SVG src={newTabIcon} />
                </A>
              </FormLabel>
              <Field
                name="briefDiscProfile"
                component={Selects}
                defaultValue={briefDiscProfile}
                searchable={false}
                options={discProfileArray.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel>Team working style</FormLabel>
              <Field
                name="briefTeamWorking"
                component={Selects}
                defaultValue={briefTeamWorking}
                searchable={false}
                options={teamWorkingArray.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                validate={[formValidations.requiredSelect]}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  renderEngagementForm = () => {
    const {
      briefDuration,
      briefContractType = {},
      briefWorkSchedule,
      briefAssignment,
      briefTimeZone,
      briefRatePerHour,
      briefAnnualRate,
      briefCurrency,
      briefAnnualCurrency,
    } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelContractType} />
              </FormLabel>
              <Field
                name="briefContractType"
                component={Selects}
                defaultValue={briefContractType}
                searchable={false}
                options={employmentTypeArray.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                onChange={() => this.handleBriefContractType()}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                validate={[formValidations.requiredSelect]}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelWorkSchedule} />
              </FormLabel>
              <Field
                name="briefWorkSchedule"
                component={renderSelectTags}
                value={briefWorkSchedule}
                onChange={this.handleWorkScheduleChangeTags}
                options={workPreferenceArray.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                isMulti
                closeMenuOnSelect={false}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                validate={[formValidations.requiredField, formValidations.requiredArray]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <FormLabel className="d-inline-flex align-items-center">
                <FormattedMessage {...adminMessages.labelMinDuration} />
                <P className="p14 ms-1 mb-0" opacityVal="0.5">
                  <FormattedMessage {...adminMessages.labelInMonths} />
                </P>
              </FormLabel>
              <Field
                name="briefDuration"
                type="number"
                component={renderField}
                placeholder="e.g. 3"
                value={briefDuration}
                normalize={normalize.trimSpace}
                validate={[formValidations.positiveInteger, formValidations.maxLength3]}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.subHeadingAssignment} />
              </FormLabel>
              <Field
                name="briefAssignment"
                component={Selects}
                defaultValue={briefAssignment}
                searchable={false}
                options={assignmentArray.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                validate={[formValidations.requiredSelect]}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <FormLabel>Preferred timezone</FormLabel>
          <Field
            name="briefTimeZone"
            component={Selects}
            defaultValue={briefTimeZone}
            options={timeXZone.map(t => ({
              label: `(${t.offset}) ${t.name}`,
              value: t.name,
            }))}
            placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
            validate={[formValidations.requiredSelect]}
          />
        </FormGroup>
        <Row>
          <Col md="6">
            <FormGroup>
              <FormLabel className="d-flex">
                {briefContractType.value === 'freelancer-consultant' ? (
                  <>
                    <FormattedMessage {...messages.labelDayRates} />
                    <ToolTip wrapperClass="ms-2" placement="right" content={messages.hourlyTooltip.defaultMessage} />
                  </>
                ) : (
                  <>
                    <FormattedMessage {...messages.labelBaseSalary} />
                    <ToolTip wrapperClass="ms-2" placement="right" tooltipId="infoTooltip" content={messages.basetToltip.defaultMessage} />
                  </>
                )}
              </FormLabel>
              {briefContractType.value === 'freelancer-consultant' && (
                <CombinedFields className="d-flex">
                  <Field
                    className="newSelectStyle"
                    name="briefCurrency"
                    component={Selects}
                    defaultValue={briefCurrency}
                    searchable={false}
                    options={currencyData.map(item => ({
                      label: item.symbol,
                      value: item.code,
                    }))}
                    validate={[formValidations.requiredSelect]}
                  />
                  <Field
                    name="briefRatePerHour"
                    type="text"
                    component={renderField}
                    placeholder="00.00"
                    value={briefRatePerHour}
                    validate={[formValidations.requiredField]}
                  />
                </CombinedFields>
              )}
              {briefContractType.value === 'permanent-employee' && (
                <CombinedFields className="d-flex">
                  <Field
                    className="newSelectStyle"
                    name="briefAnnualCurrency"
                    component={Selects}
                    defaultValue={briefAnnualCurrency}
                    searchable={false}
                    options={currencyData.map(item => ({
                      label: item.symbol,
                      value: item.code,
                    }))}
                    validate={[formValidations.requiredSelect]}
                  />

                  <Field
                    name="briefAnnualRate"
                    type="text"
                    component={renderField}
                    placeholder="00.00"
                    value={briefAnnualRate}
                    validate={[formValidations.requiredField]}
                  />
                </CombinedFields>
              )}
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  goBackToPrevStep = currentStep => {
    this.setState({ currentStep: currentStep - 1 });
  };

  renderBriefPopup = () => {
    const { showSearchTalentPopup, showBriefModal, currentStep } = this.state;
    const { type, handleSubmit, loading, invalid, responseSuccess, responseError } = this.props;
    const title = type === 'add' ? containerMessage.addBriefPopupTitle.defaultMessage : containerMessage.editBriefPopupTitle.defaultMessage;
    return (
      <ReactModal
        isOpen={showBriefModal}
        contentLabel="crop"
        onRequestClose={this.handleAddBriefCloseModal}
        className="modal-dialog"
        style={{ overlay: { zIndex: 12 } }}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
        ariaModal
      >
        <div className="modal-content">
          <div className="modal-header pb-0">
            <button type="button" className="modal-dismiss ms-auto" onClick={this.handleAddBriefCloseModal}>
              <img src={closeIcon} alt="close" />
              <span className="visually-hidden">Close</span>
            </button>
          </div>
          <>
            {!showSearchTalentPopup ? (
              <div className="modal-body pt-0">
                <H2 className="text-center">{title}</H2>
                <Stepper className="mb-4">
                  {JobPostSteps.map((name, index) => (
                    <li className={getStepperClass(currentStep, index)}>
                      <span className="line">
                        <SVG src={tickIcon} />
                      </span>
                      {name}
                    </li>
                  ))}
                </Stepper>
                {currentStep === 1 && <form onSubmit={handleSubmit}>{this.renderRoleForm()}</form>}
                {currentStep === 2 && <form onSubmit={handleSubmit}>{this.renderPreferredCandidateForm()}</form>}
                {currentStep === 3 && <form onSubmit={handleSubmit}>{this.renderEngagementForm()}</form>}
              </div>
            ) : (
              <div className="modal-body pt-0 d-flex align-items-center">{this.searchTalentPopup()}</div>
            )}
          </>
          {!showSearchTalentPopup && (
            <div className="modal-footer modal-footer justify-content-between">
              {(currentStep === 2 || currentStep === 3) && (
                <Button
                  className="btn btn-outline btn-sm btn-link me-4 h-auto"
                  type="button"
                  onClick={() => this.goBackToPrevStep(currentStep)}
                >
                  <FormattedMessage {...containerMessage.backButton} />
                </Button>
              )}
              {currentStep === 1 && (
                <Button
                  className={`${loading ? 'loading' : ''} ${getBtnClass(
                    loading,
                    responseSuccess,
                    responseError,
                  )} btn-primary ms-auto btn-sm`}
                  type="button"
                  disabled={invalid}
                  onClick={handleSubmit(e => {
                    this.handleRoleFormSubmit(e);
                  })}
                >
                  <FormattedMessage {...containerMessage.continueButton} />
                </Button>
              )}
              {currentStep === 2 && (
                <Button
                  className={`${loading ? 'loading' : ''} ${getBtnClass(
                    loading,
                    responseSuccess,
                    responseError,
                  )} btn-primary ms-auto btn-sm`}
                  type="button"
                  disabled={invalid}
                  onClick={handleSubmit(e => {
                    this.handlePreferredCandidateFormSubmit(e);
                  })}
                >
                  <FormattedMessage {...containerMessage.continueButton} />
                </Button>
              )}
              {currentStep === 3 && (
                <Button
                  className={`${loading ? 'loading' : ''} ${getBtnClass(loading, responseSuccess, responseError)} btn-primary btn-sm`}
                  type="button"
                  disabled={invalid}
                  onClick={handleSubmit(e => {
                    this.handleEngagementFormSubmit(e);
                  })}
                >
                  <FormattedMessage {...messages.btnPostJobViewMatches} />
                </Button>
              )}
            </div>
          )}
        </div>
      </ReactModal>
    );
  };

  handleBriefContractType = () => {
    const { dispatch } = this.props;
    dispatch(change(key, 'briefAnnualRate', ''));
    dispatch(change(key, 'briefRatePerHour', ''));
  };

  handleAddBriefOpenModal = () => {
    const {
      dispatch,
      type,
      isProjectDetails,
      projectName,
      projectDescription,
      title,
      role,
      description,
      expertiseLevel,
      duration,

      workPreference,
      teamPreference,
      assignments,
      clientName,
      briefID = '',
      hardSkills,
      softSkills,
      certifications,
      industry,
      teamWorking,
      discProfile,
      timeZone,
      ratePerHour,
      annualRate,
      currency,
      languages,
    } = this.props;
    let filters = {};

    let data = {};
    getSkills(this.setSkills);
    getCertificationsList(this.setCertifications);
    getIndustryList(this.setIndustries);

    if (type === 'add') {
      data = {
        briefProjectName: '',
        briefProjectDescription: '',
        briefTitle: '',
        briefRole: '',
        briefDescription: '',
        briefExpertiseLevel: '',
        briefDuration: '',
        briefTeamPreference: '',
        briefAssignment: '',
        briefClientName: '',
        briefHardSkills: '',
        briefSoftSkills: '',
        briefCertifications: '',
        briefIndustry: '',
        briefTeamWorking: teamWorkingArray.find(i => i.value === 'Team Player') || [],
        briefDiscProfile: '',
        briefTimeZone: '',
        briefRatePerHour: '',
        briefAnnualRate: '',
        briefCurrency: { label: '$', value: 'USD' },
        briefAnnualCurrency: { label: '$', value: 'USD' },
        briefLanguages: [languageData.find(i => i.code === 'en')] || [],
        briefContractType: employmentTypeArray.find(i => i.value === 'freelancer-consultant') || [],
      };
      if (isProjectDetails) {
        data.briefProjectName = projectName;
        data.briefProjectDescription = projectDescription;
        data.briefClientName = clientName;
      }

      filters = {
        teamPrefArray: [],
        workPrefArray: [],
        assignmentsArray: [],
      };
    } else if (type === 'edit' || isProjectDetails) {
      const teamPreferenceObject = teamPreference.map(v => ({ label: v, value: v }));
      const assignmentsObject = assignments.map(v => ({ label: v, value: v }));
      const hardSkillsObject = (hardSkills && hardSkills.map(v => ({ label: v, value: v }))) || [];
      const softSkillsObject = (softSkills && softSkills.map(v => ({ label: v, value: v }))) || [];
      const certificationsObject = (certifications && certifications.map(v => ({ label: v, value: v }))) || [];
      const languagesObject = (languages && languages.map(v => ({ label: v, value: v }))) || [];
      const formater = v => ({ label: v, value: v });
      data = {
        briefProjectName: projectName,
        briefProjectDescription: projectDescription,
        briefTitle: title,
        briefRole: role,
        briefDescription: description,
        briefExpertiseLevel: expertiseLevel,
        briefDuration: duration,
        briefTeamPreference: teamPreferenceObject[0],
        briefAssignment: assignmentsObject[0],
        briefHardSkills: hardSkillsObject,
        briefSoftSkills: softSkillsObject,
        briefCertifications: certificationsObject,
        briefIndustry: formater(industry),
        briefTeamWorking: formater(teamWorking),
        briefDiscProfile: formater(discProfile),
        briefTimeZone: formater(timeZone),
        briefCurrency: formater(currency),
        briefAnnualCurrency: formater(currency),
        briefRatePerHour: ratePerHour,
        briefAnnualRate: annualRate,
        briefLanguages: languagesObject,
      };
      filters = {
        teamPrefArray: teamPreference,
        workPrefArray: workPreference,
        assignmentsArray: assignments,
      };
    }

    Object.keys(data).forEach(fieldKey => {
      dispatch(change(key, fieldKey, data[fieldKey]));
      dispatch(untouch(key, fieldKey));
    });

    this.setState({ addBriefFilters: filters, showBriefModal: true, briefID });
  };

  handleAddBriefCloseModal = () =>
    this.setState({
      showBriefModal: false,
      briefTitle: '',
      showSearchTalentPopup: false,
      currentStep: 1,
    });

  handleRoleFormSubmit = e => {
    const {
      briefTitle: name,
      briefClientName,
      briefRole,
      briefExpertiseLevel,
      briefDescription,
      briefProjectName,
      briefTeamPreference,
      briefProjectDescription,
      onSubmitRoleForm,
      isAdmin,
      type,
    } = this.props;
    const { briefID } = this.state;
    const role = get(briefRole, 'value');

    const expertise = get(briefExpertiseLevel, 'value');

    const data = {
      name,
      role,
      expertise,
      description: briefDescription,
      projectName: get(briefProjectName, 'label', ''),
      teamPreference: [get(briefTeamPreference, 'value', '')],
      projectDescription: briefProjectDescription,
      projectId: get(briefProjectName, 'value', ''),
    };

    if (isAdmin) {
      data.clientId = get(briefClientName, 'value');
    }

    if (type === 'edit') {
      data.id = briefID;
    }
    onSubmitRoleForm(e, type, data, this.briefModalSuccess);
  };

  handlePreferredCandidateFormSubmit = e => {
    const {
      briefHardSkills,
      briefSoftSkills,
      briefCertifications,
      briefLanguages,
      briefIndustry,
      briefDiscProfile,
      briefTeamWorking,
      onSubmitPreferredCandidateForm,
      type,
    } = this.props;
    const { newBriefID } = this.state;
    const hardSkills = [];
    const softSkills = [];
    const certifications = [];
    const languages = [];
    briefHardSkills.forEach(hardSkill => hardSkills.push(get(hardSkill, 'value')));
    briefSoftSkills.forEach(softSkill => softSkills.push(get(softSkill, 'value')));
    if (briefCertifications) {
      briefCertifications.forEach(certification => certifications.push(get(certification, 'value')));
    }
    briefLanguages.forEach(language => languages.push(get(language, 'label')));
    const data = {
      hardSkills,
      softSkills,
      certifications,
      languages,
      industry: get(briefIndustry, 'value'),
      discProfile: get(briefDiscProfile, 'value') || '',
      teamWorking: get(briefTeamWorking, 'value'),
      id: newBriefID,
    };
    onSubmitPreferredCandidateForm(e, type, data, this.briefModalSuccess);
  };

  handleEngagementFormSubmit = e => {
    const {
      briefContractType,
      briefWorkSchedule = [],
      briefDuration,
      briefAssignment,
      briefTimeZone,
      briefRatePerHour,
      briefAnnualRate,
      briefCurrency,
      briefAnnualCurrency,
      onSubmitEngagementForm,
      type,
    } = this.props;
    const { newBriefID } = this.state;
    const duration = parseInt(briefDuration, 10);
    const workPreference = [];
    briefWorkSchedule.forEach(i => workPreference.push(get(i, 'value')));
    const data = {
      employmentType: get(briefContractType, 'value'),
      workPreference,
      duration,
      assignments: [get(briefAssignment, 'value', '')],
      timeZone: get(briefTimeZone, 'value'),
      currency: get(briefCurrency, 'value'),
      currencyAnnualRate: get(briefAnnualCurrency, 'value'),
      ratePerHour: briefRatePerHour || '',
      annualRate: briefAnnualRate || '',
      id: newBriefID,
    };
    onSubmitEngagementForm(e, type, data, this.briefModalSuccess);
  };

  briefModalSuccess = response => {
    const { loadDetails, isAdmin, isProjectDetails = false, type, isClientHeader } = this.props;
    const { currentStep } = this.state;

    // change content of addBrief Modal
    if (isAdmin || isProjectDetails) {
      if (currentStep === 1) {
        if (type === 'add') {
          // eslint-disable-next-line no-underscore-dangle
          this.setState({ currentStep: 2, newBriefID: response.data._id, showSearchTalentPopup: false });
        } else {
          // eslint-disable-next-line no-underscore-dangle
          this.setState({ currentStep: 2, newBriefID: response.data._id, showSearchTalentPopup: false }, () => {
            this.handleAddBriefOpenModal();
          });
        }
      }
      if (currentStep === 2) {
        // eslint-disable-next-line no-underscore-dangle
        this.setState({ currentStep: 3, newBriefID: response.data._id, showSearchTalentPopup: false });
      }
      if (currentStep === 3) {
        this.setState({ currentStep: 1, showBriefModal: false, briefTitle: '', showSearchTalentPopup: false }, () => {
          loadDetails();
        });
      }
    } else {
      if (currentStep === 1) {
        // eslint-disable-next-line no-underscore-dangle
        this.setState({ currentStep: 2, newBriefID: response.data._id, showSearchTalentPopup: false });
      }
      if (currentStep === 2) {
        // eslint-disable-next-line no-underscore-dangle
        this.setState({ currentStep: 3, newBriefID: response.data._id, showSearchTalentPopup: false });
      }
      if (currentStep === 3) {
        this.setState({ currentStep: 1, showBriefModal: true, briefTitle: '', showSearchTalentPopup: true }, () => {
          if (!isClientHeader) {
            loadDetails();
          }
        });
      }
    }
  };

  handleSearchTalent = () => {
    const {
      addBriefFilters: { teamPrefArray, workPrefArray, assignmentsArray },
    } = this.state;
    const { briefHardSkills, briefExpertiseLevel, briefRole } = this.props;
    const pathname = '/client/talent-listing';

    let filterObject = {};
    StorageService.set('filterObject', JSON.stringify(filterObject));
    filterObject = {
      role: briefRole.value,
      yearsOfExperience: [briefExpertiseLevel.value],
      teamPreference: teamPrefArray,
      workPreference: workPrefArray,
      assignment: assignmentsArray,
      skillsArray: briefHardSkills,
    };
    StorageService.set('filterObject', JSON.stringify(filterObject));
    this.setState({
      showBriefModal: false,
      briefTitle: '',
      showSearchTalentPopup: false,
    });

    history.push({
      pathname,
      skillsArray: briefHardSkills,
    });
  };

  searchTalentPopup = () => {
    const { briefTitle } = this.state;
    return (
      <div className="text-center w-75 mx-auto">
        <P className="p20">
          {`${messages.modalContent1.defaultMessage} ${briefTitle}
            ${messages.modalContent2.defaultMessage}`}
        </P>
        <Button type="button" className="btn btn-sm btn-primary" onClick={this.handleSearchTalent}>
          <FormattedMessage {...messages.modalCTA} />
        </Button>
      </div>
    );
  };

  render() {
    const { type, btnTitle, btnClassName, withAddIcon, projectDetailPage } = this.props;
    return (
      <React.Fragment>
        {type === 'add' ? (
          <>
            <Button className={btnClassName} onClick={this.handleAddBriefOpenModal}>
              {withAddIcon ? <SVG className="me-2" src={projectDetailPage ? plusSquareIcon : plusIcon} /> : ''}
              {btnTitle}
            </Button>
          </>
        ) : (
          <React.Fragment>
            <ActionIcon type="button" className="ms-0" onClick={this.handleAddBriefOpenModal}>
              <SVG src={editNoteIcon} />
            </ActionIcon>
          </React.Fragment>
        )}
        {this.renderBriefPopup()}
      </React.Fragment>
    );
  }
}

AddBrief.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  briefProjectName: selectors.briefProjectName,
  briefProjectDescription: selectors.briefProjectDescription,
  briefTitle: selectors.briefTitle,
  briefRole: selectors.briefRole,
  briefDescription: selectors.briefDescription,
  briefExpertiseLevel: selectors.briefExpertiseLevel,
  briefTeamPreference: selectors.briefTeamPreference,
  briefAssignment: selectors.briefAssignment,
  briefDuration: selectors.briefDuration,
  briefContractType: selectors.briefContractType,
  briefWorkSchedule: selectors.briefWorkSchedule,

  briefHardSkills: selectors.briefHardSkills,
  briefSoftSkills: selectors.briefSoftSkills,
  briefCertifications: selectors.briefCertifications,
  briefIndustry: selectors.briefIndustry,
  briefTeamWorking: selectors.briefTeamWorking,
  briefDiscProfile: selectors.briefDiscProfile,
  briefTimeZone: selectors.briefTimeZone,
  briefRatePerHour: selectors.briefRatePerHour,
  briefAnnualRate: selectors.briefAnnualRate,
  briefCurrency: selectors.briefCurrency,
  briefAnnualCurrency: selectors.briefAnnualCurrency,
  briefLanguages: selectors.briefLanguages,

  briefClientName: selectors.briefClientName,

  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitRoleForm: (evt, type, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.submitBriefStep1Form(type, data, onSuccess));
    },
    onSubmitPreferredCandidateForm: (evt, type, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.submitBriefStep2Form(type, data, onSuccess));
    },
    onSubmitEngagementForm: (evt, type, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.submitBriefStep3Form(type, data, onSuccess));
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
)(AddBrief);
