/**
 * Professional Details Page
 *
 * This is the Professional Details page for the App, at the '/professional-details' route
 */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { reduxForm, change, touch } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StorageService from 'utils/StorageService';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import * as formValidations from 'utils/formValidations';
import request from 'utils/request';
import { ContainerMod, ProgressMod, Card, H1, H4, LinkButtonMod, FormWrapper, Button } from 'components';
import { getSelectedFieldFromList } from 'containers/Auth/utils';
import { stepSize, redirectToPage } from 'containers/App/utils';
import { loadRepos } from 'containers/App/actions';
import containerMessage from 'containers/messages';
import { makeSelectLoading } from 'containers/App/selectors';
import ToastifyMessage from 'components/ToastifyMessage';
import { getFieldValidator } from 'components/UserProfileComponents/fields';
import { toastMessages, API_URL, USER, DETAILS, roles, roleYears } from 'containers/App/constants';
import { ProfessionalDetailsComponents } from 'components/UserProfileComponents/ProfessionalDetails';
import { ProfessionalProfiles } from 'components/UserProfileComponents/ProfessionalProfiles';
import messages from './messages';
import { key } from './constants';
import { handleBackButton, setChange, setInitialValues, setTouchProfessionalDetails } from './utils';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import reducer, { initialState } from './reducer';
import saga from './saga';
import {
  makeSelectLinkedInProfile,
  makeSelectGithubProfile,
  makeSelectStackoverflowProfile,
  makeSelectDribbleProfile,
  makeSelectBehanceProfile,
  makeSelectPersonalProfile,
  makeSelectPrimaryRole,
  makeSelectExperience,
} from './selectors';
import {
  changeLinkedInProfile,
  changeGithubProfile,
  changeStackoverflowProfile,
  changeDribbleProfile,
  changeBehanceProfile,
  changePersonalProfile,
  changePrimaryRole,
  changeExperience,
  saveForLater,
} from './actions';
import { propTypes } from './proptypes';
import { formFields } from './fields';

export class ProfessionalDetail extends Component {
  constructor(props) {
    super(props);
    const registerType = StorageService.get('registerType');
    const step = registerType === 'agency' ? 3 : 4;

    this.state = { step };
    this.setFieldValues = this.setFieldValues.bind();
  }

  componentDidMount() {
    const { history } = this.props;
    this.callFetchAPI(history);
  }

  callFetchAPI = () => {
    const { history } = this.props;
    const data = {
      method: 'GET',
    };
    const requestURL = `${API_URL}${USER}${DETAILS}`;
    request(requestURL, data)
      .then(response => {
        this.fetchFieldValues(response);
      })
      .catch(() => {
        history.push('/talent/signup');
        toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
      });
  };

