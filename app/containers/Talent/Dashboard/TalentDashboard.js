/* * TalentDashboard * */

import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Content from 'components/Content';
import ReactModal from 'react-modal';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import StorageService from 'utils/StorageService';
import request from 'utils/request';
import { LinkMod } from 'components/A';
import { BriefCardSkeleton } from 'components/SkeletonLoader';
import { getUserRegisterType } from 'utils/Helper';
import injectSaga from 'utils/injectSaga';
import { VALIDATION } from 'utils/constants';
import { redirectTo, checkTalentSignupIsCompleted, redirectPageURL } from 'containers/App/utils';
import { makeSelectLoading, makeSelectPopUpSaga } from 'containers/App/selectors';
import ReferEarn from 'containers/Talent/ReferEarn';
import {
  JOB_POST,
  API_URL,
  TALENT,
  PROJECT_API,
  LIST,
  userProfileIcon,
  editNoteIcon,
  circleTickIcon,
  professionIcon,
  yearsOfExperienceArray,
  timeXZone,
} from 'containers/App/constants';
import { getLabel, getTimzoneOffest } from 'containers/MyProfilePage/components/utils';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import { Card, PrivateGrid, Badge, H5, P, H3, Button, ToastifyMessage, ProgressMod } from 'components';
import ProjectCard from 'components/ProjectCard';
import JobCard from 'components/JobCard';
import { UserBulletPointList } from 'containers/Auth/SignUp/signup-styles';
import { primaryNew, primaryDarkNew } from 'themes/variables';
import containerMessage from 'containers/messages';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import messages from './messages';
import { key } from './constants';
import { propTypes } from './proptypes';
import { getTotalStepCount } from './utils';
import {
  LinkViewAll,
  DBcontainer,
  LeftCol,
  RightCol,
  ProfileImg,
  CircularProgressbarBlock,
  SkillListing,
  ProfileEdit,
  SkillIcon,
} from './styles';
import 'react-circular-progressbar/dist/styles.css';

