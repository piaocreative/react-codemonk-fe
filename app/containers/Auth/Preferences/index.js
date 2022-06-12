/**
 * PreferenceDetails
 * This is the Preference page for the App, at the '/preferences' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, change } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { get } from 'lodash';
import {
  API_URL,
  USER,
  DETAILS,
  companyTypeArray,
  workPreferenceArray,
  teamPreferenceArray,
  assignmentArray,
  preferredProjectTimeArray,
} from 'containers/App/constants';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import { redirectToPage } from 'containers/App/utils';
import { getIndustryList, getCompanyCultures, storeApiSignupStep } from 'containers/Auth/utils';
import request from 'utils/request';
import { H1, LinkButtonMod, Button, FormWrapper, P } from 'components';
import { PreferenceComponent } from 'components/UserProfileComponents/Preference';
import ToastifyMessage from 'components/ToastifyMessage';
import containerMessage from 'containers/messages';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import messages from './messages';
import { getFilteredArrayObject, getFilterValue } from './utils';
const key = 'preferenceDetails';

export class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = { industryList: [], companyCulturesList: [] };
  }

  shouldComponentUpdate = () => true;

  componentDidMount() {
    this.loadUserDetails();
  }

  loadUserDetails = () => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${USER}${DETAILS}`;
    request(requestURL, data).then(this.setPreferenceDetails);
  };

  setPreferenceDetails = response => {
    const { history, dispatch, location } = this.props;
    if (get(response, 'status')) {
      storeApiSignupStep(get(response, 'data.signupStep'));
      const currentSignupStep = get(response, 'data.signupStep', 0) + 1;
      if (history.location && history.location.state && !history.location.state.fromMyProfile) {
        redirectToPage(history, location.redirection, currentSignupStep, 5);
      }

      getIndustryList(this.setIndustries);
      getCompanyCultures(this.setCompanyCultures);

      const { data } = response;

      const industries = get(data, 'industries', []).map(v => ({ label: v, value: v }));
      const companyCultures = get(data, 'companyCultures', []).map(v => ({ label: v, value: v }));
      const companyType = getFilteredArrayObject(get(data, 'companyType', []), companyTypeArray);
      const preferredProjectDuration = getFilteredArrayObject(get(data, 'preferredProjectDuration', []), preferredProjectTimeArray);
      const teamPreference = getFilteredArrayObject(get(data, 'teamPreference', []), teamPreferenceArray);
      const assignments = getFilteredArrayObject(get(data, 'assignments', []), assignmentArray);
      const workPreference = getFilteredArrayObject(get(data, 'workPreference', []), workPreferenceArray);

      dispatch(actions.selectTagIndustry(industries));
      dispatch(actions.selectTagCompanyCultures(companyCultures));
      dispatch(actions.checkBoxCompanyType(companyType));
      dispatch(actions.checkBoxPreferredProject(preferredProjectDuration));
      dispatch(actions.checkBoxTeamPreference(teamPreference));
      dispatch(actions.checkBoxAssignment(assignments));
      dispatch(actions.checkBoxWorkPreference(workPreference));

      dispatch(change(key, 'industries', industries));
      dispatch(change(key, 'companyCultures', companyCultures));
      dispatch(change(key, 'companyType', companyType));
      dispatch(change(key, 'preferredProjectDuration', preferredProjectDuration));
      dispatch(change(key, 'teamPreference', teamPreference));
      dispatch(change(key, 'assignments', assignments));
      dispatch(change(key, 'workPreference', workPreference));
    } else {
      history.push('/talent/signup');
      toast.error(get(response, 'message'), { className: 'Toast-error' });
    }
  };

  handleSaveForLater = (e, type) => {
    if (type !== 'continue') {
      e.preventDefault();
    }
    const {
      onSubmitPreferenceForm,
      onSaveForLater,
      industries,
      companyCultures,
      companyType,
      preferredProjectDuration,
      teamPreference,
      assignments,
      workPreference,
    } = this.props;
    const data = {
      industries: industries.some(i => i.label) ? getFilterValue(industries) : industries,
      companyCultures: companyCultures.some(i => i.label) ? getFilterValue(companyCultures) : companyCultures,
      companyType: companyType.some(i => i.label) ? getFilterValue(companyType) : companyType,
      preferredProjectDuration: preferredProjectDuration.some(i => i.label)
        ? getFilterValue(preferredProjectDuration)
        : preferredProjectDuration,
      teamPreference: teamPreference.some(i => i.label) ? getFilterValue(teamPreference) : teamPreference,
      assignments: assignments.some(i => i.label) ? getFilterValue(assignments) : assignments,
      workPreference: workPreference.some(i => i.label) ? getFilterValue(workPreference) : workPreference,
    };
    if (type === 'saveForLater') onSaveForLater(e, data, type);
    else if (type === 'continue') onSubmitPreferenceForm(e, data, type);
  };

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

  render() {
    const { invalid, handleSubmit, loading, responseSuccess, responseError } = this.props;
    const { industryList, companyCulturesList } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <>
          <H1 className="mb-3">
            <FormattedMessage {...messages.headingPreferences} />
          </H1>
          <P className="p16 mb-5" opacityVal="0.5">
            <FormattedMessage {...messages.preferencesTagLine} />
          </P>

          <form onSubmit={handleSubmit}>
            <PreferenceComponent {...this.props} industryList={industryList} companyCulturesList={companyCulturesList} />
            <FormWrapper>
              <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end my-5">
                <LinkButtonMod
                  color="link"
                  onClick={e => {
                    this.handleSaveForLater(e, 'saveForLater');
                  }}
                >
                  <FormattedMessage {...containerMessage.skipButton} />
                </LinkButtonMod>
                <Button
                  className={`${getBtnClass(loading, responseSuccess, responseError)} mt-3 mt-md-0 ms-md-3`}
                  type="submit"
                  disabled={invalid}
                  onClick={handleSubmit(e => {
                    this.handleSaveForLater(e, 'continue');
                  })}
                >
                  <FormattedMessage {...containerMessage.continueButton} />
                </Button>
              </div>
            </FormWrapper>
          </form>
        </>
      </React.Fragment>
    );
  }
}

Preferences.defaultProps = defaultProps;
Preferences.propTypes = propTypes;

export function mapDispatchToProps(dispatch) {
  return {
    onChangeIndustry: evt => dispatch(actions.selectTagIndustry(evt)),
    onChangeCompanyCultures: evt => dispatch(actions.selectTagCompanyCultures(evt)),
    onCompanyTypeChange: evt => dispatch(actions.checkBoxCompanyType(evt)),
    onPreferredProjectChange: evt => dispatch(actions.checkBoxPreferredProject(evt)),
    onTeamPreferenceChange: evt => dispatch(actions.checkBoxTeamPreference(evt)),
    onAssignmentChange: evt => dispatch(actions.checkBoxAssignment(evt)),
    onWorkPreferenceChange: evt => dispatch(actions.checkBoxWorkPreference(evt)),
    onAvailabilityChange: evt => {
      dispatch(actions.calendarAvailability(evt));
    },
    onUnavailabilityChange: evt => {
      dispatch(actions.calendarUnavailability(evt));
    },
    onSaveForLater: (evt, data, type) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.submitPreferenceDetailsForm(type, data));
    },
    onSubmitPreferenceForm: (evt, data, type) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitPreferenceDetailsForm(type, data));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  industries: selectors.makeSelectIndustry(),
  companyCultures: selectors.makeSelectCompanyCultures(),
  companyType: selectors.makeSelectCompanyType(),
  preferredProjectDuration: selectors.makeSelectPreferredProject(),
  teamPreference: selectors.makeSelectTeamPreference(),
  assignments: selectors.makeSelectAssignments(),
  workPreference: selectors.makeSelectWorkPreference(),
  availability: selectors.makeAvailablity(),
  unavailability: selectors.makeUnavailablity(),
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
)(Preferences);
