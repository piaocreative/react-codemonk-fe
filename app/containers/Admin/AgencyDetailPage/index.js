/** AgencyDetailPage **/
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import parse from 'html-react-parser';
import ShowMoreText from 'components/ShowMore/ShowMoreText';
import { VALIDATION } from 'utils/constants';
import { API_URL, AGENCY, defaultImgIcon } from 'containers/App/constants';
import { ProfileContent, CardHeader, CardBody, BackLink } from 'containers/MyProfilePage/styles';
import request from 'utils/request';
import ProxyLogin from 'containers/Admin/ProxyLogin';
import { propTypes } from 'containers/proptypes';
import { PrivateGrid, Card, H4, Badge, A } from 'components';
import ToastifyMessage from 'components/ToastifyMessage';
import { getBadgeClass, redirectTo } from 'containers/App/utils';
import containerMessage from 'containers/messages';
import { Seperator, SubTitle } from 'containers/Admin/ClientDetailPage/styles';
import { LogoBlock } from './styles';
import messages from './messages';

export class AgencyDetailPage extends Component {
  constructor(props) {
    super(props);

    const { params } = props.match;
    const agencyID = get(params, 'agencyID', '');
    this.state = {
      agencyID,
      agencyData: {},
    };
  }

  componentDidMount() {
    this.loadAdminAgencyDetails();
  }

