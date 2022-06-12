/** Preferences Page
 * This is the Preferences page for the App, at the '/my-profile' route
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { Card, P, Badge } from 'components';
import { createStructuredSelector } from 'reselect';
import { reduxForm, change } from 'redux-form/immutable';
import { gtm } from 'utils/Helper';
import {
  teamPreferenceArray,
  companyTypeArray,
  assignmentArray,
  industryIcon,
  diamondIcon,
  builidingIcon,
  teamIcon,
  noteIcon,
  editNoteIcon,
} from 'containers/App/constants';
import { PreferenceComponent } from 'components/UserProfileComponents/Preference';
import containerMessage from 'containers/messages';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/Auth/Preferences/reducer';
import saga from 'containers/Auth/Preferences/saga';
import { getIndustryList, getCompanyCultures } from 'containers/Auth/utils';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import { SkillListing } from 'containers/Talent/Dashboard/styles';
import {
  makeSelectIndustry,
  makeSelectCompanyCultures,
  makeSelectCompanyType,
  makeSelectPreferredProject,
  makeSelectTeamPreference,
  makeSelectAssignments,
  makeSelectWorkPreference,
} from 'containers/Auth/Preferences/selectors';
import {
  selectTagIndustry,
  selectTagCompanyCultures,
  checkBoxCompanyType,
  checkBoxPreferredProject,
  checkBoxTeamPreference,
  checkBoxAssignment,
  checkBoxWorkPreference,
  submitPreferenceDetailsForm,
} from 'containers/Auth/Preferences/actions';
import ToastifyMessage from 'components/ToastifyMessage';
import { redirectPageURL } from 'containers/App/utils';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import PopupWrapper from '../PopupWrapper';
import { CardHeader, ActionIconLink } from '../styles';
import { modals } from '../constants';
import messages from '../messages';
import { getArrayLabels } from './utils';
const key = 'preferenceDetails';
export class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditPreferenceModal: false,
      industryList: [],
      companyCulturesList: [],
    };
  }

  setIndustries = (response, cb) => {
    if (get(response, 'status')) {
      this.setState({ industryList: response.data }, cb);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      cb();
    }
  };

  setCompanyCultures = (response, cb) => {
    if (get(response, 'status')) {
      this.setState({ companyCulturesList: response.data }, cb);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      cb();
    }
  };

  componentDidUpdate(prevProps) {
    const { popUpSaga, loadProfileData, currentModal, modalClose } = this.props;
    if (prevProps.popUpSaga === true && popUpSaga === false && currentModal === modals.Preferences) {
      this.setState({ showEditPreferenceModal: false });
      modalClose();
      loadProfileData();
    }
  }

  /** call on close button click
   * @author Innovify
   */
  handleEditPreferenceCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showEditPreferenceModal: false });
    modalClose();
  };

  /**
   * call on open handleEditPreferenceOpenModal popup
   * @author Innovify
   */
  handleEditPreferenceOpenModal = () => {
    const {
      onCompanyTypeChange,
      onPreferredProjectChange,
      onTeamPreferenceChange,
      onAssignmentChange,
      onWorkPreferenceChange,
      industryData,
      companyCultureData,
      companyTypeData,
      preferredProjectDurationData,
      teamPreferenceData,
      assignmentsData,
      workPreferenceData,
      modalOpen,
      dispatch,
    } = this.props;

    getIndustryList(this.setIndustries);
    getCompanyCultures(this.setCompanyCultures);

    const industries = industryData.map(v => ({ label: v, value: v }));
    const companyCultures = companyCultureData.map(v => ({ label: v, value: v }));

    dispatch(selectTagIndustry(industries.map(v => v.label)));
    dispatch(selectTagCompanyCultures(companyCultures.map(v => v.label)));

    dispatch(change(key, 'industries', industries));
    dispatch(change(key, 'companyCultures', companyCultures));

    onCompanyTypeChange(companyTypeData);
    onPreferredProjectChange(preferredProjectDurationData);
    onTeamPreferenceChange(teamPreferenceData);
    onAssignmentChange(assignmentsData);
    onWorkPreferenceChange(workPreferenceData);
    this.setState({ showEditPreferenceModal: true });
    modalOpen(modals.Preferences);

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Talent Portal',
      sectionName: 'Preferences',
      value: 1,
    });
  };

  isGroupCheckBoxValid = keyVal => {
    const { [keyVal]: keyName } = this.props;
    if (keyVal === 'workPreference') {
      const validOptions = ['parttime-weekdays-am', 'parttime-weekdays-pm', 'parttime-weekends', 'fulltime'];
      return (keyName || []).some(val => validOptions.includes(val));
    }
    return false;
  };

  render() {
    const {
      loading,
      onSubmitPreferenceForm,
      handleSubmit,
      responseSuccess,
      responseError,
      companyTypeData = [],
      teamPreferenceData = [],
      assignmentsData = [],
      companyCultureData = [],
      industryData = [],
      role,
    } = this.props;
    const { showEditPreferenceModal, industryList, companyCulturesList } = this.state;

    return (
      <React.Fragment>
        {companyCultureData.length > 0 ? (
          <Card className="p-30">
            <CardHeader>
              <div className="d-flex align-items-center">
                <SVG src={diamondIcon} className="me-2 title-icon" />
                <P className="p20 mb-0">
                  <FormattedMessage {...messages.labelValues} />
                </P>
              </div>
              {(role === '1' || role === '3') && (
                <ActionIconLink to={{ pathname: redirectPageURL(5), state: { fromMyProfile: true } }}>
                  <SVG src={editNoteIcon} />
                </ActionIconLink>
              )}
              {/* <ActionIcon type="button" onClick={this.handleEditPreferenceOpenModal}>
                <SVG src={editNoteIcon} />
              </ActionIcon> */}
            </CardHeader>
            <SkillListing className="mt-0">
              {companyCultureData.map(item => (
                <li key={item}>
                  <Badge className="badge-sm primary">{item}</Badge>
                </li>
              ))}
            </SkillListing>
          </Card>
        ) : (
          ''
        )}
        {industryData.length > 0 ? (
          <Card className="p-30">
            <CardHeader>
              <div className="d-flex align-items-center">
                <SVG src={industryIcon} className="me-2 title-icon" />
                <P className="p20 mb-0">
                  <FormattedMessage {...messages.labelIndustries} />
                </P>
              </div>
              {(role === '1' || role === '3') && (
                <ActionIconLink to={{ pathname: redirectPageURL(5), state: { fromMyProfile: true } }}>
                  <SVG src={editNoteIcon} />
                </ActionIconLink>
              )}
              {/* <ActionIcon type="button" onClick={this.handleEditPreferenceOpenModal}>
                <SVG src={editNoteIcon} />
              </ActionIcon> */}
            </CardHeader>
            <SkillListing className="mt-0">
              {industryData.map(item => (
                <li key={item}>
                  <Badge className="badge-sm primary">{item}</Badge>
                </li>
              ))}
            </SkillListing>
          </Card>
        ) : (
          ''
        )}
        {companyTypeData.length > 0 ? (
          <Card className="p-30">
            <CardHeader>
              <div className="d-flex align-items-center">
                <SVG src={builidingIcon} className="me-2 title-icon" />
                <P className="p20 mb-0">
                  <FormattedMessage {...containerMessage.labelCompanySize} />
                </P>
              </div>

              {(role === '1' || role === '3') && (
                <ActionIconLink to={{ pathname: redirectPageURL(5), state: { fromMyProfile: true } }}>
                  <SVG src={editNoteIcon} />
                </ActionIconLink>
              )}
              {/* <ActionIcon type="button" onClick={this.handleEditPreferenceOpenModal}>
                <SVG src={editNoteIcon} />
              </ActionIcon> */}
            </CardHeader>
            <SkillListing className="mt-0">
              {getArrayLabels(companyTypeData, companyTypeArray).map(item => (
                <li key={item.name}>
                  <div className="d-flex">
                    <Badge className="badge-sm primary">{item}</Badge>
                  </div>
                </li>
              ))}
            </SkillListing>
          </Card>
        ) : (
          ''
        )}
        {teamPreferenceData.length > 0 ? (
          <Card className="p-30">
            <CardHeader>
              <div className="d-flex align-items-center">
                <SVG src={teamIcon} className="me-2 title-icon" />
                <P className="p20 mb-0">
                  <FormattedMessage {...containerMessage.subHeadingTeam} />
                </P>
              </div>

              {(role === '1' || role === '3') && (
                <ActionIconLink to={{ pathname: redirectPageURL(5), state: { fromMyProfile: true } }}>
                  <SVG src={editNoteIcon} />
                </ActionIconLink>
              )}
              {/* <ActionIcon type="button" onClick={this.handleEditPreferenceOpenModal}>
                <SVG src={editNoteIcon} />
              </ActionIcon> */}
            </CardHeader>
            <SkillListing className="mt-0">
              {getArrayLabels(teamPreferenceData, teamPreferenceArray).map(
                item =>
                  item && (
                    <li key={item.name}>
                      <div className="d-flex">
                        <Badge className="badge-sm primary">{item}</Badge>
                      </div>
                    </li>
                  ),
              )}
            </SkillListing>
          </Card>
        ) : (
          ''
        )}
        {assignmentsData.length > 0 ? (
          <Card className="p-30">
            <CardHeader>
              <div className="d-flex align-items-center">
                <SVG src={noteIcon} className="me-2 title-icon" />
                <P className="p20 mb-0">
                  <FormattedMessage {...messages.titleAssignments} />
                </P>
              </div>
              {(role === '1' || role === '3') && (
                <ActionIconLink to={{ pathname: redirectPageURL(5), state: { fromMyProfile: true } }}>
                  <SVG src={editNoteIcon} />
                </ActionIconLink>
              )}
              {/* <ActionIcon type="button" onClick={this.handleEditPreferenceOpenModal}>
                <SVG src={editNoteIcon} />
              </ActionIcon> */}
            </CardHeader>
            <SkillListing className="mt-0">
              {getArrayLabels(assignmentsData, assignmentArray).map(item => (
                <li key={item.name}>
                  <div className="d-flex">
                    <Badge className="badge-sm primary">{item}</Badge>
                  </div>
                </li>
              ))}
            </SkillListing>
          </Card>
        ) : (
          ''
        )}
        <PopupWrapper
          loading={loading}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={!this.isGroupCheckBoxValid('workPreference')}
          isOpen={showEditPreferenceModal}
          onDiscard={this.handleEditPreferenceCloseModal}
          onHandleSubmit={handleSubmit(e => {
            onSubmitPreferenceForm(e);

            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_edit_saved',
              category: 'Talent Portal',
              sectionName: 'Preferences',
              value: 1,
            });
          })}
          title={messages.modelEditPreferenceHeader.defaultMessage}
          modalType="edit"
        >
          <form onSubmit={handleSubmit}>
            <PreferenceComponent {...this.props} size="sm" industryList={industryList} companyCulturesList={companyCulturesList} />
          </form>
        </PopupWrapper>
      </React.Fragment>
    );
  }
}

