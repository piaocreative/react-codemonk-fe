/** ProfilePage
 * This is the Agency Profile page for the App, at the '/talent/agency-profile' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { TabContent, TabPane, NavItem } from 'reactstrap';
import { Card, ContainerMod } from 'components';
import Content from 'components/Content';
import classnames from 'classnames';
import { CustomNavTab, NavCard, CustomNavLink } from 'components/CustomTab';
import containerMessage from 'containers/messages';
import PersonalProfessionalTab from './PersonalProfessionalTab';
import CertificationsTab from './CertificationsTab';
import CredentialsTab from './CredentialsTab';
import messages from './messages';

export class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
    };
  }

  toggle = tab => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    const { activeTab } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <React.Fragment>
            <ContainerMod>
              <NavCard className="pb-0">
                <CustomNavTab tabs>
                  <NavItem>
                    <CustomNavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => {
                        this.toggle('1');
                      }}
                    >
                      <FormattedMessage {...messages.personalProfessionalTab} />
                    </CustomNavLink>
                  </NavItem>
                  <NavItem>
                    <CustomNavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => {
                        this.toggle('2');
                      }}
                    >
                      <FormattedMessage {...containerMessage.labelCertification} />
                    </CustomNavLink>
                  </NavItem>
                  <NavItem>
                    <CustomNavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => {
                        this.toggle('3');
                      }}
                    >
                      <FormattedMessage {...messages.credentialsTab} />
                    </CustomNavLink>
                  </NavItem>
                </CustomNavTab>
              </NavCard>
              <Card>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">{activeTab === '1' && <PersonalProfessionalTab {...this.props} />}</TabPane>
                  <TabPane tabId="2">{activeTab === '2' && <CertificationsTab {...this.props} />}</TabPane>
                  <TabPane tabId="3">{activeTab === '3' && <CredentialsTab {...this.props} />}</TabPane>
                </TabContent>
              </Card>
            </ContainerMod>
          </React.Fragment>
        </Content>
      </React.Fragment>
    );
  }
}

export default ProfilePage;
