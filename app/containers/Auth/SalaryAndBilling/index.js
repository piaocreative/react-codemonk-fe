/* eslint-disable react/no-unused-state */
/** PersonalDetails
 * This is the Signup page for the App, at the '/about-you' route
 */
// eslint-disable-next-line react/no-unused-state
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, touch, Field, change } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as formValidations from 'utils/formValidations';
import get from 'lodash/get';
import { API_URL, USER, DETAILS, countryData, currencyData } from 'containers/App/constants';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import * as normalize from 'utils/normalize';
import { renderField, renderCheckBox, RadioButton, renderAddressField } from 'utils/Fields';
import componentMessage from 'components/UserProfileComponents/messages';
import { CombinedFields } from 'containers/Auth/PersonalDetails/style';
import { getFieldValidator } from 'components/UserProfileComponents/fields';
import { H1, H4, LinkButtonMod, FormWrapper, Button, P, FormLabel, Selects } from 'components';
import { loadRepos } from 'containers/App/actions';
import containerMessage from 'containers/messages';
import { redirectToPage } from 'containers/App/utils';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import { getPictureDropZone } from 'containers/Auth/PersonalDetails/pictureDropZone';
import ToastifyMessage from 'components/ToastifyMessage';
import { defaultProps, propTypes } from 'containers/proptypes';
import { getBtnClass, getSelectedFieldFromList } from 'containers/Auth/PersonalDetails/utils';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import { setChange, storeApiSignupStep } from 'containers/Auth/utils';
import { getAddressObject } from 'components/UserProfileComponents/utils';

