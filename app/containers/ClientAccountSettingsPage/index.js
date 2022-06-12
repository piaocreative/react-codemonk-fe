/** ClientAccountSettingsPage
 * This is the Signup page for the App, at the '/account-setting' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { TabContent, TabPane, NavItem, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import Emitter from 'utils/emitter';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { VALIDATION } from 'utils/constants';
import Content from 'components/Content';
import { API_URL, USER, DETAILS } from 'containers/App/constants';
import request from 'utils/request';
import { Card, PrivateGrid, H4, P } from 'components';
import ToastifyMessage from 'components/ToastifyMessage';
import UpdateEmailIdTab from 'containers/UpdateEmailIdTab';
import UpdatePasswordTab from 'containers/UpdatePasswordTab';
import classnames from 'classnames';
import { CustomNavTab, NavCard, CustomNavLink } from 'components/CustomTab';
import containerMessage from 'containers/AccountSettingsPage/messages';
import messages from './messages';

export class ClientAccountSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
      activeTab: '1',
    };
  }

  toggle = tab => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  componentDidMount() {
    Emitter.on('otpVerify', otpVerify => {
      if (otpVerify) {
        this.loadUserDetails();
      }
    });

    this.loadUserDetails();
  }

  componentWillUnmount() {
    Emitter.off('otpVerify');
  }

  loadUserDetails = () => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${USER}${DETAILS}`;
    request(requestURL, data)
      .then(this.setMyProfileDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setMyProfileDetails = response => {
    if (get(response, 'status')) {
      this.setState({ list: response.data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  render() {
    const { activeTab, list } = this.state;
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
                  <NavItem>
                    <CustomNavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => {
                        this.toggle('1');
                      }}
                    >
                      <FormattedMessage {...containerMessage.tabSecurity} />
                    </CustomNavLink>
                  </NavItem>
                </CustomNavTab>
              </NavCard>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1" className="px-2">
                  <Row>
                    <Col md="12" lg="6">
                      {!isEmpty(list) && activeTab === '1' && (
                        <UpdateEmailIdTab data={list} settingsPage loadUserDetails={this.loadUserDetails} />
                      )}
                    </Col>
                    <Col md="12" lg="6">
                      {!isEmpty(list) && activeTab === '1' && <UpdatePasswordTab settingsPage />}
                    </Col>
                  </Row>
                  <div>
                    <H4 className="newH4 mt-5 mb-3" opacityVal="0.5">
                      <FormattedMessage {...containerMessage.headingDeleteAccount} />
                    </H4>
                    <P className="p14" opacityVal="0.5">
                      <FormattedMessage {...containerMessage.labelYourAccount} />
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

export default ClientAccountSettingsPage;
