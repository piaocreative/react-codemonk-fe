/** CredentialsTab Tab Page
 * This is the CredentialsTab Tab in agency profile
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import get from 'lodash/get';
import has from 'lodash/has';
import { gtm } from 'utils/Helper';
import Emitter from 'utils/emitter';
import { H1, LinkButtonMod, Button, FormWrapper } from 'components';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import { agencyRedirectToPage } from 'containers/App/utils';
import { setChange, errorInUserDetails, loadUserDetails } from 'containers/Auth/utils';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import { CredentialsComponent } from 'components/AgencyProfileComponents/CredentialsComponent';
import * as actions from 'containers/Auth/Talent/AgencyCertificatesPage/actions';
import * as selectors from 'containers/Auth/Talent/AgencyCertificatesPage/selectors';
import saga from 'containers/Auth/Talent/AgencyCertificatesPage/saga';
import { key } from 'containers/Auth/Talent/AgencyCertificatesPage/constants';
import { defaultProps, propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import { EditLink } from 'containers/AccountSettingsPage/styles';
import messages from './messages';

export class CredentialsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFlag: false,
    };
  }

  componentDidMount() {
    loadUserDetails(this.setAgencyDetails);

    Emitter.on('agencyCredentialsSaga', agencyCredentialsSaga => {
      if (agencyCredentialsSaga) {
        this.setState({ editFlag: false });
      }
    });
  }

  componentWillUnmount() {
    Emitter.off('agencyCredentialsSaga');
  }

  setAgencyDetails = response => {
    const { dispatch, history, location } = this.props;
    if (get(response, 'status')) {
      const { data } = response;
      const currentSignupStep = has(response, 'data.signupStep') === true ? get(response, 'data.signupStep') + 1 : 1;
      agencyRedirectToPage(history, location.redirection, currentSignupStep, 7);

      const setData = {
        linkedInUrl: get(data, 'socialProfile.linkedInUrl', ''),
        gitHubUrl: get(data, 'socialProfile.gitHubUrl', ''),
        dribbbleUrl: get(data, 'socialProfile.dribbbleUrl', ''),
        clutchUrl: get(data, 'socialProfile.clutchUrl', ''),
        goodfirmsUrl: get(data, 'socialProfile.goodfirmsUrl', ''),
        otherWebsiteUrl: get(data, 'socialProfile.otherWebsiteUrl', ''),
      };
      setChange(dispatch, key, setData);
    } else {
      errorInUserDetails(get(response, 'message'));
    }
  };

  handleEditCreds = editFlag => {
    this.setState({ editFlag: !editFlag });

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Agency Portal',
      sectionName: 'Credentials',
      value: 1,
    });
  };

  handleCredCancelButton = editFlag => {
    this.setState({ editFlag: !editFlag });
  };

  handleSubmitButton = (invalid, editFlag) => {
    let output = true;
    if (!invalid && editFlag) {
      output = false;
    }
    return output;
  };

  handleSubmitCertificate = e => {
    const { onSubmitCredentials, linkedInUrl, gitHubUrl, dribbbleUrl, clutchUrl, goodfirmsUrl, otherWebsiteUrl } = this.props;

    const data = {
      linkedInUrl,
      gitHubUrl,
      dribbbleUrl,
      clutchUrl,
      goodfirmsUrl,
      otherWebsiteUrl,
    };

    const dataKeys = Object.keys(data);
    dataKeys.forEach(fields => {
      if (typeof data[fields] === 'undefined') {
        data[fields] = '';
      }
    });

    onSubmitCredentials(e, data);

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit_saved',
      category: 'Agency Portal',
      sectionName: 'Credentials',
      value: 1,
    });
  };

  renderCredFooter = (handleSubmit, loading, invalid, editFlag) => (
    <div className="d-flex justify-content-md-end align-items-center flex-wrap justify-content-between">
      <LinkButtonMod
        color="link"
        className="m-link"
        disabled={!editFlag}
        onClick={() => {
          this.handleCredCancelButton(editFlag);
        }}
      >
        <FormattedMessage {...containerMessage.btnCancel} />
      </LinkButtonMod>
      <Button
        className={`${loading ? 'loading' : ''} btn-primary mt-0 me-0`}
        disabled={this.handleSubmitButton(invalid, editFlag)}
        onClick={handleSubmit(e => this.handleSubmitCertificate(e))}
      >
        <FormattedMessage {...containerMessage.btnSave} />
      </Button>
    </div>
  );

  render() {
    const { handleSubmit, loading, invalid } = this.props;
    const { editFlag } = this.state;
    return (
      <PaymentPageWrapper>
        <FormWrapper>
          <div className="d-flex align-items-center justify-content-between mb-5">
            {!editFlag ? (
              <H1 className="text-start mb-0">
                <FormattedMessage {...messages.credentialsTitle} />
              </H1>
            ) : (
              <H1 className="text-start mb-0">
                <FormattedMessage {...messages.credentialsEditTitle} />
              </H1>
            )}
            {!editFlag && (
              <EditLink
                color="link"
                onClick={() => {
                  this.handleEditCreds(editFlag);
                }}
              >
                <small className="opacity-100">
                  <FormattedMessage {...messages.editCTA} />
                </small>
              </EditLink>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <CredentialsComponent {...this.props} editFlag={editFlag} />

            <hr />
            {this.renderCredFooter(handleSubmit, loading, invalid, editFlag)}
          </form>
        </FormWrapper>
      </PaymentPageWrapper>
    );
  }
}

CredentialsTab.propTypes = propTypes;
CredentialsTab.defaultProps = defaultProps;

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitCredentials: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitAddCertificate('editCredentials', data));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  linkedInUrl: selectors.linkedInUrl,
  gitHubUrl: selectors.gitHubUrl,
  dribbbleUrl: selectors.dribbbleUrl,
  clutchUrl: selectors.clutchUrl,
  goodfirmsUrl: selectors.goodfirmsUrl,
  otherWebsiteUrl: selectors.otherWebsiteUrl,

  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key, saga });

export default compose(
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(CredentialsTab);
