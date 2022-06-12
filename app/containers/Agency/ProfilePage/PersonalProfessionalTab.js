/** PersonalProfessional Tab Page
 * This is the PersonalProfessional Tab in agency profile
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import get from 'lodash/get';
import split from 'lodash/split';
import has from 'lodash/has';
import Emitter from 'utils/emitter';
import { gtm } from 'utils/Helper';
import { H1, FormWrapper, ToastifyMessage } from 'components';
import { createStructuredSelector } from 'reselect';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { toast } from 'react-toastify';
import { reduxForm, change } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import { countryData, defaultCountryCode } from 'containers/App/constants';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import { signupLink, agencyRedirectToPage } from 'containers/App/utils';
import { setChange, loadUserDetails, accountSettingsTabFooter } from 'containers/Auth/utils';
import { getSelectedCountryCode, getFormattedObject, getSelectedFieldFromList } from 'containers/Auth/PersonalDetails/utils';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import { CreateProfileComponent } from 'components/AgencyProfileComponents/CreateProfileComponent';
import * as actions from 'containers/Auth/Talent/AgencyCreateProfilePage/actions';
import * as selectors from 'containers/Auth/Talent/AgencyCreateProfilePage/selectors';
import saga from 'containers/Auth/Talent/AgencyCreateProfilePage/saga';
import { key } from 'containers/Auth/Talent/AgencyCreateProfilePage/constants';
import { propTypes } from 'containers/proptypes';
import { EditLink } from 'containers/AccountSettingsPage/styles';
import messages from './messages';
import 'cropperjs/dist/cropper.css';

export class PersonalProfessionalTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFlag: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(change(key, 'tradingSummary', EditorState.createEmpty()));

    loadUserDetails(this.setUserDetails);

    Emitter.on('agencyPersonalSaga', agencyPersonalSaga => {
      if (agencyPersonalSaga) {
        this.setState({ editFlag: false });
      }
    });
  }

  componentWillUnmount() {
    Emitter.off('agencyPersonalSaga');
  }

  setUserDetails = response => {
    const { dispatch, history, location } = this.props;
    if (get(response, 'status')) {
      const { data } = response;
      const currentSignupStep = has(response, 'data.signupStep') === true ? get(response, 'data.signupStep') + 1 : 1;
      agencyRedirectToPage(history, location.redirection, currentSignupStep, 7);

      const countryCode = getSelectedCountryCode(countryData, get(data, 'countryCode', defaultCountryCode));
      const userCountryCode = getFormattedObject({ countryCode }, 'countryCode', 'name', 'phoneCode');

      const compnayCountry = getSelectedFieldFromList(countryData, 'name', get(data, 'agency.country', ''));
      const tradingCountry = getSelectedFieldFromList(countryData, 'name', get(data, 'trading.country', ''));

      const summaryData = get(data, 'trading.summary', '');
      const tradingSummary = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(summaryData)));
      const setData = {
        tradingOfficeAddressCheckbox: false,
        tradingAddressEditFlag: true,

        // company details fields
        companyName: get(data, 'agency.name', ''),
        companyregisteredNumber: get(data, 'agency.registeredNumber', ''),

        // personal Details
        firstName: get(data, 'firstName', ''),
        lastName: get(data, 'lastName', ''),
        designation: get(data, 'designation', ''),
        countryCode: userCountryCode,
        phoneNumber: get(data, 'phoneNumber', ''),

        // company registered address  fields
        companyAddressLineOne: get(data, 'agency.addressLineOne', ''),
        companyAddressLineTwo: get(data, 'agency.addressLineTwo', ''),
        companyPincode: get(data, 'agency.postcode', ''),
        companyCity: get(data, 'agency.city', ''),
        companyCountry: compnayCountry ? { label: compnayCountry.name, value: compnayCountry.name } : '',

        duns: get(data, 'agency.duns', ''),
        vatNumber: get(data, 'agency.vatNumber', ''),

        // trading Details
        tradingName: get(data, 'trading.name', ''),
        tradingWebsite: get(data, 'trading.website', ''),
        tradingSummary,

        // logo
        tradingLogo: get(data, 'trading.logo', ''),

        // trading office address
        tradingAddressLineOne: get(data, 'trading.addressLineOne', ''),
        tradingAddressLineTwo: get(data, 'trading.addressLineTwo', ''),
        tradingPostCode: get(data, 'trading.postcode', ''),
        tradingCity: get(data, 'trading.city', ''),
        tradingCountry: tradingCountry ? { label: tradingCountry.name, value: tradingCountry.name } : '',
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
      companyAddressLineOne,
      companyAddressLineTwo,
      companyPincode,
      companyCity,
      companyCountry,
      tradingOfficeAddressCheckbox,
    } = this.props;
    if (prevProps.tradingOfficeAddressCheckbox === false && tradingOfficeAddressCheckbox === true) {
      dispatch(change(key, 'tradingAddressLineOne', companyAddressLineOne));
      dispatch(change(key, 'tradingAddressLineTwo', companyAddressLineTwo));
      dispatch(change(key, 'tradingPostCode', companyPincode));
      dispatch(change(key, 'tradingCity', companyCity));
      dispatch(change(key, 'tradingCountry', companyCountry));

      dispatch(change(key, 'tradingAddressEditFlag', false));
    }

    if (prevProps.tradingOfficeAddressCheckbox === true && tradingOfficeAddressCheckbox === false) {
      dispatch(change(key, 'tradingAddressEditFlag', true));
    }

    // companyAddressLineOne change
    if (tradingOfficeAddressCheckbox && prevProps.companyAddressLineOne !== companyAddressLineOne) {
      dispatch(change(key, 'tradingAddressLineOne', companyAddressLineOne));
    }

    // companyAddressLineTwo change
    if (tradingOfficeAddressCheckbox && prevProps.companyAddressLineTwo !== companyAddressLineTwo) {
      dispatch(change(key, 'tradingAddressLineTwo', companyAddressLineTwo));
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
  }

  handleEdit = editFlag => {
    this.setState({ editFlag: !editFlag });

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Agency Portal',
      sectionName: 'Personal & company details',
      value: 1,
    });
  };

  handleCancelButton = editFlag => {
    this.setState({ editFlag: !editFlag });
  };

  handleLogoSet = image => {
    this.setState({ image });
  };

  handleSubmitButton = (invalid, editFlag) => {
    const { image } = this.state;
    let output = true;
    if (!invalid && editFlag && image) {
      output = false;
    }
    return output;
  };

  handleSubmitProfile = e => {
    const {
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

      tradingName,
      tradingWebsite,
      tradingSummary,
      tradingLogo,
      tradingPostCode,
      tradingAddressLineOne,
      tradingAddressLineTwo,
      tradingCity,
      tradingCountry,

      duns,
      vatNumber,
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
      companyAddressLineOne,
      companyAddressLineTwo,
      companyPincode,
      companyCity,
      companyCountry: get(companyCountry, 'value', ''),

      tradingName,
      tradingWebsite,
      tradingSummary: draftToHtml(convertToRaw(tradingSummary.getCurrentContent())),
      tradingLogo,
      tradingPostCode,
      tradingCity,
      tradingCountry: get(tradingCountry, 'value', ''),
      tradingAddressLineOne,
      tradingAddressLineTwo,
      duns,
      vatNumber,
    };

    const dataKeys = Object.keys(data);
    dataKeys.forEach(fields => {
      if (typeof data[fields] === 'undefined') {
        data[fields] = '';
      }
    });

    onSubmitCreateProfile(e, data);

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit_saved',
      category: 'Agency Portal',
      sectionName: 'Personal & company details',
      value: 1,
    });
  };

  render() {
    const { handleSubmit, loading, invalid } = this.props;
    const { editFlag, image } = this.state;
    return (
      <PaymentPageWrapper>
        <FormWrapper>
          <div className="d-flex align-items-center justify-content-between">
            {!editFlag ? (
              <H1 className="text-start mb-0">
                <FormattedMessage {...messages.personalProfessionalTitle} />
              </H1>
            ) : (
              <H1 className="text-start mb-0">
                <FormattedMessage {...messages.personalProfessionalEditTitle} />
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
                  <FormattedMessage {...messages.personalProfessionalEditData} />
                </small>
              </EditLink>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <CreateProfileComponent {...this.props} formKey={key} editFlag={editFlag} image={image} handleLogoSet={this.handleLogoSet} />
            <hr className="mt-5" />
            {accountSettingsTabFooter(
              loading,
              invalid,
              handleSubmit,
              editFlag,
              this.handleCancelButton,
              this.handleSubmitButton,
              this.handleSubmitProfile,
            )}
          </form>
        </FormWrapper>
      </PaymentPageWrapper>
    );
  }
}

PersonalProfessionalTab.propTypes = propTypes;

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitCreateProfile: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitCreateProfile('editProfile', data));
    },
  };
}

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
  companyAddressLineOne: selectors.companyAddressLineOne,
  companyAddressLineTwo: selectors.companyAddressLineTwo,
  companyCity: selectors.companyCity,
  companyCountry: selectors.companyCountry,

  vatNumber: selectors.vatNumber,
  duns: selectors.duns,

  tradingOfficeAddressCheckbox: selectors.tradingOfficeAddressCheckbox,
  tradingAddressEditFlag: selectors.tradingAddressEditFlag,

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
)(PersonalProfessionalTab);
