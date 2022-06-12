/** AddTimesheet
 * This is the Projects page for the timesheets
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Row, Col } from 'reactstrap';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import { toast } from 'react-toastify';
import moment from 'moment';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import AsyncSelects from 'components/AsyncSelects';
import Emitter from 'utils/emitter';
import TimePicker from 'react-time-picker';
import * as formValidations from 'utils/formValidations';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import { renderFieldoptCheckbox } from 'utils/Fields';
import DatePickers from 'components/DatePickers';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import { getCurrencySymbol } from 'containers/MyProfilePage/components/utils';
import containerMessage from 'containers/messages';
import StorageService from 'utils/StorageService';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import {
  API_URL,
  TALENT,
  PROJECT_API,
  SEARCH_API,
  SEARCH_BY_NAME,
  plusSquareIcon,
  plusIcon,
  editIcon,
  currencyData,
} from 'containers/App/constants';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from 'containers/App/actions';
import { defaultProps, propTypes } from 'containers/proptypes';
import { P, FormLabel, ToastifyMessage, Button } from 'components';
import { processData } from 'containers/Client/AddBrief/utils';
import * as actions from './actions';
import * as selectors from './selectors';
import saga from './saga';
import { key, weekDays, weekDaysFullName } from './constants';
import { calculateTotalHours, calculateTotalEarnings } from './utils';
import { TimeText, EditButton, CustomRow } from './styles';
import messages from './messages';

export class AddTimesheet extends React.Component {
  constructor(props) {
    super(props);

    const userType = StorageService.get('userType');
    const registerType = StorageService.get('registerType');
    this.state = {
      userType,
      showAddTimesheetModal: false,
      projectOptions: [],
      talentOptions: [],
      talentOptionsFullData: [],
      daysWorkedArray: new Array(7).fill('00:00'),
      time: '00:00',
      registerType,
    };
    this.debouncedGetOptions = debounce(this.getAddTimesheetProjectOptions, 500);
    this.debouncedGetTalentOptions = debounce(this.getAddTimesheetTalentOptions, 500);
  }

  handleOpenModal = () => {
    const { dispatch, type, dateStart, week, projectObj, projectDetailsPage, talentOptions, userBillingDetailsObj } = this.props;
    let data = {};
    let daysWorkedArray = new Array(7).fill('00:00');
    if (type === 'add') {
      data = { talent: '', weekStarting: '', project: '', privacyPolicy: false };

      daysWorkedArray = new Array(7).fill('00:00');

      if (projectDetailsPage) data.project = projectObj;
    } else if (type === 'edit') {
      data = { weekStarting: moment(dateStart), privacyPolicy: false };
      daysWorkedArray = week.map(dayTime => `${dayTime.hours}:${dayTime.minutes}`);
    } else if (type === 'adminEdit') {
      StorageService.set('userBillingDetails', JSON.stringify(userBillingDetailsObj), { hash: true });
      data = { talent: talentOptions, weekStarting: moment(dateStart), privacyPolicy: false };
      daysWorkedArray = week.map(dayTime => `${dayTime.hours}:${dayTime.minutes}`);
    }

    Object.keys(data).forEach(fieldKey => {
      dispatch(change(key, fieldKey, data[fieldKey]));
      dispatch(untouch(key, fieldKey));
    });
    this.setState({ showAddTimesheetModal: true, daysWorkedArray, talentId: '' });
  };

  handleCloseModal = () => this.setState({ showAddTimesheetModal: false });

  onChangeTime = (value, dayIndex) => {
    const timeValue = value;
    const { daysWorkedArray } = this.state;
    const updatedWorkArray = daysWorkedArray;
    updatedWorkArray[dayIndex] = timeValue || '00:00';
    this.setState({ daysWorkedArray: updatedWorkArray });
  };

  fetchAddTimesheetProject = async value => {
    const { userType, talentId } = this.state;
    const data = { method: 'GET' };
    let requestURL = `${API_URL}${TALENT}${PROJECT_API}${SEARCH_API}?q=${value}`;

    requestURL += userType === '3' && get(talentId, 'value') ? `&talentId=${encodeURIComponent(get(talentId, 'value'))}` : '';
    return request(requestURL, data);
  };

  getAddTimesheetProjectOptions = (inputValue, cb) => {
    const projectData = this.fetchAddTimesheetProject(inputValue);
    projectData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const projectOptions = processData(data);
          this.setState({ projectOptions });
          cb(projectOptions);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  loadAddTimesheetProjectOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedGetOptions(inputValue, callback);
    }
  };

  handleChangeProject = option => {
    const { dispatch } = this.props;
    dispatch(change(key, 'project', option));
  };

  fetchAddTimesheetTalent = async value => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${TALENT}${SEARCH_BY_NAME}?q=${value}`;
    return request(requestURL, data);
  };

  getAddTimesheetTalentOptions = (inputValue, cb) => {
    const talentData = this.fetchAddTimesheetTalent(inputValue);
    talentData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const talentOptions = processData(data);
          this.setState({ talentOptions, talentOptionsFullData: data });
          cb(talentOptions);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  loadAddTimesheetTalentOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedGetTalentOptions(inputValue, callback);
    }
  };

  handleChangeTalent = option => {
    const { dispatch } = this.props;
    const { talentOptionsFullData } = this.state;

    let userBillingDetailsObj = {};
    talentOptionsFullData.forEach(talent => {
      if (talent.name === option.label) {
        userBillingDetailsObj = {
          currency: talent.currency,
          ratePerHour: talent.ratePerHour,
        };
      }
      return userBillingDetailsObj;
    });
    StorageService.set('userBillingDetails', JSON.stringify(userBillingDetailsObj), { hash: true });
    this.setState({ talentId: option });
    dispatch(change(key, 'talent', option));
  };

  renderAddTimesheet = () => {
    const { userType, showAddTimesheetModal, talentOptions, projectOptions, daysWorkedArray, time, registerType } = this.state;
    const {
      type,
      talent,
      weekStarting,
      project,
      privacyPolicy,
      handleSubmit,
      invalid,
      loading,
      projectDetailsPage = false,
      week,
    } = this.props;

    const title =
      type === 'add' ? containerMessage.addTimesheetPopupTitle.defaultMessage : containerMessage.editTimesheetPopupTitle.defaultMessage;

    const totalHours = daysWorkedArray.length > 0 ? calculateTotalHours(daysWorkedArray) : '00:00';
    const totalEarnings = daysWorkedArray.length > 0 ? calculateTotalEarnings(daysWorkedArray) : '0000.00';

    const currencySymbol = getCurrencySymbol(currencyData, 'code', get(JSON.parse(StorageService.get('userBillingDetails')), 'currency'));
    const currency = currencySymbol || '$';
    return (
      <PopupWrapper
        loading={loading}
        disabled={invalid}
        isOpen={showAddTimesheetModal}
        modalType="submit"
        modalType1={type !== 'adminEdit' ? 'draft' : ''}
        className="new-modal"
        onDiscard={this.handleCloseModal}
        onDraft={e => {
          this.handleTimesheetModalSubmit(e, 'draft');
        }}
        onHandleSubmit={handleSubmit(e => {
          this.handleTimesheetModalSubmit(e, 'submit');
        })}
        title={title}
      >
        <form>
          <Row>
            <Col>
              <FormGroup className="input-sm">
                <FormLabel> {messages.weekStartingLabel.defaultMessage}</FormLabel>
                <Field
                  name="weekStarting"
                  component={DatePickers}
                  dateFormat="dd/MM/yyyy"
                  showYearDropDown
                  placeholder="DD/MM/YYYY"
                  maxDate={moment().toDate()}
                  selected={weekStarting}
                  defaultValue={weekStarting}
                  yearDropdownItemNumber={50}
                  scrollableYearDropdown
                  placement="bottom-start"
                  validate={[formValidations.requiredDate]}
                  filterDate={date => date.getDay() === 1}
                  disabled={type === 'adminEdit'}
                />
              </FormGroup>
            </Col>
            {type === 'add' && !projectDetailsPage && (
              <Col>
                <FormGroup className="input-sm">
                  <FormLabel>{messages.projectLabel.defaultMessage}</FormLabel>
                  <Field
                    name="project"
                    type="text"
                    component={AsyncSelects}
                    defaultValue={project}
                    cacheOptions
                    loadOptions={this.loadAddTimesheetProjectOptions}
                    defaultOptions={projectOptions}
                    handleChange={this.handleChangeProject}
                    placeHolder={containerMessage.placeholderProjectName.defaultMessage}
                    validate={[formValidations.requiredSelect]}
                  />
                </FormGroup>
              </Col>
            )}
          </Row>
          {type === 'add' && userType === '3' && (
            <Row>
              <Col>
                <FormGroup className="input-sm">
                  <FormLabel>{containerMessage.talentLabel.defaultMessage}</FormLabel>
                  <Field
                    name="talent"
                    type="text"
                    component={AsyncSelects}
                    defaultValue={talent}
                    cacheOptions
                    loadOptions={this.loadAddTimesheetTalentOptions}
                    defaultOptions={talentOptions}
                    handleChange={this.handleChangeTalent}
                    placeHolder={containerMessage.talentNameLabel.defaultMessage}
                    validate={[formValidations.requiredSelect]}
                  />
                </FormGroup>
              </Col>
            </Row>
          )}
          {type === 'adminEdit' && userType === '4' && (
            <Row>
              <Col>
                <FormGroup className="input-sm">
                  <FormLabel>{containerMessage.talentLabel.defaultMessage}</FormLabel>
                  <Field
                    name="talent"
                    type="text"
                    component={AsyncSelects}
                    defaultValue={talent}
                    cacheOptions
                    loadOptions={this.loadAddTimesheetTalentOptions}
                    defaultOptions={talentOptions}
                    handleChange={this.handleChangeTalent}
                    placeHolder={containerMessage.talentNameLabel.defaultMessage}
                    validate={[formValidations.requiredSelect]}
                    isDisabled
                  />
                </FormGroup>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <FormGroup className="input-sm mb-0">
                <div className="d-inline-flex flex-wrap w-100">
                  {weekDaysFullName.map((day, index) => (
                    <div className="d-flex flex-column me-3 mb-3 flex-1">
                      <FormLabel>{day}</FormLabel>
                      <TimePicker
                        onChange={e => this.onChangeTime(e, index)}
                        hourPlaceholder="HH"
                        minutePlaceholder="MM"
                        minTime="00:00"
                        maxTime="18:59"
                        disableClock
                        locale="sv-sv"
                        value={type === 'add' ? time : week.map(dayTime => `${dayTime.hours}:${dayTime.minutes}`)[index]}
                        required
                        name={day}
                      />
                    </div>
                  ))}
                </div>
              </FormGroup>
            </Col>
          </Row>

          <CustomRow>
            <Col>
              <TimeText>
                Total: <span>{totalHours}</span>
              </TimeText>
            </Col>
            <Col>
              {registerType !== 'agency' && userType !== 1 ? (
                <TimeText>
                  Estimated earning :
                  <span>
                    {currency}
                    {totalEarnings === 0 ? '0000.00' : totalEarnings}
                  </span>
                </TimeText>
              ) : (
                ''
              )}
            </Col>
          </CustomRow>

          <P className="mt-4 text-start">
            <small>
              <Field
                name="privacyPolicy"
                type="checkbox"
                component={renderFieldoptCheckbox}
                value={privacyPolicy}
                message={messages.privacyPolicy.defaultMessage}
                validate={[formValidations.checked]}
              />
            </small>
          </P>
        </form>
      </PopupWrapper>
    );
  };

  handleTimesheetModalSubmit = (e, submitType) => {
    const { userType, daysWorkedArray } = this.state;
    const { weekStarting, project, talent, onSubmitTimesheet, type, id, statusValue } = this.props;

    let dateStart = '';
    const week = [];

    if (weekStarting) {
      dateStart = moment(weekStarting).format('DD/MM/YYYY');
      weekDays.forEach((_value, index) => {
        const obj = {
          date: moment(weekStarting)
            .add(index, 'days')
            .format('DD/MM/YYYY'),
          hours: daysWorkedArray[index].split(':')[0],
          minutes: daysWorkedArray[index].split(':')[1],
        };

        week.push(obj);
      });
    }

    const status = submitType === 'draft' ? 3 : 0;

    const data = {
      dateStart,
      week,
      status,
    };

    if (userType === '3' && type === 'add') data.talentId = get(talent, 'value', '');

    if (type === 'add') data.projectId = get(project, 'value', '');
    else if (type === 'edit') data.id = id;
    else if (type === 'adminEdit') {
      data.id = id;
      data.status = statusValue;
    }
    onSubmitTimesheet(e, submitType, type, data, this.timesheetModalSuccess.bind(this, data));
  };

  timesheetModalSuccess = data => {
    this.setState({ showAddTimesheetModal: false });
    Emitter.emit('timesheetAdded', data);
  };

  render() {
    const { type, projectDetailsPage } = this.props;
    return (
      <React.Fragment>
        {type === 'add' && (
          <React.Fragment>
            <div className="d-flex mt-4 mt-md-0">
              <Button
                type="button"
                className={`btn btn-sm btn-plus ms-md-3 ${projectDetailsPage ? 'new-btn-theme' : 'top-0 btn-outline'}`}
                onClick={() => this.handleOpenModal('add')}
              >
                {projectDetailsPage ? <SVG className="me-2" src={plusSquareIcon} /> : <SVG className="me-2" src={plusIcon} />}

                <span>
                  <FormattedMessage {...messages.addTimeSheet} />
                </span>
              </Button>
            </div>
          </React.Fragment>
        )}
        {type === 'edit' && (
          <Button className="btn btn-outline btn-sm draft-btn" onClick={() => this.handleOpenModal('edit')}>
            {containerMessage.draftButton.defaultMessage}
          </Button>
        )}
        {type === 'adminEdit' && (
          <EditButton
            type="button"
            style={{ minWidth: 'auto', height: 'auto' }}
            className="btn p-0 ms-3"
            onClick={() => this.handleOpenModal('adminEdit')}
          >
            <SVG src={editIcon} />
          </EditButton>
        )}
        {this.renderAddTimesheet()}
      </React.Fragment>
    );
  }
}

AddTimesheet.defaultProps = defaultProps;
AddTimesheet.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  talent: selectors.talent,
  weekStarting: selectors.weekStarting,
  project: selectors.project,
  privacyPolicy: selectors.privacyPolicy,

  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitTimesheet: (evt, submitType, type, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      if (submitType === 'submit') dispatch(loadRepos());
      dispatch(actions.submitTimesheet(type, data, onSuccess));
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
)(AddTimesheet);
