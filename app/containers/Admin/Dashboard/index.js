/*
 * Dashboard
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col, Button } from 'reactstrap';
import SVG from 'react-inlinesvg';
import { FormattedMessage } from 'react-intl';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import Content from 'components/Content';
import CountUp from 'react-countup';
import { Card, H4, PrivateGrid, ToastifyMessage, P } from 'components';
import { API_URL, ADMIN, KPIS, calendarWithTimeIcon, textFileIcon, quotesIcon, rightArrowIcon } from 'containers/App/constants';
import { toast } from 'react-toastify';
import { CardHeader } from 'containers/MyProfilePage/styles';
import { ButtonGroupWrapper, BoxLink, CardLink } from './styles';
import messages from './messages';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      briefs: 0,
      qoutes: 0,
      interviews: 0,
      projects: 0,
      activeClients: 0,
      clients: 0,
      activeTalents: 0,
      talents: 0,
      activeAgencies: 0,
      agencies: 0,
      newBriefs: 0,
      newProjects: 0,
      newInterviews: 0,
      newQuote: 0,
      time: 'week',
    };
  }

  componentDidMount() {
    this.callFetchAPI();
  }

  callFetchAPI = () => {
    const data = {
      method: 'GET',
    };
    const { time } = this.state;
    const requestURL = `${API_URL}${ADMIN}${KPIS}?time=${time}`;
    request(requestURL, data)
      .then(response => {
        this.setState({
          briefs: response.data.briefs,
          qoutes: response.data.qoutes,
          interviews: response.data.interviews,
          projects: response.data.projects,
          activeClients: response.data.activeClients,
          clients: response.data.clients,
          activeTalents: response.data.activeTalents,
          talents: response.data.talents,
          activeAgencies: response.data.activeAgencies,
          agencies: response.data.agencies,
          newBriefs: response.data.newBriefs,
          newProjects: response.data.newProjects,
          newInterviews: response.data.newInterviews,
          newQuote: response.data.newQuote,
        });
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  handleTimeChange = value => {
    this.setState({ time: value }, () => this.callFetchAPI());
  };

  render() {
    const {
      briefs,
      qoutes,
      interviews,
      projects,
      activeClients,
      clients,
      activeTalents,
      talents,
      activeAgencies,
      agencies,
      newBriefs,
      newProjects,
      newInterviews,
      newQuote,
      time,
    } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <Card>
              <CardHeader className="flex-md-row flex-column align-items-start">
                <H4 className="m-0">
                  <FormattedMessage {...messages.titleOverview} />
                </H4>
                <ButtonGroupWrapper className="mt-3 mt-md-0">
                  <Button className={`${time === 'today' ? 'active' : ''}`} onClick={() => this.handleTimeChange('today')}>
                    <FormattedMessage {...messages.btnToday} />
                  </Button>
                  <Button className={`${time === 'week' ? 'active' : ''}`} onClick={() => this.handleTimeChange('week')}>
                    <FormattedMessage {...messages.btnWeek} />
                  </Button>
                  <Button className={`${time === 'month' ? 'active' : ''}`} onClick={() => this.handleTimeChange('month')}>
                    <FormattedMessage {...messages.btnMonth} />
                  </Button>
                  <Button className={`${time === 'all' ? 'active' : ''}`} onClick={() => this.handleTimeChange('all')}>
                    <FormattedMessage {...messages.btnAllTime} />
                  </Button>
                </ButtonGroupWrapper>
              </CardHeader>

              <Row>
                <Col sm={6}>
                  <BoxLink to="/admin/job-briefs" title="Job Briefs" className="d-flex">
                    <SVG className="icon" src={textFileIcon} />
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <div>
                        <h2>
                          <CountUp duration={1} end={newBriefs} />/<CountUp duration={1} end={briefs} />
                        </h2>
                        <P className="mb-0">
                          <FormattedMessage {...messages.subTitleBriefs} />
                        </P>
                      </div>
                      <SVG className="arrow" src={rightArrowIcon} />
                    </div>
                  </BoxLink>
                </Col>
                <Col sm={6}>
                  <BoxLink to="/admin/quotes" title="Quotes" className="d-flex">
                    <SVG className="icon" src={quotesIcon} />
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <div>
                        <h2>
                          <CountUp duration={1} end={newQuote} />/<CountUp duration={1} end={qoutes} />
                        </h2>
                        <P className="mb-0">
                          <FormattedMessage {...messages.subTitleQuotes} />
                        </P>
                      </div>
                      <SVG className="arrow" src={rightArrowIcon} />
                    </div>
                  </BoxLink>
                </Col>
                <Col sm={6}>
                  <BoxLink to="/admin/interviews" title="Interviews" className="d-flex">
                    <SVG className="icon" src={calendarWithTimeIcon} />
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <div>
                        <h2>
                          <CountUp duration={1} end={newInterviews} />/<CountUp duration={1} end={interviews} />
                        </h2>
                        <P className="mb-0">
                          <FormattedMessage {...messages.subTitleInterviews} />
                        </P>
                      </div>
                      <SVG className="arrow" src={rightArrowIcon} />
                    </div>
                  </BoxLink>
                </Col>
                <Col sm={6}>
                  <BoxLink to="/admin/projects" title="Projects" className="d-flex">
                    <SVG className="icon" src={textFileIcon} />
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <div>
                        <h2>
                          <CountUp duration={1} end={newProjects} />/<CountUp duration={1} end={projects} />
                        </h2>
                        <P className="mb-0">
                          <FormattedMessage {...messages.subTitleProjects} />
                        </P>
                      </div>
                      <SVG className="arrow" src={rightArrowIcon} />
                    </div>
                  </BoxLink>
                </Col>
              </Row>
            </Card>
            <Row>
              <Col xl={4}>
                <CardLink to="/admin/clients">
                  <div className="d-flex justify-content-between align-items-center">
                    <H4 className="m-0">Clients</H4>
                    <SVG className="arrow" src={rightArrowIcon} />
                  </div>
                  <div className="count-list">
                    <div className="count-list-item">
                      <h3 className="m-0">
                        <CountUp duration={1} end={activeClients} />
                      </h3>
                      <P>
                        <FormattedMessage {...messages.subTitleTotalActive} />
                      </P>
                    </div>
                    <div className="count-list-item">
                      <h3 className="m-0">
                        <CountUp duration={1} end={clients} />
                      </h3>
                      <P>
                        <FormattedMessage {...messages.subTitleTotalSignup} />
                      </P>
                    </div>
                  </div>
                </CardLink>
              </Col>
              <Col xl={4}>
                <CardLink to="/admin/talents">
                  <div className="d-flex justify-content-between align-items-center">
                    <H4 className="m-0">Talents</H4>
                    <SVG className="arrow" src={rightArrowIcon} />
                  </div>
                  <div className="count-list">
                    <div className="count-list-item">
                      <h3 className="m-0">
                        <CountUp duration={1} end={activeTalents} />
                      </h3>
                      <P>
                        <FormattedMessage {...messages.subTitleTotalActive} />
                      </P>
                    </div>
                    <div className="count-list-item">
                      <h3 className="m-0">
                        <CountUp duration={1} end={talents} />
                      </h3>
                      <P>
                        <FormattedMessage {...messages.subTitleTotalSignup} />
                      </P>
                    </div>
                  </div>
                </CardLink>
              </Col>
              <Col xl={4}>
                <CardLink to="/admin/agencies">
                  <div className="d-flex justify-content-between align-items-center">
                    <H4 className="m-0">Agencies</H4>
                    <SVG className="arrow" src={rightArrowIcon} />
                  </div>
                  <div className="count-list">
                    <div className="count-list-item">
                      <h3 className="m-0">
                        <CountUp duration={1} end={activeAgencies} />
                      </h3>
                      <P>
                        <FormattedMessage {...messages.subTitleTotalActive} />
                      </P>
                    </div>
                    <div className="count-list-item">
                      <h3 className="m-0">
                        <CountUp duration={1} end={agencies} />
                      </h3>
                      <P>
                        <FormattedMessage {...messages.subTitleTotalSignup} />
                      </P>
                    </div>
                  </div>
                </CardLink>
              </Col>
            </Row>
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

export default Dashboard;
