/** MyProfilePage
 * This is the Signup page for the App, at the '/my-profile' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import { VALIDATION } from 'utils/constants';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import Emitter from 'utils/emitter';
import { getUserRegisterType } from 'utils/Helper';
import { PrivateGrid } from 'components';
import ToastifyMessage from 'components/ToastifyMessage';
import { API_URL, DETAILS, TALENT } from 'containers/App/constants';
import { redirectToPage, redirectBack } from 'containers/App/utils';
import { loadUserDetails } from 'containers/Auth/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import Skills from './components/Skills';
import OtherSkills from './components/OtherSkills';
import KeyProjects from './components/KeyProjects';
import WorkExperience from './components/WorkExperience';
import Availability from './components/Availability';
import Education from './components/Education';
import PaymentRate from './components/PaymentRate';
import Languages from './components/Languages';
import Certificate from './components/Certificate';
import Preferences from './components/Preferences';
import MyProfile from './components/MyProfile';
import { BackLink, ProfileContent } from './styles';
import messages from './messages';

export class MyProfilePage extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const talentID = get(params, 'talentID', '');
    this.state = {
      talentID,
      list: {},
      userRole: StorageService.get('userType'),
      roleType: getUserRegisterType(),
      commonProps: {
        loadProfileData: () => this.loadProfileData(),
        modalOpen: currentModal => this.modalOpen(currentModal),
        modalClose: () => this.modalClose(),
        currentModal: '',
      },
    };
  }

  componentDidMount() {
    this.loadProfileData();
    Emitter.on('editIntro', this.setMyProfileDetails);
  }

  loadProfileData = () => {
    const { userRole } = this.state;
    if (userRole !== '1') {
      this.loadTalentDetails();
    } else {
      loadUserDetails(this.setMyProfileDetails);
    }
  };

  componentWillUnmount() {
    Emitter.off('editIntro');
    StorageService.delete('talentId');
  }

  setMyProfileDetails = response => {
    if (get(response, 'status')) {
      const { history, location } = this.props;
      const { roleType } = this.state;
      const currentSignupStep = has(response, 'data.signupStep') === true ? get(response, 'data.signupStep') + 1 : 1;
      if (roleType === 'talent_agency' && currentSignupStep <= 5) {
        redirectToPage(history, location.redirection, currentSignupStep, 7);
      }

      this.setState({ list: response.data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  loadTalentDetails = () => {
    const data = { method: 'GET' };
    const { talentID } = this.state;
    const requestURL = `${API_URL}${TALENT}${DETAILS}/${talentID}`;
    request(requestURL, data)
      .then(this.setTalentProfileDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setTalentProfileDetails = response => {
    if (get(response, 'status')) {
      this.setState({ list: response.data });
      StorageService.set('talentId', get(response, 'data.talentUserId', ''), { hash: true });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  modalOpen = currentModal => {
    const { commonProps } = this.state;
    commonProps.currentModal = currentModal;
    this.setState({ commonProps });
  };

  modalClose = () => {
    const { commonProps } = this.state;
    commonProps.currentModal = '';
    this.setState({ commonProps });
  };

  renderBackLink = () => {
    const { location, history } = this.props;
    const { userRole } = this.state;
    const defaultBack = userRole === '4' ? '/admin/talents' : '/client/talent-listing';
    const obj = {
      clientTalentList: {
        url: '/client/talents',
        label: messages.backToTalent.defaultMessage,
        tab: '',
      },
      clientProjectDetails: {
        url: `/client/project-detail/${get(location, 'extra.projectId')}`,
        label: messages.backToProjectDetails.defaultMessage,
        tab: get(location, 'extra.tab'),
      },
      agencyProjectDetails: {
        url: `/agency/agency-project-detail/${get(location, 'extra.projectId')}`,
        label: messages.backToProjectDetails.defaultMessage,
        tab: get(location, 'extra.tab'),
      },
      adminProjectDetails: {
        url: `/admin/project-detail/${get(location, 'extra.projectId')}`,
        label: messages.backToProjectDetails.defaultMessage,
        tab: get(location, 'extra.tab'),
      },
      adminTalentList: {
        url: `/admin/talents`,
        label: messages.backToTalent.defaultMessage,
        tab: '',
      },
      agencyMyTeam: {
        url: '/agency/my-team',
        label: messages.backToAgencyMyTeam.defaultMessage,
        tab: '',
      },
      adminBriefDetails: {
        url: `/admin/brief-detail/${get(location, 'extra.briefId')}`,
        label: messages.backToBriefDetail.defaultMessage,
        tab: '',
      },
      clientBriefDetails: {
        url: `/client/brief-detail/${get(location, 'extra.briefId')}`,
        label: messages.backToBriefDetail.defaultMessage,
        tab: '',
      },
      agencyTimesheets: {
        url: `/agency/timesheets`,
        label: messages.backToTimesheets.defaultMessage,
        tab: '',
      },
      clientTimesheets: {
        url: `/client/timesheets`,
        label: messages.backToTimesheets.defaultMessage,
        tab: '',
      },
      adminTimesheets: {
        url: `/admin/timesheets`,
        label: messages.backToTimesheets.defaultMessage,
        tab: '',
      },
      default: {
        url: defaultBack,
        label: messages.backToTalent.defaultMessage,
        tab: '',
      },
    };
    const { url, label, tab } = obj[get(location, 'redirection') || 'default'];
    return (
      <BackLink data-testid="backLink" onClick={() => redirectBack(history, url, tab)}>
        {label}
      </BackLink>
    );
  };

  render() {
    const { list, commonProps, userRole, talentID, roleType } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ProfileContent>
          <PrivateGrid>
            {userRole !== '1' ? this.renderBackLink() : ''}
            {!isEmpty(list) && (
              <Row>
                <Col className="col-12 col-lg-8 col-xl-9">
                  <MyProfile talentID={talentID} data={list} role={userRole} {...commonProps} />
                  <Skills data={list.skills} role={userRole} {...commonProps} />
                  {get(list, 'skills', []).length > 7 ? <OtherSkills data={list.skills} role={userRole} {...commonProps} /> : ''}
                  <KeyProjects data={list.projectDetails} workExperience={list.workExperience} role={userRole} {...commonProps} />
                  <WorkExperience data={list.workExperience} role={userRole} {...commonProps} />
                  <Education data={list.educationDetails} role={userRole} {...commonProps} />
                  <Certificate data={list.certificateDetails} role={userRole} {...commonProps} />
                </Col>
                <Col className="col-12 col-lg-4 col-xl-3">
                  {roleType !== 'talent_agency' ? <PaymentRate data={list} role={userRole} /> : ''}
                  <Languages data={list.language} role={userRole} {...commonProps} />
                  <Preferences
                    teamPreferenceData={list.teamPreference}
                    assignmentsData={list.assignments}
                    workPreferenceData={list.workPreference}
                    industryData={list.industries}
                    companyCultureData={list.companyCultures}
                    companyTypeData={list.companyType}
                    preferredProjectDurationData={list.preferredProjectDuration}
                    role={userRole}
                    {...commonProps}
                  />
                  <Availability data={list} role={userRole} {...commonProps} />
                </Col>
              </Row>
            )}
          </PrivateGrid>
        </ProfileContent>
      </React.Fragment>
    );
  }
}

MyProfilePage.defaultProps = defaultProps;
MyProfilePage.propTypes = propTypes;

export default MyProfilePage;
