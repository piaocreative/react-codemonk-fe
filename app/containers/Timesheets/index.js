/* eslint-disable react/no-unused-state */
/** Timesheets
 * This is the Timesheets page
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormGroup, Row, Col } from 'reactstrap';
import { VALIDATION } from 'utils/constants';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import request from 'utils/request';
import AsyncSelects from 'components/AsyncSelects';
import Content from 'components/Content';
import debounce from 'lodash/debounce';
import StorageService from 'utils/StorageService';
import Selects from 'components/Selects';
import { reduxForm, Field, change } from 'redux-form/immutable';
import containerMessage from 'containers/messages';
import SearchComponent from 'components/SearchComponent';
import { defaultProps, propTypes } from 'containers/proptypes';
import { FilterList, FilterBlock } from 'containers/TalentListingPage/styles';
import { Card, H3, H4, FormLabel, DatePickers, ToastifyMessage } from 'components';
import { processData } from 'containers/Client/AddBrief/utils';
import { API_URL, CLIENT, PROJECT_API, LIST, TALENT, SEARCH_BY_NAME, closeIcon } from 'containers/App/constants';
import AddTimesheet from 'containers/Timesheets/AddTimesheet';
import TimesheetListing from 'containers/Timesheets/TimesheetListing';
import moment from 'moment';
import { timesheetFilter } from './utils';
import { key } from './constants';
import messages from './messages';

export class Timesheets extends React.Component {
  constructor(props) {
    super(props);

    const userType = StorageService.get('userType');
    this.state = {
      search: '',
      statusFilter: { label: 'All', value: -1 },
      userType,
      weekStart: '',
      projectId: '',
      talentId: '',
      projectOptions: [],
      talentOptions: [],
      activeProject: '',
      activeTalent: '',
    };
    this.debouncedGetOptions = debounce(this.getProjectOptions, 500);
    this.debouncedTalentGetOptions = debounce(this.getTalentOptions, 500);
  }

  handleTimesheetSearchChange = value => {
    this.setState({ search: value });
  };

  debounceFn = debounce(value => this.handleTimesheetSearchChange(value), 500);

  handleStatusFilter = e => {
    this.setState({ statusFilter: e });
  };

  // project Name fetch
  fetchProject = async value => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${CLIENT}${PROJECT_API}${LIST}?q=${value}`;
    return request(requestURL, data);
  };

  // feach projects
  getProjectOptions = (inputValue, cb) => {
    const projectData = this.fetchProject(inputValue);
    projectData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const projectOptions = processData(data);
          this.setState({ projectOptions, projectsData: data });
          if (projectOptions && projectOptions.length > 0) {
            cb(projectOptions);
          }
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

  // talent Name fetch
  fetchTalent = async value => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${TALENT}${SEARCH_BY_NAME}?q=${value}`;
    return request(requestURL, data);
  };

  // talent fetch
  getTalentOptions = (inputValue, cb) => {
    const talentData = this.fetchTalent(inputValue);
    talentData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const talentOptions = processData(data);
          this.setState({ talentOptions, talentData: data });
          if (talentOptions && talentOptions.length > 0) {
            cb(talentOptions);
          }
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  loadTalentOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedTalentGetOptions(inputValue, callback);
    }
  };

  handleWeekStartChange = date => {
    const weekStart = date ? moment(date).format('YYYY-MM-DD') : '';
    this.setState({
      weekStart,
    });
  };

  handleProjectNameChange = project => {
    const projectId = project ? project.value : '';
    const activeProject = { ...project, type: 'project' };
    this.setState({
      projectId,
      activeProject,
    });
  };

  handleTalentChange = talent => {
    const talentId = talent ? talent.value : '';
    const activeTalent = { ...talent, type: 'talent' };
    this.setState({
      talentId,
      activeTalent,
    });
  };

  activeFilters = () => {
    const { activeProject, activeTalent, weekStart, statusFilter } = this.state;
    const activeWeekStart = { type: 'weekStart', label: weekStart };
    const activeStatusFilter = { ...statusFilter, type: 'status' };
    let output = [];
    if (activeProject && activeProject.label) {
      output = [...output, activeProject];
    }
    if (activeTalent && activeTalent.label) {
      output = [...output, activeTalent];
    }
    if (activeWeekStart.label) {
      output = [...output, activeWeekStart];
    }
    if (activeStatusFilter.value !== -1) {
      output = [...output, activeStatusFilter];
    }
    return output;
  };

  resetFilter = (isAll, item = {}) => {
    const { dispatch } = this.props;
    if (isAll) {
      this.setState({
        talentId: '',
        activeTalent: '',
        projectId: '',
        activeProject: '',
        weekStart: '',
        statusFilter: { label: 'All', value: -1 },
      });
      dispatch(change(key, 'weekStart', ''));
    } else {
      switch (item.type) {
        case 'talent':
          this.setState({ talentId: '', activeTalent: '' });
          break;
        case 'project':
          this.setState({ projectId: '', activeProject: '' });
          break;
        case 'weekStart':
          this.setState({ weekStart: '' });
          dispatch(change(key, 'weekStart', ''));
          break;
        case 'status':
          this.setState({
            statusFilter: { label: 'All', value: -1 },
          });
          break;
        default:
          break;
      }
    }
  };

  render() {
    const {
      userType,
      search,
      statusFilter,
      weekStart,
      projectId,
      projectOptions,
      talentId,
      talentOptions,
      activeProject,
      activeTalent,
    } = this.state;
    const { filter } = timesheetFilter(userType);

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          {userType === '1' || userType === '3' ? (
            <Card className="d-flex align-items-xl-center justify-content-between table-header flex-column flex-xl-row">
              <div className="d-flex align-items-md-center flex-column flex-md-row">
                <div className="d-flex align-items-center me-3">
                  <H4 className="text-start my-0">
                    <FormattedMessage {...messages.timesheetHeading} />
                  </H4>
                </div>
                <AddTimesheet type="add" />
              </div>
              <div className="d-flex align-items-center input-sm me-auto me-md-0 ms-md-auto mt-4 mt-xl-0">
                <SearchComponent handleSearchChange={this.debounceFn} placeholder={containerMessage.searchPlaceholder.defaultMessage} />
                <Field
                  name="statusFilter"
                  type="text"
                  component={Selects}
                  className="ms-4"
                  defaultValue={statusFilter}
                  searchable={false}
                  options={filter.map(item => ({
                    label: `${item.label}`,
                    value: item.value,
                  }))}
                  onChange={e => this.handleStatusFilter(e)}
                />
              </div>
            </Card>
          ) : (
            <div className="d-flex justify-content-between mb-3">
              <div className="d-flex align-items-center me-3">
                <H3>Timesheets</H3>
              </div>
            </div>
          )}

          {(userType === '2' || userType === '4') && (
            <>
              <Card className="mt-0 mb-4">
                <Row>
                  <Col md={6} lg={3}>
                    <FormGroup className="input-sm mb-3 mb-lg-0">
                      <FormLabel className="p14 mb-0">Talent</FormLabel>
                      <Field
                        name="talentId"
                        type="text"
                        component={AsyncSelects}
                        defaultValue={activeTalent}
                        cacheOptions
                        loadOptions={this.loadTalentOptions}
                        defaultOptions={talentOptions}
                        handleChange={this.handleTalentChange}
                        placeHolder="Talent Name"
                      />
                    </FormGroup>
                  </Col>

                  <Col md={6} lg={3}>
                    <FormGroup className="input-sm mb-3 mb-lg-0">
                      <FormLabel className="p14 mb-0">Project</FormLabel>
                      <Field
                        name="projectId"
                        type="text"
                        component={AsyncSelects}
                        defaultValue={activeProject}
                        cacheOptions
                        loadOptions={this.loadProjectOptions}
                        defaultOptions={projectOptions}
                        handleChange={this.handleProjectNameChange}
                        placeHolder={containerMessage.placeholderProjectName.defaultMessage}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6} lg={3}>
                    <FormGroup className="input-sm mb-3 mb-lg-0">
                      <FormLabel className="p14 mb-0">Week starting</FormLabel>
                      <Field
                        name="weekStart"
                        component={DatePickers}
                        selected={weekStart}
                        defaultValue={weekStart}
                        showYearDropDown
                        yearDropdownItemNumber={5}
                        scrollableYearDropdown
                        placeholder={containerMessage.placeholderDate.defaultMessage}
                        placement="bottom-start"
                        filterDate={date => date.getDay() === 1}
                        withIcon
                        onChange={date => this.handleWeekStartChange(date)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6} lg={3}>
                    <FormGroup className="input-sm mb-3 mb-lg-0">
                      <FormLabel className="p14 mb-0">Status</FormLabel>
                      <Field
                        name="statusFilter"
                        type="text"
                        component={Selects}
                        defaultValue={statusFilter}
                        searchable={false}
                        options={filter.map(item => ({
                          label: `${item.label}`,
                          value: item.value,
                        }))}
                        onChange={e => this.handleStatusFilter(e)}
                        placeHolder="Status"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Card>
              {this.activeFilters().length > 0 && (
                <FilterBlock>
                  <FilterList>
                    {this.activeFilters().map(item => (
                      <li>
                        {item.label}
                        <button className="close-btn" type="button" onClick={() => this.resetFilter(false, item)}>
                          <img src={closeIcon} alt="close" />
                        </button>
                      </li>
                    ))}
                    <li>
                      <button className="clear-btn" type="button" onClick={() => this.resetFilter(true)}>
                        Clear all
                      </button>
                    </li>
                  </FilterList>
                </FilterBlock>
              )}
            </>
          )}

          <hr className="m-0" />
          <TimesheetListing search={search} statusFilter={statusFilter} weekStart={weekStart} projectId={projectId} talentId={talentId} />
        </Content>
      </React.Fragment>
    );
  }
}

Timesheets.defaultProps = defaultProps;
Timesheets.propTypes = propTypes;

export default compose(
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(Timesheets);