export class TalentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChangeEmailModal: false,
      inviteLink: '',
      roleType: getUserRegisterType(),
      userDetails: props.userData,
      projectList: [],
      jobList: [],
      isJobCardsLoading: true,
    };
  }

  componentDidMount() {
    const { userDetails } = this.state;
    this.fetchFieldValues(userDetails);
    this.loadActiveProjects();
    this.loadJobBriefs();
  }

  loadActiveProjects = () => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${TALENT}${PROJECT_API}${LIST}`;
    request(requestURL, data)
      .then(this.setActiveProjectDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
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

  setActiveProjectDetails = response => {
    if (get(response, 'status')) {
      this.setState({ projectList: response.data.docs });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  setJobBriefs = response => {
    if (get(response, 'status')) {
      this.setState({ jobList: response.data.docs, isJobCardsLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  /**
   * call on open popup
   * @author Innovify
   */
  handleChangeEmailOpenModal = () => {
    this.setState({ showChangeEmailModal: true });
  };

  fetchFieldValues = response => {
    if (get(response, 'status')) {
      if (response.data.requestChangeEmail === 1) {
        this.handleChangeEmailOpenModal();
      }
      const currentHost = window.location.host;
      const inviteLink = `https://${currentHost}/talent/referral/${get(response, 'data._id')}`;
      this.setState({ inviteLink });
    }
  };

  changeEmail = () => {
    const { history } = this.props;
    redirectTo(history, '/talent/account-settings');
  };

  /** call on close button click
   * @author Innovify
   */
  handleProflePhotoCloseModal = () => {
    const { dispatch } = this.props;
    dispatch(popUpSagaAction(false));
  };

  renderModal = () => {
    const { showChangeEmailModal } = this.state;
    return (
      <React.Fragment>
        <ReactModal
          isOpen={showChangeEmailModal}
          contentLabel="Change Email"
          onRequestClose={this.handleProflePhotoCloseModal}
          className="modal-dialog secondary-modal"
          style={{ overlay: { zIndex: 12 } }}
          shouldCloseOnOverlayClick={false}
          ariaHideApp={false}
          ariaModal
        >
          <div className="modal-content">
            <div className="modal-body">
              <P className="p16" opacityVal="0.5">
                <FormattedMessage {...messages.changeEmailContent} />
              </P>
              <div className="d-flex justify-content-end mt-5">
                <Button type="button" className="btn btn-primary btn-sm" onClick={this.changeEmail}>
                  <FormattedMessage {...messages.BtnChangeProfile} />
                </Button>
              </div>
            </div>
          </div>
        </ReactModal>
      </React.Fragment>
    );
  };

  renderJobCards = () => {
    const { isJobCardsLoading, jobList, projectList } = this.state;
    const displayJobCardCount = projectList.length > 0 ? 3 : 5;

    let output = '';
    if (isJobCardsLoading) {
      output = <BriefCardSkeleton cardCount={3} />;
    } else {
      output = (
        <JobCard
          jobList={jobList.slice(0, displayJobCardCount)}
          {...this.props}
          loadJobBriefs={() => this.loadJobBriefs()}
          userRole="talent"
        />
      );
    }
    return output;
  };

  render() {
    const { roleType, projectList, jobList, userDetails, inviteLink } = this.state;

    const isSignupCompleted = checkTalentSignupIsCompleted(roleType);
    const userVersion = StorageService.get('userVersion');
    const apiSignupStep = Number(StorageService.get('apiSignupStep'));
    const updatedApiSignupStep = apiSignupStep === 0.1 ? 1 : apiSignupStep;
    const step = userVersion === 'v2' ? updatedApiSignupStep + 1 : updatedApiSignupStep;

    const count = getTotalStepCount();
    const temp = apiSignupStep === 0.1 ? 0 : apiSignupStep;
    const value = count === 0 ? 0 : Math.round((100 / count) * temp);
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <DBcontainer>
              <LeftCol>
                {projectList.length > 0 ? (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex">
                        <H3>
                          <FormattedMessage {...messages.activeProjects} />
                        </H3>
                        <Badge className="badge-sm ms-2 primary">{projectList.length}</Badge>
                      </div>
                      <LinkViewAll
                        to={{
                          pathname: '/talent/my-projects',
                          state: { fromDashboard: true },
                        }}
                      >
                        <FormattedMessage {...containerMessage.linkViewAll} />
                      </LinkViewAll>
                    </div>
                    <ProjectCard projectList={projectList.slice(0, 3)} fromDashboard />
                  </div>
                ) : (
                  ''
                )}
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex">
                      <H3>
                        <FormattedMessage {...messages.recommededJobs} />
                      </H3>
                      <Badge className="badge-sm ms-2 primary">{jobList.length}</Badge>
                    </div>
                    <LinkViewAll
                      to={{
                        pathname: '/talent/job-briefs',
                        state: { fromDashboard: true },
                      }}
                    >
                      <FormattedMessage {...containerMessage.linkViewAll} />
                    </LinkViewAll>
                  </div>
                  {this.renderJobCards()}
                  <ReferEarn inviteLink={inviteLink} {...this.props} />
                </div>
              </LeftCol>
              <RightCol>
                <Card>
                  <ProfileImg className={get(userDetails, 'data.profilePicture') ? 'has-img' : ''}>
                    {get(userDetails, 'data.profilePicture') ? (
                      <img
                        src={`${get(userDetails, 'data.profilePicture', '')}?_t=${new Date().getTime()}`}
                        className="img-fluid"
                        alt="user profile"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = userProfileIcon;
                        }}
                      />
                    ) : (
                      <SVG src={userProfileIcon} />
                    )}
                  </ProfileImg>
                  <ProfileEdit className="d-flex justify-content-end">
                    <Link className="profile-edit ms-auto" to={{ pathname: redirectPageURL(1), state: { fromMyProfile: true } }}>
                      <SVG src={editNoteIcon} />
                    </Link>
                  </ProfileEdit>
                  <H3 className="mb-1">
                    {get(userDetails, 'data.firstName') ? (
                      <>
                        {get(userDetails, 'data.firstName')} {get(userDetails, 'data.lastName').charAt(0)}.
                      </>
                    ) : (
                      <>&nbsp;</>
                    )}
                  </H3>
                  <P className="p14 mb-0" opacityVal="0.5">
                    {get(userDetails, 'data.city') ? (
                      <>
                        {get(userDetails, 'data.city')}, {get(userDetails, 'data.country')} (
                        {getTimzoneOffest(timeXZone, 'name', get(userDetails, 'data.timeZone'))})
                      </>
                    ) : (
                      <>&nbsp;</>
                    )}
                  </P>
                  <hr />
                  <P className="p14 mb-2" opacityVal="0.5">
                    {get(userDetails, 'data.yearsOfExperience') ? (
                      <>{getLabel(get(userDetails, 'data.yearsOfExperience', ''), yearsOfExperienceArray, 'label')}</>
                    ) : (
                      <>&nbsp;</>
                    )}
                  </P>
                  <H5>{get(userDetails, 'data.primaryRole') ? <>{get(userDetails, 'data.primaryRole')}</> : <>&nbsp;</>}</H5>
                  <hr />
                  {get(userDetails, 'data.skills', []).length > 0 ? (
                    <>
                      <div className="d-flex align-items-center mt-3">
                        <SkillIcon className="me-2" src={professionIcon} />
                        <P className="p14 mb-0">
                          <FormattedMessage {...containerMessage.yourTopSkills} />
                        </P>
                      </div>
                      <SkillListing>
                        {get(userDetails, 'data.skills')
                          .slice(0, 7)
                          .map(s => (
                            <li key={s.name}>
                              <div className="d-flex">
                                <Badge className="badge-sm primary">{s.name}</Badge>
                              </div>
                              <ProgressMod value={s.rate} max={10} className="sm ms-auto" />
                            </li>
                          ))}
                      </SkillListing>
                    </>
                  ) : (
                    <>
                      <CircularProgressbarBlock>
                        <CircularProgressbar
                          value={value}
                          text={`${value}%`}
                          strokeWidth={7}
                          styles={buildStyles({
                            rotation: 0.25,
                            textSize: '23px',
                            pathTransitionDuration: 0.15,
                            pathColor: `rgba(${primaryNew})`,
                            textColor: `rgb(${primaryDarkNew})`,
                            trailColor: '#D9D8FF',
                          })}
                        />
                      </CircularProgressbarBlock>
                      <P className="p16">
                        <FormattedMessage {...messages.profileInfoContent} />
                      </P>
                      <UserBulletPointList>
                        <li>
                          <SVG src={circleTickIcon} />
                          <P className="p16" opacityVal="0.5">
                            <FormattedMessage {...messages.listContent1} />
                          </P>
                        </li>
                        <li>
                          <SVG src={circleTickIcon} />
                          <P className="p16" opacityVal="0.5">
                            <FormattedMessage {...messages.listContent2} />
                          </P>
                        </li>
                        <li>
                          <SVG src={circleTickIcon} />
                          <P className="p16" opacityVal="0.5">
                            <FormattedMessage {...messages.listContent3} />
                          </P>
                        </li>
                      </UserBulletPointList>
                    </>
                  )}
                  {!isSignupCompleted ? (
                    <LinkMod to={{ pathname: redirectPageURL(step) }} className="btn btn-primary w-100 px-1 btn-sm mt-4">
                      <FormattedMessage {...containerMessage.BtnProfileComplete} />
                    </LinkMod>
                  ) : (
                    ''
                  )}
                </Card>
              </RightCol>
            </DBcontainer>
          </PrivateGrid>
        </Content>
        {this.renderModal()}
      </React.Fragment>
    );
  }
}

TalentDashboard.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  inviteMails: selectors.makeSelectInviteMails(),
  loading: makeSelectLoading(),
  popUpSaga: makeSelectPopUpSaga(),
  firstName: selectors.firstName,
  lastName: selectors.lastName,
  email: selectors.email,
  currency: selectors.currency,
  rate: selectors.rate,
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeInvite: data => dispatch(actions.changeInvite(data)),
    onSubmitInviteMails: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.submitInviteMails());
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
)(TalentDashboard);
