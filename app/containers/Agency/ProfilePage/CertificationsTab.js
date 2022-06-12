/** CertificationsTab Tab Page
 * This is the CertificationsTab Tab in agency profile
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import get from 'lodash/get';
import has from 'lodash/has';
import moment from 'moment';
import { gtm } from 'utils/Helper';
import { v4 as uuidv4 } from 'uuid';
import Emitter from 'utils/emitter';
import { H1, LinkButtonMod, FormWrapper } from 'components';
import { createStructuredSelector } from 'reselect';
import { reduxForm, change, untouch } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import { agencyRedirectToPage } from 'containers/App/utils';
import { errorInUserDetails, loadUserDetails, accountSettingsTabFooter } from 'containers/Auth/utils';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import { checkForEmptyCertificate } from 'containers/Auth/Education-Certification/utils';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import { CertificateComponent } from 'components/UserProfileComponents/CertificateComponent';
import authMessages from 'containers/Auth/Talent/AgencyCertificatesPage/messages';
import * as actions from 'containers/Auth/Talent/AgencyCertificatesPage/actions';
import * as selectors from 'containers/Auth/Talent/AgencyCertificatesPage/selectors';
import reducer from 'containers/Auth/Talent/AgencyCertificatesPage/reducer';
import saga from 'containers/Auth/Talent/AgencyCertificatesPage/saga';
import { key } from 'containers/Auth/Talent/AgencyCertificatesPage/constants';
import { defaultProps, propTypes } from 'containers/proptypes';
import { EditLink } from 'containers/AccountSettingsPage/styles';
import messages from './messages';

export class CertificationsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFlag: false,
      certificateTouch: [],
    };
  }

  componentDidMount() {
    loadUserDetails(this.setCertiDetails);

    Emitter.on('agencyCertificateSaga', agencyCertificateSaga => {
      if (agencyCertificateSaga) {
        this.setState({ editFlag: false });
      }
    });
  }

  componentWillUnmount() {
    Emitter.off('agencyCertificateSaga');
  }

  setCertiDetails = response => {
    const { dispatch, history, location, onChangeCertificate } = this.props;
    if (get(response, 'status')) {
      const { data } = response;
      const currentSignupStep = has(response, 'data.signupStep') === true ? get(response, 'data.signupStep') + 1 : 1;
      agencyRedirectToPage(history, location.redirection, currentSignupStep, 7);

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

  handleEdit = editFlag => {
    this.setState({ editFlag: !editFlag });

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Agency Portal',
      sectionName: 'Certifications',
      value: 1,
    });
  };

  handleCancelButton = editFlag => this.setState({ editFlag: !editFlag });

  handleSubmitButton = (invalid, editFlag) => {
    let output = true;
    if (!invalid && editFlag) {
      output = false;
    }
    return output;
  };

  handleSubmitCertificate = e => {
    const { onSubmitCertificate, certificate } = this.props;

    const formData = [];
    for (let i = 0; i < certificate.length; i++) {
      const formObj = {};
      if (!checkForEmptyCertificate(certificate[i])) {
        const { name, dateObtained, issuedBy } = certificate[i];
        formObj.name = name;
        formObj.dateObtained = moment(dateObtained).format('DD/MM/YYYY');
        formObj.issuedBy = issuedBy;
        formData.push(formObj);
      }
    }

    const data = {
      certificates: formData,
    };
    onSubmitCertificate(e, data);

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit_saved',
      category: 'Agency Portal',
      sectionName: 'Certifications',
      value: 1,
    });
  };

  render() {
    const { handleSubmit, loading, invalid, certificate } = this.props;
    const { editFlag, certificateTouch } = this.state;
    return (
      <PaymentPageWrapper>
        <FormWrapper>
          <div className="d-flex align-items-center justify-content-between mb-5">
            {!editFlag ? (
              <H1 className="text-start mb-0">
                <FormattedMessage {...messages.certificationsTitle} />
              </H1>
            ) : (
              <H1 className="text-start mb-0">
                <FormattedMessage {...messages.certificationsEditTitle} />
              </H1>
            )}
            {!editFlag && (
              <EditLink
                color="link"
                onClick={() => {
                  this.handleEdit(editFlag);
                }}
              >
                <small className="opacity-100">
                  <FormattedMessage {...messages.editCTA} />
                </small>
              </EditLink>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            {get(this.props, 'certificate', []).length > 0 &&
              certificate.map((data, index) => (
                <CertificateComponent
                  key={get(data, '_id')}
                  formKey={key}
                  certificate={data}
                  index={index}
                  onDeleteForm={this.onDeleteCertificateForm}
                  certificateTouch={certificateTouch}
                  onChangeSecondCertificate={flagArray => this.changeCertificateTouch(flagArray)}
                  onBoarding
                  agency
                  editFlag={editFlag}
                  {...this.props}
                />
              ))}
            <LinkButtonMod color="link" onClick={this.onAddCertificateForm} disabled={!editFlag}>
              {get(this.props, 'certificate', []).length === 0
                ? authMessages.labelAddFirstCertificate.defaultMessage
                : authMessages.labelAddCertificate.defaultMessage}
            </LinkButtonMod>
            <hr />

            {accountSettingsTabFooter(
              loading,
              invalid,
              handleSubmit,
              editFlag,
              this.handleCancelButton,
              this.handleSubmitButton,
              this.handleSubmitCertificate,
            )}
          </form>
        </FormWrapper>
      </PaymentPageWrapper>
    );
  }
}

CertificationsTab.defaultProps = defaultProps;
CertificationsTab.propTypes = propTypes;

export function mapDispatchToProps(dispatch) {
  return {
    onChangeCertificate: data => dispatch(actions.changeCertificateDetails(data)),
    onSubmitCertificate: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitAddCertificate('editCertificate', data));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  certificate: selectors.makeSelectCertificateDetails(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
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
)(CertificationsTab);
