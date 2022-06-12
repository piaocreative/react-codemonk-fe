/** AccountSettingsPage
 * This is the Signup page for the App, at the '/account-setting' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { TabContent, TabPane, NavItem, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { getUserRegisterType } from 'utils/Helper';
import { Card, PrivateGrid, H4, P } from 'components';
import ToastifyMessage from 'components/ToastifyMessage';
import Content from 'components/Content';
import UpdateEmailIdTab from 'containers/UpdateEmailIdTab';
import UpdatePasswordTab from 'containers/UpdatePasswordTab';
import PaymentTab from 'containers/AccountSettingsPage/PaymentTab';
import { loadUserDetails } from 'containers/Auth/utils';
import history from 'utils/history';
import classnames from 'classnames';
import { CustomNavTab, NavCard, CustomNavLink } from 'components/CustomTab';
import StorageService from 'utils/StorageService';
import SalaryAndBilling from '../Auth/SalaryAndBilling';
import DocumentUpload from '../Auth/DocumentUpload';
import NoificationTab from './NoificationTab';
import messages from './messages';

export class AccountSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
      activeTab: getUserRegisterType() === 'talent_agency' ? '4' : this.getActiveTab(),
      roleType: getUserRegisterType(),
    };
  }

  toggle = tab => {
    const { activeTab } = this.state;
    const requestChangeEmail = parseInt(StorageService.get('requestChangeEmail'), 10);
    if (activeTab !== tab && requestChangeEmail !== 1) {
      this.setState({ activeTab: tab });
    }
  };

  getActiveTab = () => {
    const requestChangeEmail = parseInt(StorageService.get('requestChangeEmail'), 10);
    if (requestChangeEmail === 1) {
      return '5';
    }
    return '1';
  };

  componentDidMount() {
    loadUserDetails(this.setMyProfileDetails);
  }

  setMyProfileDetails = response => {
    if (get(response, 'status')) {
      this.setState({ list: response.data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  render() {
    const { activeTab, list, roleType } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <Card className="p-30">
              <NavCard className="tab-sm pb-0 d-flex justify-content-between">
                <CustomNavTab tabs>
                  {roleType === 'talent' && (
                    <React.Fragment>
                      <NavItem>
                        <CustomNavLink
                          className={classnames({ active: activeTab === '1' })}
                          onClick={() => {
                            this.toggle('1');
                          }}
                        >
                          <FormattedMessage {...messages.salaryBilling} />
                        </CustomNavLink>
                      </NavItem>
                      <NavItem>
                        <CustomNavLink
                          className={classnames({ active: activeTab === '2' })}
                          onClick={() => {
                            this.toggle('2');
                          }}
                        >
                          <FormattedMessage {...messages.tabPayment} />
                        </CustomNavLink>
                      </NavItem>
                      <NavItem>
                        <CustomNavLink
                          className={classnames({ active: activeTab === '3' })}
                          onClick={() => {
                            this.toggle('3');
                          }}
                        >
                          <FormattedMessage {...messages.tabDocuments} />
                        </CustomNavLink>
                      </NavItem>
                    </React.Fragment>
                  )}
                  {(roleType === 'talent' || roleType === 'talent_agency') && (
                    <NavItem>
                      <CustomNavLink
                        className={classnames({ active: activeTab === '4' })}
                        onClick={() => {
                          this.toggle('4');
                        }}
                      >
                        <FormattedMessage {...messages.tabNotifications} />
                      </CustomNavLink>
                    </NavItem>
                  )}
                  <NavItem>
                    <CustomNavLink
                      className={classnames({ active: activeTab === '5' })}
                      onClick={() => {
                        this.toggle('5');
                      }}
                    >
                      <FormattedMessage {...messages.tabSecurity} />
                    </CustomNavLink>
                  </NavItem>
                </CustomNavTab>
              </NavCard>
              <TabContent activeTab={activeTab}>
                {roleType === 'talent' && (
                  <React.Fragment>
                    <TabPane className="col-md-12 col-lg-10 col-xl-9 p-0" tabId="1">
                      {!isEmpty(list) && activeTab === '1' && <SalaryAndBilling settingsPage history={history} />}
                    </TabPane>
                    <TabPane className="col-md-12 col-lg-10 col-xl-9 p-0" tabId="2">
                      {!isEmpty(list) && activeTab === '2' && (
                        <PaymentTab data={list} loadData={() => loadUserDetails(this.setMyProfileDetails)} />
                      )}
                    </TabPane>
                    <TabPane className="col-md-12 col-lg-10 col-xl-9 p-0" tabId="3">
                      {!isEmpty(list) && activeTab === '3' && <DocumentUpload settingsPage history={history} />}
                    </TabPane>
                  </React.Fragment>
                )}
                {(roleType === 'talent' || roleType === 'talent_agency') && (
                  <TabPane tabId="4">{activeTab === '4' && <NoificationTab />}</TabPane>
                )}

                <TabPane className="px-2" tabId="5">
                  <Row>
                    {getUserRegisterType() !== 'talent_agency' && (
                      <Col md="12" lg="6">
                        {!isEmpty(list) && activeTab === '5' && (
                          <UpdateEmailIdTab data={list} settingsPage loadUserDetails={() => loadUserDetails(this.setMyProfileDetails)} />
                        )}
                      </Col>
                    )}
                    <Col md="12" lg="6">
                      {!isEmpty(list) && activeTab === '5' && <UpdatePasswordTab settingsPage />}
                    </Col>
                  </Row>
                  <div>
                    <H4 className="newH4 mt-5 mb-3" opacityVal="0.5">
                      <FormattedMessage {...messages.headingDeleteAccount} />
                    </H4>
                    <P className="p14" opacityVal="0.5">
                      <FormattedMessage {...messages.labelYourAccount} />
                    </P>
                  </div>
                </TabPane>
              </TabContent>
            </Card>
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

export default AccountSettingsPage;
