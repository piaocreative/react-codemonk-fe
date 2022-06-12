/** ProjectDetailTabs
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TabContent, TabPane, NavItem } from 'reactstrap';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { CustomNavTab, NavCard, CustomNavLink } from 'components/CustomTab';
import { Card } from 'components';
import classnames from 'classnames';
import Emitter from 'utils/emitter';
import { defaultProps, propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import TimesheetListing from 'containers/Timesheets/TimesheetListing';
import AddTimesheet from 'containers/Timesheets/AddTimesheet';
import { TalentsTab } from './TalentsTab';
import messages from './messages';

export class ProjectDetailTabs extends React.Component {
  constructor(props) {
    super(props);
    const activeTab = get(props, 'activeTab', '1');
    this.state = {
      projectData: get(props, 'projectData', {}),
      activeTab,
    };
  }

  toggle = tab => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  timesheetAdded = () => Emitter.emit('timesheetAdded', true);

  render() {
    const { projectID } = this.props;
    const { activeTab, projectData } = this.state;

    const projectObj = get(projectData, '_id', '') ? { label: get(projectData, 'name', ''), value: get(projectData, '_id', '') } : '';

    return (
      <Card className="mb-10">
        <NavCard className="tab-sm pb-0 d-flex justify-content-between">
          <CustomNavTab tabs>
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
            <NavItem>
              <CustomNavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  this.toggle('2');
                }}
              >
                <FormattedMessage {...messages.tabTalents} />
              </CustomNavLink>
            </NavItem>
          </CustomNavTab>
          {activeTab === '1' && <AddTimesheet type="add" projectDetailsPage projectObj={projectObj} loadDetails={this.timesheetAdded} />}
        </NavCard>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            {!isEmpty(projectData) && activeTab === '1' && <TimesheetListing projectDetailsPage projectId={projectID} />}
          </TabPane>
          <TabPane tabId="2">
            {!isEmpty(projectData) && activeTab === '2' && (
              <TalentsTab data={get(projectData, 'talentsDetails', [])} projectID={projectID} {...this.props} />
            )}
          </TabPane>
        </TabContent>
      </Card>
    );
  }
}

ProjectDetailTabs.defaultProps = defaultProps;
ProjectDetailTabs.propTypes = propTypes;

export default ProjectDetailTabs;
