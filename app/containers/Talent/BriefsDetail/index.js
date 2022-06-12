/** BriefsDetail
 * This is the Projects page for the Talent, at the '/talent/brief-detail' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import SVG from 'react-inlinesvg';
import { toast } from 'react-toastify';
import { Row, Col } from 'reactstrap';
import get from 'lodash/get';
import parse from 'html-react-parser';
import request from 'utils/request';
import { BriefCardSkeleton } from 'components/SkeletonLoader';
import CandidateCard from 'components/CandidateCard';
import { VALIDATION } from 'utils/constants';
import {
  API_URL,
  JOB_POST,
  teamIcon,
  currencyData,
  yearsOfExperienceArray,
  timeXZone,
  circleTickIcon,
  assignmentArray,
  teamPreferenceArray,
  logoPlaceholder,
  linkedinNewIcon,
  facebookIcon,
  dribbleIcon,
  earnIcon,
  calendarIcon,
  payIcon,
  backIcon,
  watchIcon,
  pinIcon,
  projectPlaceholderSM,
  CM_LINKEDIN_URL,
  CM_DRIBBLE_URL,
  CM_FACEBOOK_URL,
} from 'containers/App/constants';
import { projectStatusArray } from 'containers/constants';
import StorageService from 'utils/StorageService';
import Content from 'components/Content';
import TeamImgList from 'components/TeamImgList';
import { PrivateGrid, H3, H4, Button, ToastifyMessage, Badge, P, Card } from 'components';
import { LeftCol, RightCol, DBcontainer } from 'containers/Talent/Dashboard/styles';
import { redirectTo } from 'containers/App/utils';
import { LampCard } from 'containers/Client/Briefs/styles';
import { getLabel, getArrayLabels, getCurrencySymbol, getTimzoneOffest, languageLabel } from 'containers/MyProfilePage/components/utils';
import { projectPreference } from 'containers/Talent/Briefs/constants';
import { PreferencesList } from 'containers/MyProfilePage/styles';
import { defaultProps, propTypes } from 'containers/proptypes';
import ApplyBrief from 'containers/Talent/ApplyBrief';
import { SocialLinks } from 'components/Footer/footer-style';
import messages from './messages';
import { SecondSVG, PathSVG } from '../Briefs/styles';

export class BriefsDetail extends React.Component {
  constructor(props) {
    super(props);
    const isPaymentSkippedGet = StorageService.get('isPaymentSkipped');
    const isPaymentSkipped = isPaymentSkippedGet === 'true';
    const {
      match: { params },
    } = props;
    const briefID = get(params, 'briefID', '');
    this.state = {
      isPaymentSkipped,
      briefID,
      isOpen: false,
      isLoading: false,
    };
  }

  jobDetailtoggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  componentDidMount() {
    this.loadBriefDetailData();
  }

  loadBriefDetailData = () => {
    const data = { method: 'GET' };
    const { briefID } = this.state;
    const requestURL = `${API_URL}${JOB_POST}/${briefID}`;
    this.setState({
      isLoading: true,
    });

    request(requestURL, data)
      .then(this.setBriefDetailData)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  getProjectStatus = value => {
    const status = projectStatusArray.find(item => item.value === value);
    return get(status, 'label', '');
  };

  handleApplyClick = e => {
    e.preventDefault();
  };

  setBriefDetailData = response => {
    if (get(response, 'status')) {
      const { data } = response;

      const id = get(data, '_id');

      let workPreference = '';
      let teamPreference = '';
      let assignments = '';

      const softSkills = get(data, 'softSkills', []);

      const certifications = get(data, 'certifications', []);

      const languages = get(data, 'languages', []);

      const workPreferenceArray = getArrayLabels(get(data, 'workPreference', ''), projectPreference);
      workPreference += workPreferenceArray.map(selected => ` ${selected}`);

      const teamPrefArray = getArrayLabels(get(data, 'teamPreference', ''), teamPreferenceArray);
      const vaildTeamPrefArray = teamPrefArray.filter(i => i);
      teamPreference += vaildTeamPrefArray.map(selected => ` ${selected}`);

      const assignmentsArray = getArrayLabels(get(data, 'assignments', ''), assignmentArray);
      assignments += assignmentsArray.map(selected => ` ${selected}`);

      const expertise = getLabel(get(data, 'expertise', ''), yearsOfExperienceArray, 'label');
      const durationData = get(data, 'duration', '');
      const duration = durationData > 1 ? `${durationData} Months` : `${durationData} Month`;

      const project = get(data, 'project', {});
      const projectStatus = project ? project.status : '';
      const projectName = get(data, 'projectName', '');
      const projectDescription = get(data, 'projectDescription', '');

      const talents = get(data, 'talentDetails', []);
      const company = get(data, 'company');
      const companyName = get(data, 'companyName', '');

      let companyTimeZone = '';
      if (company) {
        companyTimeZone = get(company, 'timeZone', '');
      }

      let ratePerHour = '';
      if (get(data, 'currency')) {
        const currencySymbol = getCurrencySymbol(currencyData, 'code', get(data, 'currency'));
        ratePerHour = `${currencySymbol || ''}${get(data, 'ratePerHour')}`;
      }

      const userData = get(data, 'userData', '');

      const briefData = {
        id,
        name: get(data, 'name', ''),
        role: get(data, 'role', ''),
        description: get(data, 'description', ''),
        isApplied: get(data, 'isApplied'),
        skills: get(data, 'skills', ''),
        jobId: get(data, 'jobId', ''),
        hiredTalents: get(data, 'hiredTalents', ''),
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
        projectStatus,
        projectName,
        projectDescription,
        talents,
        companyName,
        companyTimeZone,
        userData,
      };
      this.setState({ briefData, isLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleActiveField = (value, type) => {
    const { briefData } = this.state;
    const userData = get(briefData, 'userData', {});
    const userDataSkill = get(userData, 'skills', []);
    let isActive = 'secondary';
    let matchItem;
    let userTeamTypes = [];
    switch (type) {
      case 'expertise':
        matchItem = getLabel(get(userData, 'yearsOfExperience', ''), yearsOfExperienceArray, 'label') === value && true;
        break;
      case 'skills':
      case 'softSkills':
        matchItem = userDataSkill.find(item => item.name === value);
        break;
      case 'language':
        matchItem = get(userData, type, []).find(item => languageLabel(item) === value);
        break;
      case 'timeZone':
        matchItem = get(userData, type) === value && true;
        break;
      case 'industries':
        matchItem = get(userData, type, []).find(item => item === value);
        break;
      case 'teamPreference':
        userTeamTypes = getArrayLabels(get(userData, type, []), teamPreferenceArray);
        matchItem = userTeamTypes.find(item => item === value);
        break;
      case 'certificateDetails':
        matchItem = get(userData, type, []).find(item => item.name === value);
        break;
      default:
        isActive = 'secondary';
        break;
    }
    isActive = matchItem ? 'success' : 'secondary';

    return isActive;
  };

  render() {
    const { history } = this.props;
    const { isPaymentSkipped, briefID, briefData, isLoading } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <Row>
              <Col lg={9} className="d-flex align-items-center mb-3">
                <Button onClick={() => redirectTo(history, '/talent/job-briefs')} className="btn-link">
                  <SVG src={backIcon} />
                </Button>
                <H3 className="ms-3">{messages.heading.defaultMessage}</H3>
              </Col>
              <Col lg={3} />
            </Row>
            {isLoading ? (
              <BriefCardSkeleton />
            ) : (
              <DBcontainer>
                <LeftCol>
                  <Card className="mb-10">
                    <div className="justify-content-between flex-column flex-md-row">
                      <div className="d-flex justify-content-between">
                        <P className="mb-0 p16" opacityVal="0.5">
                          {get(briefData, 'expertise')}
                        </P>
                        <div className="d-flex align-items-center">
                          {get(briefData, 'ratePerHour') && (
                            <>
                              <P className="p16 mb-0 text-primary">{get(briefData, 'ratePerHour')}</P>
                              <P className="p16 mb-0" opacityVal="0.5">
                                /hour
                              </P>
                            </>
                          )}
                          {!get(briefData, 'isApplied') ? (
                            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                            <div className="ms-3" onClick={e => this.handleApplyClick(e)} onKeyDown={() => {}}>
                              <ApplyBrief
                                isPaymentSkipped={isPaymentSkipped}
                                briefID={briefID}
                                loadDetails={this.loadBriefDetailData}
                                seniority={get(briefData, 'expertise')}
                                role={get(briefData, 'name')}
                                companyName={get(briefData, 'companyName', '')}
                              />
                            </div>
                          ) : (
                            <div className="pl-0 d-flex align-items-center ms-3">
                              <SVG src={circleTickIcon} />
                              <P className="p14 mb-0 text-success ms-2">Applied</P>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-2">
                        <P className="p20">{get(briefData, 'name', '')}</P>
                      </div>
                      <div className="d-flex justify-content-between mt-2  p-1 ps-0">
                        <PreferencesList className="inline-list">
                          <li className="d-flex ps-4 mt-2 me-3">
                            <SecondSVG src={watchIcon} width="16" height="16" lineHeight="22" />
                            <P className="p16 mb-0" opacityVal="0.5">
                              {get(briefData, 'workPreference')}
                            </P>
                          </li>
                          <li className="d-flex ps-4 mt-2 me-3">
                            <PathSVG src={calendarIcon} width="16" height="16" lineHeight="22" />
                            <P className="p16 mb-0" opacityVal="0.5">
                              {get(briefData, 'duration')}
                            </P>
                          </li>
                          {get(briefData, 'assignments') && (
                            <li className="d-flex ps-4 mt-2 me-3">
                              <SecondSVG src={pinIcon} width="16" height="16" lineHeight="22" />
                              <P className="p16 mb-0" opacityVal="0.5">
                                {get(briefData, 'assignments')}
                              </P>
                            </li>
                          )}
                          {get(briefData, 'teamPreference') && (
                            <li className="d-flex ps-4 mt-2 me-3">
                              <SecondSVG src={teamIcon} width="16" height="16" lineHeight="22" />
                              <P className="p16 mb-0" opacityVal="0.5">
                                {get(briefData, 'teamPreference')}
                              </P>
                            </li>
                          )}
                          {get(briefData, 'ratePerHour') && (
                            <li className="d-flex ps-4 mt-2 me-3">
                              <SecondSVG src={payIcon} width="16" height="16" />
                              <P className="p16 mb-0" opacityVal="0.5" lineHeight="22">
                                {get(briefData, 'ratePerHour')}/ <span>hour</span>
                              </P>
                            </li>
                          )}
                        </PreferencesList>
                        {get(briefData, 'jobId') && (
                          <div>
                            <P className="mt-2 p14 mb-0 d-flex text-nowrap" opacityVal="0.5" lineHeight="16">
                              Job Id: {get(briefData, 'jobId')}
                            </P>
                          </div>
                        )}
                      </div>
                    </div>
                    <hr className="mt-3 mb-3" />
                    <div className="pt-1">
                      <P className="p16">Job Description</P>
                      <P className="p16" opacityVal="0.5">
                        {get(briefData, 'description') && parse(get(briefData, 'description'))}
                      </P>
                    </div>
                    <hr className="mt-3 pb-3" />
                    <Card className="mt-5 mb-0 position-relative">
                      <LampCard>
                        <SVG src={projectPlaceholderSM} width="80" height="80" />
                      </LampCard>
                      <Badge className="success mb-3 mt-5 badge-sm">{this.getProjectStatus(get(briefData, 'projectStatus'))}</Badge>
                      <div className="pt-2">
                        <P className="p20">{get(briefData, 'projectName')}</P>
                        <P className="p16" opacityVal="0.5">
                          {get(briefData, 'projectDescription') && parse(get(briefData, 'projectDescription'))}
                        </P>
                      </div>
                      <div className="d-flex align-items-center ms-1">
                        {get(briefData, 'hiredTalents') && get(briefData, 'hiredTalents').length > 0 && (
                          <TeamImgList data={get(briefData, 'hiredTalents')} />
                        )}
                        {/* this is for future use */}
                        <div className="d-flex align-items-center d-none">
                          <SVG src={teamIcon} width="18" height="18" />
                          <P className="p16 ms-2 mb-0">Small Team</P>
                        </div>
                      </div>
                    </Card>
                  </Card>
                  <Row className="mt-4">
                    <Col lg={12}>
                      <H3 className="ms-3">Company details</H3>
                    </Col>
                  </Row>
                  <Card className="mb-10 mt-2">
                    <div className="d-flex justify-content-between flex-column flex-md-row">
                      <div className="d-flex align-items-center">
                        {get(briefData, 'companyName') && (
                          <>
                            <SVG src={logoPlaceholder} width="30" height="30" />
                            <P className="ms-3 p16 mb-0">{get(briefData, 'companyName')}</P>
                          </>
                        )}
                        {get(briefData, 'companyTimeZone') && (
                          <ul className="mb-0 opacity-50">
                            <li>
                              <P className="p14 mb-0">
                                {getTimzoneOffest(timeXZone, 'name', get(briefData, 'companyTimeZone'))} (
                                {get(briefData, 'companyTimeZone')})
                              </P>
                            </li>
                          </ul>
                        )}
                      </div>
                      {/* this is for future use */}
                      <SocialLinks className="d-none">
                        <li>
                          <a target="_blank" href={CM_LINKEDIN_URL}>
                            <SVG src={linkedinNewIcon} />
                          </a>
                        </li>
                        <li>
                          <a target="_blank" href={CM_DRIBBLE_URL}>
                            <SVG src={dribbleIcon} />
                          </a>
                        </li>
                        <li>
                          <a target="_blank" href={CM_FACEBOOK_URL}>
                            <SVG src={facebookIcon} />
                          </a>
                        </li>
                      </SocialLinks>
                    </div>
                    {/* this is for future use */}
                    <P className="p16 mt-3 d-none" opacityVal="0.5">
                      Company description
                    </P>
                    <hr className="mb-3 mt-3 d-none" />
                    <div className="d-flex d-none">
                      <div>
                        <P className="p14" fontFamily="GT-Walsheim-Pro-Medium" lineHeight="12.6">
                          Culture
                        </P>
                        <PreferencesList className="mb-4">
                          <li className="ps-0">
                            <div className="d-flex">
                              <Badge className="secondary badge-sm">Innovation</Badge>
                              <Badge className="secondary badge-sm ms-2">Better pay</Badge>
                            </div>
                          </li>
                        </PreferencesList>
                      </div>
                      <div className="ms-5">
                        <P className="p14" fontFamily="GT-Walsheim-Pro-Medium" lineHeight="12.6">
                          Industry
                        </P>
                        <Badge className="secondary badge-sm">Fin Tech</Badge>
                      </div>
                      <div className="ms-5">
                        <P className="p14" fontFamily="GT-Walsheim-Pro-Medium" lineHeight="12.6">
                          Type
                        </P>
                        <Badge className="secondary badge-sm">Startup</Badge>
                      </div>
                    </div>
                  </Card>
                </LeftCol>
                <RightCol className="mt-0">
                  <CandidateCard briefData={briefData} />
                  {/* this is for future use */}
                  <H3 className="mt-3 mb-2 d-none">Refer & Earn</H3>
                  <Card className="bg-secondary-gradient d-none">
                    <div className="d-flex align-items-center">
                      <SVG src={earnIcon} width="40" height="40" />
                      <H4 className="newH4 ms-3 mb-0 mt-0">Earn cash</H4>
                    </div>
                    <div className="mt-3">
                      <P className="16">Know someone who match the required skills?</P>
                      <P className="16">
                        Refer and earn up to
                        <span className="text-primary">
                          <b> $150 </b>
                        </span>
                        cash
                      </P>
                    </div>
                    <div>
                      <Button className="btn btn-sm btn-outline w-100">Invite now</Button>
                    </div>
                  </Card>
                </RightCol>
              </DBcontainer>
            )}
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

BriefsDetail.defaultProps = defaultProps;
BriefsDetail.propTypes = propTypes;

export default BriefsDetail;
