/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-duplicates */
/** ClientBriefDetail
 * This is the Projects page for the Client, at the '/client/brief-detail' route
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import { Collapse, Row, Col, NavItem, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import parse from 'html-react-parser';
import SVG from 'react-inlinesvg';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import { VALIDATION } from 'utils/constants';
import { BriefCardSkeleton } from 'components/SkeletonLoader';
import {
  API_URL,
  JOB_POST,
  teamIcon,
  backIcon,
  circleTickIcon,
  projectPlaceholderSM,
  projectPlaceholderXSM,
  yearsOfExperienceArray,
  currencyData,
  teamPreferenceArray,
  arrowRightIcon,
} from 'containers/App/constants';
import Content from 'components/Content';
import { redirectTo } from 'containers/App/utils';
import { CustomNavTab, NavCard, CustomNavLink } from 'components/CustomTab';
import { PrivateGrid, P, H3, ToastifyMessage, Badge, A, Button, Card, SVGIcon } from 'components';
import { redirectBack, getBadgeClass } from 'containers/App/utils';
import { DBcontainer, LeftCol, RightCol } from 'containers/Talent/Dashboard/styles';
import CandidateCard from 'components/CandidateCard';
import { getLabel, getCurrencySymbol, getArrayLabels } from 'containers/MyProfilePage/components/utils';
import { DEFAULT_PAGE_NO, projectStatusArray } from 'containers/constants';
import TeamImgList from 'components/TeamImgList';
import SkillsList from 'components/JobCard/SkillsList';
import JobPreferenceList from 'components/JobCard/JobPreferenceList';
import { ProjectCardLink, CardBlock } from 'components/ProjectCard/styles';
import CardComponent from 'containers/Admin/Talents/CardComponent';
import { JobCardBlock } from 'components/JobCard/styles';
import { defaultProps, propTypes } from 'containers/proptypes';
import AddBrief from 'containers/Client/AddBrief';
import { white } from 'themes/variables';
import ArchiveBriefModal from './ArchiveBriefModal';
import { ViewDetailBtn } from './styles';
import messages from './messages';

export class ClientBriefDetail extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
    } = props;
    const briefID = get(params, 'briefID', '');

    const getBriefListPageNo = StorageService.get('clientBriefDetailsPageNumber');
    const briefListPageNo = JSON.parse(getBriefListPageNo) || DEFAULT_PAGE_NO;
    const userRole = StorageService.get('userType');
    const isAdmin = userRole === '4';
    this.state = {
      briefID,
      showArchiveBriefModal: false,
      talentList: [],
      talentDetails: [],
      hiredTalents: [],
      interviewTalents: [],
      pageNum: briefListPageNo,
      talentId: '',
      showHireModal: false,
      showAllocateModal: false,
      isAdmin,
      isOpen: false,
      isListLoading: false,
      activeTab: '2',
    };
  }

  toggle = tab => {
    const { activeTab } = this.state;
    const requestChangeEmail = parseInt(StorageService.get('requestChangeEmail'), 10);
    if (activeTab !== tab && requestChangeEmail !== 1) {
      this.setState({ activeTab: tab });
    }
  };

  jobDetailtoggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  componentDidMount() {
    this.loadBriefData();
  }

  loadBriefData = () => {
    const { briefID } = this.state;
    const data = { method: 'GET' };
    this.setState({ isListLoading: true });
    const requestURL = `${API_URL}${JOB_POST}/${briefID}`;

    request(requestURL, data)
      .then(this.setBriefData)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setBriefData = response => {
    if (get(response, 'status')) {
      const { isAdmin } = this.state;
      const { data } = response;
      const id = get(data, '_id');

      let projectName = '';
      let projectTeamPreference = '';

      const softSkills = get(data, 'softSkills', []);

      const certifications = get(data, 'certifications', []);

      const languages = get(data, 'languages', []);

      const workPreference = get(data, 'workPreference', []);

      const teamPrefArray = getArrayLabels(get(data, 'teamPreference', []), teamPreferenceArray);
      const teamPreference = get(data, 'teamPreference', []);

      const projectTeamPreferenceArray = getArrayLabels(get(data, 'projectTeamPreference', []), teamPreferenceArray);
      projectTeamPreference += projectTeamPreferenceArray.map(selected => ` ${selected}`);

      const assignments = get(data, 'assignments', []);

      const expertise = getLabel(get(data, 'expertise', ''), yearsOfExperienceArray, 'label');
      const durationData = get(data, 'duration', '');
      const duration = durationData > 1 ? `${durationData} Months` : `${durationData} Month`;

      const projects = get(data, 'project', []);

      let ratePerHour = '';
      if (get(data, 'currency')) {
        const currencySymbol = getCurrencySymbol(currencyData, 'code', get(data, 'currency'));
        ratePerHour = `${currencySymbol || ''}${get(data, 'ratePerHour')}`;
      }
      const briefData = {
        id,
        name: get(data, 'name', ''),
        role: get(data, 'role', ''),
        description: get(data, 'description', ''),
        projectDescription: get(data, 'projectDescription', ''),
        projectTeamPreference,
        isArchived: get(data, 'isArchived'),
        skills: get(data, 'skills', []),
        projectId: get(data, 'projectId', []),
        workPreference,
        teamPreference,
        teamPrefArray,
        assignments,
        expertise,
        duration,
        ratePerHour,
        softSkills,
        certifications,
        languages,
        industry: get(data, 'industry', ''),
        teamWorking: get(data, 'teamWorking', ''),
        discProfile: get(data, 'discProfile', ''),
        timeZone: get(data, 'timeZone', ''),
      };

      if (isAdmin) {
        briefData.companyName = get(data, 'companyName', '-');
        briefData.clientName = get(data, 'clientName', '-');
        briefData.clientId = get(data, 'clientId', '-');
        briefData.clientEmail = get(data, 'clientEmail', '-');
        briefData.projectStatus = get(projects, 'status', '-');
        projectName = (
          <A href={`/admin/project-detail/${get(data, 'projectId')}`} target="_blank">
            {get(data, 'projectName')}
          </A>
        );
      } else {
        briefData.projectStatus = projects[0].status;
        projectName = (
          <A href={`/client/project-detail/${get(data, 'projectId')}`} target="_blank">
            {get(data, 'projectName')}
          </A>
        );
      }
      briefData.projectName = projectName;

      this.setState({
        briefAllData: data,
        briefData,
        isListLoading: false,
        talentDetails: get(data, 'talentDetails', []),
        hiredTalents: get(data, 'hiredTalents', []),
        interviewTalents: get(data, 'interviewTalents', []),
      });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleArchiveBriefCloseModal = () => this.setState({ showArchiveBriefModal: false });

  handleBriefArchived = () => this.setState({ showArchiveBriefModal: false }, () => this.loadBriefData());

  renderTalentList = isListLoading => {
    const { isAdmin, activeTab, talentDetails, hiredTalents, interviewTalents, briefAllData } = this.state;
    const userRole = isAdmin ? 'admin' : 'client';
    const project = {
      projectId: get(briefAllData, 'projectId', ''),
      projectName: get(briefAllData, 'projectName', ''),
      projectDescription: get(briefAllData, 'projectDescription', ''),
    };
    return (
      <React.Fragment>
        {!isListLoading && (
          <React.Fragment>
            <Card className="p-30">
              <NavCard className="tab-sm pb-0 d-flex justify-content-between">
                <CustomNavTab tabs>
                  <NavItem className="d-none">
                    <CustomNavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => {
                        this.toggle('1');
                      }}
                    >
                      <FormattedMessage {...messages.recommended} />
                    </CustomNavLink>
                  </NavItem>
                  <NavItem>
                    <CustomNavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => {
                        this.toggle('2');
                      }}
                    >
                      <FormattedMessage {...messages.applications} /> ({talentDetails.length})
                    </CustomNavLink>
                  </NavItem>
                  <NavItem className="d-none">
                    <CustomNavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => {
                        this.toggle('3');
                      }}
                    >
                      <FormattedMessage {...messages.interviewed} /> ({interviewTalents.length})
                    </CustomNavLink>
                  </NavItem>
                  <NavItem className="d-none">
                    <CustomNavLink
                      className={classnames({ active: activeTab === '4' })}
                      onClick={() => {
                        this.toggle('4');
                      }}
                    >
                      <FormattedMessage {...messages.hired} /> ({hiredTalents.length})
                    </CustomNavLink>
                  </NavItem>
                </CustomNavTab>
              </NavCard>
              <TabContent activeTab={activeTab} className="mt-3">
                <TabPane className="col-md-12 col-lg-10 col-xl-12 p-0" tabId="1">
                  <Row>
                    <Col>asdf</Col>
                  </Row>
                </TabPane>
                <TabPane className="col-md-12 col-lg-10 col-xl-12 p-0" tabId="2">
                  <div className="row">
                    {talentDetails.map(cardItem => (
                      <Col lg={4} md={6} className="d-flex flex-column">
                        <CardComponent talentData={cardItem} userRole={userRole} briefTab="application" project={project} />
                      </Col>
                    ))}
                  </div>
                </TabPane>
                <TabPane className="col-md-12 col-lg-10 col-xl-12 p-0" tabId="3">
                  <div className="row">
                    {interviewTalents.map(cardItem => (
                      <Col lg={4} md={6} className="d-flex flex-column">
                        <CardComponent talentData={cardItem} userRole={userRole} briefTab="interview" project={project} />
                      </Col>
                    ))}
                  </div>
                </TabPane>
                <TabPane className="col-md-12 col-lg-10 col-xl-12 p-0" tabId="4">
                  <div className="row">
                    {hiredTalents.map(cardItem => (
                      <Col lg={4} md={6} className="d-flex flex-column">
                        <CardComponent talentData={cardItem} userRole={userRole} briefTab="hired" project={project} />
                      </Col>
                    ))}
                  </div>
                </TabPane>
              </TabContent>
            </Card>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  hireTalent = (e, id) => {
    e.preventDefault();
    const { briefAllData } = this.state;
    const projectId = get(briefAllData, 'projectId', '');
    const projectName = get(briefAllData, 'projectName', '');
    const projectSummary = get(briefAllData, 'projectDescription', '');
    const hireData = { projectId, projectName, projectSummary };
    this.setState({ showHireModal: true, talentId: id, hireData });
  };

  allocateTalent = (e, id, talentName) => {
    e.preventDefault();
    const { briefAllData } = this.state;
    const projectId = get(briefAllData, 'projectId', '');
    this.setState({ showAllocateModal: true, talentId: id, talentName, projectId });
  };

  getProjectStatus = value => {
    const status = projectStatusArray.find(item => item.value === value);
    return get(status, 'label', '');
  };

  renderBackLink = () => {
    const { isAdmin } = this.state;
    const defaultBack = isAdmin ? '/admin/job-briefs' : '/client/job-briefs';
    const { location, history } = this.props;
    const obj = {
      clientProjectDetails: {
        url: `/client/project-detail/${get(location, 'extra.projectId')}`,
        tab: get(location, 'extra.tab'),
      },
      adminProjectDetails: {
        url: `/admin/project-detail/${get(location, 'extra.projectId')}`,
        tab: get(location, 'extra.tab'),
      },
      adminBriefs: {
        url: `/admin/brief-detail`,
        tab: '',
      },
      clientBriefs: {
        url: `/client/job-briefs`,
        tab: '',
      },
      default: {
        url: defaultBack,
        tab: '',
      },
    };

    const { url, tab } = obj[get(location, 'redirection') || 'default'];
    return (
      <Row>
        <Col lg={9} className="d-flex align-items-center mb-3">
          <Button type="button" onClick={() => redirectBack(history, url, tab)} className="btn-link">
            <SVG src={backIcon} />
          </Button>
          <H3 className="ms-3">
            <FormattedMessage {...messages.jobDetails} />
          </H3>
        </Col>
        <Col lg={3} />
      </Row>
    );
  };

  clientJobCard = () => {
    const { briefData, isAdmin, briefAllData, isOpen, hiredTalents, briefID, showArchiveBriefModal } = this.state;
    const skills = [];
    get(briefAllData, 'skills', []).forEach(skill => skills.push({ label: skill, value: skill }));
    const briefEditData = {
      ...briefAllData,
      briefID: get(briefAllData, '_id', ''),
      isProjectDetails: true,
      projectName: get(briefAllData, 'projectName', '')
        ? { label: get(briefAllData, 'projectName', ''), value: get(briefAllData, 'projectName', '') }
        : '',
      projectDescription: get(briefAllData, 'projectDescription', ''),
      title: get(briefAllData, 'name', ''),
      role: get(briefAllData, 'role', '') ? { label: get(briefAllData, 'role', ''), value: get(briefAllData, 'role', '') } : '',
      description: get(briefAllData, 'description', ''),
      expertiseLevel: get(briefAllData, 'expertise', '')
        ? { label: get(briefAllData, 'expertise', ''), value: get(briefAllData, 'expertise', '') }
        : '',
      duration: get(briefAllData, 'duration', ''),
      skills,

      workPreference: get(briefAllData, 'workPreference', []),
      teamPreference: get(briefAllData, 'teamPreference', []),
      assignments: get(briefAllData, 'assignments', []),
    };
    const projectLink = isAdmin
      ? `/admin/project-detail/${get(briefData, 'projectId')}`
      : `/client/project-detail/${get(briefData, 'projectId')}`;
    return (
      <JobCardBlock className="no-hover">
        <div className="d-flex justify-content-between flex-column">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <SVG src={projectPlaceholderXSM} className="project-placeholder" />
                <P className="p16 text-primary text-decoration-underline mb-0">{get(briefData, 'projectName')}</P>
              </div>

              <div className="d-flex align-items-center">
                {!get(briefData, 'isArchived') ? (
                  <>
                    <div role="button" tabIndex={0} className="ms-3" onClick={e => e.stopPropagation()} onKeyDown={() => {}}>
                      <ArchiveBriefModal
                        briefID={briefID}
                        showArchiveBriefModal={showArchiveBriefModal}
                        handleArchiveBriefCloseModal={this.handleArchiveBriefCloseModal}
                        handleBriefArchived={this.handleBriefArchived}
                      />
                    </div>
                    <div>
                      <AddBrief type="edit" isAdmin={isAdmin} loadDetails={this.loadBriefData} {...briefEditData} />
                    </div>
                  </>
                ) : (
                  <div className="d-flex align-items-center ms-3">
                    <SVG src={circleTickIcon} />
                    <P className="p14 mb-0 text-success ms-2">
                      <FormattedMessage {...messages.archived} />
                    </P>
                  </div>
                )}
              </div>
            </div>
            <P className="mb-0 p16" opacityVal="0.5">
              {get(briefData, 'expertise')}
            </P>
            <div className="d-flex justify-content-between align-items-center">
              <P className="p20 mt-2">{get(briefData, 'name', '')}</P>
              {get(briefData, 'ratePerHour') && (
                <div className="d-flex">
                  <P className="p16 mb-0 text-primary">
                    {getCurrencySymbol(currencyData, 'code', get(briefData, 'currency'))}
                    {get(briefData, 'ratePerHour')}
                  </P>
                  <P className="p16 mb-0 no-hover" opacityVal="0.5">
                    /hour
                  </P>
                </div>
              )}
            </div>
            <SkillsList skills={get(briefData, 'skills')} />
            <JobPreferenceList
              workPreference={get(briefData, 'workPreference')}
              duration={get(briefData, 'duration')}
              assignments={get(briefData, 'assignments')}
              teamPreference={get(briefData, 'teamPreference')}
              ratePerHour={get(briefData, 'ratePerHour')}
            />
            <div className="d-flex justify-content-center mt-5">
              <ViewDetailBtn type="button" className={`${isOpen ? 'card-expanded' : ''} btn`} onClick={this.jobDetailtoggle}>
                {`${!isOpen ? 'View' : 'Close'} job details`}
              </ViewDetailBtn>
            </div>
            <Collapse isOpen={isOpen}>
              <hr />
              <div className="pt-1">
                <P className="p16">
                  <FormattedMessage {...messages.jobDescription} />
                </P>
                <P className="p16" opacityVal="0.5">
                  {get(briefData, 'description') && parse(get(briefData, 'description'))}
                </P>
              </div>
              <hr className="mt-3 pb-3" />
              <ProjectCardLink
                to={{
                  pathname: projectLink,
                }}
              >
                <CardBlock>
                  {get(briefData, 'logo') ? (
                    <div className="icon-container has-profile-img">
                      <img
                        src={`${get(briefData, 'logo')}?_t=${new Date().getTime()}`}
                        className="img-fluid"
                        alt={get(briefData, 'name')}
                      />
                    </div>
                  ) : (
                    <div className="icon-container">
                      <SVG src={projectPlaceholderSM} />
                    </div>
                  )}
                  <Badge className={`${getBadgeClass(this.getProjectStatus(get(briefData, 'projectStatus')))} badge-sm mb-0`}>
                    {this.getProjectStatus(get(briefData, 'projectStatus'))}
                  </Badge>
                  <P className="p20 user-title">
                    <HTMLEllipsis unsafeHTML={get(briefAllData, 'projectName', '-')} maxLine="1" ellipsis="..." basedOn="letters" />
                  </P>
                  <P className="p16" lineHeight="22" opacityVal="0.5">
                    <HTMLEllipsis unsafeHTML={get(briefData, 'projectDescription', '-')} maxLine="2" ellipsis="..." basedOn="letters" />
                  </P>
                  <div className="d-flex">
                    <TeamImgList data={hiredTalents} displayImgCount={4} className="me-4" />
                    {get(briefData, 'projectTeamPreference') && (
                      <div className={`d-flex align-items-center ${hiredTalents.length > 0 && 'ms-4'}`}>
                        <SVG src={teamIcon} width="20" height="20" />
                        <P className="p16 ms-2 mb-0">{get(briefData, 'projectTeamPreference')}</P>
                      </div>
                    )}
                  </div>
                </CardBlock>
              </ProjectCardLink>
            </Collapse>
          </div>
        </div>
      </JobCardBlock>
    );
  };

  render() {
    const { briefData, isListLoading, isAdmin, briefAllData } = this.state;
    const { history } = this.props;

    const yearsOfExperience = getLabel(get(briefData, 'expertise', ''), yearsOfExperienceArray, 'label');
    const teamPreference = get(briefData, 'teamPreference');
    const workPreference = get(briefData, 'workPreference');
    const assignment = get(briefData, 'assignments');
    const skillsArray = get(briefData, 'skills');

    const skills = [];
    get(briefAllData, 'skills', []).forEach(skill => skills.push({ label: skill, value: skill }));

    const userRole = isAdmin ? 'admin' : 'client';
    const searchCandidatePath = userRole === 'admin' ? 'talents' : 'talent-listing';

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            {this.renderBackLink()}
            {isListLoading ? (
              <BriefCardSkeleton />
            ) : (
              <DBcontainer>
                <LeftCol>
                  {this.clientJobCard()}
                  {/* talentList */}
                  {this.renderTalentList(isListLoading)}
                </LeftCol>
                <RightCol className="mt-0 order-2">
                  <CandidateCard briefData={briefData} />

                  <Button
                    className="btn btn-primary btn-sm w-100 mb-4"
                    onClick={e => {
                      e.stopPropagation();
                      let filterObject = {};
                      StorageService.set('filterObject', JSON.stringify(filterObject));
                      filterObject = { yearsOfExperience, teamPreference, workPreference, assignment, skillsArray };
                      StorageService.set('filterObject', JSON.stringify(filterObject));
                      redirectTo(history, `/${userRole}/${searchCandidatePath}`);
                    }}
                  >
                    <FormattedMessage {...messages.searchCandidate} />
                    <SVGIcon src={arrowRightIcon} iconColor={`rgb(${white})`} className="ms-2" />
                  </Button>
                </RightCol>
              </DBcontainer>
            )}
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

ClientBriefDetail.defaultProps = defaultProps;
ClientBriefDetail.propTypes = propTypes;

export default ClientBriefDetail;
