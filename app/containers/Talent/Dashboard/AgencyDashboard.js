/*
 * AgencyDashboard
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import SVG from 'react-inlinesvg';
import { VALIDATION } from 'utils/constants';
import get from 'lodash/get';
import has from 'lodash/has';
import request from 'utils/request';
import CountUp from 'react-countup';
import { Cell, PieChart, Pie } from 'recharts';
import { PrivateGrid, Card, H4, H5, P, H3, ToastifyMessage } from 'components';
import { FormattedMessage } from 'react-intl';
import { agencyRedirectToPage } from 'containers/App/utils';
import {
  TEAM,
  TALENTS,
  COUNT,
  API_URL,
  AGENCY,
  PROJECTS,
  PROJECT_API,
  filesIcon,
  projectsIcon,
  clientsIcon,
} from 'containers/App/constants';
import Content from 'components/Content';
import { CardHeader } from 'containers/MyProfilePage/styles';
import { Column1, Column2, CardTitle, LegendList, CountList } from 'containers/ClientHomePage/styles';
import { COLORS } from 'containers/ClientHomePage/constants';
import { ComingSoon } from 'containers/Talent/Dashboard/styles';
import messages from 'containers/ClientHomePage/messages';
import { propTypes, defaultProps } from 'containers/proptypes';
import dashboardMessage from './messages';

export class AgencyDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: get(props, 'userData'),
      projectCount: '0',
      talentCount: '0',
      team: [],
      teamDataLoading: false,
    };
  }

  componentDidMount() {
    // check for signupStep
    const { userData } = this.state;
    const { history, location } = this.props;
    let currentSignupStep = has(userData, 'data.signupStep') === true ? get(userData, 'data.signupStep') + 1 : 1;
    currentSignupStep = currentSignupStep === 1.1 ? 1 : currentSignupStep;
    agencyRedirectToPage(history, location.redirection, currentSignupStep, 7);

    // call api
    this.loadCountData('projects');
    this.loadCountData('talents');
    this.loadAgencyTeamData();
  }

  loadCountData = type => {
    const data = { method: 'GET' };
    const requestURL =
      type === 'projects' ? `${API_URL}${AGENCY}${PROJECTS}${COUNT}` : `${API_URL}${AGENCY}${PROJECT_API}${TALENTS}${COUNT}`;
    request(requestURL, data)
      .then(response => {
        if (get(response, 'status')) {
          const stateVal = type === 'projects' ? 'projectCount' : 'talentCount';
          this.setState({ [stateVal]: response.data });
        } else {
          toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  loadAgencyTeamData = () => {
    this.setState({ teamDataLoading: true });
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${AGENCY}${PROJECT_API}${TEAM}${COUNT}`;
    request(requestURL, data)
      .then(this.setAgencyTeamData)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setAgencyTeamData = response => {
    if (get(response, 'status')) {
      const { data } = response;
      const teamData = [];
      data.forEach((team, index) => {
        teamData.push({
          value: get(team, 'value'),
          name: get(team, 'name'),
          color: COLORS[index],
        });
      });
      this.setState({ team: teamData, teamDataLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  col1CardBody = (
    <dispatchEvent className="flex-1">
      <ComingSoon>
        <SVG src={filesIcon} />
        <H5>
          <FormattedMessage {...messages.comingSoon} />
        </H5>
      </ComingSoon>
    </dispatchEvent>
  );

  Row1col1 = (
    <Column1 className="col d-flex">
      <Card className="flex-1 d-flex flex-column">
        <CardHeader>
          <H4 className="m-0">
            <FormattedMessage {...messages.taskTitle} />
          </H4>
        </CardHeader>
        {this.col1CardBody}
      </Card>
    </Column1>
  );

  Row1col2 = (projectCount, talentCount) => (
    <Column2 className="col">
      <Card className="flex-1 d-flex flex-column">
        <CardHeader>
          <H4 className="m-0">
            <FormattedMessage {...messages.overviewTitle} />
          </H4>
        </CardHeader>
        <div className="flex-1">
          <div className="d-flex">
            <CountList>
              <li>
                <SVG src={projectsIcon} />
                <div>
                  <H3>
                    <CountUp duration={1} end={projectCount} />
                  </H3>
                  <P>
                    <FormattedMessage {...messages.projects} />
                  </P>
                </div>
              </li>
              <li>
                <SVG src={clientsIcon} />
                <div>
                  <H3>
                    <CountUp duration={1} end={talentCount} />
                  </H3>
                  <P>
                    <FormattedMessage {...messages.talents} />
                  </P>
                </div>
              </li>
            </CountList>
            <ComingSoon className="h-auto flex-grow-1">
              <SVG src={filesIcon} />
              <H5>
                <FormattedMessage {...messages.comingSoon} />
              </H5>
            </ComingSoon>
          </div>
        </div>
      </Card>
    </Column2>
  );

  Row2Col = team => (
    <Col md={12}>
      <Card className="flex-1 d-flex flex-column mb-0">
        <CardTitle>
          <H5 className="">
            <FormattedMessage {...messages.TeamComposition} />
          </H5>
        </CardTitle>
        {team.length > 0 ? (
          <div className="d-flex align-items-center">
            <PieChart width={116} height={116} onMouseEnter={this.onPieEnter}>
              <Pie data={team} cx={53} cy={53} innerRadius={33} outerRadius={58} fill="#8884d8" paddingAngle={0}>
                {team.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <LegendList>
              {team.map(obj => (
                <li key={obj.name}>
                  <span style={{ background: `${obj.color}` }} />
                  {obj.name} ({obj.value})
                </li>
              ))}
            </LegendList>
          </div>
        ) : (
          <ComingSoon>
            <SVG src={filesIcon} />
            <P>
              <FormattedMessage {...dashboardMessage.agencyNoTalent} />
            </P>
          </ComingSoon>
        )}
      </Card>
    </Col>
  );

  render() {
    const { projectCount, talentCount, team, teamDataLoading } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <Row>
              {this.Row1col1}
              {this.Row1col2(projectCount, talentCount)}
            </Row>
            <Row>{!teamDataLoading && this.Row2Col(team)}</Row>
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

AgencyDashboard.defaultProps = defaultProps;
AgencyDashboard.propTypes = propTypes;

export default AgencyDashboard;
