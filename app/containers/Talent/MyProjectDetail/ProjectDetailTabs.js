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
import AddTimesheet from 'containers/Timesheets/AddTimesheet';
import TimesheetListing from 'containers/Timesheets/TimesheetListing';
import { projectDetailsTabItems } from './constants';
import TeamList from './Components/TeamList';
import TalentLookingFor from './Components/TalentLookinFor';
import OtherInfo from './Components/OtherInfo';

const DEFAULT_TAB = projectDetailsTabItems[0].tabIndex;

export class ProjectDetailTabs extends React.Component {
  constructor(props) {
    super(props);
    const activeTab = get(props, 'activeTab', DEFAULT_TAB);
    this.state = {
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
    const { data, projectID } = this.props;
    const { activeTab } = this.state;
    const talentsDetails = get(data, 'talentsDetails', {});
    const projectObj = get(data, '_id', '') ? { label: get(data, 'name', ''), value: get(data, '_id', '') } : '';

    return (
      <Card className="mb-10">
        <NavCard className="tab-sm pb-0 d-flex justify-content-between">
          <CustomNavTab tabs>
            {projectDetailsTabItems.map(tab => (
              <NavItem key={tab.tabIndex}>
                <CustomNavLink
                  className={`${classnames({ active: tab.tabIndex === activeTab })}`}
                  onClick={() => {
                    this.toggle(tab.tabIndex);
                  }}
                >
                  <FormattedMessage {...tab.name} />
                </CustomNavLink>
              </NavItem>
            ))}
          </CustomNavTab>
          {activeTab === '1' && <AddTimesheet type="add" projectDetailsPage projectObj={projectObj} loadDetails={this.timesheetAdded} />}
        </NavCard>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            {!isEmpty(data) && activeTab === '1' && <TimesheetListing projectDetailsPage projectId={projectID} />}
          </TabPane>
          <TabPane tabId="2">{!isEmpty(data) && activeTab === '2' && <TeamList talentsDetails={talentsDetails} />}</TabPane>
          <TabPane tabId="3">{!isEmpty(data) && activeTab === '3' && <TalentLookingFor projectDetails={data} />}</TabPane>
          <TabPane tabId="4">{!isEmpty(data) && activeTab === '4' && <OtherInfo projectDetails={data} />}</TabPane>
        </TabContent>
      </Card>
    );
  }
}

ProjectDetailTabs.defaultProps = defaultProps;
ProjectDetailTabs.propTypes = propTypes;

export default ProjectDetailTabs;