  loadAdminAgencyDetails = () => {
    const data = { method: 'GET' };
    const { agencyID } = this.state;
    const requestURL = `${API_URL}${AGENCY}/${agencyID}`;
    request(requestURL, data)
      .then(this.setAdminAgencyDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setAdminAgencyDetails = response => {
    if (get(response, 'status')) {
      const { data } = response;

      this.setState({ agencyData: data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  renderAgencyPersonalDetails = agencyData => {
    const sectionData = [
      { title: containerMessage.labelFirstName.defaultMessage, value: get(agencyData, 'firstName', '-') },
      {
        title: containerMessage.labelLastName.defaultMessage,
        value: get(agencyData, 'lastName', '-'),
      },
      {
        title: containerMessage.labelRole.defaultMessage,
        value: get(agencyData, 'designation', '-'),
      },
      {
        title: containerMessage.labelPhoneNumber.defaultMessage,
        value: get(agencyData, 'countryCode') ? `+${get(agencyData, 'countryCode', '')}-${get(agencyData, 'phoneNumber', '-')}` : '-',
      },
    ];

    return (
      <React.Fragment>
        <SubTitle>
          <FormattedMessage {...messages.titlePersonalDetails} />
        </SubTitle>
        {sectionData.map(field => (
          <Row>
            <Col className="col-4">
              <p>{field.title}</p>
            </Col>
            <Col className="col-8">
              <p className="opacity-100">{field.value}</p>
            </Col>
          </Row>
        ))}
      </React.Fragment>
    );
  };

  renderAgencyCompanyDetails = agencyData => {
    const sectionData = [
      { title: containerMessage.labelCompanyName.defaultMessage, value: get(agencyData, 'name', '-') },
      { title: containerMessage.labelCompanyRegistrationNo.defaultMessage, value: get(agencyData, 'registeredNumber', '-') },
    ];

    return (
      <React.Fragment>
        <SubTitle>
          <FormattedMessage {...containerMessage.titleCompanyDetails} />
        </SubTitle>
        {sectionData.map(field => (
          <Row>
            <Col className="col-4">
              <p>{field.title}</p>
            </Col>
            <Col className="col-8">
              <p className="opacity-100">{field.value}</p>
            </Col>
          </Row>
        ))}
      </React.Fragment>
    );
  };

  renderAgencyCompanyAddress = agencyData => {
    const renderAgencyCompanyAddressData = [
      { title: containerMessage.labelLine1.defaultMessage, value: get(agencyData, 'addressLineOne', '-') },
      {
        title: containerMessage.labelLine2.defaultMessage,
        value: get(agencyData, 'addressLineTwo') ? get(agencyData, 'addressLineTwo') : '-',
      },
      {
        title: containerMessage.labelPostcode.defaultMessage,
        value: get(agencyData, 'postCode', '-'),
      },
      {
        title: containerMessage.labelCity.defaultMessage,
        value: get(agencyData, 'city', '-'),
      },
      {
        title: containerMessage.labelCountry.defaultMessage,
        value: get(agencyData, 'country', '-'),
      },
      {
        title: containerMessage.labelDUNSNo.defaultMessage,
        value: get(agencyData, 'duns', '-'),
      },
      {
        title: containerMessage.labelVatNo.defaultMessage,
        value: get(agencyData, 'vatNumber', '-'),
      },
    ];
    return (
      <React.Fragment>
        <SubTitle>
          <FormattedMessage {...containerMessage.titleCompanyRegisteredAddress} />
        </SubTitle>
        {renderAgencyCompanyAddressData.map(field => (
          <Row>
            <Col className="col-4">
              <p>{field.title}</p>
            </Col>
            <Col className="col-8">
              <p className="opacity-100">{field.value}</p>
            </Col>
          </Row>
        ))}
      </React.Fragment>
    );
  };

  renderAgencyTradingDetails = agencyData => {
    const plainSummaryText = get(agencyData, 'tradingSummary', '').replace(/<[^>]*>?/gm, '');
    const sectionData = [
      { title: containerMessage.labelTradingName.defaultMessage, value: get(agencyData, 'tradingName', '-') },
      {
        title: containerMessage.labelWebsite.defaultMessage,
        value: get(agencyData, 'tradingWebsite') ? (
          <A href={get(agencyData, 'tradingWebsite')} target="_blank">
            {get(agencyData, 'tradingWebsite')}
          </A>
        ) : (
          '-'
        ),
      },
      {
        title: containerMessage.labelTradingSummary.defaultMessage,
        value: get(agencyData, 'tradingSummary') ? (
          <div className="read-more-less-content mb-0">
            <ShowMoreText
              lines={5}
              more="more"
              less=""
              anchorClass="links"
              onClick={this.executeOnClick}
              expanded={false}
              plainText={plainSummaryText}
            >
              {parse(get(agencyData, 'tradingSummary'))}
            </ShowMoreText>
          </div>
        ) : (
          '-'
        ),
      },
    ];

    return (
      <React.Fragment>
        <SubTitle>{messages.titleTradingDetails.defaultMessage}</SubTitle>
        {sectionData.map(field => (
          <Row>
            <Col className="col-4">
              <p>{field.title}</p>
            </Col>
            <Col className="col-8">
              <p className="opacity-100">{field.value}</p>
            </Col>
          </Row>
        ))}
      </React.Fragment>
    );
  };

  renderAgencyLogo = agencyData => {
    const logo = get(agencyData, 'tradingLogo') ? get(agencyData, 'tradingLogo') : defaultImgIcon;
    return (
      <React.Fragment>
        <SubTitle>{messages.titleAgencyLogo.defaultMessage}</SubTitle>
        <Row>
          <Col className="col-4">
            <p>{messages.labelAgencyLogo.defaultMessage}</p>
          </Col>
          <Col className="col-8">
            <LogoBlock>
              <img src={logo} alt="logo" />
            </LogoBlock>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  renderAgencyTradingOfficeAddress = data => {
    const sectionData = [
      { title: containerMessage.labelLine1.defaultMessage, value: get(data, 'tradingAddressLineOne', '-') },
      {
        title: containerMessage.labelLine2.defaultMessage,
        value: get(data, 'tradingAddressLineTwo') ? get(data, 'tradingAddressLineTwo') : '-',
      },
      {
        title: containerMessage.labelPostcode.defaultMessage,
        value: get(data, 'tradingPostCode', '-'),
      },
      {
        title: containerMessage.labelCity.defaultMessage,
        value: get(data, 'tradingCity', '-'),
      },
      {
        title: containerMessage.labelCountry.defaultMessage,
        value: get(data, 'tradingCountry', '-'),
      },
    ];
    return (
      <React.Fragment>
        <SubTitle>{messages.titleAgencyTradingAddress.defaultMessage}</SubTitle>
        {sectionData.map(field => (
          <Row>
            <Col className="col-4">
              <p>{field.title}</p>
            </Col>
            <Col className="col-8">
              <p className="opacity-100">{field.value}</p>
            </Col>
          </Row>
        ))}
      </React.Fragment>
    );
  };

  showProxyLoginCTA = agencyData => {
    let output = '';
    if (!isEmpty(agencyData) && get(agencyData, 'status') !== 'Suspend') {
      output = (
        <div className="mx-auto mt-3 mt-sm-0 me-sm-0">
          <ProxyLogin type="agency" userId={get(agencyData, 'agencyUserId')} {...this.props} />
        </div>
      );
    }
    return output;
  };

  render() {
    const { agencyData } = this.state;
    const { history } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ProfileContent>
          <PrivateGrid>
            <BackLink onClick={() => redirectTo(history, '/admin/agencies')}>{messages.backToAgency.defaultMessage}</BackLink>
            <Card>
              <CardHeader>
                <div className="d-flex align-items-start">
                  <H4 className="m-0">{messages.titleAgencyDetails.defaultMessage}</H4>
                  <Badge className={`${getBadgeClass(get(agencyData, 'status'))} ms-3 text-capitalize`}>{get(agencyData, 'status')}</Badge>
                </div>
                {this.showProxyLoginCTA(agencyData)}
              </CardHeader>
              <CardBody>
                {this.renderAgencyPersonalDetails(agencyData)}
                <Seperator />
                {this.renderAgencyCompanyDetails(agencyData)}
                <Seperator />
                {this.renderAgencyCompanyAddress(agencyData)}
                <Seperator />
                {this.renderAgencyTradingDetails(agencyData)}
                <Seperator />
                {this.renderAgencyLogo(agencyData)}
                <Seperator />
                {this.renderAgencyTradingOfficeAddress(agencyData)}
              </CardBody>
            </Card>
          </PrivateGrid>
        </ProfileContent>
      </React.Fragment>
    );
  }
}

AgencyDetailPage.propTypes = propTypes;

export default AgencyDetailPage;
