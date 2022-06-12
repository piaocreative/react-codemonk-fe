/** ProjectDetailsTab
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TabContent, TabPane, NavItem } from 'reactstrap';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import SVG from 'react-inlinesvg';
import { Button, Card } from 'components';
import { CustomNavTab, NavCard, CustomNavLink } from 'components/CustomTab';
import classnames from 'classnames';
import { plusSquareIcon } from 'containers/App/constants';
import containerMessage from 'containers/messages';
import { defaultProps, propTypes } from 'containers/proptypes';
import AddBrief from 'containers/Client/AddBrief';
import { TeamTab } from 'containers/Client/ProjectDetailPage/TeamTab';
import TimesheetListing from 'containers/Timesheets/TimesheetListing';
import { QuoteTab } from './QuoteTab';
import { BriefTab } from './BriefTab';

export class ProjectDetailsTab extends React.Component {
  constructor(props) {
    super(props);
    const activeTab = get(props, 'activeTab', '1');
    this.state = {
      /* For future use
      isQuoteShow: get(props, 'projectData.isQuoteShow'), */
      activeTab,
      handleAddTalentOpenModal: get(props, 'handleAddTalentOpenModal'),
      showQuoteModal: false,
    };
  }

  quotePopupOpen = () => this.setState({ showQuoteModal: true });

  quotePopupClose = () => this.setState({ showQuoteModal: false });

  toggle = tab => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  navItemTimesheetTab = activeTab => (
    <NavItem>
      <CustomNavLink
        className={classnames({ active: activeTab === '1' })}
        onClick={() => {
          this.toggle('1');
        }}
      >
        <FormattedMessage {...containerMessage.tabTimesheet} />
      </CustomNavLink>
    </NavItem>
  );

  navItemTeamTab = activeTab => (
    <NavItem>
      <CustomNavLink
        className={classnames({ active: activeTab === '2' })}
        onClick={() => {
          this.toggle('2');
        }}
      >
        <FormattedMessage {...containerMessage.tabTeam} />
      </CustomNavLink>
    </NavItem>
  );

  navItemBriefTab = activeTab => (
    <NavItem>
      <CustomNavLink
        className={classnames({ active: activeTab === '3' })}
        onClick={() => {
          this.toggle('3');
        }}
      >
        <FormattedMessage {...containerMessage.tabOpenRoles} />
      </CustomNavLink>
    </NavItem>
  );

  navItemQuoteTab = (isQuoteShow, activeTab) => {
    let output = '';
    if (isQuoteShow) {
      output = (
        <NavItem>
          <CustomNavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              this.toggle('4');
            }}
          >
            <FormattedMessage {...containerMessage.tabOtherInfo} />
          </CustomNavLink>
        </NavItem>
      );
    }
    return output;
  };

  render() {
    const { activeTab, handleAddTalentOpenModal, showQuoteModal } = this.state;
    const { projectID, projectData, isAdmin, loadProjectDetails } = this.props;

    const briefData = {
      isProjectDetails: true,
      projectName: get(projectData, 'name', '') ? { label: get(projectData, 'name', ''), value: get(projectData, 'name', '') } : '',
      projectDescription: get(projectData, 'description', ''),
      clientName: get(projectData, 'clientId', '')
        ? { label: get(projectData, 'clientId', ''), value: get(projectData, 'clientId', '') }
        : '',
    };

    return (
      <Card className="mb-10">
        <NavCard className="tab-sm pb-0 d-flex justify-content-between">
          <CustomNavTab tabs>
            {this.navItemTimesheetTab(activeTab)}
            {this.navItemTeamTab(activeTab)}
            {this.navItemBriefTab(activeTab)}
            {/* For future use {this.navItemQuoteTab(isQuoteShow, activeTab)} */}
          </CustomNavTab>

          {isAdmin && activeTab === '2' && (
            <Button className="btn btn-sm btn-plus ms-md-3 new-btn-theme" onClick={handleAddTalentOpenModal}>
              <SVG className="me-2" src={plusSquareIcon} />
              <span>Add talent</span>
            </Button>
          )}

          {activeTab === '3' && (
            <AddBrief
              projectDetailsPage
              btnTitle={containerMessage.addNew.defaultMessage}
              btnClassName="btn btn-sm btn-plus ms-md-3 new-btn-theme"
              withAddIcon
              type="add"
              isAdmin={isAdmin}
              projectDetailPage
              loadDetails={loadProjectDetails}
              {...briefData}
            />
          )}

          {isAdmin && activeTab === '4' && (
            <Button className="btn btn-sm btn-plus ms-md-3 new-btn-theme" onClick={this.quotePopupOpen}>
              <SVG className="me-2" src={plusSquareIcon} />
              <span>Add details</span>
            </Button>
          )}
        </NavCard>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            {!isEmpty(projectData) && activeTab === '1' && <TimesheetListing projectDetailsPage projectId={projectID} />}
          </TabPane>
          <TabPane tabId="2">
            {!isEmpty(projectData) && activeTab === '2' && (
              <TeamTab data={projectData} projectID={projectID} isAdmin={isAdmin} {...this.props} />
            )}
          </TabPane>
          <TabPane tabId="3">
            {!isEmpty(projectData) && activeTab === '3' && (
              <BriefTab data={projectData.briefs} projectID={projectID} isAdmin={isAdmin} projectData={projectData} {...this.props} />
            )}
          </TabPane>
          <TabPane tabId="4">
            {!isEmpty(projectData) && activeTab === '4' && (
              <QuoteTab showQuoteModal={showQuoteModal} quotePopupClose={this.quotePopupClose} data={projectData.quotes} {...this.props} />
            )}
          </TabPane>
        </TabContent>
      </Card>
    );
  }
}

ProjectDetailsTab.defaultProps = defaultProps;
ProjectDetailsTab.propTypes = propTypes;

export default ProjectDetailsTab;
