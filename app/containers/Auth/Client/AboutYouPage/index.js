/**
 * AboutYouPage
 * This is the onboarding page for the client user, at the '/about-you' route
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from 'containers/App/actions';
import { reduxForm, change } from 'redux-form/immutable';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import { signupLink } from 'containers/App/utils';
import { P, H1, LinkButtonMod, FormWrapper, Button } from 'components';
import { countryData, defaultCountryCode } from 'containers/App/constants';
import { loadUserDetails, getSelectedFieldFromList, storeApiSignupStep } from 'containers/Auth/utils';
import { getBtnClass, getSelectedCountryCode } from 'containers/Auth/PersonalDetails/utils';
import ToastifyMessage from 'components/ToastifyMessage';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import { AboutYouFields } from './AboutYouFields';
import messages from './messages';
import { key, clientRoles } from './constants';

export class AboutYouPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    };
  }

  componentDidMount() {
    loadUserDetails(this.setUserDetails);
  }

  setUserDetails = response => {
    const { history } = this.props;
    if (get(response, 'status')) {
      storeApiSignupStep(get(response, 'data.signupStep'));
      this.setValues(get(response, 'data'));
    } else {
      history.push(signupLink);
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  setValues = data => {
    const { dispatch } = this.props;

    const selectedJobRole = getSelectedFieldFromList(clientRoles, 'value', get(data, 'jobRole', ''));
    const selectedCountryCode = getSelectedCountryCode(countryData, get(data, 'countryCode', defaultCountryCode));
    const setData = {
      firstName: get(data, 'firstName', ''),
      lastName: get(data, 'lastName', ''),
      countryCode: selectedCountryCode,
      phoneNumber: get(data, 'phoneNumber', ''),
      jobTitle: get(data, 'jobTitle', ''),
      jobRole: get(data, 'jobRole', '') !== '' ? selectedJobRole : '',
    };
    this.setState({ image: data.profilePicture });
    Object.keys(setData).forEach(fieldKey => {
      dispatch(change(key, fieldKey, setData[fieldKey]));
    });
    dispatch(actions.changeFirstName(setData.firstName));
    dispatch(actions.changeLastName(setData.lastName));
    dispatch(actions.changeCountryCode(setData.countryCode));
    dispatch(actions.changePhoneNumber(setData.phoneNumber));
    dispatch(actions.changeJobTitle(setData.jobTitle));
    dispatch(actions.changeJobRole(setData.jobRole));
  };

  handleSaveForLater = (e, type) => {
    if (type !== 'continue') {
      e.preventDefault();
    }
    const { onSubmitAboutYouForm, onSaveForLater, firstName, lastName, countryCode, phoneNumber, jobTitle, jobRole } = this.props;
    let statePhoneNumber = phoneNumber ? phoneNumber.replace(/ /g, '') : '';
    statePhoneNumber = statePhoneNumber.replace(/^0+/, '');
    const countryNumber = countryCode && countryCode.label && countryCode.label.split('+', 2)[1];
    const data = {
      firstName,
      lastName,
      countryCode: countryNumber,
      phoneNumber: statePhoneNumber,
      jobTitle,
      jobRole: jobRole && jobRole.value,
    };
    if (type === 'saveForLater') onSaveForLater(e, data, type);
    else if (type === 'continue') onSubmitAboutYouForm(e, data, type);
  };

  render() {
    const { invalid, loading, responseSuccess, responseError, handleSubmit } = this.props;
    const { image } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <>
          <H1 className="mb-3">
            <FormattedMessage {...messages.aboutYou} />
          </H1>
          <P className="p16 mb-5" opacityVal="0.5">
            <FormattedMessage {...messages.aboutYouTagLine} />
          </P>
          <FormWrapper>
            <form onSubmit={handleSubmit}>
              <AboutYouFields formKey={key} {...this.props} image={image} />
              <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end my-5">
                <LinkButtonMod
                  color="link"
                  onClick={e => {
                    this.handleSaveForLater(e, 'saveForLater');
                  }}
                >
                  <FormattedMessage {...messages.saveLaterButton} />
                </LinkButtonMod>
                <Button
                  type="submit"
                  className={`${getBtnClass(loading, responseSuccess, responseError)} mt-3 mt-md-0 ms-md-3`}
                  disabled={invalid}
                  onClick={handleSubmit(e => {
                    this.handleSaveForLater(e, 'continue');
                  })}
                >
                  <FormattedMessage {...messages.continueButton} />
                </Button>
              </div>
            </form>
          </FormWrapper>
        </>
      </React.Fragment>
    );
  }
}

AboutYouPage.defaultProps = {
  location: {},
  dispatch: () => {},
  history: {},
  invalid: true,
  loading: false,
  responseSuccess: false,
  responseError: false,
  handleSubmit: () => {},
  onSubmitAboutYouForm: () => {},
  onSaveForLater: () => {},
  firstName: '',
  lastName: '',
  countryCode: {},
  phoneNumber: '',
  jobTitle: '',
  jobRole: {},
};

AboutYouPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  invalid: PropTypes.bool,
  loading: PropTypes.bool,
  responseSuccess: PropTypes.bool,
  responseError: PropTypes.bool,
  handleSubmit: PropTypes.func,
  location: PropTypes.object,
  onSubmitAboutYouForm: PropTypes.func,
  onSaveForLater: PropTypes.func,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  countryCode: PropTypes.object,
  phoneNumber: PropTypes.string,
  jobTitle: PropTypes.string,
  jobRole: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeFirstName: evt => dispatch(actions.changeFirstName(evt.target.value)),
    onChangeLastName: evt => dispatch(actions.changeLastName(evt.target.value)),
    onChangeCountryCode: evt => dispatch(actions.changeCountryCode(evt)),
    onChangePhoneNumber: evt => dispatch(actions.changePhoneNumber(evt.target.value)),
    onChangeJobTitle: evt => dispatch(actions.changeJobTitle(evt.target.value)),
    onChangeJobRole: evt => dispatch(actions.changeJobRole(evt)),
    onSaveForLater: (evt, data, type) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.submitAboutYouForm(type, data));
    },
    onSubmitAboutYouForm: (evt, data, type) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitAboutYouForm(type, data));
    },
  };
}
const mapStateToProps = createStructuredSelector({
  firstName: selectors.makeSelectFirstName(),
  lastName: selectors.makeSelectLastName(),
  countryCode: selectors.makeSelectCountryCode(),
  phoneNumber: selectors.makeSelectPhoneNumber(),
  jobTitle: selectors.makeSelectJobTitle(),
  jobRole: selectors.makeSelectJobRole(),
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
)(AboutYouPage);
