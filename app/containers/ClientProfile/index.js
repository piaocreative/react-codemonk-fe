/** ClientProfile
 * This is the Signup page for the App, at the '/client-profile' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, change } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import injectSaga from 'utils/injectSaga';
import { Badge } from 'reactstrap';
import get from 'lodash/get';
import has from 'lodash/has';
import split from 'lodash/split';
import Emitter from 'utils/emitter';
import Content from 'components/Content';
import { gtm } from 'utils/Helper';
import { countryData, timeXZone } from 'containers/App/constants';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import { loadRepos } from 'containers/App/actions';
import { IndividualClientFields } from 'components/ClientProfileComponents/IndividualClientFields';
import { CompanyDetailsFields } from 'components/ClientProfileComponents/CompanyDetailsFields';
import { clientRedirectToPage, signupLink } from 'containers/App/utils';
import ToastifyMessage from 'components/ToastifyMessage';
import { ContainerMod, Card, H1, H4, LinkButtonMod, FormWrapper, Button } from 'components';
import { EditLink } from 'containers/AccountSettingsPage/styles';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import { formFields } from 'containers/Auth/CreateProfilePage/fields';
import { defaultProps, propTypes } from 'containers/proptypes';
import { getFormattedObject, getSelectedFieldFromList, getSelectedCountryCode, setChange } from 'containers/Auth/CreateProfilePage/utils';
import { loadUserDetails } from 'containers/Auth/utils';
import containerMessage from 'containers/messages';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import clientProfileMSG from './messages';
import { key } from './constants';

export class ClientProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', countryCode: '', phoneNumber: '', editFlag: false };
  }

  componentDidMount() {
    loadUserDetails(this.setUserDetails);

    Emitter.on('clientProfileEdit', clientProfileEdit => {
      if (clientProfileEdit) {
        this.setState({ editFlag: false }, () => {
          loadUserDetails(this.setUserDetails);
        });
      }
    });
  }

  componentWillUnmount() {
    Emitter.off('clientProfileEdit');
  }

  setUserDetails = response => {
    const { history, location } = this.props;
    if (get(response, 'status')) {
      const currentSignupStep = has(response, 'data.signupStep') === true ? get(response, 'data.signupStep') + 1 : 1;
      clientRedirectToPage(history, location.redirection, currentSignupStep, 4);

      const countryCode = getSelectedCountryCode(countryData, get(response, 'data.countryCode', ''));
      const country = getSelectedFieldFromList(countryData, 'name', get(response, 'data.country', ''));
      const compnayCountry = getSelectedFieldFromList(countryData, 'name', get(response, 'data.billing.companyDetails.country', ''));
      const companyAuthoritycountryCode = getSelectedCountryCode(countryData, get(response, 'data.authority.countryCode', ''));
      const companyAuthorityCountry = getSelectedFieldFromList(countryData, 'name', get(response, 'data.authority.country', ''));
      const timeZone = getSelectedFieldFromList(timeXZone, 'name', get(response, 'data.timeZone', ''));
      const companyAuthoritytimeZone = getSelectedFieldFromList(timeXZone, 'name', get(response, 'data.authority.timeZone', ''));

      const values = {
        country,
        timeZone,
        compnayCountry,
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
    const {
      country,
      timeZone,
      compnayCountry,
      companyAuthorityCountry,
      companyAuthoritytimeZone,
      companyAuthoritycountryCode,
      countryCode,
    } = values;
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
      // company basic details fields
      companyfirstName: get(data, 'firstName', ''),
      companylastName: get(data, 'lastName', ''),
      companyjobTitle: get(data, 'jobTitle', ''),

      // company personal address fields
      companyPersonalpostcode: get(data, 'postcode', ''),
      companyPersonaltimeZone: timeZone ? { value: timeZone.name, label: timeZone.name } : '',
      companyPersonaladdressLineOne: get(data, 'addressLineOne', ''),
      companyPersonaladdressLineTwo: get(data, 'addressLineTwo', ''),
      companyPersonalcity: get(data, 'city', ''),
      companyPersonalcountry: country ? { label: country.name, value: country.name } : '',

      // company details fields
      companyName: get(data, 'billing.companyDetails.name', ''),
      companyregisteredNumber: get(data, 'billing.companyDetails.registeredNumber', ''),

      // company registered address  fields
      companyPincode: get(data, 'billing.companyDetails.postcode', ''),
      companyCity: get(data, 'billing.companyDetails.city', ''),
      companyCountry: compnayCountry ? { label: compnayCountry.name, value: compnayCountry.name } : '',
      companyAddressLineOne: get(data, 'billing.companyDetails.addressLineOne', ''),
      companyAddressLineTwo: get(data, 'billing.companyDetails.addressLineTwo', ''),
      website: get(data, 'billing.companyDetails.website', ''),
      vatNumber: get(data, 'billing.companyDetails.vatNumber', ''),

      // company authority  basic details fields
      companyAuthorityfirstName: get(data, 'authority.firstName', ''),
      companyAuthoritylastName: get(data, 'authority.lastName', ''),
      companyAuthorityemail: get(data, 'authority.email', ''),
      companyAuthoritycountryCode: authoritycountryCode,
      companyAuthorityphoneNumber: get(data, 'authority.phoneNumber', ''),
      companyAuthorityjobTitle: get(data, 'authority.jobTitle', ''),

      // company authority personal address fields
      companyAuthoritypostcode: get(data, 'authority.postcode', ''),
      companyAuthoritytimeZone: companyAuthoritytimeZone
        ? { value: companyAuthoritytimeZone.name, label: companyAuthoritytimeZone.name }
        : '',
      companyAuthorityaddressLineOne: get(data, 'authority.addressLineOne', ''),
      companyAuthorityaddressLineTwo: get(data, 'authority.addressLineTwo', ''),
      companyAuthoritycity: get(data, 'authority.city', ''),
      companyAuthoritycountry: companyAuthorityCountry ? { label: companyAuthorityCountry.name, value: companyAuthorityCountry.name } : '',
    };

    const additionalFields = {
      companyAuthorityPersonalDetailsCheckbox: false,
      companyAuthorityPersonalAddressCheckbox: false,
      authorityPersonalEditFlag: true,
      authorityAddressEditFlag: true,
    };

    setChange(dispatch, key, individualData);
    setChange(dispatch, key, setData);
    setChange(dispatch, key, additionalFields);

    const email = get(data, 'email', '');
    const userCountryCode = getFormattedObject({ countryCode }, 'countryCode', 'name', 'phoneCode');
    const phoneNumber = get(data, 'phoneNumber', '');

    this.setState({
      email,
      countryCode: userCountryCode,
      phoneNumber,
      registrationType: get(data, 'registerType', ''),
    });
  };

  authorityPersonalCheckboxChanges = prevProps => {
    const { dispatch, companyAuthorityPersonalDetailsCheckbox, companyfirstName, companylastName, companyjobTitle } = this.props;

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
  };

  authorityAddressCheckboxChanges = prevProps => {
    const {
      dispatch,
      companyAuthorityPersonalAddressCheckbox,
      companyPersonalpostcode,
      companyPersonaltimeZone,
      companyPersonaladdressLineOne,
      companyPersonaladdressLineTwo,
      companyPersonalcity,
      companyPersonalcountry,
    } = this.props;

    // companyPersonalpostcode change
    if (companyAuthorityPersonalAddressCheckbox && prevProps.companyPersonalpostcode !== companyPersonalpostcode) {
      dispatch(change(key, 'companyAuthoritypostcode', companyPersonalpostcode));
    }

    // companyPersonaltimeZone change
    if (companyAuthorityPersonalAddressCheckbox && prevProps.companyPersonaltimeZone !== companyPersonaltimeZone) {
      dispatch(change(key, 'companyAuthoritytimeZone', companyPersonaltimeZone));
    }

    // companyPersonaladdressLineOne change
    if (companyAuthorityPersonalAddressCheckbox && prevProps.companyPersonaladdressLineOne !== companyPersonaladdressLineOne) {
      dispatch(change(key, 'companyAuthorityaddressLineOne', companyPersonaladdressLineOne));
    }

    // companyPersonaladdressLineTwo change
    if (companyAuthorityPersonalAddressCheckbox && prevProps.companyPersonaladdressLineTwo !== companyPersonaladdressLineTwo) {
      dispatch(change(key, 'companyAuthorityaddressLineTwo', companyPersonaladdressLineTwo));
    }

    // companyPersonalcity change
    if (companyAuthorityPersonalAddressCheckbox && prevProps.companyPersonalcity !== companyPersonalcity) {
      dispatch(change(key, 'companyAuthoritycity', companyPersonalcity));
    }

    // companyPersonalcountry change
    if (companyAuthorityPersonalAddressCheckbox && prevProps.companyPersonalcountry !== companyPersonalcountry) {
      dispatch(change(key, 'companyAuthoritycountry', companyPersonalcountry));
    }
  };

  componentDidUpdate(prevProps) {
    const {
      dispatch,
      companyAuthorityPersonalDetailsCheckbox,
      companyfirstName,
      companylastName,
      companyjobTitle,

      companyAuthorityPersonalAddressCheckbox,
      companyPersonalpostcode,
      companyPersonaltimeZone,
      companyPersonaladdressLineOne,
      companyPersonaladdressLineTwo,
      companyPersonalcity,
      companyPersonalcountry,
    } = this.props;
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

    // address edit checkbox
    if (prevProps.companyAuthorityPersonalAddressCheckbox === false && companyAuthorityPersonalAddressCheckbox === true) {
      dispatch(change(key, 'companyAuthoritypostcode', companyPersonalpostcode));
      dispatch(change(key, 'companyAuthoritytimeZone', companyPersonaltimeZone));
      dispatch(change(key, 'companyAuthorityaddressLineOne', companyPersonaladdressLineOne));
      dispatch(change(key, 'companyAuthorityaddressLineTwo', companyPersonaladdressLineTwo));
      dispatch(change(key, 'companyAuthoritycity', companyPersonalcity));
      dispatch(change(key, 'companyAuthoritycountry', companyPersonalcountry));
      dispatch(change(key, 'authorityAddressEditFlag', false));
    }

    if (prevProps.companyAuthorityPersonalAddressCheckbox === true && companyAuthorityPersonalAddressCheckbox === false) {
      dispatch(change(key, 'authorityAddressEditFlag', true));
    }

    // companyAuthorityPersonalDetailsCheckbox and fieldValue Changes
    if (companyAuthorityPersonalDetailsCheckbox) {
      this.authorityPersonalCheckboxChanges(prevProps);
    }

    // companyAuthorityAddressDetailsCheckbox and fieldValue Changes
    if (companyAuthorityPersonalAddressCheckbox) {
      this.authorityAddressCheckboxChanges(prevProps);
    }
  }

  handleProfileSubmit = () => {
    this.setSaveForLater();

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit_saved',
      category: 'Client Portal',
      sectionName: 'Profile',
      value: 1,
    });
  };

  setSaveForLater = () => {
    const {
      onSubmitEditProfile,

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

      companyPersonalpostcode,
      companyPersonaltimeZone,
      companyPersonaladdressLineOne,
      companyPersonaladdressLineTwo,
      companyPersonalcity,
      companyPersonalcountry,

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

      companyAuthoritypostcode,
      companyAuthoritytimeZone,
      companyAuthorityaddressLineOne,
      companyAuthorityaddressLineTwo,
      companyAuthoritycity,
      companyAuthoritycountry,
    } = this.props;

    const { registrationType } = this.state;

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

        companyPersonalpostcode,
        companyPersonaltimeZone: get(companyPersonaltimeZone, 'value', ''),
        companyPersonaladdressLineOne,
        companyPersonaladdressLineTwo,
        companyPersonalcity,
        companyPersonalcountry: get(companyPersonalcountry, 'value', ''),

        companyName,
        companyregisteredNumber,

        companyPincode,
        companyCity,
        companyCountry: get(companyCountry, 'value', ''),
        companyAddressLineOne,
        companyAddressLineTwo,
        website,
        vatNumber,

        companyAuthorityfirstName,
        companyAuthoritylastName,
        companyAuthorityemail,
        companyAuthoritycountryCode: authorityCountryCode,
        companyAuthorityphoneNumber,
        companyAuthorityjobTitle,

        companyAuthoritypostcode,
        companyAuthoritytimeZone: get(companyAuthoritytimeZone, 'value', ''),
        companyAuthorityaddressLineOne,
        companyAuthorityaddressLineTwo,
        companyAuthoritycity,
        companyAuthoritycountry: get(companyAuthoritycountry, 'value', ''),
      };
    }

    onSubmitEditProfile(data);
  };

  handleEdit = editFlag => {
    this.setState({ editFlag: !editFlag });

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Client Portal',
      sectionName: 'Profile',
      value: 1,
    });
  };

  handleCancelButton = editFlag => {
    this.setState({ editFlag: !editFlag });
  };

  handleSubmitButton = (invalid, editFlag) => {
    let output = true;
    if (!invalid && editFlag) {
      output = false;
    }
    return output;
  };

  render() {
    const { invalid, loading, handleSubmit } = this.props;
    const { editFlag, registrationType } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{clientProfileMSG.title.defaultMessage}</title>
          <meta name="description" content={clientProfileMSG.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <ContainerMod>
            <Card>
              <div className="d-flex align-items-center justify-content-between">
                <H1 className="text-start mb-0">
                  {!editFlag && <FormattedMessage {...clientProfileMSG.headingYourProfile} />}
                  {editFlag && <FormattedMessage {...clientProfileMSG.headingEditYourProfile} />}
                </H1>

                {!editFlag && (
                  <EditLink
                    color="link"
                    onClick={() => {
                      this.handleEdit(editFlag);
                    }}
                  >
                    <small className="opacity-100">
                      <FormattedMessage {...clientProfileMSG.headingEditCTA} />
                    </small>
                  </EditLink>
                )}
              </div>
              <PaymentPageWrapper>
                <FormWrapper>
                  <form>
                    <H4>
                      <FormattedMessage {...clientProfileMSG.subHeadingRegistrationType} />
                      <Badge pill color="primary" className="ms-1 text-capitalize">
                        {registrationType}
                      </Badge>
                    </H4>

                    {registrationType === 'individual' && <IndividualClientFields formKey={key} {...this.props} editFlag={editFlag} />}
                    {registrationType === 'company' && <CompanyDetailsFields formKey={key} {...this.props} editFlag={editFlag} />}
                    <hr />
                    <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end">
                      <LinkButtonMod
                        className="m-link"
                        color="link"
                        disabled={!editFlag}
                        onClick={() => {
                          this.handleCancelButton(editFlag);
                        }}
                      >
                        <FormattedMessage {...containerMessage.btnCancel} />
                      </LinkButtonMod>
                      <Button
                        type="submit"
                        className={`${loading ? 'loading' : ''} btn-primary`}
                        disabled={this.handleSubmitButton(invalid, editFlag)}
                        onClick={handleSubmit(this.handleProfileSubmit)}
                      >
                        <FormattedMessage {...containerMessage.btnSave} />
                      </Button>
                    </div>
                  </form>
                </FormWrapper>
              </PaymentPageWrapper>
            </Card>
          </ContainerMod>
        </Content>
      </React.Fragment>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    onSubmitEditProfile: data => {
      dispatch(loadRepos());
      dispatch(actions.submitEditProfile(data));
    },
  };
}

ClientProfile.defaultProps = defaultProps;
ClientProfile.propTypes = propTypes;

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

  companyPersonalpostcode: selectors.companyPersonalpostcode,
  companyPersonaltimeZone: selectors.companyPersonaltimeZone,
  companyPersonaladdressLineOne: selectors.companyPersonaladdressLineOne,
  companyPersonaladdressLineTwo: selectors.companyPersonaladdressLineTwo,
  companyPersonalcity: selectors.companyPersonalcity,
  companyPersonalcountry: selectors.companyPersonalcountry,

  companyName: selectors.companyName,
  companyregisteredNumber: selectors.companyregisteredNumber,

  companyPincode: selectors.companyPincode,
  companyCity: selectors.companyCity,
  companyCountry: selectors.companyCountry,
  companyAddressLineOne: selectors.companyAddressLineOne,
  companyAddressLineTwo: selectors.companyAddressLineTwo,
  website: selectors.website,
  vatNumber: selectors.vatNumber,

  companyAuthorityfirstName: selectors.companyAuthorityfirstName,
  companyAuthoritylastName: selectors.companyAuthoritylastName,
  companyAuthorityemail: selectors.companyAuthorityemail,
  companyAuthoritycountryCode: selectors.companyAuthoritycountryCode,
  companyAuthorityphoneNumber: selectors.companyAuthorityphoneNumber,
  companyAuthorityjobTitle: selectors.companyAuthorityjobTitle,

  companyAuthoritypostcode: selectors.companyAuthoritypostcode,
  companyAuthoritytimeZone: selectors.companyAuthoritytimeZone,
  companyAuthorityaddressLineOne: selectors.companyAuthorityaddressLineOne,
  companyAuthorityaddressLineTwo: selectors.companyAuthorityaddressLineTwo,
  companyAuthoritycity: selectors.companyAuthoritycity,
  companyAuthoritycountry: selectors.companyAuthoritycountry,

  companyAuthorityPersonalDetailsCheckbox: selectors.companyAuthorityPersonalDetailsCheckbox,
  companyAuthorityPersonalAddressCheckbox: selectors.companyAuthorityPersonalAddressCheckbox,

  authorityPersonalEditFlag: selectors.authorityPersonalEditFlag,
  authorityAddressEditFlag: selectors.authorityAddressEditFlag,

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
)(ClientProfile);
