/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import SVG from 'react-inlinesvg';
import { VALIDATION } from 'utils/constants';
import containerMessage from 'containers/messages';
import get from 'lodash/get';
import request from 'utils/request';
import { Cell, PieChart, Pie } from 'recharts';
import { PrivateGrid, Card, H2, P, H3, ToastifyMessage, Badge, Button } from 'components';
import { FormattedMessage } from 'react-intl';
import AddBrief from 'containers/Client/AddBrief';
import { clientRedirectToPage, redirectTo } from 'containers/App/utils';
import { BriefCardSkeleton } from 'components/SkeletonLoader';
import JobCard from 'components/JobCard';
import { DEFAULT_PAGE_SIZE, projectStatusArray } from 'containers/constants';
import {
  TEAM,
  COUNT,
  CLIENT,
  API_URL,
  PROJECTS,
  PROJECT_API,
  LIST,
  JOB_POST,
  VERSION2,
  TIMESHEET,
  filesIcon,
  rightAngleIcon,
  payIcon,
  JobEmptyIcon,
  downloadIcon,
  searchJobsIcon,
  MessageIcon,
  plusIcon,
  TimesheetEmptyIcon,
} from 'containers/App/constants';
import ProjectCard from 'components/ProjectCard';
import StorageService from 'utils/StorageService';
import Content from 'components/Content';
import { ComingSoon, LinkViewAll, DBcontainer, LeftCol, RightCol } from 'containers/Talent/Dashboard/styles';
import TimesheetListing from 'containers/Timesheets/TimesheetListing';
import { LegendList, TileCard, PrimarySVG, PrimaryMainSVG } from './styles';
import NewClient from './NewClient';
import messages from './messages';
import { COLORS } from './constants';

export class ClientHomePage extends React.Component {
  constructor(props) {
    super(props);
    const userRole = StorageService.get('userType');
    const isAdmin = userRole === '4';
    this.state = {
      projectCount: 0,
      team: [],
      loading: false,
      jobLoading: false,
      projects: [],
      jobList: [],
      timeSheetCount: 0,

      isAdmin,
    };
  }

  componentDidMount() {
    this.loadActiveProject();
    const { history, location } = this.props;
    const currentSignupStep = parseInt(StorageService.get('signupStep'), 10);
    clientRedirectToPage(history, location.redirection, currentSignupStep, 3);
  }