Preferences.defaultProps = {
  teamPreferenceData: [],
  assignmentsData: [],
  workPreferenceData: [],
  industryData: [],
  companyCultureData: [],
  companyTypeData: [],
  preferredProjectDurationData: [],
  invalid: '',
  responseSuccess: false,
  responseError: false,
  loading: false,
  handleSubmit: () => {},
  onSubmitPreferenceForm: () => {},
  onChangeIndustry: () => {},
  onChangeCompanyCultures: () => {},
  onCompanyTypeChange: () => {},
  onPreferredProjectChange: () => {},
  onTeamPreferenceChange: () => {},
  onAssignmentChange: () => {},
  onWorkPreferenceChange: () => {},
  loadProfileData: () => {},
  modalClose: () => {},
  modalOpen: () => {},
  role: '',
  currentModal: '',
};
Preferences.propTypes = {
  loading: PropTypes.bool,
  industryData: PropTypes.array,
  companyCultureData: PropTypes.array,
  companyTypeData: PropTypes.array,
  preferredProjectDurationData: PropTypes.array,
  teamPreferenceData: PropTypes.array,
  assignmentsData: PropTypes.array,
  workPreferenceData: PropTypes.string,
  invalid: PropTypes.any,
  responseSuccess: PropTypes.bool,
  responseError: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSubmitPreferenceForm: PropTypes.func,
  onChangeIndustry: PropTypes.func,
  onChangeCompanyCultures: PropTypes.func,
  onCompanyTypeChange: PropTypes.func,
  onPreferredProjectChange: PropTypes.func,
  onTeamPreferenceChange: PropTypes.func,
  onAssignmentChange: PropTypes.func,
  onWorkPreferenceChange: PropTypes.func,
  loadProfileData: PropTypes.func,
  popUpSaga: PropTypes.bool,
  dispatch: PropTypes.any,
  currentModal: PropTypes.string,
  modalClose: PropTypes.func,
  modalOpen: PropTypes.func,
  role: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeIndustry: payload => {
      dispatch(selectTagIndustry(payload));
    },
    onChangeCompanyCultures: payload => {
      dispatch(selectTagCompanyCultures(payload));
    },
    onCompanyTypeChange: payload => {
      dispatch(checkBoxCompanyType(payload));
    },
    onPreferredProjectChange: payload => {
      dispatch(checkBoxPreferredProject(payload));
    },
    onTeamPreferenceChange: payload => {
      dispatch(checkBoxTeamPreference(payload));
    },
    onAssignmentChange: payload => {
      dispatch(checkBoxAssignment(payload));
    },
    onWorkPreferenceChange: payload => {
      dispatch(checkBoxWorkPreference(payload));
    },
    onSubmitPreferenceForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(submitPreferenceDetailsForm('editPreference'));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  industries: makeSelectIndustry(),
  companyCultures: makeSelectCompanyCultures(),
  companyType: makeSelectCompanyType(),
  preferredProjectDuration: makeSelectPreferredProject(),
  teamPreference: makeSelectTeamPreference(),
  assignments: makeSelectAssignments(),
  workPreference: makeSelectWorkPreference(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
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
)(Preferences);
