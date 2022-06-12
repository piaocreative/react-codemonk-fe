/** ClientDetailPage **/
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { VALIDATION } from 'utils/constants';
import { API_URL, CLIENT } from 'containers/App/constants';
import { ProfileContent, CardHeader, CardBody, BackLink } from 'containers/MyProfilePage/styles';
import request from 'utils/request';
import { propTypes } from 'containers/proptypes';
import { PrivateGrid, Card, H4, Badge, A } from 'components';
import ToastifyMessage from 'components/ToastifyMessage';
import { getBadgeClass, redirectTo } from 'containers/App/utils';
import ProxyLogin from 'containers/Admin/ProxyLogin';
import containerMessage from 'containers/messages';
import { Seperator, SubTitle } from './styles';
import messages from './messages';

export class ClientDetailPage extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const clientID = get(params, 'clientID', '');
    this.state = {
      clientID,
      clientData: {},
    };
  }

  componentDidMount() {
    this.loadAdminClientDetails();
  }

  loadAdminClientDetails = () => {
    const data = { method: 'GET' };
    const { clientID } = this.state;
    const requestURL = `${API_URL}${CLIENT}/${clientID}`;
    request(requestURL, data)
      .then(this.setAdminClientDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setAdminClientDetails = response => {
    if (get(response, 'status')) {
      const { data } = response;

      this.setState({ clientData: data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  renderAddressAuthorisedPerson = clientData => (
    <React.Fragment>
      <Seperator />
      <SubTitle>
        <FormattedMessage {...messages.titleAddressAuthorisedPerson} />
      </SubTitle>

      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelLine1.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'authority.addressLineOne', '-')}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelLine2.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'authority.addressLineTwo') || '-'}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelCity.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'authority.city', '-')}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelCountry.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'authority.country', '-')}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelPostcode.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'authority.postcode', '-')}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelTimezone.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'authority.timeZone', '-')}</p>
        </Col>
      </Row>
    </React.Fragment>
  );

  renderCompanyDetails = clientData => (
    <React.Fragment>
      <Seperator />
      <SubTitle>
        <FormattedMessage {...containerMessage.titleCompanyDetails} />
      </SubTitle>

      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelCompanyName.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'billing.companyDetails.name', '-')}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelCompanyRegistrationNo.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'billing.companyDetails.registeredNumber', '-')}</p>
        </Col>
      </Row>

      <Seperator />
      <SubTitle>
        <FormattedMessage {...containerMessage.titleCompanyRegisteredAddress} />
      </SubTitle>

      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelLine1.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'billing.companyDetails.addressLineOne', '-')}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelLine2.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'billing.companyDetails.addressLineTwo', '') || '-'}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelPostcode.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'billing.companyDetails.postcode', '-')}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelCity.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'billing.companyDetails.city', '-')}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelCountry.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'billing.companyDetails.country', '-')}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelWebsite.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">
            {get(clientData, 'billing.companyDetails.website', '') ? (
              <A href={get(clientData, 'billing.companyDetails.website', '')} target="_blank">
                {get(clientData, 'billing.companyDetails.website', '')}
              </A>
            ) : (
              '-'
            )}
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelVatNo.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'billing.companyDetails.vatNumber', '-')}</p>
        </Col>
      </Row>

      <Seperator />
      <SubTitle>
        <FormattedMessage {...messages.titlePaymentAuthority} />
      </SubTitle>

      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelFirstName.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'authority.firstName', '-')}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelLastName.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'authority.lastName', '-')}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelEmail.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">
            {get(clientData, 'authority.email', '') ? (
              <A href={`mailto:${get(clientData, 'authority.email', '')}`} target="_blank">
                {get(clientData, 'authority.email', '')}
              </A>
            ) : (
              '-'
            )}
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelPhoneNumber.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{`+${get(clientData, 'authority.countryCode', '')}-${get(
            clientData,
            'authority.phoneNumber',
            '-',
          )}`}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>{containerMessage.labelJobTitle.defaultMessage}</p>
        </Col>
        <Col className="col-8">
          <p className="opacity-100">{get(clientData, 'authority.jobTitle', '')}</p>
        </Col>
      </Row>

      {this.renderAddressAuthorisedPerson(clientData)}
    </React.Fragment>
  );

  showProxyLoginCTA = clientData => {
    let output = '';
    if (!isEmpty(clientData) && get(clientData, 'status') !== 'Suspend') {
      output = (
        <div className="mx-auto mt-3 mt-sm-0 me-sm-0">
          <ProxyLogin type="client" userId={get(clientData, 'clientUserId')} {...this.props} />
        </div>
      );
    }
    return output;
  };

  render() {
    const { clientData } = this.state;
    const { history } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ProfileContent>
          <PrivateGrid>
            <BackLink onClick={() => redirectTo(history, '/admin/clients')}>{messages.backToClient.defaultMessage}</BackLink>
            <Card>
              <CardHeader className="flex-column flex-sm-row align-items-start align-items-md-center">
                <div className="d-flex align-items-start">
                  <H4 className="m-0">{messages.titleClientDetails.defaultMessage}</H4>
                  <Badge className={`${getBadgeClass(get(clientData, 'status'))} ms-3 text-capitalize`}>{get(clientData, 'status')}</Badge>
                </div>
                {this.showProxyLoginCTA(clientData)}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="col-4">
                    <SubTitle>{containerMessage.labelRegisterType.defaultMessage}</SubTitle>
                  </Col>
                  <Col className="col-8">
                    <p className="opacity-100 text-capitalize">{get(clientData, 'registerType', '-')}</p>
                  </Col>
                </Row>
                <Seperator />
                <SubTitle>
                  <FormattedMessage {...messages.titleBasic} />
                </SubTitle>
                <Row>
                  <Col className="col-4">
                    <p>{containerMessage.labelFirstName.defaultMessage}</p>
                  </Col>
                  <Col className="col-8">
                    <p className="opacity-100">{get(clientData, 'firstName', '-')}</p>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-4">
                    <p>{containerMessage.labelLastName.defaultMessage}</p>
                  </Col>
                  <Col className="col-8">
                    <p className="opacity-100">{get(clientData, 'lastName', '-')}</p>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-4">
                    <p>{containerMessage.labelJobTitle.defaultMessage}</p>
                  </Col>
                  <Col className="col-8">
                    <p className="opacity-100">{get(clientData, 'jobTitle', '-')}</p>
                  </Col>
                </Row>

                <Seperator />
                <SubTitle>
                  <FormattedMessage {...containerMessage.titlePersonalAddress} />
                </SubTitle>

                <Row>
                  <Col className="col-4">
                    <p>{containerMessage.labelLine1.defaultMessage}</p>
                  </Col>
                  <Col className="col-8">
                    <p className="opacity-100">{get(clientData, 'addressLineOne', '-')}</p>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-4">
                    <p>{containerMessage.labelLine2.defaultMessage}</p>
                  </Col>
                  <Col className="col-8">
                    <p className="opacity-100">{get(clientData, 'addressLineTwo', '-') || '-'}</p>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-4">
                    <p>{containerMessage.labelCity.defaultMessage}</p>
                  </Col>
                  <Col className="col-8">
                    <p className="opacity-100">{get(clientData, 'city', '-')}</p>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-4">
                    <p>{containerMessage.labelCountry.defaultMessage}</p>
                  </Col>
                  <Col className="col-8">
                    <p className="opacity-100">{get(clientData, 'country', '-')}</p>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-4">
                    <p>{containerMessage.labelPostcode.defaultMessage}</p>
                  </Col>
                  <Col className="col-8">
                    <p className="opacity-100">{get(clientData, 'postcode', '-')}</p>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-4">
                    <p>{containerMessage.labelTimezone.defaultMessage}</p>
                  </Col>
                  <Col className="col-8">
                    <p className="opacity-100">{get(clientData, 'timeZone', '-')}</p>
                  </Col>
                </Row>

                {get(clientData, 'registerType') === 'company' ? this.renderCompanyDetails(clientData) : ''}
              </CardBody>
            </Card>
          </PrivateGrid>
        </ProfileContent>
      </React.Fragment>
    );
  }
}

ClientDetailPage.propTypes = propTypes;

export default ClientDetailPage;
