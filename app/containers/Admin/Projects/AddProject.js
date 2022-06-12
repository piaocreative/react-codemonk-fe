/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import StorageService from 'utils/StorageService';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import moment from 'moment';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import SVG from 'react-inlinesvg';
import { FormLabel, Selects, DatePickers, ToastifyMessage, Button, P } from 'components';
import { redirectTo } from 'containers/App/utils';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import AsyncSelects from 'components/AsyncSelects';
import { API_URL, CLIENT, SEARCH_BY_NAME, plusIcon, teamPreferenceArray } from 'containers/App/constants';
import request from 'utils/request';
import history from 'utils/history';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import { renderField, renderTextAreaForm } from 'utils/Fields';
import { VALIDATION } from 'utils/constants';
import containerMessage from 'containers/messages';
import * as formValidations from 'utils/formValidations';
import { propTypes } from 'containers/proptypes';
import * as actions from './actions';
import * as selectors from './selectors';
import saga from './saga';
import messages from './messages';
import { projectStatusPopup, key, DEFAULT_PAGE_NO } from './constants';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddProjectModal: false,
    };
    this.debouncedGetOptions = debounce(this.getOptions, 500);
    this.debouncedGetCompanyOptions = debounce(this.getCompanyOptions, 500);
  }

  componentDidUpdate(prevProps) {
    const { popUpSaga, loadProjectDetails, isClientDashboard, isClientHeader } = this.props;
    if (prevProps.popUpSaga === true && popUpSaga === false) {
      this.setState({ showAddProjectModal: false });
      if (isClientDashboard) {
        loadProjectDetails();
      } else if (isClientHeader) {
        redirectTo(history, '/client/projects');
      } else {
        loadProjectDetails(DEFAULT_PAGE_NO);
      }
    }
  }

  fetchClient = async (value = '', companyName = '') => {
    const data = { method: 'GET' };
    let requestURL = `${API_URL}${CLIENT}${SEARCH_BY_NAME}?q=${value}`;
    requestURL += companyName ? `&companyName=${companyName}` : '';
    return request(requestURL, data);
  };

  processClientData = data => {
    const output = [];
    data.forEach(item => {
      const option = {
        label: `${item.name}`,
        value: get(item, '_id'),
        companyName: `${item.companyName}`,
      };
      output.push(option);
    });
    return output;
  };

  processCompanyData = data => {
    const output = [];
    data.forEach(item => {
      const option = {
        label: `${item.companyName}`,
        value: get(item, '_id'),
        clientName: `${item.name}`,
      };
      output.push(option);
    });
    return output;
  };

  getOptions = (inputValue, cb) => {
    const clientData = this.fetchClient(inputValue);
    clientData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const clientOptions = this.processClientData(data);
          this.setState({ clientOptions });
          cb(clientOptions);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  getCompanyOptions = (inputValue, cb) => {
    const companyData = this.fetchClient('', inputValue);
    companyData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const companyOptions = this.processCompanyData(data);
          this.setState({ companyOptions });
          cb(companyOptions);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  loadOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedGetOptions(inputValue, callback);
    }
  };

  loadCompanyOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedGetCompanyOptions(inputValue, callback);
    }
  };

  handleChange = option => {
    const { dispatch } = this.props;
    dispatch(change(key, 'clientName', option));
    if (option && option.companyName) {
      dispatch(change(key, 'companyName', { ...option, ...{ label: option.companyName } }));
    }
  };

  handleCompanyChange = option => {
    const { dispatch } = this.props;
    dispatch(change(key, 'companyName', option));
    if (option && option.clientName) {
      dispatch(change(key, 'clientName', { ...option, ...{ label: option.clientName } }));
    }
  };

  handleAddProjectOpenModal = () => {
    const { dispatch } = this.props;
    const data = {
      clientName: '',
      companyName: '',
      projectName: '',
      projectSummary: '',
      startDate: '',
      endDate: '',
      status: '',
      teamPreference: '',
    };
    Object.keys(data).forEach(fieldKey => {
      dispatch(change(key, fieldKey, data[fieldKey]));
      dispatch(untouch(key, fieldKey));
    });

    this.setState({ showAddProjectModal: true });
  };

  handleAddProjectCloseModal = () => {
    const { dispatch } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showAddProjectModal: false });
  };

  popupSubmit = e => {
    const {
      clientName,
      companyName,
      projectName,
      projectSummary,
      startDate: propStartDate,
      endDate: propEndDate,
      status: propStatus,
      teamPreference,
      onSubmitAddProjectForm,
      isClientProject,
    } = this.props;
    const clientId = isClientProject ? StorageService.get('clientID') : get(clientName, 'value');
    const startDate = moment(propStartDate).format('DD/MM/YYYY');
    const endDate = moment(propEndDate).format('DD/MM/YYYY');
    const status = get(propStatus, 'value');
    const data = {
      clientId,
      companyName,
      name: projectName,
      description: projectSummary,
      startDate,
      endDate,
      status: Number(status),
      teamPreference: [get(teamPreference, 'value')],
    };
    onSubmitAddProjectForm(e, data);
  };

  render() {
    const {
      clientName,
      companyName,
      projectSummary,
      startDate,
      endDate,
      status,
      isClientProject,
      handleSubmit,
      loading,
      responseSuccess,
      responseError,
      invalid,
      teamPreference,
      btnTitle,
      btnClassName,
      withAddIcon,
    } = this.props;
    const { clientOptions, companyOptions, showAddProjectModal } = this.state;

    return (
      <React.Fragment>
        <Button className={btnClassName} onClick={this.handleAddProjectOpenModal}>
          {withAddIcon ? <SVG className="me-2" src={plusIcon} /> : ''}
          <span>{btnTitle}</span>
        </Button>

        <PopupWrapper
          loading={loading}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid}
          isOpen={showAddProjectModal}
          modalType="add"
          onDiscard={this.handleAddProjectCloseModal}
          onHandleSubmit={handleSubmit(this.popupSubmit)}
          title={containerMessage.modalAddProjectHeader.defaultMessage}
        >
          <form onSubmit={handleSubmit}>
            {!isClientProject && (
              <React.Fragment>
                <FormGroup>
                  <FormLabel>
                    <FormattedMessage {...messages.labelClientName} />
                  </FormLabel>
                  <Field
                    name="clientName"
                    type="text"
                    component={AsyncSelects}
                    defaultValue={clientName}
                    cacheOptions
                    loadOptions={this.loadOptions}
                    defaultOptions={clientOptions}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick}
                    placeHolder={messages.placeholderClientName.defaultMessage}
                    validate={[formValidations.requiredSelect]}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel className="d-inline-flex align-items-center">
                    <FormattedMessage {...containerMessage.labelCompanyName} />
                    <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                      <FormattedMessage {...containerMessage.optionalText} />
                    </P>
                  </FormLabel>
                  <Field
                    name="companyName"
                    type="text"
                    component={AsyncSelects}
                    defaultValue={companyName}
                    cacheOptions
                    loadOptions={this.loadCompanyOptions}
                    defaultOptions={companyOptions}
                    handleChange={this.handleCompanyChange}
                    placeHolder={messages.placeholderCompanyName.defaultMessage}
                  />
                </FormGroup>
              </React.Fragment>
            )}
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelProjectName} />
              </FormLabel>
              <Field
                name="projectName"
                type="text"
                component={renderField}
                placeholder={containerMessage.placeholderProjectName.defaultMessage}
                validate={[formValidations.requiredField, formValidations.minLength2, formValidations.maxLength50]}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelProjectSummary} />
              </FormLabel>
              <Field
                name="projectSummary"
                defaultValue={projectSummary}
                component={renderTextAreaForm}
                rows={3}
                placeholder={messages.placeholderProjectSummary.defaultMessage}
                validate={[formValidations.minLength100, formValidations.maxLength1500]}
              />
            </FormGroup>
            <Row>
              <Col md="6">
                <FormGroup>
                  <FormLabel>
                    <FormattedMessage {...containerMessage.labelStartDate} />
                  </FormLabel>
                  <Field
                    name="startDate"
                    component={DatePickers}
                    showYearDropDown
                    yearDropdownItemNumber={5}
                    scrollableYearDropdown
                    placeholder={containerMessage.placeholderDate.defaultMessage}
                    selected={moment(startDate).toDate()}
                    defaultValue={moment(startDate).toDate()}
                    placement="bottom-start"
                    withIcon
                    validate={[formValidations.requiredDate]}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <FormLabel>
                    <FormattedMessage {...containerMessage.labelEndDate} />
                  </FormLabel>
                  <Field
                    name="endDate"
                    component={DatePickers}
                    showYearDropDown
                    yearDropdownItemNumber={5}
                    scrollableYearDropdown
                    placeholder={containerMessage.placeholderDate.defaultMessage}
                    minDate={moment(startDate).toDate()}
                    selected={moment(endDate).toDate()}
                    defaultValue={moment(endDate).toDate()}
                    placement="bottom-start"
                    withIcon
                    validate={[formValidations.requiredDate]}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <FormLabel>
                    <FormattedMessage {...messages.labelStatus} />
                  </FormLabel>
                  <Field
                    name="status"
                    type="text"
                    component={Selects}
                    defaultValue={status}
                    options={projectStatusPopup.map(item => ({
                      label: `${item.label}`,
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
                    <FormattedMessage {...containerMessage.subHeadingTeam} />
                  </FormLabel>
                  <Field
                    name="teamPreference"
                    component={Selects}
                    defaultValue={teamPreference}
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
            </Row>
          </form>
        </PopupWrapper>
      </React.Fragment>
    );
  }
}

AddProject.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  clientName: selectors.clientName,
  companyName: selectors.companyName,
  projectName: selectors.projectName,
  projectSummary: selectors.projectSummary,
  startDate: selectors.startDate,
  endDate: selectors.endDate,
  status: selectors.status,
  teamPreference: selectors.teamPreference,

  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeStatus: (data, onSuccess) => dispatch(actions.changeStatus(data, onSuccess)),

    onSubmitAddProjectForm: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.addProject(data));
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
)(AddProject);
