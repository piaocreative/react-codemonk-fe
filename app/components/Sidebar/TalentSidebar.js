import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem, NavLink, Nav } from 'reactstrap';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import Emitter from 'utils/emitter';
import { userExists, getUserRegisterType, getUserRoleFromURL } from 'utils/Helper';
import { defaultProps, propTypes } from 'containers/proptypes';
import { Badge } from 'components';
import {
  searchJobsIcon,
  clientsIcon,
  textFileIcon,
  quotesIcon,
  dashboardIcon,
  calendarWithTimeIcon,
  booksIcon,
  briefcaseIcon,
  communityIcon,
  heartIcon,
  learningIcon,
  perksIcon,
  billIcon,
  projectsIcon,
  COMMUNITY_URL,
} from 'containers/App/constants';
import { FixedSidebar } from './styles';
import messages from './messages';

export class TalentSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: userExists(),
      roleType: getUserRegisterType(),
      badgeConfiguration: {},
    };
  }

  componentDidMount() {
    Emitter.on('badgeConfigurationUpdated', badgeConfigurationUpdated => {
      this.setState({ badgeConfiguration: badgeConfigurationUpdated });
    });
  }

  componentWillUnmount() {
    Emitter.off('badgeConfigurationUpdated');
  }

  renderMyProjects = (pathName, link, title) => (
    <NavItem>
      <NavLink to={link} className={`${pathName === link ? 'active' : ''}`} tag={Link} title={title}>
        <span className="icon">
          <SVG src={projectsIcon} />
        </span>
        <span className="menu-option">{title}</span>
      </NavLink>
    </NavItem>
  );

  renderDashboard = (pathName, activeRole) => (
    <NavItem>
      <NavLink
        to={`/${activeRole}/dashboard`}
        className={`${
          pathName === `/${activeRole}/dashboard` || pathName === `'/${activeRole}'` || pathName === `'/${activeRole}/'` ? 'active' : ''
        }`}
        tag={Link}
        title="Dashboard"
      >
        <span className="icon">
          <SVG src={dashboardIcon} />
        </span>
        <span className="menu-option">{messages.DashboardMenu.defaultMessage}</span>
      </NavLink>
    </NavItem>
  );

  renderTimesheet = (pathName, activeRole) => (
    <NavItem>
      <NavLink
        to={`/${activeRole}/timesheets`}
        className={`${pathName === `/${activeRole}/timesheets` || pathName === `'/${activeRole}/timesheets/'` ? 'active' : ''}`}
        tag={Link}
        title="Timesheets"
      >
        <span className="icon">
          <SVG src={calendarWithTimeIcon} />
        </span>
        <span className="menu-option">{messages.TimesheetsMenu.defaultMessage}</span>
      </NavLink>
    </NavItem>
  );

  renderBrief = (pathName, badgeConfiguration, activeRole) => (
    <NavItem>
      <NavLink
        to={`/${activeRole}/job-briefs`}
        className={`${pathName === `/${activeRole}/job-briefs` || pathName === `'/${activeRole}/job-briefs/'` ? 'active' : ''}`}
        tag={Link}
        title="Job Briefs"
      >
        <span className="icon">
          <SVG src={searchJobsIcon} />
        </span>
        <div className="position-relative">
          <span className="menu-option position-relative">{messages.JobsMenu.defaultMessage}</span>
          {badgeConfiguration.newBrief && <Badge className="success new-badge">{messages.newBadgeText.defaultMessage}</Badge>}
        </div>
      </NavLink>
    </NavItem>
  );

  renderInvoice = (pathName, activeRole) => (
    <NavItem className="d-none">
      <NavLink
        to={`/${activeRole}/invoices`}
        className={`${pathName === `/${activeRole}/invoices` || pathName === `'/${activeRole}/invoices/'` ? 'active' : ''}`}
        tag={Link}
        title="Invoices"
      >
        <span className="icon">
          <SVG src={billIcon} />
        </span>
        <span className="menu-option">{messages.InvoicesMenu.defaultMessage}</span>
      </NavLink>
    </NavItem>
  );

  renderAgencySideBar = (pathName, badgeConfiguration, activeRole) => (
    <React.Fragment>
      {this.renderDashboard(pathName, activeRole)}
      <NavItem>
        <NavLink
          to="/agency/quotes"
          className={`${pathName === '/agency/quotes' || pathName === '/agency/quotes/' ? 'active' : ''}`}
          tag={Link}
          title="Quotes"
        >
          <span className="icon">
            <SVG src={quotesIcon} />
          </span>
          <div className="position-relative">
            <span className="menu-option">{messages.QuotesMenu.defaultMessage}</span>
            {badgeConfiguration.newQuote && <Badge className="success new-badge">{messages.newBadgeText.defaultMessage}</Badge>}
          </div>
        </NavLink>
      </NavItem>
      {this.renderMyProjects(pathName, '/agency/agency-projects', messages.ProjectMenu.defaultMessage)}
      <NavItem>
        <NavLink
          to="/agency/my-team"
          className={`${pathName === '/agency/my-team' || pathName === '/agency/my-team/' ? 'active' : ''}`}
          tag={Link}
          title="My Team"
        >
          <span className="icon">
            <SVG src={clientsIcon} />
          </span>
          <span className="menu-option">{messages.MyTeamMenu.defaultMessage}</span>
        </NavLink>
      </NavItem>
      {this.renderTimesheet(pathName, activeRole)}
      {this.renderInvoice(pathName, activeRole)}

      <NavItem className="d-none">
        <NavLink
          to="/agency/agency-statements"
          className={`${pathName === '/agency/agency-statements' || pathName === '/agency/agency-statements/' ? 'active' : ''}`}
          tag={Link}
          title="Statements"
        >
          <span className="icon">
            <SVG src={textFileIcon} />
          </span>
          <span className="menu-option">{messages.StatementsMenu.defaultMessage}</span>
        </NavLink>
      </NavItem>

      <NavItem className="d-none">
        <NavLink
          to="/agency/agency-planning"
          className={`${pathName === '/agency/agency-planning' || pathName === '/agency/agency-planning/' ? 'active' : ''}`}
          tag={Link}
          title="Planning"
        >
          <span className="icon">
            <SVG src={billIcon} />
          </span>
          <span className="menu-option">{messages.PlanningMenu.defaultMessage}</span>
        </NavLink>
      </NavItem>
    </React.Fragment>
  );

  renderTalentSideBar = (pathName, badgeConfiguration, activeRole) => (
    <React.Fragment>
      {this.renderDashboard(pathName, activeRole)}
      {this.renderBrief(pathName, badgeConfiguration, activeRole)}
      {this.renderMyProjects(pathName, '/talent/my-projects', messages.MyProjectMenu.defaultMessage)}
      {this.renderTimesheet(pathName, activeRole)}
      {this.renderInvoice(pathName, activeRole)}

      <NavItem className="d-none">
        <NavLink
          to="/talent/knowledge-base"
          className={`${pathName === '/talent/knowledge-base' || pathName === '/talent/knowledge-base/' ? 'active' : ''}`}
          tag={Link}
          title="Knowledge base"
        >
          <span className="icon">
            <SVG src={booksIcon} />
          </span>
          <span className="menu-option">{messages.KnowledgBaseMenu.defaultMessage}</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          target="_blank"
          href={COMMUNITY_URL}
          className={`${pathName === '/talent/community' || pathName === '/talent/community/' ? 'active' : ''}`}
          title="Community"
        >
          <span className="icon">
            <SVG src={communityIcon} />
          </span>
          <span className="menu-option">{messages.CommunityMenu.defaultMessage}</span>
        </NavLink>
      </NavItem>
      <NavItem className="d-none">
        <NavLink
          to="/talent/career-paths"
          className={`${pathName === '/talent/career-paths' || pathName === '/talent/career-paths/' ? 'active' : ''}`}
          tag={Link}
          title="Career Paths"
        >
          <span className="icon">
            <SVG src={briefcaseIcon} />
          </span>
          <span className="menu-option">{messages.CareerPathsMenu.defaultMessage}</span>
        </NavLink>
      </NavItem>
      <NavItem className="d-none">
        <NavLink
          to="/talent/learning-development"
          className={`${pathName === '/talent/learning-development' || pathName === '/talent/learning-development/' ? 'active' : ''}`}
          tag={Link}
          title="Learning-Development"
        >
          <span className="icon">
            <SVG src={learningIcon} />
          </span>
          <span className="menu-option">{messages.LearningDevelopmentMenu.defaultMessage}</span>
        </NavLink>
      </NavItem>
      <NavItem className="d-none">
        <NavLink
          to="/talent/perks"
          className={`${pathName === '/talent/perks' || pathName === '/talent/perks/' ? 'active' : ''}`}
          tag={Link}
          title="Perks"
        >
          <span className="icon">
            <SVG src={perksIcon} />
          </span>
          <span className="menu-option">{messages.PerksMenu.defaultMessage}</span>
        </NavLink>
      </NavItem>
      <NavItem className="d-none">
        <NavLink
          to="/talent/wellbeing"
          className={`${pathName === '/talent/wellbeing' || pathName === '/talent/wellbeing/' ? 'active' : ''}`}
          tag={Link}
          title="Wellbeing"
        >
          <span className="icon">
            <SVG src={heartIcon} />
          </span>
          <span className="menu-option">{messages.WellbeingMenu.defaultMessage}</span>
        </NavLink>
      </NavItem>
    </React.Fragment>
  );

  render() {
    const { location } = this.props;
    const { roleType, isSignIn, badgeConfiguration } = this.state;
    const pathName = get(location, 'pathname');
    const activeRole = getUserRoleFromURL();
    return (
      <FixedSidebar>
        <Nav>
          {isSignIn && roleType !== 'agency' && this.renderTalentSideBar(pathName, badgeConfiguration, activeRole)}
          {isSignIn && roleType === 'agency' && this.renderAgencySideBar(pathName, badgeConfiguration, activeRole)}
        </Nav>
      </FixedSidebar>
    );
  }
}

TalentSidebar.defaultProps = defaultProps;
TalentSidebar.propTypes = propTypes;

export default TalentSidebar;
