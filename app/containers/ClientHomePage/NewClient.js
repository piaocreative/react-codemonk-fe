/* eslint-disable react/prop-types */
/*
 * NewClient
 */

import React from 'react';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import containerMessage from 'containers/messages';
import SVG from 'react-inlinesvg';
import { PrivateGrid, Card, ToastifyMessage, H3, Badge, P, Button } from 'components';
import { redirectTo } from 'containers/App/utils';
import StorageService from 'utils/StorageService';
import { UserBulletPointList } from 'containers/Auth/SignUp/signup-styles';
import { DEFAULT_PAGE_SIZE } from 'containers/constants';
import AddBrief from 'containers/Client/AddBrief';
import AddProject from 'containers/Admin/Projects/AddProject';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import {
  teamIcon,
  projectEmptyIcon,
  JobEmptyIcon,
  TimesheetEmptyIcon,
  circleTickIcon,
  searchJobsIcon,
  MessageIcon,
  API_URL,
  JOB_POST,
  LIST,
  downloadIcon,
} from 'containers/App/constants';
import { DBcontainer, LeftCol, RightCol, LinkViewAll } from 'containers/Talent/Dashboard/styles';
import messages from './messages';
import { PrimarySVG, TileCard } from './styles';

export class NewClient extends React.Component {
  constructor(props) {
    super(props);
    const userRole = StorageService.get('userType');
    const isAdmin = userRole === '4';
    this.state = {
      isAdmin,
    };
  }

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

  loadProjectDetails = () => {
    const { history } = this.props;
    redirectTo(history, '/client/projects');
  };

  render() {
    const { isAdmin } = this.state;
    const { history } = this.props;
    return (
      <PrivateGrid className="d-flex flex-column flex-1">
        <DBcontainer>
          <LeftCol>
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex">
                  <H3>
                    <FormattedMessage {...messages.projects} />
                  </H3>
                  <Badge className="badge-sm ms-2 primary">0</Badge>
                </div>
              </div>
              <Card className="p-40 d-flex mb-lg-5">
                <PrimarySVG src={projectEmptyIcon} width="40" height="40" className="me-4" />
                <div>
                  <P className="p20 mb-2">
                    <FormattedMessage {...messages.getStartedProjectTitle} />
                  </P>
                  <P className="p16" opacityVal="0.5">
                    <FormattedMessage {...messages.getStartedProjectText} />
                  </P>
                  <AddProject
                    btnTitle={messages.btnCreateProject.defaultMessage}
                    btnClassName="btn-primary mt-4 btn btn-sm"
                    {...this.props}
                    loadProjectDetails={() => this.loadProjectDetails()}
                    isClientProject
                    isClientDashboard
                  />
                </div>
              </Card>
            </div>
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex">
                  <H3>
                    <FormattedMessage {...messages.jobBriefs} />
                  </H3>
                  <Badge className="badge-sm ms-2 primary">0</Badge>
                </div>
              </div>
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
            </div>
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex">
                  <H3>
                    <FormattedMessage {...containerMessage.tabTimesheet} />
                  </H3>
                  <Badge className="badge-sm ms-2 primary">0</Badge>
                </div>
              </div>
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
            </div>
          </LeftCol>
          <RightCol className="mt-0 order-2">
            <Card className="p-30">
              <TileCard className="danger-tile">
                <SVG src={teamIcon} width="20" height="20" />
              </TileCard>
              <div className="mt-3">
                <P className="p20 mb-2">
                  <FormattedMessage {...messages.buildTeamTitle} />
                </P>
                <P className="p16" opacityVal="0.5">
                  <FormattedMessage {...messages.buildTeamText} />
                </P>
              </div>
              <UserBulletPointList>
                <li>
                  <SVG src={circleTickIcon} />
                  <P className="p16">
                    <FormattedMessage {...messages.buildTeamOption1} />
                  </P>
                </li>
                <li>
                  <SVG src={circleTickIcon} />
                  <P className="p16">
                    <FormattedMessage {...messages.buildTeamOption2} />
                  </P>
                </li>
                <li>
                  <SVG src={circleTickIcon} />
                  <P className="p16">
                    <FormattedMessage {...messages.buildTeamOption3} />
                  </P>
                </li>
              </UserBulletPointList>
            </Card>
            <Card className="p-30">
              <TileCard className="secondary-tile">
                <SVG src={searchJobsIcon} width="20" height="20" />
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
                <SVG src={MessageIcon} width="20" height="20" />
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
    );
  }
}

NewClient.defaultProps = {};
NewClient.propTypes = {};

export default NewClient;