  loadActiveProject = () => {
    this.setState({ loading: true });
    const data = { method: 'GET' };
    let activeStatus = '';
    const activeStatusArray = projectStatusArray.filter(item => ['All', 'Suspended', 'Closed'].indexOf(item.label) === -1);
    activeStatus += activeStatusArray.map(selected => `${selected.value}`);
    const requestURL = `${API_URL}${CLIENT}${PROJECTS}?status=${activeStatus}`;
    request(requestURL, data)
      .then(this.setActiveProjects)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setActiveProjects = response => {
    if (get(response, 'status')) {
      this.setState({ projects: response.data.docs, projectCount: response.data.docs.length, loading: false });
      this.loadJobBrief();
      this.loadTeamDetails();
      this.loadTimesheets();
    } else {
      this.setState({ loading: false });
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  loadJobBrief = () => {
    const data = { method: 'GET' };
    this.setState({ jobLoading: true });
    const requestURL = `${API_URL}${JOB_POST}${LIST}?status=active`;
    request(requestURL, data)
      .then(this.setJobBrief)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setJobBrief = response => {
    if (get(response, 'status')) {
      this.setState({ jobList: response.data.docs, jobLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  loadTimesheets = () => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${VERSION2}${TIMESHEET}`;

    // apiCall;
    request(requestURL, data)
      .then(this.setTimesheetDataSuccess)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setTimesheetDataSuccess = response => {
    if (get(response, 'status')) {
      const { docs } = response.data;
      this.setState({ timeSheetCount: docs.length });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  loadTeamDetails = () => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${CLIENT}${PROJECT_API}${TEAM}${COUNT}`;
    request(requestURL, data)
      .then(this.setTeamDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setTeamDetails = response => {
    if (get(response, 'status')) {
      const teamData = [];
      const { data } = response;
      data.forEach((team, index) => {
        teamData.push({
          value: get(team, 'value'),
          name: get(team, 'name'),
          color: COLORS[index],
        });
      });
      this.setState({ team: teamData });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  loadJobBriefs = () => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${JOB_POST}${LIST}`;
    request(requestURL, data)
      .then(this.setJobBriefs)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  renderJobCards = () => {
    const { jobLoading, jobList } = this.state;
    const displayJobs = 2;

    let output = '';
    if (jobLoading) {
      output = <BriefCardSkeleton cardCount={2} />;
    } else {
      output = (
        <JobCard jobList={jobList.slice(0, displayJobs)} {...this.props} userRole="client" loadJobBriefs={() => this.loadJobBriefs()} />
      );
    }
    return output;
  };

  redirectFeedback = () => {
    window.open('https://form.typeform.com/to/H2hu9dFX', '_blank');
  };

  redirectBuildTeam = () => {
    window.open('https://campaigns.codemonk.ai/build-your-borderless-team', '_blank');
  };

  loadClientBrief = pageNum => {
    StorageService.set('clientBriefPage', JSON.stringify(pageNum));

    const data = { method: 'GET' };
    const requestURL = `${API_URL}${JOB_POST}${LIST}?page=${pageNum}&limit=${DEFAULT_PAGE_SIZE}`;

    request(requestURL, data)
      .then(this.setClientBriefs)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  render() {
    const { projectCount, team, loading, jobLoading, projects, jobList, isAdmin, timeSheetCount } = this.state;
    const { history } = this.props;
    const displayActiveProject = 3;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        {!loading && (
          <Content>
            {projectCount === 0 ? (
              <NewClient history={history} />
            ) : (
              <PrivateGrid>
                <DBcontainer>
                  <LeftCol>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex">
                          <H3>
                            <FormattedMessage {...messages.activeProject} />
                          </H3>
                          <Badge className="badge-sm ms-2 primary"> {projectCount} </Badge>
                        </div>
                        <LinkViewAll
                          to={{
                            pathname: '/client/projects',
                            state: { fromDashboard: true },
                          }}
                        >
                          <span className="me-2">
                            <FormattedMessage {...containerMessage.linkViewAll} />
                          </span>
                          <PrimaryMainSVG src={rightAngleIcon} />
                        </LinkViewAll>
                      </div>
                      <ProjectCard projectList={projects.slice(0, displayActiveProject)} fromDashboard isClient />
                    </div>

                    <div className="mt-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex">
                          <H3>
                            <FormattedMessage {...messages.jobBriefs} />
                          </H3>
                          <Badge className="badge-sm ms-2 primary"> {jobList.length} </Badge>
                        </div>
                        <LinkViewAll
                          to={{
                            pathname: '/client/job-briefs',
                            state: { fromDashboard: true },
                          }}
                        >
                          <span className="me-2">
                            <FormattedMessage {...containerMessage.linkViewAll} />
                          </span>
                          <PrimaryMainSVG src={rightAngleIcon} />
                        </LinkViewAll>
                      </div>
                      {jobList.length === 0 && !jobLoading ? (
                        <Card className="p-40 d-flex mb-lg-5">
                          <PrimarySVG src={JobEmptyIcon} width="40" height="40" className="me-4" />
                          <div>
                            <P className="p20 mb-2">
                              <FormattedMessage {...messages.getStartedJobTitle} />
                            </P>
                            <P className="p16" opacityVal="0.5">
                              <FormattedMessage {...messages.getStartedJobText} />
                            </P>
                            <div className="d-flex mt-4 align-items-center">
                              <AddBrief
                                type="add"
                                btnTitle={containerMessage.createBrief.defaultMessage}
                                btnClassName="btn-primary btn-sm"
                                isAdmin={isAdmin}
                                loadDetails={() => this.loadClientBrief(1)}
                              />
                              {/* this is section for future */}
                              <div className="d-none">
                                <P className="p16 mb-0 ms-2">or </P>
                                <LinkViewAll className="ms-2">
                                  <PrimarySVG src={downloadIcon} width="16" height="16" className="me-1" />
                                  <FormattedMessage {...messages.importTxt} />
                                </LinkViewAll>
                                <P className="p16 mb-0 ms-2">
                                  <FormattedMessage {...messages.fromATS} />
                                </P>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ) : (
                        this.renderJobCards()
                      )}
                    </div>
                    <div className="mt-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex">
                          <H3>
                            <FormattedMessage {...containerMessage.tabTimesheet} />
                          </H3>
                          <Badge className="badge-sm ms-2 primary"> {timeSheetCount} </Badge>
                        </div>
                        <LinkViewAll
                          to={{
                            pathname: '/client/timesheets',
                            state: { fromDashboard: true },
                          }}
                        >
                          <span className="me-2">
                            <FormattedMessage {...containerMessage.linkViewAll} />
                          </span>
                          <PrimaryMainSVG src={rightAngleIcon} />
                        </LinkViewAll>
                      </div>
                      {timeSheetCount > 0 ? (
                        <Card className="d-grid">
                          <TimesheetListing isClientDashboard />
                        </Card>
                      ) : (
                        <Card className="p-40 d-flex mb-lg-5">
                          <PrimarySVG src={TimesheetEmptyIcon} width="40" height="40" className="me-4" />
                          <div>
                            <P className="p20 mb-2">
                              <FormattedMessage {...messages.getStartedTimesheetTitle} />
                            </P>
                            <P className="p16" opacityVal="0.5">
                              <FormattedMessage {...messages.getStartedTimesheetText} />
                            </P>
                            <Button className="btn-primary btn-sm mt-4" onClick={() => redirectTo(history, '/client/talent-listing')}>
                              <FormattedMessage {...messages.hireTalent} />
                            </Button>
                          </div>
                        </Card>
                      )}
                    </div>
                  </LeftCol>
                  <RightCol className="mt-0">
                    {/* this is for future work */}
                    <div className="d-none">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex">
                          <H3>
                            <FormattedMessage {...messages.upcomingPayment} />
                          </H3>
                        </div>
                        <LinkViewAll>
                          <span className="me-2">
                            <FormattedMessage {...containerMessage.btnView} />
                          </span>
                          <PrimaryMainSVG src={rightAngleIcon} />
                        </LinkViewAll>
                      </div>
                      <Card className="p-30">
                        <div className="d-flex">
                          <TileCard className="danger-tile">
                            <SVG src={payIcon} />
                          </TileCard>
                          <div className="ms-3">
                            <H2 className="mb-0">$5000</H2>
                            <P className="p14 mb-0" opacityVal="0.5">
                              June 2021
                            </P>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Button className="btn-primary btn-sm mt-4 w-100">
                            <span>Pay now</span>
                          </Button>
                        </div>
                      </Card>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex">
                          <H3>
                            <FormattedMessage {...messages.teamComposition} />
                          </H3>
                        </div>
                        <LinkViewAll
                          to={{
                            pathname: '/client/talents',
                            state: { fromDashboard: true },
                          }}
                        >
                          <span className="me-2">
                            <FormattedMessage {...containerMessage.btnView} />
                          </span>
                          <PrimaryMainSVG src={rightAngleIcon} />
                        </LinkViewAll>
                      </div>
                      <Card className="p-30">
                        <div>{this.teamComposition(team)}</div>
                        <Button
                          className="btn btn-sm btn-outline w-100 mt-3 btn-plus"
                          onClick={() => redirectTo(history, '/client/talents')}
                        >
                          <SVG src={plusIcon} className="me-2" />
                          <span>
                            <FormattedMessage {...messages.moreCandidates} />
                          </span>
                        </Button>
                      </Card>
                    </div>
                    <Card className="p-30">
                      <TileCard className="secondary-tile">
                        <SVG src={searchJobsIcon} />
                      </TileCard>
                      <div className="mt-3">
                        <P className="p20 mb-2">
                          <FormattedMessage {...messages.hireRoleTitle} />
                        </P>
                        <P className="p16" opacityVal="0.5">
                          <FormattedMessage {...messages.hireRoleText} />
                        </P>
                      </div>
                      <Button className="btn btn-sm btn-outline w-100" onClick={() => this.redirectBuildTeam()}>
                        <span>
                          <FormattedMessage {...messages.hireRoleBtn} />
                        </span>
                      </Button>
                    </Card>
                    <Card className="p-30">
                      <TileCard className="info-tile">
                        <SVG src={MessageIcon} />
                      </TileCard>
                      <div className="mt-3">
                        <P className="p20 mb-2">
                          <FormattedMessage {...messages.feedbackTitle} />
                        </P>
                        <P className="p16" opacityVal="0.5">
                          <FormattedMessage {...messages.feedbackText1} />
                          <br />
                          <FormattedMessage {...messages.feedbackText2} />
                        </P>
                      </div>
                      <Button className="btn btn-sm btn-outline w-100" onClick={() => this.redirectFeedback()}>
                        <span>
                          <FormattedMessage {...messages.feedbackBtn} />
                        </span>
                      </Button>
                    </Card>
                  </RightCol>
                </DBcontainer>
              </PrivateGrid>
            )}
          </Content>
        )}
      </React.Fragment>
    );
  }

  teamComposition(team) {
    return (
      <React.Fragment>
        {team.length > 0 ? (
          <React.Fragment>
            <div className="align-items-center d-flex justify-content-center">
              <PieChart width={116} height={116} onMouseEnter={this.onPieEnter}>
                <Pie data={team} cx={53} cy={53} innerRadius={33} outerRadius={58} fill="#8884d8" paddingAngle={0}>
                  {team.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="mt-3">
              <LegendList className="ms-0">
                {team.map(obj => (
                  <li key={obj.name}>
                    <span style={{ background: `${obj.color}` }} />
                    {obj.name} ({obj.value})
                  </li>
                ))}
              </LegendList>
            </div>
          </React.Fragment>
        ) : (
          <ComingSoon>
            <SVG src={filesIcon} />
            <P>
              <FormattedMessage {...messages.noTalent} />
            </P>
          </ComingSoon>
        )}
      </React.Fragment>
    );
  }
}

ClientHomePage.defaultProps = { history: {}, location: {} };
ClientHomePage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default ClientHomePage;
