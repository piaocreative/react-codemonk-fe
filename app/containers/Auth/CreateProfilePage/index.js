/** CreateProfilePage
 * This is the Signup page for the App, at the '/create-profile' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import injectSaga from 'utils/injectSaga';
import * as formValidations from 'utils/formValidations';
import { FormGroup } from 'reactstrap';
import get from 'lodash/get';
import has from 'lodash/has';
import split from 'lodash/split';
import { countryData, defaultCountryCode, timeXZone } from 'containers/App/constants';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import { loadRepos } from 'containers/App/actions';
import { RadioButton } from 'utils/Fields';
import { IndividualClientFields } from 'components/ClientProfileComponents/IndividualClientFields';
import { CompanyDetailsFields } from 'components/ClientProfileComponents/CompanyDetailsFields';
import { clientStepSize, clientRedirectToPage, signupLink } from 'containers/App/utils';
import ToastifyMessage from 'components/ToastifyMessage';
import { ContainerMod, ProgressMod, Card, H1, H4, LinkButtonMod, FormWrapper, Button } from 'components';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import { getFieldValidator } from 'components/ClientProfileComponents/fields';
import { loadUserDetails } from 'containers/Auth/utils';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import { formFields } from './fields';
import * as actions from './actions';
import * as selectors from './selectors';
import saga from './saga';
import messages from './messages';
import { getFormattedObject, getSelectedFieldFromList, getSelectedCountryCode, setChange } from './utils';
import { key, registrationTypes } from './constants';

export class CreateProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', countryCode: '', phoneNumber: '' };
  }

  componentDidMount() {
    loadUserDetails(this.setUserDetails);
  }

  setUserDetails = response => {
    const { history, location } = this.props;
    if (get(response, 'status')) {
      const currentSignupStep = has(response, 'data.signupStep') === true ? get(response, 'data.signupStep') + 1 : 1;
      clientRedirectToPage(history, location.redirection, currentSignupStep, 2);

      const timeZone = getSelectedFieldFromList(timeXZone, 'name', get(response, 'data.timeZone', ''));
      const countryCode = getSelectedCountryCode(countryData, get(response, 'data.countryCode', defaultCountryCode));
      const country = getSelectedFieldFromList(countryData, 'name', get(response, 'data.country', ''));

      const compnayCountry = getSelectedFieldFromList(countryData, 'name', get(response, 'data.billing.companyDetails.country', ''));
      const companyAuthoritycountryCode = getSelectedCountryCode(
        countryData,
        get(response, 'data.authority.countryCode', defaultCountryCode),
      );

      const companyAuthoritytimeZone = getSelectedFieldFromList(timeXZone, 'name', get(response, 'data.authority.timeZone', ''));
      const companyAuthorityCountry = getSelectedFieldFromList(countryData, 'name', get(response, 'data.authority.country', ''));

      const values = {
        timeZone,
        compnayCountry,
        country,
        companyAuthorityCountry,
        companyAuthoritytimeZone,
        companyAuthoritycountryCode,
        countryCode,
      };
      this.setValues(get(response, 'data'), values);
    } else {
      history.push(signupLink);
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  setValues = (data, values) => {
    const { country, timeZone, compnayCountry, companyAuthoritycountryCode, countryCode } = values;
    const { dispatch } = this.props;

    const authoritycountryCode = companyAuthoritycountryCode
      ? getFormattedObject({ companyAuthoritycountryCode }, 'companyAuthoritycountryCode', 'name', 'phoneCode')
      : '';

    const individualData = {
      // individual basic details fields
      individualfirstName: get(data, 'firstName', ''),
      individuallastName: get(data, 'lastName', ''),
      individualjobTitle: get(data, 'jobTitle', ''),

      // individual personal address fields
      individualpostcode: get(data, 'postcode', ''),
      individualtimeZone: timeZone ? { value: timeZone.name, label: timeZone.name } : '',
      individualaddressLineOne: get(data, 'addressLineOne', ''),
      individualaddressLineTwo: get(data, 'addressLineTwo', ''),
      individualcity: get(data, 'city', ''),
      individualcountry: country ? { label: country.name, value: country.name } : '',
    };
    const setData = {
      billingType: get(data, 'billing.type', ''),

      // company basic details fields
      companyfirstName: get(data, 'firstName', ''),
      companylastName: get(data, 'lastName', ''),
      companyjobTitle: get(data, 'jobTitle', ''),

      // company details fields
      companyName: get(data, 'billing.companyDetails.name', ''),
      companyregisteredNumber: get(data, 'billing.companyDetails.registeredNumber', ''),

      // company registered address  fields
      companyAddressLineOne: get(data, 'billing.companyDetails.addressLineOne', ''),
      companyAddressLineTwo: get(data, 'billing.companyDetails.addressLineTwo', ''),
      companyPincode: get(data, 'billing.companyDetails.postcode', ''),
      companyCity: get(data, 'billing.companyDetails.city', ''),
      companyCountry: compnayCountry ? { label: compnayCountry.name, value: compnayCountry.name } : '',
      website: get(data, 'billing.companyDetails.website', ''),
      vatNumber: get(data, 'billing.companyDetails.vatNumber', ''),

      // company authority  basic details fields
      companyAuthorityfirstName: get(data, 'authority.firstName', ''),
      companyAuthoritylastName: get(data, 'authority.lastName', ''),
      companyAuthorityemail: get(data, 'authority.email', ''),
      companyAuthoritycountryCode: authoritycountryCode,
      companyAuthorityphoneNumber: get(data, 'authority.phoneNumber', ''),
      companyAuthorityjobTitle: get(data, 'authority.jobTitle', ''),
    };

    const additionalFields = {
      companyAuthorityPersonalDetailsCheckbox: false,
      authorityPersonalEditFlag: true,
    };
    dispatch(change(key, 'registrationType', setData.billingType));
    setChange(dispatch, key, individualData);
    setChange(dispatch, key, setData);
    setChange(dispatch, key, additionalFields);

    const email = get(data, 'email', '');
    const userCountryCode = getFormattedObject({ countryCode }, 'countryCode', 'name', 'phoneCode');
    const phoneNumber = get(data, 'phoneNumber', '');

    this.setState({ email, countryCode: userCountryCode, phoneNumber });
  };

  componentDidUpdate(prevProps) {
    const { dispatch, companyAuthorityPersonalDetailsCheckbox, companyfirstName, companylastName, companyjobTitle } = this.props;
    const { email, countryCode, phoneNumber } = this.state;
    if (prevProps.companyAuthorityPersonalDetailsCheckbox === false && companyAuthorityPersonalDetailsCheckbox === true) {
      dispatch(change(key, 'companyAuthorityfirstName', companyfirstName));
      dispatch(change(key, 'companyAuthoritylastName', companylastName));
      dispatch(change(key, 'companyAuthorityemail', email));
      dispatch(change(key, 'companyAuthoritycountryCode', countryCode));
      dispatch(change(key, 'companyAuthorityphoneNumber', phoneNumber));
      dispatch(change(key, 'companyAuthorityjobTitle', companyjobTitle));
      dispatch(change(key, 'authorityPersonalEditFlag', false));
    }

    if (prevProps.companyAuthorityPersonalDetailsCheckbox === true && companyAuthorityPersonalDetailsCheckbox === false) {
      dispatch(change(key, 'authorityPersonalEditFlag', true));
    }

    // firstName change
    if (companyAuthorityPersonalDetailsCheckbox && prevProps.companyfirstName !== companyfirstName) {
      dispatch(change(key, 'companyAuthorityfirstName', companyfirstName));
    }
    // lastname change
    if (companyAuthorityPersonalDetailsCheckbox && prevProps.companylastName !== companylastName) {
      dispatch(change(key, 'companyAuthoritylastName', companylastName));
    }
    // jobTitle change
    if (companyAuthorityPersonalDetailsCheckbox && prevProps.companyjobTitle !== companyjobTitle) {
      dispatch(change(key, 'companyAuthorityjobTitle', companyjobTitle));
    }
  }

  handleChangeRegistrationType = value => {
    const { dispatch } = this.props;
    dispatch(change(key, 'registrationType', value));
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
      registrationType,
      individualfirstName,
      individuallastName,
      individualjobTitle,
      individualtimeZone,
      individualcountry,
      individualpostcode,
      individualaddressLineOne,
      individualaddressLineTwo,
      individualcity,

      companyfirstName,
      companylastName,
      companyjobTitle,

      companyName,
      companyregisteredNumber,

      companyPincode,
      companyCity,
      companyCountry,
      companyAddressLineOne,
      companyAddressLineTwo,
      website,
      vatNumber,

      companyAuthorityfirstName,
      companyAuthoritylastName,
      companyAuthorityemail,
      companyAuthoritycountryCode,
      companyAuthorityphoneNumber,
      companyAuthorityjobTitle,
    } = this.props;

    // prepare data
    let data = {};
    if (registrationType === 'individual') {
      data.registrationType = registrationType;

      const timeZone = individualtimeZone;
      const country = individualcountry;
      data = {
        registrationType,
        individualfirstName,
        individuallastName,
        individualjobTitle,
        individualpostcode,
        individualtimeZone: get(timeZone, 'value', ''),
        individualaddressLineOne,
        individualaddressLineTwo,
        individualcity,
        individualcountry: get(country, 'value', ''),
      };
    } else if (registrationType === 'company') {
      const authCountryCode = companyAuthoritycountryCode;
      const [, authorityCountryCode] = split(get(authCountryCode, 'label'), '+', 2);
      data = {
        registrationType,
        companyfirstName,
        companylastName,
        companyjobTitle,

        companyName,
        companyregisteredNumber,

        companyAddressLineOne,
        companyAddressLineTwo,
        companyPincode,
        companyCity,
        companyCountry: get(companyCountry, 'value', ''),
        website,
        vatNumber,

        companyAuthorityfirstName,
        companyAuthoritylastName,
        companyAuthorityemail,
        companyAuthoritycountryCode: authorityCountryCode,
        companyAuthorityphoneNumber,
        companyAuthorityjobTitle,
      };
    }

    // check data for validation for savelater
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
    const { registrationType, invalid, loading, responseSuccess, responseError, handleSubmit } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod>
          <ProgressMod value={clientStepSize(1)} className="onboarding-progress" />
          <Card>
            <H1 className="text-center">
              <FormattedMessage {...messages.headingClientProfile} />
            </H1>
            <PaymentPageWrapper>
              <FormWrapper>
                <form>
                  <H4>
                    <FormattedMessage {...messages.subHeadingRegistrationType} />
                  </H4>
                  <FormGroup>
                    {registrationTypes.map(item => (
                      <Field
                        name={item.groupName}
                        component={RadioButton}
                        groupName={item.groupName}
                        label={item.label}
                        className="radioButton-block"
                        checked={registrationType === item.value}
                        validate={[formValidations.required]}
                        onChangeRadio={() => this.handleChangeRegistrationType(item.value)}
                      />
                    ))}
                  </FormGroup>
                  {registrationType === 'individual' && <IndividualClientFields formKey={key} {...this.props} />}
                  {registrationType === 'company' && <CompanyDetailsFields formKey={key} {...this.props} onBoarding />}
                  <hr />
                  <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end">
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
                      className={`${getBtnClass(loading, responseSuccess, responseError)} btn-submit`}
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
            </PaymentPageWrapper>
          </Card>
        </ContainerMod>
      </React.Fragment>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    onSubmitCreateProfile: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitCreateProfile('continue', data));
    },
    onSaveForLater: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.submitCreateProfile('saveForLater', data));
    },
  };
}

CreateProfilePage.propTypes = propTypes;
CreateProfilePage.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
  registrationType: selectors.registrationType,
  // individualData
  individualfirstName: selectors.individualfirstName,
  individuallastName: selectors.individuallastName,
  individualjobTitle: selectors.individualjobTitle,
  individualpostcode: selectors.individualpostcode,
  individualtimeZone: selectors.individualtimeZone,
  individualcountry: selectors.individualcountry,
  individualaddressLineOne: selectors.individualaddressLineOne,
  individualaddressLineTwo: selectors.individualaddressLineTwo,
  individualcity: selectors.individualcity,

  // companyData
  companyfirstName: selectors.companyfirstName,
  companylastName: selectors.companylastName,
  companyjobTitle: selectors.companyjobTitle,

  companyName: selectors.companyName,
  companyregisteredNumber: selectors.companyregisteredNumber,

  companyAddressLineOne: selectors.companyAddressLineOne,
  companyAddressLineTwo: selectors.companyAddressLineTwo,
  companyPincode: selectors.companyPincode,
  companyCity: selectors.companyCity,
  companyCountry: selectors.companyCountry,
  website: selectors.website,
  vatNumber: selectors.vatNumber,

  companyAuthorityfirstName: selectors.companyAuthorityfirstName,
  companyAuthoritylastName: selectors.companyAuthoritylastName,
  companyAuthorityemail: selectors.companyAuthorityemail,
  companyAuthoritycountryCode: selectors.companyAuthoritycountryCode,
  companyAuthorityphoneNumber: selectors.companyAuthorityphoneNumber,
  companyAuthorityjobTitle: selectors.companyAuthorityjobTitle,

  companyAuthorityPersonalDetailsCheckbox: selectors.companyAuthorityPersonalDetailsCheckbox,

  authorityPersonalEditFlag: selectors.authorityPersonalEditFlag,

  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
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
)(CreateProfilePage);
