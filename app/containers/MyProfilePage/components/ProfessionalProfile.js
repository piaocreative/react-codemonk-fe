/** ProfessionalProfile Page
 * This is the ProfessionalProfile page for the App, at the '/my-profile' route
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import get from 'lodash/get';
import { reduxForm } from 'redux-form/immutable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import SVG from 'react-inlinesvg';
import { Card, H5 } from 'components';
import { githubIcon, linkedinIcon, stackoverflowIcon, editIcon } from 'containers/App/constants';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import { ProfessionalProfiles } from 'components/UserProfileComponents/ProfessionalProfiles';
import { propTypes } from 'containers/Auth/ProfessionalDetail/proptypes';
import { gtm } from 'utils/Helper';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import * as actions from 'containers/Auth/ProfessionalDetail/actions';
import reducer from 'containers/Auth/ProfessionalDetail/reducer';
import saga from 'containers/Auth/ProfessionalDetail/saga';
import { redirectPageURL } from 'containers/App/utils';
import * as selectors from 'containers/Auth/ProfessionalDetail/selectors';
import { key } from 'containers/Auth/ProfessionalDetail/constants';
import PopupWrapper from '../PopupWrapper';
import { CardHeader, ActionIconLink, ProfileList } from '../styles';
import { modals } from '../constants';
import messages from '../messages';

export class ProfessionalProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showProfessionalProfileModal: false, linkedInUrlClass: '', gitHubUrlClass: '', stackOverFlowUrlClass: '' };
  }

  componentDidMount() {
    const {
      onChangeLinkedInProfile,
      onChangeGithubProfile,
      onChangeStackoverflowProfile,
      onChangeDribbleProfile,
      onChangeBehanceProfile,
      onChangePersonalProfile,
      data,
    } = this.props;

    const linkedInUrl = jsonCopy(get(data, 'linkedInUrl', ''));
    const gitHubUrl = jsonCopy(get(data, 'gitHubUrl', ''));
    const stackOverFlowUrl = jsonCopy(get(data, 'stackOverFlowUrl', ''));
    const dribbbleUrl = jsonCopy(get(data, 'dribbbleUrl', ''));
    const behanceUrl = jsonCopy(get(data, 'behanceUrl', ''));
    const portfolioUrl = jsonCopy(get(data, 'portfolioUrl', ''));

    onChangeLinkedInProfile({ target: { value: linkedInUrl } });
    onChangeGithubProfile({ target: { value: gitHubUrl } });
    onChangeStackoverflowProfile({ target: { value: stackOverFlowUrl } });
    onChangeDribbleProfile({ target: { value: dribbbleUrl } });
    onChangeBehanceProfile({ target: { value: behanceUrl } });
    onChangePersonalProfile({ target: { value: portfolioUrl } });

    const linkedInUrlClass = get(data, 'linkedInUrl', '') === '' ? 'disabled' : '';
    const gitHubUrlClass = get(data, 'gitHubUrl', '') === '' ? 'disabled' : '';
    const stackOverFlowUrlClass = get(data, 'stackOverFlowUrl', '') === '' ? 'disabled' : '';
    this.setState({ linkedInUrlClass, gitHubUrlClass, stackOverFlowUrlClass });
  }

  componentDidUpdate(prevProps) {
    const { popUpSaga, loadProfileData, currentModal, modalClose } = this.props;
    if (prevProps.popUpSaga === true && popUpSaga === false && currentModal === modals.ProfessionalProfile) {
      this.setState({ showProfessionalProfileModal: false });
      modalClose();
      loadProfileData();
    }
  }

  handleProfileOpenModal = () => {
    const { modalOpen } = this.props;
    this.setState({
      showProfessionalProfileModal: true,
    });
    modalOpen(modals.ProfessionalProfile);

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Talent Portal',
      sectionName: 'Professional Profiles',
      value: 1,
    });
  };

  handleProfileCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showProfessionalProfileModal: false });
    modalClose();
  };

  render() {
    const {
      handleSubmit,
      loading,
      responseSuccess,
      responseError,
      invalid,
      onSubmitProfessionalProfile,
      onChangeLinkedInProfile,
      onChangeGithubProfile,
      onChangeStackoverflowProfile,
      onChangeDribbleProfile,
      onChangeBehanceProfile,
      onChangePersonalProfile,
      role,
      data = {},
    } = this.props;
    const { showProfessionalProfileModal, linkedInUrlClass, gitHubUrlClass, stackOverFlowUrlClass } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <H5>
              <FormattedMessage {...messages.titleProfessionalProfiles} />
            </H5>
            {(role === '1' || role === '3') && (
              <ActionIconLink to={{ pathname: redirectPageURL(1), state: { fromMyProfile: true } }}>
                <SVG src={editIcon} />
              </ActionIconLink>
            )}
            {/* <ActionIcon type="button" onClick={() => this.handleProfileOpenModal(0)}>
                <SVG src={editIcon} />
              </ActionIcon> */}
          </CardHeader>

          <ProfileList>
            <li>
              {get(data, 'linkedInUrl', '') === '' || role === 'client' ? (
                <img src={linkedinIcon} alt="Linkdin" className={linkedInUrlClass} />
              ) : (
                <a href={get(data, 'linkedInUrl', '')} target="_blank" title="Linkdin">
                  <img src={linkedinIcon} alt="Linkdin" />
                </a>
              )}
            </li>
            <li>
              {get(data, 'gitHubUrl', '') === '' || role === 'client' ? (
                <img src={githubIcon} alt="GitHub" className={gitHubUrlClass} />
              ) : (
                <a href={get(data, 'gitHubUrl', '')} target="_blank" title="GitHub">
                  <img src={githubIcon} alt="GitHub" />
                </a>
              )}
            </li>
            <li>
              {get(data, 'stackOverFlowUrl', '') === '' || role === 'client' ? (
                <img src={stackoverflowIcon} alt="Stack OverFlow" className={stackOverFlowUrlClass} />
              ) : (
                <a href={get(data, 'stackOverFlowUrl', '')} target="_blank" title="Stack Overflow">
                  <img src={stackoverflowIcon} alt="Stack OverFlow" />
                </a>
              )}
            </li>
          </ProfileList>
        </Card>
        <PopupWrapper
          loading={loading}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid}
          isOpen={showProfessionalProfileModal}
          modalType="edit"
          onDiscard={this.handleProfileCloseModal}
          onHandleSubmit={handleSubmit(e => {
            onSubmitProfessionalProfile(e);
            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_edit_saved',
              category: 'Talent Portal',
              sectionName: 'Professional Profiles',
              value: 1,
            });
          })}
          title={messages.modelEditProfessionalProfilesHeader.defaultMessage}
        >
          <form onSubmit={handleSubmit}>
            <ProfessionalProfiles
              githubProfile={get(data, 'gitHubUrl', '')}
              stackoverflowProfile={get(data, 'stackOverFlowUrl', '')}
              linkedInProfile={get(data, 'linkedInUrl', '')}
              dribbbleProfile={get(data, 'dribbbleUrl', '')}
              behanceProfile={get(data, 'behanceUrl', '')}
              personalProfile={get(data, 'portfolioUrl', '')}
              onChangeLinkedInProfile={onChangeLinkedInProfile}
              onChangeGithubProfile={onChangeGithubProfile}
              onChangeStackoverflowProfile={onChangeStackoverflowProfile}
              onChangeDribbleProfile={onChangeDribbleProfile}
              onChangeBehanceProfile={onChangeBehanceProfile}
              onChangePersonalProfile={onChangePersonalProfile}
              {...this.props}
              formKey={key}
              size="sm"
            />
          </form>
        </PopupWrapper>
      </React.Fragment>
    );
  }
}

ProfessionalProfile.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  linkedInProfile: selectors.makeSelectLinkedInProfile(),
  githubProfile: selectors.makeSelectGithubProfile(),
  stackoverflowProfile: selectors.makeSelectStackoverflowProfile(),

  dribbbleProfile: selectors.makeSelectDribbleProfile(),
  behanceProfile: selectors.makeSelectBehanceProfile(),
  personalProfile: selectors.makeSelectPersonalProfile(),

  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeLinkedInProfile: event => dispatch(actions.changeLinkedInProfile(event.target.value)),
    onChangeGithubProfile: event => dispatch(actions.changeGithubProfile(event.target.value)),
    onChangeStackoverflowProfile: event => dispatch(actions.changeStackoverflowProfile(event.target.value)),

    onChangeDribbleProfile: event => dispatch(actions.changeDribbleProfile(event.target.value)),
    onChangeBehanceProfile: event => dispatch(actions.changeBehanceProfile(event.target.value)),
    onChangePersonalProfile: event => dispatch(actions.changePersonalProfile(event.target.value)),

    onSubmitProfessionalProfile: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.editProfessionURL());
    },
  };
}

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
)(ProfessionalProfile);