import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { key } from './constants';
import { RateDetailList } from './styles';
export class SalaryAndBilling extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      image: '',
      selectedFile: '',
    };
  }

  componentDidMount() {
    this.loaderUserDetails();
  }

  loaderUserDetails = () => {
    const data = { method: 'GET' };
    const { history } = this.props;
    const requestURL = `${API_URL}${USER}${DETAILS}`;
    request(requestURL, data)
      .then(this.setPersonalDetails)
      .catch(() => {
        history.push('/talent/signup');
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setPersonalDetails = response => {
    const { history, location, dispatch } = this.props;
    if (get(response, 'status')) {
      storeApiSignupStep(get(response, 'data.signupStep'));
      const currentSignupStep = get(response, 'data.signupStep') + 1;
      if (history.location && history.location.state && !history.location.state.fromMyProfile) {
        redirectToPage(history, location.redirection, currentSignupStep, 6);
      }
      this.updateInitialStoreValue({ dispatch, response });
    } else {
      history.push('/talent/signup');
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  getSelectedCurrency = selCurrency => {
    if (!selCurrency) {
      return {
        value: 'USD',
        label: '$',
      };
    }
    const currency = getSelectedFieldFromList(currencyData, 'value', selCurrency);
    currency.label = currency.symbol;
    return currency;
  };

  updateInitialStoreValue = ({ dispatch, response }) => {
    const res = response.data;
    const currency = this.getSelectedCurrency(res.currency);
    const currencyAnnualRate = this.getSelectedCurrency(res.currencyAnnualRate);

    dispatch(actions.changeEmploymentType(res.employmentType || ''));
    dispatch(actions.changeAnnualRateCurrency(currencyAnnualRate));
    dispatch(actions.changeAnnualRate(res.annualRate || ''));
    dispatch(actions.changeHourlyRateCurrecy(currency));
    dispatch(actions.changeHourlyRate(res.ratePerHour));
    let billngType = 'freelancer';
    if (res.billing) {
      billngType = res.billing.type;
    }
    dispatch(actions.changeBillType(billngType));

    const initialReduxData = {
      currency,
      annualRate: res.annualRate,
      ratePerHour: res.ratePerHour,
      billingType: billngType,
    };
    if (billngType === 'company') {
      const currencyProfessionInsuranceValue = this.getSelectedCurrency(res.billing.companyInsurance.currencyProfessionInsuranceValue);
      const currencyPublicInsurancesValue = this.getSelectedCurrency(res.billing.companyInsurance.currencyPublicInsurancesValue);
      const currencyEmployerInsuranceValue = this.getSelectedCurrency(res.billing.companyInsurance.currencyEmployerInsuranceValue);
      const companyCountry = getSelectedFieldFromList(countryData, 'value', res.billing.companyDetails.country);

      dispatch(actions.changeCompanyName(res.billing.companyDetails.name));
      dispatch(actions.changeCompanyRegistrationNumber(res.billing.companyDetails.registeredNumber));
      dispatch(actions.changeCompanyWebsite(res.billing.companyDetails.website));
      dispatch(actions.changeCompanyVat(res.billing.companyDetails.vatNumber));
      dispatch(actions.changeCompanyLine1(res.billing.companyDetails.addressLineOne));
      dispatch(actions.changeCompanyLine2(res.billing.companyDetails.addressLineTwo));
      dispatch(actions.changeCompanyCity(res.billing.companyDetails.city));
      dispatch(actions.changeCompanyState(res.billing.companyDetails.state));
      dispatch(actions.changeCompanyCountry(companyCountry));
      dispatch(actions.changeCompanyPostcode(res.billing.companyDetails.postcode));
      dispatch(actions.changeIndemnityCurrency(currencyProfessionInsuranceValue));
      dispatch(actions.changeIndemnity(res.billing.companyInsurance.professionInsuranceValue));
      dispatch(actions.changePublicLiabilityCurrency(currencyPublicInsurancesValue));
      dispatch(actions.changePublicLiability(res.billing.companyInsurance.publicInsurancesValue));
      dispatch(actions.changeEmployeeLiabilityCurrency(currencyEmployerInsuranceValue));
      dispatch(actions.changeEmployeeLiability(res.billing.companyInsurance.employerInsuranceValue));

      this.setState({
        image: res.billing.companyDetails.logo,
      });

      initialReduxData.companyName = res.billing.companyDetails.name;
      initialReduxData.companyregisteredNumber = res.billing.companyDetails.registeredNumber;
      initialReduxData.companyPincode = res.billing.companyDetails.postcode;
      initialReduxData.companyCity = res.billing.companyDetails.city;
      initialReduxData.companyCountry = companyCountry;
      initialReduxData.companyAddressLineOne = res.billing.companyDetails.addressLineOne;
      initialReduxData.companyAddressLineTwo = res.billing.companyDetails.addressLineTwo;
      initialReduxData.website = res.billing.companyDetails.website;
      initialReduxData.vatNumber = res.billing.companyDetails.vatNumber;
      initialReduxData.companyState = res.billing.companyDetails.state;
      initialReduxData.currencyCompanyProfessionInsuranceValue = currencyProfessionInsuranceValue;
      initialReduxData.companyProfessionInsuranceValue = res.billing.companyInsurance.professionInsuranceValue;
      initialReduxData.currencyCompanyPublicInsurancesValue = currencyPublicInsurancesValue;
      initialReduxData.companyPublicInsurancesValue = res.billing.companyInsurance.publicInsurancesValue;
      initialReduxData.currencyCompanyEmployerInsuranceValue = currencyEmployerInsuranceValue;
      initialReduxData.companyEmployerInsuranceValue = res.billing.companyInsurance.employerInsuranceValue;
    }

    setChange(dispatch, key, initialReduxData);
  };

  handleEmployeeType = (event, type) => {
    const { employmentType, onChangeEmploymentType } = this.props;
    let updatedType = employmentType;
    if (type === 'permanent') {
      if (event.target.checked) {
        updatedType = employmentType.concat('permanent-employee');
      } else {
        updatedType = employmentType.filter(emp => emp !== 'permanent-employee');
      }
    }
    if (type === 'freelancer') {
      if (event.target.checked) {
        updatedType = employmentType.concat('freelancer-consultant');
      } else {
        updatedType = employmentType.filter(emp => emp !== 'freelancer-consultant');
      }
    }
    onChangeEmploymentType(updatedType);
  };

  handleBillType = (event, type) => {
    const { onChangeBillType } = this.props;
    onChangeBillType(type);
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    let errorFiles = '';
    rejectedFiles.forEach((file, index) => {
      errorFiles = `${errorFiles} (${index + 1}) ${file.name}`;
    });
    if (get(rejectedFiles, '[0].errors[0].code') === 'file-invalid-type') {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFileType} type="error" />, { className: 'Toast-error' });
    } else if (
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-large' ||
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-small'
    ) {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFile} type="error" />, { className: 'Toast-error' });
    } else if (rejectedFiles.length > 1) {
      toast.error(<ToastifyMessage message={VALIDATION.maxOneFileLength} type="error" />, { className: 'Toast-error' });
    } else {
      const reader = new FileReader();
      const selectedFile = acceptedFiles[0];
      this.checkFileType(selectedFile, reader);
    }
  };

  checkFileType(selectedFile, reader) {
    if (!selectedFile) {
      return;
    }
    const file = selectedFile;
    const regex = new RegExp('(.*?).(png|jpg|jpeg)$');
    if (regex.test(file.type)) {
      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          this.setState({
            image: reader.result,
            selectedFile,
          });
        };
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFileType} type="error" />, {
        className: 'Toast-error',
      });
    }
  }

  deletePhoto = () => {
    this.setState({ image: '' });
  };

  handleChange = address => {
    const { onChangeCompanyLine1, form, dispatch } = this.props;
    this.setState({ address });
    if (onChangeCompanyLine1) {
      onChangeCompanyLine1({ target: { name: 'companyAddressLineOne', value: address } });
    }
    dispatch(change(form, 'companyAddressLineOne', address));
  };

  handleSelect = (address, placeId) => {
    const {
      form,
      onChangeCompanyCountry,
      onChangeCompanyLine1,
      onChangeCompanyLine2,
      onChangeCompanyCity,
      onChangeCompanyState,
      onChangeCompanyPostcode,
      dispatch,
    } = this.props;
    geocodeByPlaceId(placeId)
      .then(results => {
        const addObj = getAddressObject(results[0], address);
        const addressData = {
          companyPincode: addObj.postcode,
          companyCity: addObj.city,
          companyCountry: { label: addObj.country, value: addObj.country },
          companyAddressLineOne: addObj.addressLineOne,
          companyAddressLineTwo: addObj.addressLineTwo,
          companyState: addObj.state,
        };
        this.setState({ address: addressData });
        setChange(dispatch, key, addressData);
        dispatch(change(form, 'companyCountry', addressData.companyCountry));
        onChangeCompanyCountry(addressData.companyCountry);
        onChangeCompanyLine1(addressData.companyAddressLineOne);
        onChangeCompanyLine2(addressData.companyAddressLineTwo);
        onChangeCompanyCity(addressData.companyCity);
        onChangeCompanyState(addressData.companyState);
        onChangeCompanyPostcode(addressData.companyPincode);
      })
      .catch();
  };

  getEmployeeTypeValidation = validation => {
    const { employmentType } = this.props;
    let output = '';
    if (employmentType && employmentType.length === 0) {
      output = validation;
    }
    return output;
  };

  handleSaveForLater = e => {
    e.preventDefault();
  };

  handleFormSubmit = (e, submitType) => {
    const {
      employmentType,
      currencyAnnualRate,
      annualRate,
      currency,
      ratePerHour,
      billingType,
      companyName,
      companyregisteredNumber,
      companyPincode,
      companyCity,
      companyCountry,
      companyAddressLineOne,
      companyAddressLineTwo,
      website,
      vatNumber,
      companyState,
      currencyCompanyProfessionInsuranceValue,
      companyProfessionInsuranceValue,
      currencyCompanyPublicInsurancesValue,
      companyPublicInsurancesValue,
      currencyCompanyEmployerInsuranceValue,
      companyEmployerInsuranceValue,
      onSaveForLater,
      onSubmitSalaryAndBillingForm,
    } = this.props;
    const { selectedFile } = this.state;
    const data = {
      employmentType,
      currencyAnnualRate: currencyAnnualRate.value,
      annualRate,
      currency: currency.value,
      ratePerHour,
      billingType,
      companyName,
      companyregisteredNumber,
      companyPincode,
      companyCity,
      companyCountry: companyCountry.value,
      companyAddressLineOne,
      companyAddressLineTwo,
      website,
      vatNumber,
      companyLogo: selectedFile,
      companyState,
      currencyCompanyProfessionInsuranceValue: currencyCompanyProfessionInsuranceValue.value,
      companyProfessionInsuranceValue,
      currencyCompanyPublicInsurancesValue: currencyCompanyPublicInsurancesValue.value,
      companyPublicInsurancesValue,
      currencyCompanyEmployerInsuranceValue: currencyCompanyEmployerInsuranceValue.value,
      companyEmployerInsuranceValue,
    };
    const dataKeys = Object.keys(data);
    dataKeys.forEach(fields => {
      if (typeof data[fields] === 'undefined') {
        data[fields] = '';
      }
    });
    if (submitType === 'continue') {
      onSubmitSalaryAndBillingForm(e, submitType, data);
    } else {
      onSaveForLater(e, submitType, data);
    }
  };

  render() {
    const {
      dispatch,
      form,
      invalid,
      loading,
      responseSuccess,
      responseError,
      handleSubmit,
      currencyAnnualRate,
      employmentType,
      annualRate,
      currency,
      ratePerHour,
      billingType,
      companyName,
      companyregisteredNumber,
      website,
      vatNumber,
      companyPincode,
      companyCountry,
      companyAddressLineOne,
      companyAddressLineTwo,
      companyCity,
      companyState,
      currencyCompanyProfessionInsuranceValue,
      companyProfessionInsuranceValue,
      currencyCompanyPublicInsurancesValue,
      companyPublicInsurancesValue,
      currencyCompanyEmployerInsuranceValue,
      companyEmployerInsuranceValue,
      onChangeAnnualRateCurrency,
      onChangeAnnualRate,
      onChangeHourlyRateCurrecy,
      onChangeHourlyRate,
      onChangeCompanyName,
      onChangeCompanyRegistrationNumber,
      onChangeCompanyWebsite,
      onChangeCompanyVat,
      onChangeCompanyLine2,
      onChangeCompanyCity,
      onChangeCompanyState,
      onChangeCompanyCountry,
      onChangeCompanyPostcode,
      onChangeIndemnityCurrency,
      onChangeIndemnity,
      onChangePublicLiabilityCurrency,
      onChangePublicLiability,
      onChangeEmployeeLiabilityCurrency,
      onChangeEmployeeLiability,
      settingsPage,
    } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <>
          {!settingsPage && (
            <React.Fragment>
              <H1 className="mb-3">
                <FormattedMessage {...messages.headingSalaryBill} />
              </H1>
              <P className="p16 mb-5" opacityVal="0.5">
                <FormattedMessage {...messages.salaryBillTagLine} />
              </P>
            </React.Fragment>
          )}
          <H4 className="newH4 mt-4" opacityVal="0.5">
            <FormattedMessage {...componentMessage.labelEmpType} />
          </H4>
          <form onSubmit={handleSubmit}>
            <P className="p16 mb-3" opacityVal="0.5">
              <small>
                <FormGroup className="input-sm">
                  <Field
                    name="permanentType"
                    type="checkbox"
                    component={renderCheckBox}
                    label={messages.permanentEmployee.defaultMessage}
                    checked={employmentType && employmentType.indexOf('permanent-employee') !== -1}
                    onChange={e => this.handleEmployeeType(e, 'permanent')}
                    validate={this.getEmployeeTypeValidation([formValidations.checked])}
                  />
                </FormGroup>
              </small>
            </P>
            <P className="p16 mb-3" opacityVal="0.5">
              <small>
                <FormGroup className="input-sm">
                  <Field
                    name="freelancerType"
                    type="checkbox"
                    component={renderCheckBox}
                    label={messages.freelancerConsultant.defaultMessage}
                    checked={employmentType && employmentType.indexOf('freelancer-consultant') !== -1}
                    onChange={e => this.handleEmployeeType(e, 'freelancer')}
                    validate={this.getEmployeeTypeValidation([formValidations.checked])}
                  />
                </FormGroup>
              </small>
            </P>

            {employmentType && employmentType.indexOf('permanent-employee') !== -1 && (
              <>
                <H4 className="newH4 mb-3  mt-5" opacityVal="0.5">
                  <FormattedMessage {...messages.permanentSalary} />
                </H4>
                <P className="p16 mb-3" opacityVal="0.5">
                  <FormattedMessage {...messages.permanentSalaryTagLine} />
                </P>
                <Row>
                  <Col md="6">
                    <FormLabel>
                      <FormattedMessage {...messages.perAnnum} />
                    </FormLabel>
                    <CombinedFields className="d-flex">
                      <Field
                        className="newSelectStyle"
                        name="currencyAnnualRate"
                        component={Selects}
                        defaultValue={currencyAnnualRate}
                        options={currencyData.map(code => ({
                          label: code.symbol,
                          value: code.code,
                        }))}
                        searchable={false}
                        onChange={onChangeAnnualRateCurrency}
                      />
                      <Field
                        name="annualRate"
                        type="text"
                        component={renderField}
                        placeholder="00.00"
                        value={annualRate}
                        onChange={onChangeAnnualRate}
                        validate={getFieldValidator('annualRate', true)}
                      />
                    </CombinedFields>
                  </Col>
                </Row>
              </>
            )}
            {employmentType && employmentType.indexOf('freelancer-consultant') !== -1 && (
              <>
                <Row>
                  <Col md="6">
                    <H4 className="newH4 mb-3 mt-5" opacityVal="0.5">
                      <FormattedMessage {...messages.freelanceTitle} />
                    </H4>
                    <P className="p16 mb-3" opacityVal="0.5">
                      <FormattedMessage {...messages.freelanceTitleTagLine} />
                    </P>

                    <FormLabel className="d-inline-flex align-items-center">
                      <FormattedMessage {...messages.hourRate} />
                      <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                        <FormattedMessage {...messages.excludingTaxes} />
                      </P>
                    </FormLabel>
                    <CombinedFields className="d-flex">
                      <Field
                        className="newSelectStyle"
                        name="currency"
                        component={Selects}
                        defaultValue={currency}
                        options={currencyData.map(code => ({
                          label: code.symbol,
                          value: code.code,
                        }))}
                        searchable={false}
                        onChange={onChangeHourlyRateCurrecy}
                      />
                      <Field
                        name="ratePerHour"
                        type="text"
                        component={renderField}
                        placeholder="00.00"
                        value={ratePerHour}
                        onChange={onChangeHourlyRate}
                        validate={getFieldValidator('ratePerHour', true)}
                      />
                    </CombinedFields>
                  </Col>
                  {ratePerHour && (
                    <Col md="6">
                      <RateDetailList className="mt-5">
                        <P className="p16 mb-3" fontFamily="GT-Walsheim-Pro-Medium">
                          <FormattedMessage {...messages.excludingTaxesYellowCardLabel} />
                        </P>
                        <ul>
                          <li>
                            <P className="p16 mb-0">
                              {currency.label}
                              {ratePerHour * 1} {messages.perHour.defaultMessage}
                            </P>
                          </li>
                          <li>
                            <P className="p16 mb-0">
                              {currency.label}
                              {ratePerHour * 7.5} {messages.perDay.defaultMessage}
                            </P>
                          </li>
                          <li>
                            <P className="p16 mb-0">
                              {currency.label}
                              {ratePerHour * 157.5} {messages.perMonth.defaultMessage}
                            </P>
                          </li>
                        </ul>
                      </RateDetailList>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <H4 className="newH4 mb-3 mt-5 mb-4" opacityVal="0.5">
                        <FormattedMessage {...messages.raiseBill} />
                      </H4>
                      <P className="p16 mb-3" opacityVal="0.7">
                        <small>
                          <Field
                            name="billingType"
                            component={RadioButton}
                            value="individual"
                            label={messages.individualFreelancer.defaultMessage}
                            checked={billingType === 'freelancer'}
                            onChangeRadio={e => this.handleBillType(e, 'freelancer')}
                          />
                        </small>
                      </P>
                      <P className="p16 mb-3" opacityVal="0.7">
                        <small>
                          <Field
                            name="billingType"
                            component={RadioButton}
                            value="company"
                            label={messages.personalServiceCompany.defaultMessage}
                            checked={billingType === 'company'}
                            onChangeRadio={e => this.handleBillType(e, 'company')}
                          />
                        </small>
                      </P>
                    </FormGroup>
                  </Col>
                </Row>

                {billingType === 'company' && (
                  <>
                    <H4 className="newH4 mb-3 mt-5 mb-4" opacityVal="0.5">
                      <FormattedMessage {...messages.personalServiceCompanyDetail} />
                    </H4>
                    <FormWrapper>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <FormLabel>
                              <FormattedMessage {...containerMessage.labelCompanyName} />
                            </FormLabel>
                            <Field
                              name="companyName"
                              type="text"
                              component={renderField}
                              placeholder={containerMessage.labelCompanyName.defaultMessage}
                              value={companyName}
                              onChange={onChangeCompanyName}
                              validate={getFieldValidator('companyName', true)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <FormLabel>
                              <FormattedMessage {...messages.companyRegistrationNumber} />
                            </FormLabel>
                            <Field
                              name="companyregisteredNumber"
                              type="text"
                              component={renderField}
                              value={companyregisteredNumber}
                              onChange={onChangeCompanyRegistrationNumber}
                              placeholder={containerMessage.placeholderNumberEg.defaultMessage}
                              validate={getFieldValidator('companyregisteredNumber', true)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <FormLabel className="d-inline-flex align-items-center">
                              <FormattedMessage {...containerMessage.labelWeb} />
                              <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                                <FormattedMessage {...containerMessage.optionalText} />
                              </P>
                            </FormLabel>
                            <Field
                              name="website"
                              type="text"
                              component={renderField}
                              normalize={normalize.trimSpace}
                              placeholder="https://"
                              value={website}
                              onChange={onChangeCompanyWebsite}
                              validate={[formValidations.websiteURL]}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <FormLabel className="d-inline-flex align-items-center">
                              <FormattedMessage {...messages.salesVatGst} />
                              <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                                <FormattedMessage {...containerMessage.optionalText} />
                              </P>
                            </FormLabel>
                            <Field
                              name="vatNumber"
                              type="text"
                              component={renderField}
                              placeholder="VAT number"
                              value={vatNumber}
                              onChange={onChangeCompanyVat}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormLabel className="mb-3">
                            <FormattedMessage {...messages.companyLogo} />
                          </FormLabel>
                          <FormGroup className="mt-1">
                            <div id="dropZone">{getPictureDropZone(this, 'logoUploader')}</div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <H4 className="newH4 mb-3 mt-5 mb-4" opacityVal="0.5">
                        <FormattedMessage {...messages.companyRegisteredAddress} />
                      </H4>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <FormLabel>
                              <FormattedMessage {...containerMessage.labelLine1} />
                            </FormLabel>
                            <Field
                              name="companyAddressLineOne"
                              component={renderAddressField}
                              defaultValue={companyAddressLineOne}
                              handleChange={add => {
                                dispatch(touch(form, 'companyAddressLineOne'));
                                this.handleChange(add);
                              }}
                              handleSelect={(add, placeID) => this.handleSelect(add, placeID)}
                              placeholder="House no., apartment, building, block"
                              validate={getFieldValidator('companyAddressLineOne', true)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <FormLabel className="d-inline-flex align-items-center">
                              <FormattedMessage {...containerMessage.labelLine2} />
                              <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                                <FormattedMessage {...containerMessage.optionalText} />
                              </P>
                            </FormLabel>
                            <Field
                              name="companyAddressLineTwo"
                              type="text"
                              component={renderField}
                              placeholder="Area"
                              value={companyAddressLineTwo}
                              onChange={e => onChangeCompanyLine2(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <FormLabel>
                              <FormattedMessage {...componentMessage.labelCity} />
                            </FormLabel>
                            <Field
                              name="companyCity"
                              type="text"
                              component={renderField}
                              placeholder={componentMessage.placeHolderCity.defaultMessage}
                              value={companyCity}
                              onChange={e => onChangeCompanyCity(e.target.value)}
                              validate={getFieldValidator('companyCity', true)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <FormLabel className="d-inline-flex align-items-center">
                              <FormattedMessage {...componentMessage.labelState} />
                              <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                                <FormattedMessage {...containerMessage.optionalText} />
                                {companyState}
                              </P>
                            </FormLabel>
                            <Field
                              name="companyState"
                              type="text"
                              component={renderField}
                              placeholder={componentMessage.labelState.defaultMessage}
                              value={companyState}
                              onChange={e => onChangeCompanyState(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <FormLabel>
                              <FormattedMessage {...componentMessage.labelCountry} />
                            </FormLabel>
                            <Field
                              name="companyCountry"
                              component={Selects}
                              defaultValue={companyCountry}
                              options={countryData.map(c => ({
                                label: c.name,
                                value: c.name,
                              }))}
                              onChange={onChangeCompanyCountry}
                              placeHolder={componentMessage.placeHolderSelectCountry.defaultMessage}
                              validate={getFieldValidator('companyCountry', true)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <FormLabel>
                              <FormattedMessage {...componentMessage.labelPostCode} />
                            </FormLabel>
                            <Field
                              name="companyPincode"
                              type="text"
                              component={renderField}
                              placeholder={componentMessage.placeHolderPostCode.defaultMessage}
                              value={companyPincode}
                              onChange={e => onChangeCompanyPostcode(e.target.value)}
                              validate={getFieldValidator('companyPincode', true)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <H4 className="newH4 mb-3 mt-5 mb-4" opacityVal="0.5">
                        <FormattedMessage {...messages.companyInsuranceCover} />
                      </H4>
                      <Row>
                        <Col md="6">
                          <FormLabel>
                            <FormattedMessage {...messages.professionalIndemnity} />
                          </FormLabel>
                          <CombinedFields className="d-flex">
                            <Field
                              className="newSelectStyle"
                              name="currencyCompanyProfessionInsuranceValue"
                              component={Selects}
                              defaultValue={currencyCompanyProfessionInsuranceValue}
                              options={currencyData.map(code => ({
                                label: code.symbol,
                                value: code.code,
                              }))}
                              searchable={false}
                              onChange={onChangeIndemnityCurrency}
                            />
                            <Field
                              name="companyProfessionInsuranceValue"
                              type="text"
                              component={renderField}
                              placeholder="00.00"
                              value={companyProfessionInsuranceValue}
                              onChange={onChangeIndemnity}
                              validate={getFieldValidator('companyProfessionInsuranceValue', true)}
                            />
                          </CombinedFields>
                        </Col>
                        <Col md="6">
                          <FormLabel className="d-inline-flex align-items-center">
                            <FormattedMessage {...messages.publicIiability} />
                            <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                              <FormattedMessage {...containerMessage.optionalText} />
                            </P>
                          </FormLabel>
                          <CombinedFields className="d-flex">
                            <Field
                              className="newSelectStyle"
                              name="currencyCompanyPublicInsurancesValue"
                              component={Selects}
                              defaultValue={currencyCompanyPublicInsurancesValue}
                              options={currencyData.map(code => ({
                                label: code.symbol,
                                value: code.code,
                              }))}
                              searchable={false}
                              onChange={onChangePublicLiabilityCurrency}
                            />
                            <Field
                              name="companyPublicInsurancesValue"
                              type="text"
                              component={renderField}
                              placeholder="00.00"
                              value={companyPublicInsurancesValue}
                              onChange={onChangePublicLiability}
                            />
                          </CombinedFields>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormLabel>
                            <FormattedMessage {...messages.empolyeeLiability} />
                          </FormLabel>
                          <CombinedFields className="d-flex">
                            <Field
                              className="newSelectStyle"
                              name="currencyCompanyEmployerInsuranceValue"
                              component={Selects}
                              defaultValue={currencyCompanyEmployerInsuranceValue}
                              options={currencyData.map(code => ({
                                label: code.symbol,
                                value: code.code,
                              }))}
                              searchable={false}
                              onChange={onChangeEmployeeLiabilityCurrency}
                            />
                            <Field
                              name="companyEmployerInsuranceValue"
                              type="text"
                              component={renderField}
                              placeholder="00.00"
                              value={companyEmployerInsuranceValue}
                              onChange={onChangeEmployeeLiability}
                              validate={getFieldValidator('companyEmployerInsuranceValue', true)}
                            />
                          </CombinedFields>
                        </Col>
                      </Row>
                    </FormWrapper>
                  </>
                )}
              </>
            )}

            <div
              className={`d-flex align-items-center flex-wrap justify-content-between ${
                !settingsPage ? 'justify-content-md-end' : 'justify-content-md-start'
              } mt-4`}
            >
              {!settingsPage && (
                <React.Fragment>
                  <LinkButtonMod
                    color="link"
                    onClick={e => {
                      this.handleFormSubmit(e, 'saveForLater');
                    }}
                  >
                    <FormattedMessage {...containerMessage.skipButton} />
                  </LinkButtonMod>
                  <Button
                    type="submit"
                    className={`${getBtnClass(loading, responseSuccess, responseError)} mt-3 mt-md-0 ms-md-3`}
                    disabled={invalid}
                    onClick={handleSubmit(e => {
                      this.handleFormSubmit(e, 'continue');
                    })}
                  >
                    <FormattedMessage {...containerMessage.continueButton} />
                  </Button>
                </React.Fragment>
              )}
              {settingsPage && (
                <React.Fragment>
                  <Button
                    type="submit"
                    className={`${getBtnClass(loading, responseSuccess, responseError)} mt-md-0}`}
                    disabled={invalid}
                    onClick={handleSubmit(e => {
                      this.handleFormSubmit(e, 'update');
                    })}
                  >
                    <FormattedMessage {...containerMessage.btnUpdate} />
                  </Button>
                  <Button type="button" className="btn btn-link me-3 ms-md-3" onClick={this.loaderUserDetails}>
                    <FormattedMessage {...containerMessage.btnCancel} />
                  </Button>
                </React.Fragment>
              )}
            </div>
          </form>
        </>
      </React.Fragment>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmploymentType: evt => dispatch(actions.changeEmploymentType(evt)),
    onChangeAnnualRateCurrency: evt => dispatch(actions.changeAnnualRateCurrency(evt)),
    onChangeAnnualRate: evt => dispatch(actions.changeAnnualRate(evt.target.value)),

    onChangeHourlyRateCurrecy: evt => dispatch(actions.changeHourlyRateCurrecy(evt)),
    onChangeHourlyRate: evt => dispatch(actions.changeHourlyRate(evt.target.value)),
    onChangeBillType: evt => dispatch(actions.changeBillType(evt)),

    onChangeCompanyName: evt => dispatch(actions.changeCompanyName(evt.target.value)),
    onChangeCompanyRegistrationNumber: evt => dispatch(actions.changeCompanyRegistrationNumber(evt.target.value)),
    onChangeCompanyWebsite: evt => dispatch(actions.changeCompanyWebsite(evt.target.value)),
    onChangeCompanyVat: evt => dispatch(actions.changeCompanyVat(evt.target.value)),

    onChangeCompanyLine1: evt => dispatch(actions.changeCompanyLine1(evt)),
    onChangeCompanyLine2: evt => dispatch(actions.changeCompanyLine2(evt)),
    onChangeCompanyCity: evt => dispatch(actions.changeCompanyCity(evt)),
    onChangeCompanyState: evt => dispatch(actions.changeCompanyState(evt)),
    onChangeCompanyCountry: evt => dispatch(actions.changeCompanyCountry(evt)),
    onChangeCompanyPostcode: evt => dispatch(actions.changeCompanyPostcode(evt)),

    onChangeIndemnityCurrency: evt => dispatch(actions.changeIndemnityCurrency(evt)),
    onChangeIndemnity: evt => dispatch(actions.changeIndemnity(evt.target.value)),
    onChangePublicLiabilityCurrency: evt => dispatch(actions.changePublicLiabilityCurrency(evt)),
    onChangePublicLiability: evt => dispatch(actions.changePublicLiability(evt.target.value)),
    onChangeEmployeeLiabilityCurrency: evt => dispatch(actions.changeEmployeeLiabilityCurrency(evt)),
    onChangeEmployeeLiability: evt => dispatch(actions.changeEmployeeLiability(evt.target.value)),

    onSaveForLater: (evt, submitType, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.saveForLater(submitType, data));
    },
    onSubmitSalaryAndBillingForm: (evt, submitType, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitSalaryBillForm(submitType, data));
    },
  };
}
SalaryAndBilling.defaultProps = defaultProps;
SalaryAndBilling.propTypes = propTypes;
const mapStateToProps = createStructuredSelector({
  employmentType: selectors.makeEmploymentType(),
  currencyAnnualRate: selectors.makeAnnualRateCurrency(),
  annualRate: selectors.makeAnnualRate(),
  currency: selectors.makeHourlyRateCurrency(),
  ratePerHour: selectors.makeHourlyRate(),
  billingType: selectors.makeBillType(),
  companyName: selectors.makeCompanyName(),
  companyregisteredNumber: selectors.makeCompanyRegistrationNumber(),
  website: selectors.makeCompanyWebsite(),
  vatNumber: selectors.makeCompanyVat(),
  companyPincode: selectors.makeCompanyPincode(),
  companyCountry: selectors.makeCompanyCountry(),
  companyAddressLineOne: selectors.makeCompanyLine1(),
  companyAddressLineTwo: selectors.makeCompanyLine2(),
  companyCity: selectors.makeCompanyCity(),
  companyState: selectors.makeCompanyState(),
  currencyCompanyProfessionInsuranceValue: selectors.makeCurrencyIndemnity(),
  companyProfessionInsuranceValue: selectors.makeIndemnity(),
  currencyCompanyPublicInsurancesValue: selectors.makeCurrencyPublicLiability(),
  companyPublicInsurancesValue: selectors.makePublicLiability(),
  currencyCompanyEmployerInsuranceValue: selectors.makeCurrencyEmployeeLiability(),
  companyEmployerInsuranceValue: selectors.makeEmployeeLiability(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
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
)(SalaryAndBilling);
