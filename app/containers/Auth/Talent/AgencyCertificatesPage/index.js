/**
 * AgencyCertificatesPage
 *
 * This is the AgencyCertificatesPagee for the App, at the '/agency-certificates' route
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormGroup, Row, Col } from 'reactstrap';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import get from 'lodash/get';
import has from 'lodash/has';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { renderField } from 'utils/Fields';
import { agencyStepSize, agencyRedirectToPage } from 'containers/App/utils';
import { API_URL, USER, DETAILS } from 'containers/App/constants';
import request from 'utils/request';
import containerMessage from 'containers/messages';
import * as formValidations from 'utils/formValidations';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import * as normalize from 'utils/normalize';
import { setChange, errorInUserDetails } from 'containers/Auth/utils';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import { getFieldValidator } from 'components/UserProfileComponents/fields';
import { CertificateComponent } from 'components/UserProfileComponents/CertificateComponent';
import { checkForInvalidCertificate } from 'containers/Auth/Education-Certification/utils';
import { LinkButtonMod, ContainerMod, ProgressMod, Card, H1, H4, FormWrapper, FormLabel } from 'components';
import { defaultProps, propTypes } from 'containers/proptypes';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import { key } from './constants';
import messages from './messages';
import CertificationsFooter from './CertificationsFooter';
import { WorkExperienceWrapper } from './styles';
import { formFields } from './fields';

export class AgencyCertificatesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { certificateTouch: [] };
  }

  componentDidMount() {
    this.loaderUserDetails();
  }

  loaderUserDetails = () => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${USER}${DETAILS}`;
    request(requestURL, data)
      .then(this.setUserDetails)
      .catch(() => {
        errorInUserDetails();
      });
  };

  setUserDetails = response => {
    const { dispatch, history, location, onChangeCertificate } = this.props;
    if (get(response, 'status')) {
      const { data } = response;
      const currentSignupStep = has(response, 'data.signupStep') === true ? get(response, 'data.signupStep') + 1 : 1;
      agencyRedirectToPage(history, location.redirection, currentSignupStep, 2);

      const setData = {
        linkedInUrl: get(data, 'socialProfile.linkedInUrl', ''),
        gitHubUrl: get(data, 'socialProfile.gitHubUrl', ''),
        dribbbleUrl: get(data, 'socialProfile.dribbbleUrl', ''),
        clutchUrl: get(data, 'socialProfile.clutchUrl', ''),
        goodfirmsUrl: get(data, 'socialProfile.goodfirmsUrl', ''),
        otherWebsiteUrl: get(data, 'socialProfile.otherWebsiteUrl', ''),
      };
      setChange(dispatch, key, setData);

      // setCertificate Data
      const certificate = get(data, 'certificateDetails', []);
      const setCertificate = [];
      const certificateTouch = [];
      if (certificate.length > 0) {
        for (let i = 0; i < certificate.length; i++) {
          const certificateData = {
            _id: uuidv4(),
            name: certificate[i].name,
            dateObtained: moment(certificate[i].dateObtained),
            issuedBy: certificate[i].issuedBy,
          };

          dispatch(change(key, `name${i}`, certificateData.name));
          dispatch(change(key, `dateObtained${i}`, certificateData.dateObtained));
          dispatch(change(key, `issuedBy${i}`, certificateData.issuedBy));
          setCertificate.push(certificateData);
          certificateTouch.push(0);
        }
      } else {
        const certificateData = {
          _id: uuidv4(),
          name: '',
          dateObtained: '',
          issuedBy: '',
        };
        dispatch(change(key, `name`, certificateData.name));
        dispatch(change(key, `dateObtained`, certificateData.dateObtained));
        dispatch(change(key, `issuedBy`, certificateData.issuedBy));
        setCertificate.push(certificateData);
        certificateTouch.push(0);
      }
      onChangeCertificate(setCertificate);
      this.setState({ certificateTouch });
    } else {
      errorInUserDetails(get(response, 'message'));
    }
  };

  changeCertificateTouch = flagArray => {
    this.setState({ certificateTouch: flagArray });
  };

  onAddCertificateForm = () => {
    const { dispatch, onChangeCertificate, certificate } = this.props;
    const newCertificateTouch = jsonCopy(get(this, 'state.certificateTouch', []));
    const totalCertificateDetails = certificate.length;
    const newCertificateData = [
      {
        _id: uuidv4(),
        name: '',
        dateObtained: '',
        issuedBy: '',
      },
    ];
    dispatch(change(key, `name${totalCertificateDetails + 1}`, newCertificateData.name));
    dispatch(change(key, `dateObtained${totalCertificateDetails + 1}`, newCertificateData.dateObtained));
    dispatch(change(key, `issuedBy${totalCertificateDetails + 1}`, newCertificateData.issuedBy));

    const certificateData = [...certificate, ...newCertificateData];
    onChangeCertificate(certificateData);
    newCertificateTouch.push(0);
    this.setState({ certificateTouch: newCertificateTouch });
  };

  onDeleteCertificateForm = removeFormIndex => {
    const { dispatch, onChangeCertificate, certificate } = this.props;

    const newCertificateTouch = jsonCopy(get(this, 'state.certificateTouch', []));
    newCertificateTouch.splice(removeFormIndex, 1);
    this.setState({ certificateTouch: newCertificateTouch });

    let newCertificateDetails = certificate;
    newCertificateDetails = newCertificateDetails.filter((_, index) => index !== removeFormIndex);

    for (let i = 0; i < newCertificateDetails.length; i++) {
      dispatch(change(key, `name${i}`, newCertificateDetails[i].name));
      dispatch(change(key, `dateObtained${i}`, newCertificateDetails[i].dateObtained));
      dispatch(change(key, `issuedBy${i}`, newCertificateDetails[i].issuedBy));

      dispatch(untouch(key, `name${i}`));
      dispatch(untouch(key, `dateObtained${i}`));
      dispatch(untouch(key, `issuedBy${i}`));
    }

    const total = newCertificateDetails.length;
    dispatch(change(key, `name${total}`, ''));
    dispatch(change(key, `dateObtained${total}`, ''));
    dispatch(change(key, `issuedBy${total}`, ''));

    dispatch(untouch(key, `name${total}`));
    dispatch(untouch(key, `dateObtained${total}`));
    dispatch(untouch(key, `issuedBy${total}`));

    onChangeCertificate(newCertificateDetails);
  };

  handleSaveForLater = (e, submitType) => {
    if (submitType !== 'continue') {
      e.preventDefault();
    }
    this.setSaveForLater(e, submitType);
  };

  setSaveForLater = (e, submitType) => {
    const {
      certificate,
      linkedInUrl,
      gitHubUrl,
      dribbbleUrl,
      clutchUrl,
      goodfirmsUrl,
      otherWebsiteUrl,
      onSaveForLater,
      onSubmitAddCertificate,
    } = this.props;

    const certificateData = [];
    for (let i = 0; i < certificate.length; i++) {
      if (!checkForInvalidCertificate(certificate[i])) {
        const name = get(certificate[i], 'name', '');
        const dateObtained = get(certificate[i], 'dateObtained') ? moment(get(certificate[i], 'dateObtained')).format('DD/MM/YYYY') : '';
        const issuedBy = get(certificate[i], 'issuedBy', '');

        const certificateObj = {
          name,
          dateObtained,
          issuedBy,
        };
        certificateData.push(certificateObj);
      }
    }

    const data = { certificateDetails: certificateData, linkedInUrl, gitHubUrl, dribbbleUrl, clutchUrl, goodfirmsUrl, otherWebsiteUrl };

    const dataKeys = Object.keys(data);
    dataKeys.forEach(fields => {
      if (fields !== 'certificate' && typeof data[fields] === 'undefined') {
        data[fields] = '';
      }
    });

    if (submitType === 'saveForLater') {
      const validateObject = {};
      formFields.forEach(fieldName => {
        validateObject[fieldName] = getFieldValidator(fieldName, false);
      });

      const validator = formValidations.createValidator(validateObject, true)(this.props);
      if (Object.keys(validator).length) {
        const keys = Object.keys(validator);
        keys.forEach(fields => {
          data[fields] = '';
        });
      }
      onSaveForLater(e, data);
    } else if (submitType === 'continue') {
      onSubmitAddCertificate(e, data);
    }
  };

  render() {
    const { certificate } = this.props;
    const { certificateTouch } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod>
          <ProgressMod value={agencyStepSize(4)} className="onboarding-progress" />
          <Card>
            <H1 className="text-center mb-0">
              <FormattedMessage {...messages.headingAgencyCerti} />
            </H1>
            <form>
              <FormWrapper>
                <WorkExperienceWrapper>
                  <H4>
                    <FormattedMessage {...containerMessage.labelCertification} />
                    <small className="optional-text">
                      <FormattedMessage {...containerMessage.optionalText} />
                    </small>
                  </H4>

                  {get(this.props, 'certificate', []).length > 0 &&
                    certificate.map((data, index) => (
                      <CertificateComponent
                        // eslint-disable-next-line no-underscore-dangle
                        key={data._id}
                        formKey={key}
                        certificate={data}
                        index={index}
                        onDeleteForm={this.onDeleteCertificateForm}
                        certificateTouch={certificateTouch}
                        onChangeSecondCertificate={flagArray => this.changeCertificateTouch(flagArray)}
                        onBoarding
                        agency
                        {...this.props}
                      />
                    ))}
                  <LinkButtonMod color="link" onClick={this.onAddCertificateForm}>
                    {messages.labelAddCertificate.defaultMessage}
                  </LinkButtonMod>
                  <hr />

                  {/* credentials urls  */}
                  <H4>
                    <FormattedMessage {...messages.titleCredentials} />
                    <small className="optional-text">
                      <FormattedMessage {...containerMessage.optionalText} />
                    </small>
                  </H4>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <FormLabel>
                          <FormattedMessage {...containerMessage.labelProfileLinkedIn} />
                        </FormLabel>
                        <Field
                          name="linkedInUrl"
                          type="text"
                          component={renderField}
                          placeholder={containerMessage.urlPlaceholder.defaultMessage}
                          normalize={normalize.trimSpace}
                          validate={getFieldValidator('linkedInUrl', false)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <FormLabel>
                          <FormattedMessage {...containerMessage.labelProfileGithub} />
                        </FormLabel>
                        <Field
                          name="gitHubUrl"
                          type="text"
                          component={renderField}
                          placeholder={containerMessage.urlPlaceholder.defaultMessage}
                          normalize={normalize.trimSpace}
                          validate={getFieldValidator('gitHubUrl', false)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <FormLabel>
                          <FormattedMessage {...messages.labelProfileDribble} />
                        </FormLabel>
                        <Field
                          name="dribbbleUrl"
                          type="text"
                          component={renderField}
                          placeholder={containerMessage.urlPlaceholder.defaultMessage}
                          normalize={normalize.trimSpace}
                          validate={getFieldValidator('dribbbleUrl', false)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <FormLabel>
                          <FormattedMessage {...messages.labelClutchURL} />
                        </FormLabel>
                        <Field
                          name="clutchUrl"
                          type="text"
                          component={renderField}
                          placeholder={containerMessage.urlPlaceholder.defaultMessage}
                          normalize={normalize.trimSpace}
                          validate={getFieldValidator('clutchUrl', false)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <FormLabel>
                          <FormattedMessage {...messages.labelGoodfirmsURL} />
                        </FormLabel>
                        <Field
                          name="goodfirmsUrl"
                          type="text"
                          component={renderField}
                          placeholder={containerMessage.urlPlaceholder.defaultMessage}
                          normalize={normalize.trimSpace}
                          validate={getFieldValidator('goodfirmsUrl', false)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <FormLabel>
                          <FormattedMessage {...messages.labelOtherProfessional} />
                        </FormLabel>
                        <Field
                          name="otherWebsiteUrl"
                          type="text"
                          component={renderField}
                          placeholder={containerMessage.urlPlaceholder.defaultMessage}
                          normalize={normalize.trimSpace}
                          validate={getFieldValidator('otherWebsiteUrl', false)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                  <CertificationsFooter {...this.props} handleSaveForLater={this.handleSaveForLater} />
                </WorkExperienceWrapper>
              </FormWrapper>
            </form>
          </Card>
        </ContainerMod>
      </React.Fragment>
    );
  }
}

AgencyCertificatesPage.defaultProps = defaultProps;
AgencyCertificatesPage.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  certificate: selectors.makeSelectCertificateDetails(),

  linkedInUrl: selectors.linkedInUrl,
  gitHubUrl: selectors.gitHubUrl,
  dribbbleUrl: selectors.dribbbleUrl,
  clutchUrl: selectors.clutchUrl,
  goodfirmsUrl: selectors.goodfirmsUrl,
  otherWebsiteUrl: selectors.otherWebsiteUrl,

  loading: makeSelectLoading(),
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeCertificate: data => dispatch(actions.changeCertificateDetails(data)),
    onSaveForLater: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.submitAddCertificate('saveForLater', data));
    },
    onSubmitAddCertificate: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitAddCertificate('continue', data));
    },
  };
}

const withConnect = connect(
  mapStateToProp,
  mapDispatchToProp,
);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(AgencyCertificatesPage);