  fetchFieldValues = response => {
    const { history, location, dispatch } = this.props;
    const { data } = response;
    if (get(response, 'status')) {
      const currentSignupStep = get(data, 'signupStep') === 0.1 ? 1 : get(data, 'signupStep', 0) + 1;
      redirectToPage(history, location.redirection, currentSignupStep, 2);
      setTouchProfessionalDetails(dispatch, key, response);
      this.setFieldValues(response);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, {
        className: 'Toast-error',
      });
    }
  };

  setFieldValues = response => {
    const { dispatch } = this.props;
    const { data } = response;

    const primaryRoleDataLabel = getSelectedFieldFromList(roles, 'name', get(data, 'primaryRole', ''));
    const yearsOfExperienceLabel = getSelectedFieldFromList(roleYears, 'value', get(data, 'yearsOfExperience', ''));

    const fields = {
      linkedInProfile: get(data, 'linkedInUrl', ''),
      githubProfile: get(data, 'gitHubUrl', ''),
      stackoverflowProfile: get(data, 'stackOverFlowUrl', ''),
      dribbbleProfile: get(data, 'dribbbleUrl', ''),
      behanceProfile: get(data, 'behanceUrl', ''),
      personalProfile: get(data, 'portfolioUrl', ''),
      primaryRole: get(data, 'primaryRole', '') ? { label: primaryRoleDataLabel.name, value: primaryRoleDataLabel.name } : '',
      yearsOfExperience: get(data, 'yearsOfExperience', '')
        ? { label: yearsOfExperienceLabel.name, value: yearsOfExperienceLabel.name }
        : '',
    };
    setChange(dispatch, change, fields);
    const iniVals = fields;
    setInitialValues(dispatch, iniVals);
  };

  handleSaveForLater = (e, submitType) => {
    if (submitType !== 'continue') {
      e.preventDefault();
    }
    this.setSaveForLater(e, submitType);
  };

  setSaveForLater = (e, submitType) => {
    const {
      linkedInProfile,
      githubProfile,
      stackoverflowProfile,
      dribbbleProfile,
      behanceProfile,
      personalProfile,
      primaryRole,
      yearsOfExperience,
      dispatch,
      onSaveForLater,
      onSubmitProfessionalForm,
    } = this.props;

    const data = {
      linkedInProfile,
      githubProfile,
      stackoverflowProfile,
      dribbbleProfile,
      behanceProfile,
      personalProfile,
      primaryRole: get(primaryRole, 'value', ''),
      yearsOfExperience: get(yearsOfExperience, 'value', ''),
    };

    if (submitType === 'saveForLater') {
      const dataKeys = Object.keys(data);
      dataKeys.forEach(fields => {
        if (typeof data[fields] === 'undefined') {
          data[fields] = '';
        }
      });

      const validateObject = {};
      formFields.forEach(fieldName => {
        validateObject[fieldName] = getFieldValidator(fieldName, false);
      });

      const validator = formValidations.createValidator(validateObject, true)(this.props);
      if (!Object.keys(validator).length) {
        onSaveForLater(e, data);
      } else {
        const keys = Object.keys(validator);
        if (validator.skillsRating) {
          dispatch(touch(key, 'skillsRating'));
          data.skills = [];
        }
        keys.forEach(fields => {
          data[fields] = '';
        });
        onSaveForLater(e, data);
      }
    } else if (submitType === 'continue') {
      onSubmitProfessionalForm(e, data);
    }
  };

  render() {
    const { step } = this.state;
    const { invalid, loading, handleSubmit, history } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod>
          <ProgressMod value={stepSize(step)} className="onboarding-progress" />
          <Card>
            <H1 className="text-center mb-0">
              <FormattedMessage {...messages.headingProfessionalDetail} />
            </H1>
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <H4>
                  <FormattedMessage {...messages.labelRole} />
                </H4>
                <ProfessionalDetailsComponents {...this.props} />
                <H4>
                  <FormattedMessage {...messages.labelProfiles} />
                  <small className="optional-text">
                    <FormattedMessage {...containerMessage.optionalText} />
                  </small>
                </H4>
                <ProfessionalProfiles {...this.props} formKey={key} onBoarding />

                <hr />
                <div className="d-flex justify-content-md-end align-items-center flex-wrap justify-content-between">
                  <LinkButtonMod
                    className="left-arrow link me-auto"
                    color="link"
                    onClick={e => {
                      handleBackButton(e, history);
                    }}
                  >
                    <FormattedMessage {...containerMessage.backButton} />
                  </LinkButtonMod>

                  <LinkButtonMod
                    color="link"
                    onClick={e => {
                      this.handleSaveForLater(e, 'saveForLater');
                    }}
                  >
                    <FormattedMessage {...containerMessage.skipButton} />
                  </LinkButtonMod>

                  <Button
                    className={loading ? 'loading btn-primary btn-submit' : 'btn-primary btn-submit'}
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
          </Card>
        </ContainerMod>
      </React.Fragment>
    );
  }
}

ProfessionalDetail.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  linkedInProfile: makeSelectLinkedInProfile(),
  githubProfile: makeSelectGithubProfile(),
  stackoverflowProfile: makeSelectStackoverflowProfile(),
  dribbbleProfile: makeSelectDribbleProfile(),
  behanceProfile: makeSelectBehanceProfile(),
  personalProfile: makeSelectPersonalProfile(),
  primaryRole: makeSelectPrimaryRole(),
  yearsOfExperience: makeSelectExperience(),
  loading: makeSelectLoading(),
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeLinkedInProfile: event => dispatch(changeLinkedInProfile(event.target.value)),
    onChangeGithubProfile: event => dispatch(changeGithubProfile(event.target.value)),
    onChangeStackoverflowProfile: event => dispatch(changeStackoverflowProfile(event.target.value)),

    onChangeDribbleProfile: event => dispatch(changeDribbleProfile(event.target.value)),
    onChangeBehanceProfile: event => dispatch(changeBehanceProfile(event.target.value)),
    onChangePersonalProfile: event => dispatch(changePersonalProfile(event.target.value)),

    onChangePrimaryRole: event => dispatch(changePrimaryRole(event)),
    onChangeExperience: event => dispatch(changeExperience(event)),

    onSaveForLater: (e, data) => dispatch(saveForLater('saveForLater', data)),
    onSubmitProfessionalForm: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(saveForLater('submitForm', data));
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
    initialValues: initialState,
    enableReinitialize: true,
    fields: formFields,
    touchOnChange: true,
  }),
)(ProfessionalDetail);
