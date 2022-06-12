/** AgencyCreateProfilePage
 * This is the Signup page for the App, at the '/create-profile' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, change } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import { API_URL, USER, DETAILS, countryData, defaultCountryCode } from 'containers/App/constants';
import request from 'utils/request';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import get from 'lodash/get';
import split from 'lodash/split';
import has from 'lodash/has';
import { toast } from 'react-toastify';
import draftToHtml from 'draftjs-to-html';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import * as formValidations from 'utils/formValidations';
import { CreateProfileComponent } from 'components/AgencyProfileComponents/CreateProfileComponent';
import { getFieldValidator } from 'components/UserProfileComponents/fields';
import { agencyStepSize, signupLink, agencyRedirectToPage } from 'containers/App/utils';
import { VALIDATION } from 'utils/constants';
import { ContainerMod, ProgressMod, Card, H1, LinkButtonMod, FormWrapper, Button } from 'components';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import { getBtnClass, getSelectedCountryCode, getFormattedObject, getSelectedFieldFromList } from 'containers/Auth/PersonalDetails/utils';
import { handleBackButton, setChange } from 'containers/Auth/utils';
import containerMessage from 'containers/messages';
import ToastifyMessage from 'components/ToastifyMessage';
import { defaultProps, propTypes } from 'containers/proptypes';
import { formFields } from './fields';
import * as selectors from './selectors';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import { key } from './constants';
import 'cropperjs/dist/cropper.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class AgencyCreateProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(change(key, 'tradingSummary', EditorState.createEmpty()));

    this.loaderUserDetails();
  }

  loaderUserDetails = () => {
    const data = { method: 'GET' };
    const { history } = this.props;
    const requestURL = `${API_URL}${USER}${DETAILS}`;
    request(requestURL, data)
      .then(this.setUserDetails)
      .catch(() => {
        history.push(signupLink);
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setUserDetails = response => {
    const { dispatch, history, location } = this.props;
    if (get(response, 'status')) {
      const { data } = response;
      const currentSignupStep = has(response, 'data.signupStep') === true ? get(response, 'data.signupStep') + 1 : 1;
      agencyRedirectToPage(history, location.redirection, currentSignupStep, 1);

      const countryCode = getSelectedCountryCode(countryData, get(data, 'countryCode', defaultCountryCode));
      const userCountryCode = getFormattedObject({ countryCode }, 'countryCode', 'name', 'phoneCode');

      const compnayCountry = getSelectedFieldFromList(countryData, 'name', get(data, 'agency.country', ''));
      const tradingCountry = getSelectedFieldFromList(countryData, 'name', get(data, 'trading.country', ''));

      const summaryData = get(data, 'trading.summary', '');
      const tradingSummary = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(summaryData)));
      const setData = {
        // personal Details
        firstName: get(data, 'firstName', ''),
        lastName: get(data, 'lastName', ''),
        designation: get(data, 'designation', ''),
        countryCode: userCountryCode,
        phoneNumber: get(data, 'phoneNumber', ''),

        // company details fields
        companyName: get(data, 'agency.name', ''),
        companyregisteredNumber: get(data, 'agency.registeredNumber', ''),

        // company registered address  fields
        companyPincode: get(data, 'agency.postcode', ''),
        companyCity: get(data, 'agency.city', ''),
        companyCountry: compnayCountry ? { label: compnayCountry.name, value: compnayCountry.name } : '',
        companyAddressLineOne: get(data, 'agency.addressLineOne', ''),
        companyAddressLineTwo: get(data, 'agency.addressLineTwo', ''),
        duns: get(data, 'agency.duns', ''),
        vatNumber: get(data, 'agency.vatNumber', ''),

        // trading Details
        tradingName: get(data, 'trading.name', ''),
        tradingWebsite: get(data, 'trading.website', ''),
        tradingSummary,

        // logo
        tradingLogo: get(data, 'trading.logo', ''),

        // trading office address
        tradingPostCode: get(data, 'trading.postcode', ''),
        tradingCity: get(data, 'trading.city', ''),
        tradingCountry: tradingCountry ? { label: tradingCountry.name, value: tradingCountry.name } : '',
        tradingAddressLineOne: get(data, 'trading.addressLineOne', ''),
        tradingAddressLineTwo: get(data, 'trading.addressLineTwo', ''),

        tradingOfficeAddressCheckbox: false,
        tradingAddressEditFlag: true,
      };

      setChange(dispatch, key, setData);
      this.setState({ image: get(data, 'trading.logo', '') });
    } else {
      history.push(signupLink);
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  componentDidUpdate(prevProps) {
    const {
      dispatch,
      tradingOfficeAddressCheckbox,

      companyPincode,
      companyCity,
      companyCountry,
      companyAddressLineOne,
      companyAddressLineTwo,
    } = this.props;
    if (prevProps.tradingOfficeAddressCheckbox === false && tradingOfficeAddressCheckbox === true) {
      dispatch(change(key, 'tradingPostCode', companyPincode));
      dispatch(change(key, 'tradingCity', companyCity));
      dispatch(change(key, 'tradingCountry', companyCountry));
      dispatch(change(key, 'tradingAddressLineOne', companyAddressLineOne));
      dispatch(change(key, 'tradingAddressLineTwo', companyAddressLineTwo));

      dispatch(change(key, 'tradingAddressEditFlag', false));
    }

    if (prevProps.tradingOfficeAddressCheckbox === true && tradingOfficeAddressCheckbox === false) {
      dispatch(change(key, 'tradingAddressEditFlag', true));
    }

    // companyPincode change
    if (tradingOfficeAddressCheckbox && prevProps.companyPincode !== companyPincode) {
      dispatch(change(key, 'tradingPostCode', companyPincode));
    }

    // companyCity change
    if (tradingOfficeAddressCheckbox && prevProps.companyCity !== companyCity) {
      dispatch(change(key, 'tradingCity', companyCity));
    }

    // companyCountry change
    if (tradingOfficeAddressCheckbox && prevProps.companyCountry !== companyCountry) {
      dispatch(change(key, 'tradingCountry', companyCountry));
    }

    // companyAddressLineOne change
    if (tradingOfficeAddressCheckbox && prevProps.companyAddressLineOne !== companyAddressLineOne) {
      dispatch(change(key, 'tradingAddressLineOne', companyAddressLineOne));
    }

    // companyAddressLineTwo change
    if (tradingOfficeAddressCheckbox && prevProps.companyAddressLineTwo !== companyAddressLineTwo) {
      dispatch(change(key, 'tradingAddressLineTwo', companyAddressLineTwo));
    }
  }

  handleLogoSet = image => {
    this.setState({ image });
  };

  handleSaveForLater = (e, submitType) => {
    if (submitType !== 'continue') {
      e.preventDefault();
    }
    this.setSaveForLater(e, submitType);
  };

  setSaveForLater = (e, submitType) => {
    const {
      onSaveForLater,
      onSubmitCreateProfile,
      firstName,
      lastName,
      designation,
      countryCode,
      phoneNumber,
      companyName,
      companyregisteredNumber,
      companyPincode,
      companyCity,
      companyCountry,
      companyAddressLineOne,
      companyAddressLineTwo,
      duns,
      vatNumber,
      tradingName,
      tradingWebsite,
      tradingSummary,
      tradingLogo,
      tradingPostCode,
      tradingCity,
      tradingCountry,
      tradingAddressLineOne,
      tradingAddressLineTwo,
    } = this.props;
    const userCountryCode = countryCode;
    const [, onlyCountryCode] = split(get(userCountryCode, 'label'), '+', 2);
    const data = {
      firstName,
      lastName,
      designation,
      countryCode: onlyCountryCode,
      phoneNumber,
      companyName,
      companyregisteredNumber,
      companyPincode,
      companyCity,
      companyCountry: get(companyCountry, 'value', ''),
      companyAddressLineOne,
      companyAddressLineTwo,
      duns,
      vatNumber,
      tradingName,
      tradingWebsite,
      tradingSummary: draftToHtml(convertToRaw(tradingSummary.getCurrentContent())),
      tradingLogo,
      tradingPostCode,
      tradingCity,
      tradingCountry: get(tradingCountry, 'value', ''),
      tradingAddressLineOne,
      tradingAddressLineTwo,
    };

    const dataKeys = Object.keys(data);
    dataKeys.forEach(fields => {
      if (typeof data[fields] === 'undefined') {
        data[fields] = '';
      }
    });

    if (submitType === 'saveForLater') {
      const validateObject = {};
      formFields.forEach(fieldName => {
        validateObject[fieldName] = getFieldValidator(fieldName, false);
      });

      const validator = formValidations.createValidator(validateObject, true)(this.props);
      if (!Object.keys(validator).length) {
        onSaveForLater(e, data);
      } else {
        const keys = Object.keys(validator);
        keys.forEach(fields => {
          data[fields] = '';
        });
        onSaveForLater(e, data);
      }
    } else if (submitType === 'continue') {
      onSubmitCreateProfile(e, data);
    }
  };

  render() {
    const { invalid, history, loading, responseSuccess, responseError, handleSubmit } = this.props;
    const { image } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod>
          <ProgressMod value={agencyStepSize(2)} className="onboarding-progress" />
          <Card>
            <H1 className="text-center">
              <FormattedMessage {...messages.headingAgencyProfile} />
            </H1>
            <PaymentPageWrapper>
              <FormWrapper>
                <form>
                  <CreateProfileComponent {...this.props} formKey={key} image={image} handleLogoSet={this.handleLogoSet} onBoarding />
                  <React.Fragment>
                    <hr />
                    <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end">
                      <LinkButtonMod
                        className="left-arrow link me-auto"
                        color="link"
                        onClick={e => {
                          handleBackButton(e, history, '/talent/registration-type');
                        }}
                      >
                        <FormattedMessage {...containerMessage.btnBack} />
                      </LinkButtonMod>
                      <LinkButtonMod
                        color="link"
                        onClick={e => {
                          this.handleSaveForLater(e, 'saveForLater');
                        }}
                      >
                        <FormattedMessage {...containerMessage.saveLaterButton} />
                      </LinkButtonMod>
                      <Button
                        type="submit"
                        className={`${getBtnClass(loading, responseSuccess, responseError)} btn-submit`}
                        disabled={invalid || !image}
                        onClick={handleSubmit(e => {
                          this.handleSaveForLater(e, 'continue');
                        })}
                      >
                        <FormattedMessage {...containerMessage.continueButton} />
                      </Button>
                    </div>
                  </React.Fragment>
                </form>
              </FormWrapper>
            </PaymentPageWrapper>
          </Card>
        </ContainerMod>
      </React.Fragment>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSaveForLater: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.submitCreateProfile('saveForLater', data));
    },
    onSubmitCreateProfile: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitCreateProfile('continue', data));
    },
  };
}

AgencyCreateProfilePage.defaultProps = defaultProps;
AgencyCreateProfilePage.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  firstName: selectors.firstName,
  lastName: selectors.lastName,
  designation: selectors.designation,
  countryCode: selectors.countryCode,
  phoneNumber: selectors.phoneNumber,

  // companyDetails
  companyName: selectors.companyName,
  companyregisteredNumber: selectors.companyregisteredNumber,
  companyPincode: selectors.companyPincode,
  companyCity: selectors.companyCity,
  companyCountry: selectors.companyCountry,
  companyAddressLineOne: selectors.companyAddressLineOne,
  companyAddressLineTwo: selectors.companyAddressLineTwo,
  duns: selectors.duns,
  vatNumber: selectors.vatNumber,

  // tradingDetails
  tradingName: selectors.tradingName,
  tradingWebsite: selectors.tradingWebsite,
  tradingSummary: selectors.tradingSummary,
  tradingLogo: selectors.tradingLogo,

  tradingPostCode: selectors.tradingPostCode,
  tradingCity: selectors.tradingCity,
  tradingCountry: selectors.tradingCountry,
  tradingAddressLineOne: selectors.tradingAddressLineOne,
  tradingAddressLineTwo: selectors.tradingAddressLineTwo,

  tradingOfficeAddressCheckbox: selectors.tradingOfficeAddressCheckbox,
  tradingAddressEditFlag: selectors.tradingAddressEditFlag,

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
    fields: formFields,
    touchOnChange: true,
  }),
)(AgencyCreateProfilePage);
